#这是个使用node.js开发的爬虫程序。
##它可以做什么?
它可以对爬取爱服务QQ空间的信息，并获取近期的说说的图片，与 /res/pao.png 进行比对,以判断说说中含有的图片是否与目标图片一致。并将最终结果以json的形式展示。
##我该怎么使用?
首先确保本地安装有最新的node和npm
然后运行,以下载依赖
```bash
npm install
```
请确保当前项目中有 /res 和 /temp 文件夹,避免未知意外的错误
接着运行
```bash
node index.js
```
程序会在本地搭建一个服务器监听3001端口。
每次运行,需要根据提示 扫描 [http://localhost:3001/img/scan.png](http://localhost:3001/img/scan.png) 的二维码完成登录
爬取分析完的信息会展示在[http://127.0.0.1:3001/](http://127.0.0.1:3001/)
信息每隔五分钟刷新一次
##我该注意些什么?
本地需安装有最新版的chrome,并将 /utils/lonin.js中的executablePath 修改为本地的chrome 程序的地址。
以我的为例
```JavaScript
const browser = await puppeteer.launch({
        headless: true,
        executablePath: '/usr/bin/google-chrome'
    });
```
由于images这个依赖在windows环境下可能有兼容性问题,推荐将程序运行在mac或linux环境下
##我是否可以选择不扫码登录
这是可以的，这需要在项目的根目录下新建 config.json,并填入账号和密码
例如:
```json
{
    "u": "this is username",
    "p": "this is password"
}
```
并对 /index.js进行修改
```JavaScript
let login = Login(userinfo.u, userinfo.p, false);
```
但是这并不推荐，因为这可能导致账号密码的意外泄漏。并且tx也会将频繁的通过账号密码登录qq空间视为危险行为。