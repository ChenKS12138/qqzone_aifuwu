const request=require('request');
const fs=require('fs');
const url = 'https://i.qq.com/';
request({
    url:url,
    form:{
        u:'749923710',
        p:'3'
    },
    method: 'POST',
    charset: "utf-8",
    headers: {
        'accept': '*/*',
        'accept-language': 'zh-CN,zh;q=0.9',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36'
    }
},function(err,response){
    fs.writeFileSync('./index.html',response.body);
})