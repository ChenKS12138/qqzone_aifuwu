const request = require('request');
const fs = require('fs');
const express = require('express');
const Login = require('./utils/login.js');
const getGTK = require('./utils/getGTK.js');
const p_skey= require('./utils/p_skey.js');
const cookieString = require('./utils/cookieString.js');
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
    const getShuoshuoUrl = (qid = 2563280140) => {return `https://user.qzone.qq.com/proxy/domain/taotao.qq.com/cgi-bin/emotion_cgi_msglist_v6?uin=${qid}&ftype=0&sort=0&pos=0&num=20&replynum=100&g_tk=` + getGTK(p_skey(cookie)) + "&callback=_preloadCallback&code_version=1&format=jsonp&need_private_comment=1&g_tk=" + getGTK(p_skey(cookie))};

    const options = {
        method: 'GET',
        charset: "utf-8",
        headers: {
            'accept': '*/*',
            'accept-language': 'zh-CN,zh;q=0.9',
            'cookie': cookieString(cookie),
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36'
        }
    };

    const update = () => {
        const fetchDate = (qid=2563280140,fetchIndex) =>{
          return new Promise((resolve,reject) => {
            options.url=getShuoshuoUrl(qid);//默认值爱服务本部的qq号
            request(options, (err, response) => {
                const msg = JSON.parse(response.body.slice(17, -2)).msglist;
                info = msg.map(function (val) {
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
                let fetch = Promise.all(
                    info.map(val => {
                        return new Promise((resolve,reject) => {
                            request({
                                url:val.pic,
                                method:"GET",
                                charset:"utf-8",
                                encoding:null,
                                headers: {
                                    accept: "*/*",
                                    "accept-language": "zh-CN,zh;q=0.9",
                                    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36"
                                }
                            },(err,response,buffer) => {
                                if(Buffer.isBuffer(buffer)){
                                    resolve({
                                        buffer:buffer,
                                        time:val.time,
                                        url:val.pic
                                    })
                                }
                                else{
                                    resolve({
                                        buffer:null,
                                        time:val.time,
                                        url:val.pic
                                    })
                                }
                            })
                        })
                    })
                )
                fetch.then(res =>{
                    res=res.filter(val => {if(val.buffer){return true}else{return false}})
                    return Promise.all(
                        res.map(val => {
                            return new Promise((resolve,reject) => {
                                sharp(val.buffer).resize(640).png().toBuffer().then(pngBuffer =>{
                                    resolve({
                                        png:pngBuffer,
                                        time:val.time,
                                        url:val.url
                                    })
                                })
                            })
                        })
                    )
                })
                .then(pngBuffers => {
                    console.log('comparing.....');
                    return Promise.all(pngBuffers.map(val => {
                        return new Promise((resolve,reject) => {
                            resemble(val.png).compareTo('./res/pao.png').scaleToSameSize().onComplete(result => {
                                if(parseInt(result.misMatchPercentage) <= 8){
                                    console.log(val.png.toString('base64').slice(0,17));
                                    console.log(result.misMatchPercentage);
                                    if(fetchIndex === 1){
                                      responseData.data.count++;
                                      responseData.data.time.push(val.time);
                                      responseData.data.url.push(val.url);
                                    }
                                    else{
                                      responseData.data.count2++;
                                      responseData.data.time2.push(val.time);
                                      responseData.data.url2.push(val.url);
                                    }
                                }
                                resolve(null);
                            })
                        })
                    }))
                })
                .then(() => {
                    resolve(null);
                })
            });
          })
        }
        responseData = {
            ret: 201,
            desc: 'COLLECTING DATA',
            data: {
                currentTime: 0,
                lastUpdateTime:time(),
                count: 0,
                time: [],
                url: [],
                count2:0,
                time2:[],
                url2:[],
            },
        }
        Promise.all([fetchDate(2563280140,1),fetchDate(3493087686,2)])
        .then(() => {
          console.log("compared!");
          console.log(time());
          responseData.lastUpdateTime=time();
          responseData.ret = 200;
          responseData.desc = "success";
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