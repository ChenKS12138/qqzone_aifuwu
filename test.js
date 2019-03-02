// import {
//   request
// } from "https";

const request = require("request");
// const resemble = require("resemblejs-node");
// const images = require("images");
// const fs = require("fs");
// const async = require('async');
// const express = require('express');
// const path = require('path');
// const url ='https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1551371823197&di=2de1eceaab13e79e9d770e5dec509478&imgtype=0&src=http%3A%2F%2Fb.hiphotos.baidu.com%2Fzhidao%2Fwh%253D450%252C600%2Fsign%3Db7a5aee7dab44aed591bb6e0862cab37%2F738b4710b912c8fcf2735b60fc039245d788219e.jpg';
// const url2=['http://b18.photo.store.qq.com/psb?/V14XRS3d4HjYJC/Dt.KcagVRj4sJRIzosQB9n1UKD.CdtguLvkThcamgIM!/b/dBIAAAAAAAAA&bo=wAMABcADAAURECc!','http://b19.photo.store.qq.com/psb?/V14XRS3d4HjYJC/NjxGtmq..W60u2QwHa60zE5P72MGo6I0ZK6Us518pps!/b/dBMAAAAAAAAA&bo=OAR9BzgEfQcRECc!'];

// const img = ["http://b18.photo.store.qq.com/psb?/V14XRS3d4HjYJC/Dt.KcagVRj4sJRIzosQB9n1UKD.CdtguLvkThcamgIM!/b/dBIAAAAAAAAA&bo=wAMABcADAAURECc!", "http://b19.photo.store.qq.com/psb?/V14XRS3d4HjYJC/NjxGtmq..W60u2QwHa60zE5P72MGo6I0ZK6Us518pps!/b/dBMAAAAAAAAA&bo=OAR9BzgEfQcRECc!", "http://b74.photo.store.qq.com/psb?/V14XRS3d4HjYJC/YSRbbC2feKV9SPcmcyPI7ywqf9ZEAe3fml7Gt7XPkb8!/b/dEoAAAAAAAAA&bo=IAMgAyADIAMRECc!", "http://m.qpic.cn/psb?/V14XRS3d4HjYJC/mcDQto*jV7QfAV3QhcTptPoOAUTI2vVN2jdaELXxBnI!/b/dB0AAAAAAAAA", "http://m.qpic.cn/psb?/V14XRS3d4HjYJC/c9ZcZANKs6xk9dJyQALyinMxWKRCCPfeHVgdoH1t8Hw!/b/dCEBAAAAAAAA", "https://r.photo.store.qq.com/psb?/V14XRS3d4HjYJC/OpoeE*7CvKOnhg2ngR5yEddOBWSpgWVBoicVMv*oisA!/o/dL8AAAAAAAAA", "http://b244.photo.store.qq.com/psb?/V14XRS3d4HjYJC/9Zhe4nX*5FNhjDHjnRZmvP3G3z8dmnUsJGbW0c61ANw!/b/dPQAAAAAAAAA&bo=0ALQAtAC0AIRECc!", "http://b364.photo.store.qq.com/psb?/V14XRS3d4HjYJC/hOdqPdzcA5xHmfYY6YxLtygO3KG3s6r7YysvL4yn1So!/b/dGwBAAAAAAAA&bo=8ADbAPAA2wADEDU!", "http://b392.photo.store.qq.com/psb?/V14XRS3d4HjYJC/oL7l5ihHshfx99It2UWBjApgk6OtdO7A4eBIUj7ILp0!/b/dIgBAAAAAAAA&bo=8ADwAPAA8AADEDU!", "http://b219.photo.store.qq.com/psb?/V14XRS3d4HjYJC/mC913CkWTTorA2Fkzk9R3dC91AHv.BvaihZW12LD9rk!/b/dNsAAAAAAAAA&bo=8ADwAPAA8AADEDU!", "http://b224.photo.store.qq.com/psb?/V14XRS3d4HjYJC/5hAMgtjkI.1jf3cWy.26kTP2.puo3k735LMhKbrmwow!/b/dOAAAAAAAAAA&bo=QARNB0AETQcRECc!", "http://b269.photo.store.qq.com/psb?/V14XRS3d4HjYJC/0UHpypQkEXweHNFDPDtt*PdNVwMayXxTUKYnptWVTNs!/b/dA0BAAAAAAAA&bo=oAWAB6AFgAcRECc!", "http://b244.photo.store.qq.com/psb?/V14XRS3d4HjYJC/E*OdjTlp8EmkYvIOwypJM7IhCRcco8MVDTYr2eMM38s!/b/dPQAAAAAAAAA&bo=PwTXAT8E1wERECc!", "http://b390.photo.store.qq.com/psb?/V14XRS3d4HjYJC/8mgTd6GDMj*FA4bEDaM4pE9sKxw0MFahvIHAMPMEiLk!/b/dIYBAAAAAAAA&bo=wAOAB8ADgAcRECc!", "http://m.qpic.cn/psb?/V14XRS3d4HjYJC/csqXFSpwT3mAtG*rCO*7QTaLFYC9v91SD3hMa4ftIbg!/b/dI4BAAAAAAAA", "http://m.qpic.cn/psb?/V14XRS3d4HjYJC/AA1XwWVrReflxMi73yT2a8q5gHVn.3SbSBWM7DLsinQ!/b/dI4BAAAAAAAA", "https://r.photo.store.qq.com/psb?/V14XRS3d4HjYJC/vQhwqGl9MWaG7hNMwQAzVyXZH1hSAbrzfT.umXqVomQ!/o/dLwAAAAAAAAA", "https://r.photo.store.qq.com/psb?/V14XRS3d4HjYJC/s1AhobjKCEJJjPOAJCQM.ad8fc79LzwLx9R6vgynfms!/o/dFMBAAAAAAAA", "", "http://b221.photo.store.qq.com/psb?/V14XRS3d4HjYJC/sVVXI74W1g1wOE9z*MLUhJ5mFKG.*K1ESrKoEms637c!/b/dN0AAAAAAAAA&bo=OAR9BzgEfQcRECc!", "http://b222.photo.store.qq.com/psb?/V14XRS3d4HjYJC/pMxrj08rpG6Fhz4jJ1WOmueoWtQi*G2OANZ7ogSO22k!/b/dN4AAAAAAAAA&bo=gAKAAoACgAIRECc!", "http://b230.photo.store.qq.com/psb?/V14XRS3d4HjYJC/qywaOCrJC55UV2Rwg74*p4lEY8jmqNkkzqAnLvxMuOI!/b/dOYAAAAAAAAA&bo=OATECDgExAgRECc!", "http://b378.photo.store.qq.com/psb?/V14XRS3d4HjYJC/7gyzymaSmMJkBbVF*1*60G5i93BTwDiNa1VxDsgb82w!/b/dHoBAAAAAAAA&bo=hgKGAoYChgIRECc!", "http://b224.photo.store.qq.com/psb?/V14XRS3d4HjYJC/k5JGkzfk0NEfJ.dK6drku8w2wb1yjLk*b5k2tmUev.E!/b/dOAAAAAAAAAA&bo=IAMgAyADIAMRECc!", "http://b265.photo.store.qq.com/psb?/V14XRS3d4HjYJC/bIy.pLD2lkPF46J52GRhIegGc3NksGoP2eISoPUOAjM!/b/dAkBAAAAAAAA&bo=gAKAAoACgAIRECc!", "http://b222.photo.store.qq.com/psb?/V14XRS3d4HjYJC/WcrvERFWao2Ts87Y2pGtWKOdu8E3zTUBwwcZv.rkY80!/b/dN4AAAAAAAAA&bo=IAMgAyADIAMRECc!", "http://b389.photo.store.qq.com/psb?/V14XRS3d4HjYJC/UNJiFMk7BuCLcC4eNMHFnJZFBInygnN9d*WtekCfxGo!/b/dIUBAAAAAAAA&bo=jAPVAYwD1QEDEDU!", "http://b244.photo.store.qq.com/psb?/V14XRS3d4HjYJC/ARNgv4Nj1.NTg*U9LhXYNIDzebR2kG4gQ0Oe9lD9S1k!/b/dPQAAAAAAAAA&bo=oAWAB6AFgAcRMAc!", "http://b397.photo.store.qq.com/psb?/V14XRS3d4HjYJC/qRXalQjZtmRzPcL.oIhxLEZVGV4T3jhBSEEfVVo0gAI!/b/dI0BAAAAAAAA&bo=IAMgAyADIAMRECc!", "http://b244.photo.store.qq.com/psb?/V14XRS3d4HjYJC/DtKrnFAr1fsP9khJ*QQLqSE1qkiDPPwToD1mKNggyMk!/b/dPQAAAAAAAAA&bo=oAWAB6AFgAcRIBc!", "http://b384.photo.store.qq.com/psb?/V14XRS3d4HjYJC/opYb0Eg007kS8Wnhivw3LJnOcx1Zxjv2F6wB3qEk5yQ!/b/dIABAAAAAAAA&bo=QQIABEECAAQRECc!", "http://b394.photo.store.qq.com/psb?/V14XRS3d4HjYJC/gFhLoQAq01uC.6UIS8*dvFRdR0ILIzJbHBBuEUOXGYU!/b/dIoBAAAAAAAA&bo=IAMgAyADIAMRECc!", "http://b232.photo.store.qq.com/psb?/V14XRS3d4HjYJC/2PffbP00aauuan1RfjsmtA5FbM5DDlaTqCtiwKMpbpA!/b/dOgAAAAAAAAA&bo=gAKAAoACgAIRECc!", "http://b244.photo.store.qq.com/psb?/V14XRS3d4HjYJC/nxaghBY4n6f.3R7Xj0p1wFYod0labHaVF79iipVt6aI!/b/dPQAAAAAAAAA&bo=0AKgBdACoAURECc!", "http://b244.photo.store.qq.com/psb?/V14XRS3d4HjYJC/k6CtiwfbtNJSxiu8QTUn45FErWla6oJPc.RfQnuJ2YA!/b/dPQAAAAAAAAA&bo=KgOgBSoDoAURECc!", "http://b392.photo.store.qq.com/psb?/V14XRS3d4HjYJC/Mo.ePNA5axiCuE9SwAIQnqT9*mImf0Eb99btmF6HDYA!/b/dIgBAAAAAAAA&bo=IAMgAyADIAMRECc!", "http://b397.photo.store.qq.com/psb?/V14XRS3d4HjYJC/AZEoZSZw9UWcCw7a2WBl2kRepBwK8abS3wRvC4HKO.w!/b/dI0BAAAAAAAA&bo=gAKAAoACgAIRECc!", "http://b394.photo.store.qq.com/psb?/V14XRS3d4HjYJC/GJX1OUGgfFwITGSAirKPTeK.0mDymxopBLdZQEOLtaw!/b/dIoBAAAAAAAA&bo=gAKAAoACgAIRECc!", "http://b222.photo.store.qq.com/psb?/V14XRS3d4HjYJC/eL262TsSVl0dFVDBP*D2ak7xLq8gbOzeWjexCs0aEJM!/b/dN4AAAAAAAAA&bo=0ALYBdAC2AURECc!"];

