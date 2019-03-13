const request = require('request');
const options = {
   url:"https://user.qzone.qq.com/proxy/domain/taotao.qq.com/cgi-bin/emotion_cgi_msglist_v6?uin=2563280140&ftype=0&sort=0&pos=0&num=20&replynum=100&g_tk=000&callback=_preloadCallback&code_version=1&format=jsonp&need_private_comment=1&g_tk=",
   method: 'GET',
   charset: "utf-8",
   headers: {
     'accept': '*/*',
     'accept-language': 'zh-CN,zh;q=0.9',
     'cookie': "123",
     'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36'
   }
 };
 request(options,(err,response) =>{
    console.log(JSON.parse(response.body.slice(17, -2)).code === -3000);
 })