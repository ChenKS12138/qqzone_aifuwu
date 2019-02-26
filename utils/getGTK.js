const getGTK = function (p_skey) {
    var tmpSkey = null,
        tmpToken = null;
    return (function () {
        var skey = p_skey,
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
    })();
};
module.exports=getGTK;