// resemble.outputSettings({
//     useCrossOrigin: false
// });
// const options = {
//     // url: "http://b398.photo.store.qq.com/psb?/V14XRS3d4HjYJC/tsBf2ILjSk.ZNh3BTiqhxEm0kMcDt67*Xio2.g2J3PA!/b/dI4BAAAAAAAA&bo=WALYAVgC2AERECc.jpg",
//     url: 'http://b190.photo.store.qq.com/psb?/V14XRS3d4HjYJC/Y1kfC9BdoYg8hKc4Ufmllz7Ys4D632QIvjufZRZK*Xw!/b/dL4AAAAAAAAA&bo=gAKAAoACgAIRECc!',
//     method: "GET",
//     charset: "utf-8",
//     encoding: null,
//     headers: {
//         accept: "*/*",
//         "accept-language": "zh-CN,zh;q=0.9",
//         "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36"
//     }
// };


// const img = ['http://b385.photo.store.qq.com/psb?/V14XRS3d4HjYJC/dfLasIShMUq3c*ddWMeL6Y0QUhAzII4jzCM0bhn2a6Y!/b/dIEBAAAAAAAA&bo=9AE5AfQBOQERECc!', 'http://b384.photo.store.qq.com/psb?/V14XRS3d4HjYJC/Fq7RnHHEAhTvbrBye7c52I8bOe6uC*RcP.ZItI8DoHE!/b/dIABAAAAAAAA&bo=*wPnAv8D5wIRECc!', 'http://b376.photo.store.qq.com/psb?/V14XRS3d4HjYJC/GxLFGiydyY6GjkXcXV5iCTTQYfJEK06or6D1p7SAtv4!/b/dHgBAAAAAAAA&bo=sAReA7AEXgMRECc!', '', 'http://b244.photo.store.qq.com/psb?/V14XRS3d4HjYJC/BJAZh.ediMOeNbyiw.F75CJiM*A.16dfitcJM3x.fOI!/b/dPQAAAAAAAAA&bo=vgPAA74DwAMRECc!', 'http://b389.photo.store.qq.com/psb?/V14XRS3d4HjYJC/AF88o59V4QV8wV8rVBiku24lZjMDLA2M3dhyunGx26E!/b/dIUBAAAAAAAA&bo=wQNsAcEDbAEDEDU!', '', 'http://b398.photo.store.qq.com/psb?/V14XRS3d4HjYJC/tsBf2ILjSk.ZNh3BTiqhxEm0kMcDt67*Xio2.g2J3PA!/b/dI4BAAAAAAAA&bo=WALYAVgC2AERECc!', 'http://b229.photo.store.qq.com/psb?/V14XRS3d4HjYJC/1icImLPUJlpq4I7tGM459tK*ZN0xm.7wv4vIgrAEniA!/b/dOUAAAAAAAAA&bo=gAfLA4AHywMRECc!', 'http://b220.photo.store.qq.com/psb?/V14XRS3d4HjYJC/bSdCU5*XBfmM1NDA.Ms9Mvl2tfDAgPivROdiUBpOqqw!/b/dNwAAAAAAAAA&bo=tQOAB7UDgAcRECc!', 'http://b394.photo.store.qq.com/psb?/V14XRS3d4HjYJC/sB.R0bG2xkBiTtSi095CASruF1WKEnuvTvSVKeCTjxM!/b/dIoBAAAAAAAA&bo=gAKAAoACgAIRECc!', 'http://b244.photo.store.qq.com/psb?/V14XRS3d4HjYJC/4zp3jyhCjYCmLt3oqTFmu9u4M7bFIr9KsP54X2tn930!/b/dPQAAAAAAAAA&bo=OAToCDgE6AgRECc!', 'http://b182.photo.store.qq.com/psb?/V14XRS3d4HjYJC/IazuWtNNKi4gLGQdADA2JSZEhRp2VkFm8chzXX.G3xQ!/b/dLYAAAAAAAAA&bo=IAMgAyADIAMRECc!', 'http://b194.photo.store.qq.com/psb?/V14XRS3d4HjYJC/vj71Jk9nya5S5HbLAbjLnbFGQxu7bwEsz*FO9tSq1vE!/b/dMIAAAAAAAAA&bo=WALYAVgC2AERECc!', 'http://b340.photo.store.qq.com/psb?/V14XRS3d4HjYJC/EMLwpQVpzoJy0c7b2.*NAW72E0AVvaDojnmuG08L3QA!/b/dFQBAAAAAAAA&bo=gARBAYAEQQEDEDU!', 'http://b378.photo.store.qq.com/psb?/V14XRS3d4HjYJC/REbx6GI2FVtcCndyJ7iizKynC1*mS3dRORMU6xM8uIg!/b/dHoBAAAAAAAA&bo=0ALQAtAC0AIRECc!', 'http://b269.photo.store.qq.com/psb?/V14XRS3d4HjYJC/HlLEiaE4SNO5eh3bf9GRaXLQ4yesfXvH4nWjRIk*R8A!/b/dA0BAAAAAAAA&bo=IAMgAyADIAMRECc!', 'http://b384.photo.store.qq.com/psb?/V14XRS3d4HjYJC/je.XaeOzizlcnd9*.Oh7.glVnAJv1*bUUqQvdi5gqaA!/b/dIABAAAAAAAA&bo=IAPCASADwgERECc!', 'http://b267.photo.store.qq.com/psb?/V14XRS3d4HjYJC/BCkn1u.BsnQZgn2gcHrxwsGvHyihoCaxbwjhUviG.BA!/b/dAsBAAAAAAAA&bo=wgEgA8IBIAMRECc!', 'http://b223.photo.store.qq.com/psb?/V14XRS3d4HjYJC/F6oaslPQcumGW8v4FybEQiFC7nhHR8itCiABXHgqVwA!/b/dN8AAAAAAAAA&bo=IAMgAyADIAMRECc!', 'http://b190.photo.store.qq.com/psb?/V14XRS3d4HjYJC/Y1kfC9BdoYg8hKc4Ufmllz7Ys4D632QIvjufZRZK*Xw!/b/dL4AAAAAAAAA&bo=gAKAAoACgAIRECc!', 'http://b340.photo.store.qq.com/psb?/V14XRS3d4HjYJC/T1lmG1bXH5rWiKwfm9ULAOUGcvuBlryRi7YqNq1wfdI!/b/dFQBAAAAAAAA&bo=7gI2Be4CNgURECc!', 'http://b29.photo.store.qq.com/psb?/V14XRS3d4HjYJC/RkIoU2LONVCGKhH3nWeCo3VaFr9JInF566VVZs5M6cw!/b/dB0AAAAAAAAA&bo=9AFKAfQBSgERECc!', 'http://b223.photo.store.qq.com/psb?/V14XRS3d4HjYJC/MzpZ7poDlwTgROECVsCiJhda1M2bMlfKqBiXsBsrDB0!/b/dN8AAAAAAAAA&bo=IAMgAyADIAMRECc!', 'http://b290.photo.store.qq.com/psb?/V14XRS3d4HjYJC/IhyKOXWbfA.nU.brlCesQ6432HxFxZpfvtb*euXo2gE!/b/dCIBAAAAAAAA&bo=jAMvAYwDLwEDEDU!', 'http://b18.photo.store.qq.com/psb?/V14XRS3d4HjYJC/Dt.KcagVRj4sJRIzosQB9n1UKD.CdtguLvkThcamgIM!/b/dBIAAAAAAAAA&bo=wAMABcADAAURECc!', 'http://b19.photo.store.qq.com/psb?/V14XRS3d4HjYJC/NjxGtmq..W60u2QwHa60zE5P72MGo6I0ZK6Us518pps!/b/dBMAAAAAAAAA&bo=OAR9BzgEfQcRECc!', 'http://b74.photo.store.qq.com/psb?/V14XRS3d4HjYJC/YSRbbC2feKV9SPcmcyPI7ywqf9ZEAe3fml7Gt7XPkb8!/b/dEoAAAAAAAAA&bo=IAMgAyADIAMRECc!', 'http://m.qpic.cn/psb?/V14XRS3d4HjYJC/mcDQto*jV7QfAV3QhcTptPoOAUTI2vVN2jdaELXxBnI!/b/dB0AAAAAAAAA', 'http://m.qpic.cn/psb?/V14XRS3d4HjYJC/c9ZcZANKs6xk9dJyQALyinMxWKRCCPfeHVgdoH1t8Hw!/b/dCEBAAAAAAAA', 'https://r.photo.store.qq.com/psb?/V14XRS3d4HjYJC/OpoeE*7CvKOnhg2ngR5yEddOBWSpgWVBoicVMv*oisA!/o/dL8AAAAAAAAA', 'http://b244.photo.store.qq.com/psb?/V14XRS3d4HjYJC/9Zhe4nX*5FNhjDHjnRZmvP3G3z8dmnUsJGbW0c61ANw!/b/dPQAAAAAAAAA&bo=0ALQAtAC0AIRECc!', 'http://b364.photo.store.qq.com/psb?/V14XRS3d4HjYJC/hOdqPdzcA5xHmfYY6YxLtygO3KG3s6r7YysvL4yn1So!/b/dGwBAAAAAAAA&bo=8ADbAPAA2wADEDU!', 'http://b392.photo.store.qq.com/psb?/V14XRS3d4HjYJC/oL7l5ihHshfx99It2UWBjApgk6OtdO7A4eBIUj7ILp0!/b/dIgBAAAAAAAA&bo=8ADwAPAA8AADEDU!', 'http://b219.photo.store.qq.com/psb?/V14XRS3d4HjYJC/mC913CkWTTorA2Fkzk9R3dC91AHv.BvaihZW12LD9rk!/b/dNsAAAAAAAAA&bo=8ADwAPAA8AADEDU!', 'http://b224.photo.store.qq.com/psb?/V14XRS3d4HjYJC/5hAMgtjkI.1jf3cWy.26kTP2.puo3k735LMhKbrmwow!/b/dOAAAAAAAAAA&bo=QARNB0AETQcRECc!', 'http://b269.photo.store.qq.com/psb?/V14XRS3d4HjYJC/0UHpypQkEXweHNFDPDtt*PdNVwMayXxTUKYnptWVTNs!/b/dA0BAAAAAAAA&bo=oAWAB6AFgAcRECc!', 'http://b244.photo.store.qq.com/psb?/V14XRS3d4HjYJC/E*OdjTlp8EmkYvIOwypJM7IhCRcco8MVDTYr2eMM38s!/b/dPQAAAAAAAAA&bo=PwTXAT8E1wERECc!', 'http://b390.photo.store.qq.com/psb?/V14XRS3d4HjYJC/8mgTd6GDMj*FA4bEDaM4pE9sKxw0MFahvIHAMPMEiLk!/b/dIYBAAAAAAAA&bo=wAOAB8ADgAcRECc!'];


