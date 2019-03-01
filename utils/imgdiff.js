const resemble = require('resemblejs-node');
const fs = require('fs');
const async = require('async');
const diff = async (rawDir, sourceImg, Data) => {

  fs.readdir(rawDir, (err, files) => {
      console.log('start comparing....');
      let temp = new Array();
      async.map(files,(val,callback) => {
        let difference = resemble(rawDir + '/' + val).compareTo(sourceImg).ignoreColors().onComplete(function (result) {
              if (parseInt(result.misMatchPercentage) < 10) {
                // console.log(result);
                console.log(val);
                temp.push(val);
              }
              callback(null, val);
            });
        },(err,result) => {
          console.log('compare complete!');
          Data=temp;
          console.log(Data);
        });
  })
}
module.exports = diff;