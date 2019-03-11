const p_skey = (cookie) => {
  return  cookie.map((val) => {
      if (val.name === 'p_skey') {
          return val.value;
      }
  }).toString().split(',').join('');
};
module.exports = p_skey;