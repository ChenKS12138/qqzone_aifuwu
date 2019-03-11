let cookieString =(cookie) => {
  return cookie.map((val) => {
      return val.name + "=" + val.value + ";";
  }).toString().split(',').join('')
};
module.exports = cookieString;