const sharp=require('sharp');
const request=require('request');

const options = {
  url: 'http://b191.photo.store.qq.com/psb?/V14XRS3d4HjYJC/34hhc0TMO7IQsWZ6wzzevmf0evMOHNBWmZFGgThciGw!/b/dL8AAAAAAAAA&bo=gAKAAgAAAAARECc!',
  method: 'GET',
  charset: "utf-8",
  encoding:null,
  headers: {
    'accept': '*/*',
    'accept-language': 'zh-CN,zh;q=0.9',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36'
  }
};
request(options,async (err,response,buffer) => {
  sharp(buffer).resize(640,640).png().toBuffer().then(res => console.log(res))
})