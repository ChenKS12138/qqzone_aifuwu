const request = require('request');
const fs = require('fs');
const url = 'https://user.qzone.qq.com/2563280140';
const cookie = JSON.parse(fs.readFileSync('./login.json').toString()).cookie;

const Cookie = function (name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
};
const getGTK = function () {
    var tmpSkey = null,
        tmpToken = null;
    return function () {
        var skey = Cookie('p_skey'),
            hash = 5381,
            token = tmpToken;
        if (skey) {
            if (skey !==
                tmpSkey) {
                tmpSkey = skey;
                var i = 0,
                    l = skey.length;
                for (; i < l; ++i) hash += (hash << 5) + skey.charAt(i).charCodeAt();
                tmpToken = token = hash & 2147483647
            }
        } else tmpToken = token = null;
        return token;
    }
}();

let url_shuoshuo = "https://user.qzone.qq.com/proxy/domain/taotao.qq.com/cgi-bin/emotion_cgi_msglist_v6?uin=2563280140&ftype=0&sort=0&pos=0&num=20&replynum=100&g_tk=" + getGTK() + "&callback=_preloadCallback&code_version=1&format=jsonp&need_private_comment=1&g_tk=" + getGTK();


const options = {
    url: url_shuoshuo,
    method: 'GET',
    charset: "utf-8",
    headers: {
        'accept': '*/*',
        'accept-language': 'zh-CN,zh;q=0.9',
        'cookie': cookie,
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36'
    }
}
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
    })
    console.log(img);
})