// async.waterfall([
//     (cb) => {
//         async.map(img.filter((val) => {
//             return val;
//         }), (val, callback) => {
//             request({
//                 url: val,
//                 method: "GET",
//                 charset: "utf-8",
//                 encoding: null,
//                 headers: {
//                     accept: "*/*",
//                     "accept-language": "zh-CN,zh;q=0.9",
//                     "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36"
//                 }
//             }, (err, response, buffer) => {
//                 callback(null, buffer);
//             })
//         }, (err, result) => {
//             console.log('img_buffer geted!');
//             cb(null, result);
//         })
//     },
//     (buffers, cb) => {
//         async.map(buffers.filter((val) => {
//             return val;
//         }), (val, callback) => {
//             callback(null, images(val).resize(640, 640).encode('png'));
//         }, (err, result) => {
//             console.log('transcoded!');
//             cb(null, result);
//         })

//     },
//     (pngs, cb) => {
//         // console.log(pngs);
//         async.map(pngs, (val, callback) => {
//             console.log('comparing.....');
//             resemble(val).compareTo('./res/pao.png').onComplete((result) => {
//                 if (parseInt(result.misMatchPercentage) <= 2) {
//                     console.log(val);
//                 } else {}
//             }, (err, result) => {
//                 console.log('compared!');
//                 cb(null, result);
//             });
//         })
//     }
// ], (err, result) => {})
// const app= express();
// app.use(express.static('./PleaseScan.png'));
// app.listen(3002);

request({
  url: 'http://b385.photo.store.qq.com/psb?/V14XRS3d4HjYJC/dfLasIShMUq3c*ddWMeL6Y0QUhAzII4jzCM0bhn2a6Y!/b/dIEBAAAAAAAA&bo=9AE5AfQBOQERECc!',
  method: "GET",
  charset: "utf-8",
  encoding: null,
  headers: {
    accept: "*/*",
    "accept-language": "zh-CN,zh;q=0.9",
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36"
  }
}, (err, response, buffer) => {
  console.log(response.toJSON().request.uri.href);
})