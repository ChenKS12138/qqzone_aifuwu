const Cookie = function (name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
};