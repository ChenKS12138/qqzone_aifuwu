const time = () => {
  let date = new Date();
  return parseInt(date.getTime() / 1000);
}
module.exports = time;