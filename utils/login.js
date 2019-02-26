const puppeteer=require('puppeteer');
const login = async (u,p)=>{
    const browser = await puppeteer.launch({
        headless: true,
        // executablePath: 'C:\\Users\\74992\\AppData\\Local\\Google\\Chrome\\Application\\chrome.exe'
        executablePath:'/usr/bin/google-chrome'
    });
    browser.userAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36");
    const page= await browser.newPage();
    await page.goto('https://i.qq.com');
    page.setViewport({
        width:1100,
        height:700
    });
    const frame = await page.frames().find(frame => frame.name() === 'login_frame');
    await frame.click('#switcher_plogin');
    await frame.type('#u',u);
    await frame.type('#p',p);
    await frame.click('#login_button');
    await page.screenshot({path: './screenshot.png'});
    await console.log('Maybe you need to scan the QR code at first time ,please check screenshot.png ');
    setInterval(() => {
        page.screenshot({path:'./check.png'});
        page.reload();
    }, 5000);
    await page.waitFor('.qz-main',{timeout:100000});
    const cookie= await page.cookies();
    return {
        cookie:cookie,
        browser:browser,
        page:page
    };  
};
module.exports=login;