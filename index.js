const request = require('request');
const fs = require('fs');
const express = require('express');
const Login = require('./utils/login.js');
const getGTK = require('./utils/getGTK.js');
const async = require('async');
const images = require('images');
const resemble = require('resemblejs-node');

const app = express();
const userinfo = JSON.parse(fs.readFileSync('./config.json').toString());
let login = Login(userinfo.u, userinfo.p, true);

login.then(login => {
    console.log('Login success!');

    let cookie = login.cookie;
    const page = login.page;
    const browser = login.browser;
    let Data = [];

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
            img = msg.map(function (val, index, arr) {
                if (val.pic) {
                    let temp = val.pic.map(function (val, index) {
                        return val.pic_id;
                    });
                    return temp;
                }
            });
            img = img.toString().split(',');
            console.log('start');

            async.waterfall([
                (cb) => {
                    async.map(img.filter((val) => {
                        return val;
                    }), (val, callback) => {
                        request({
                            url: val,
                            method: "GET",
                            charset: "utf-8",
                            encoding: null,
                            headers: {
                                accept: "*/*",
                                "accept-language": "zh-CN,zh;q=0.9",
                                "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36"
                            }
                        }, (err, response, buffer) => {
                            callback(null, buffer);
                        })
                    }, (err, result) => {
                        console.log('img_buffer geted!');
                        cb(null, result);
                    })
                },
                (buffers, cb) => {
                    async.map(buffers.filter((val) => {
                        return val;
                    }), (val, callback) => {
                        callback(null, images(val).resize(640, 640).encode('png'));
                    }, (err, result) => {
                        console.log('transcoded!');
                        cb(null, result);
                    })

                },
                (pngs, cb) => {
                    // console.log(pngs);
                    async.map(pngs, (val, callback) => {
                        console.log('comparing.....');
                        resemble(val).compareTo('./res/pao.png').onComplete((result) => {
                            if (parseInt(result.misMatchPercentage) <= 2) {
                                console.log(val);
                                Data.push(1);
                            } else {}
                        }, (err, result) => {
                            console.log('compared!');
                            cb(null, result);
                        });
                    })
                }
            ], (err, result) => {})

        });
    }
    update();
    setInterval(updated, 60000);

    app.use('*', (req, res) => {
        res.json({
            ret: 200,
            desc: 'success',
            data: Data
        });
    })
    app.listen(3001);







});