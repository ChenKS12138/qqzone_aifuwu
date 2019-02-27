const images = require('images');
const fs=require('fs');
const transcoding = async(rawDir,outputDir) => {
    fs.readdir(rawDir,function(err,files){
        files.map((val,index) => {
            images(rawDir+'/'+val).save(outputDir+'/'+String(index)+'.png');
        })
    })
}
module.exports=transcoding;