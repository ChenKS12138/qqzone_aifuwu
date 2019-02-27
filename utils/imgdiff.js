
const BlinkDiff = require('blink-diff');
const fs=require('fs');

const diff= async (imgDir,paoImgPath) => {
    fs.readdir(imgDir,(err,files) =>{
        files.map((val,index) => {
            var diff = new BlinkDiff({
                imageAPath: imgDir+'/'+val, // Use file-path
                imageBPath: paoImgPath,

                thresholdType: BlinkDiff.THRESHOLD_PERCENT,
                threshold: 0.01, // 1% threshold

                // imageOutputPath: ''
            });
            diff.run(function (error, result) {
                if (error) {
                    throw error;
                } else {
                    console.log(diff.hasPassed(result.code) ? '通过' : '失败');
                    console.log('总像素:' + result.dimension);
                    console.log('发现:' + result.differences + ' 差异.');
                }
            })
        })
    })
}
module.exports=diff;
