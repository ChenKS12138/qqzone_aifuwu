const request = require('request');
const fs = require('fs');
const url = 'https://user.qzone.qq.com/2563280140';
let cookie = "pgv_pvi=8912137216; pgv_pvid=6362570080; RK=bAqlNS0hP6; ptcz=9629473009a72537e9f66274bf3acb98cbca7c43c58bccea3e2af65ad498ce0e; QZ_FE_WEBP_SUPPORT=1; pac_uid=0_5c3dca8157909; tvfe_boss_uuid=105c5c68ccea68b5; 3g_guest_id=-8662156272457482000; g_ut=2; qz_screen=1536x864; cpu_performance_v8=5; __Q_w_s__QZN_TodoMsgCnt=1; _qpsvr_localtk=0.9438930282866733; pgv_si=s1085652992; Loading=Yes; __Q_w_s_hat_seed=1; pgv_info=ssid=s8501927836&pgvReferrer=; zzpaneluin=; zzpanelkey=; rv2=80AFC59BEFAEBE12CF698299FE540D1ECEF6594201A2B112EF; property20=FDBA997DB4F2E09390706F012E962737F554C081D28C3EE8F855F8FBA139AB8611262217B1287F07; ptui_loginuin=749923710; uin=o0749923710; skey=@iFrivPUmZ; ptisp=cm; p_uin=o0749923710; pt4_token=o0AqP4i2iAOPIy1qgcLnd6qW7VmyQpTLTdjBRYiGdfw_; p_skey=qFrsVw7G1FBO1fsuBmqnH9TiBVA4jhwfUH-U1oqPNX0_";
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
    data=JSON.parse(data);
    const msg=data.msglist;
    img=msg.map(function(val,index,arr){
        if(val.pic){
            let temp = val.pic.map(function (val, index) {
                return val.pic_id;
            });
            return temp;
        }
    })
    console.log(img);
})