const images = require('images');
const fs=require('fs');
const async=require('async');
const transcoding = (rawDir,outputDir,callback) => {
    console.log('transcoding......');
    fs.readdir(rawDir,function(err,files){
        // files.forEach((val,index) => {
        //     fs.stat(rawDir+'/'+val,(err,data) => {
        //         if(data.size){
        //             images(rawDir + '/' + val).resize(640,640).save(outputDir + '/' + String(index) + '.png');
        //         }
        //     })
        // });
        // console.log('transcode complete!');

        async.map(files,(val, callback) => {
            fs.stat(rawDir + '/' + val, (err, data) => {
                if (data.size) {
                    images(rawDir + '/' + val).resize(640, 640).save(outputDir + '/' + String(Math.random().toString().slice(3, 9)) + '.png');
                }
                callback(null,null)
            })
        }, (err, r) => {
            callback();
        });


    })
}
module.exports=transcoding;