const request = require('request');
const fs = require('fs');
const express =require('express');
const Login = require('./utils/login.js');
const getGTK=require('./utils/getGTK.js');


const app=express();
const userinfo = JSON.parse(fs.readFileSync('./config.json').toString());
let login=Login(userinfo.u,userinfo.p);



login.then(login => {

    let cookie=login.cookie;
    const page=login.page;
    const browser = login.browser;

    let p_skey=cookie.map((val,index,arr) =>{
        if(val.name === 'p_skey'){
            return val.value;
        }
    }).toString().split(',').join('');
    let cookieString=cookie.map((val,index,arr) => {return val.name+"="+val.value+";";}).toString().split(',').join('');

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

    app.use('*',(req,res) => {
        request(options, function (err, response) {
            let data = response.body;
            data = data.slice(17, -2);
            data = JSON.parse(data);
            const msg = data.msglist;
            img = msg.map(function (val, index, arr) {
                if (val.pic) {
                    let temp = val.pic.map(function (val, index) {
                        return val.pic_id;
                    });
                    return temp;
                }
            });
            img=img.toString().split(',');
            res.json({
                ret:200,
                desc:'success',
                data:img
            });
        })
    });
    const server=app.listen(3001);
    console.log("SERVER START");
    
})


