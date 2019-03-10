const request = require('request');
const fs = require('fs');
const express = require('express');
const Login = require('./utils/login.js');
const getGTK = require('./utils/getGTK.js');
const async = require('async');
const resemble = require('resemblejs-node');
const time = require('./utils/time.js');
const sharp=require('sharp');

const app = express();
const userinfo = JSON.parse(fs.readFileSync('./config.json').toString());
let login = Login(true,userinfo.u, userinfo.p);
const serviceStartTime=time();

let responseData = {
    ret: 200,
    desc: 'success',
    data: {
        currentTime: 0,
        lastUpdateTime:0,
        count: 0,
        time: [],
        url: []
    }
};

login.then(login => {
    console.log('Login success!');

    let cookie = login.cookie;
    const page = login.page;
    const browser = login.browser;


    let p_skey = cookie.map((val) => {
        if (val.name === 'p_skey') {
            return val.value;
        }
    }).toString().split(',').join('');
    let cookieString = cookie.map((val) => {
        return val.name + "=" + val.value + ";";
    }).toString().split(',').join('');
    let url_shuoshuo = "https://user.qzone.qq.com/proxy/domain/taotao.qq.com/cgi-bin/emotion_cgi_msglist_v6?uin=2563280140&ftype=0&sort=0&pos=0&num=20&replynum=100&g_tk=" + getGTK(p_skey) + "&callback=_preloadCallback&code_version=1&format=jsonp&need_private_comment=1&g_tk=" + getGTK(p_skey);
    const options = {
        url: url_shuoshuo,
        method: 'GET',
        charset: "utf-8",
        headers: {
            'accept': '*/*',
            'accept-language': 'zh-CN,zh;q=0.9',
            'cookie': cookieString,
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36'
        }
    };

    const update = () => {
        request(options, (err, response) => {
            let data = JSON.parse(response.body.slice(17, -2));
            const msg = data.msglist;
            info = msg.map(function (val, index, arr) {
                if (val.pic) {
                    let temp = val.pic.map(function (val, index) {
                        return val.pic_id;
                    });
                    return {
                        pic: temp,
                        time: val.created_time,
                    };
                }
            });
            let temp = [];
            info.forEach((val) => {

                if (val && val.pic) {
                    val.pic.forEach((value) => {
                        if (value) {
                            temp.push({
                                pic: value,
                                time: val.time
                            })
                        }
                    })
                }
            })
            info = temp;
            console.log('start');

            async.waterfall([
                (cb) => {
                    async.map(info, (val, callback) => {
                        request({
                            url: val.pic,
                            method: "GET",
                            charset: "utf-8",
                            encoding: null,
                            headers: {
                                accept: "*/*",
                                "accept-language": "zh-CN,zh;q=0.9",
                                "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36"
                            }
                        }, (err, response, buffer) => {
                            if(Buffer.isBuffer(buffer)){
                                callback(null, {
                                    buffer: buffer,
                                    time: val.time,
                                    url: val.pic
                                });
                            }
                            else{
                                callback(null,null);
                            }
                        });
                    }, (err, result) => {
                        result = result.filter(val =>{if(val === null){return false}else{return true}});
                        console.log('buffer fetched!');
                        cb(null, result);//result 包含了 buffer time url 
                    });
                },(buffers,cb) => {
                    async.map(buffers,(val,callback) => {
                      sharp(val.buffer).resize(640).png().toBuffer().then(res => {
                        callback(null,{
                          png:res,
                          time:val.time,
                          url:val.url
                        });
                      })
                    },(err,result) => {
                      console.log('transcoded')
                      cb(null,result);
                    })
                },
                (pngs, cb) => {
                    responseData = {
                        ret: 201,
                        desc: 'COLLECTING DATA',
                        data: {
                            currentTime: 0,
                            lastUpdateTime:time(),
                            count: 0,
                            time: [],
                            url: []
                        },
                    }
                    async.map(pngs, (val, callback) => {
                        console.log('comparing.....');
                        // fs.writeFileSync('./temp/'+val.png.toString('base64').slice(0,17)+'.png',val.png);//测试使用的代码
                        resemble(val.png).compareTo('./res/pao.png').scaleToSameSize().onComplete((result) => {
                            if (parseInt(result.misMatchPercentage) <= 8) {
                                console.log(val.png.toString('base64').slice(0, 17));
                                console.log(result.misMatchPercentage);
                                responseData.data.count++;
                                responseData.data.time.push(val.time);
                                responseData.data.url.push(val.url);
                            } else {}
                            callback(null, null);
                        });
                    }, (err, result) => {
                        console.log('compared!');
                        console.log(time());
                        responseData.lastUpdateTime=time();
                        responseData.ret = 200;
                        responseData.desc = "success";
                    })
                }
            ], (err, result) => {})


        });
    }
    update();
    setInterval(update, 300000);
});

app.use('/img', express.static('./temp'));
app.use('/', (req, res) => {
    responseData.data.currentTime = time();
    responseData.data.serviceStartTime=serviceStartTime;
    res.json(responseData);
})
app.listen(3001);
console.log('SERVER START!');