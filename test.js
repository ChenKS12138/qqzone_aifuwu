Array.prototype._flatFunc= function(dep=1,flatArray=this){
  if(Number.isNaN(Number(dep))||Number(dep)<1) return flatArray;
  var curDep = 1;
  function recursionFun(flatArray, dep, curDep){
     return flatArray.reduce((acc,val) => (
        Array.isArray(val)&&(dep === Infinity || curDep< dep)
        ? acc.concat(_flatFunc(val, dep, curDep + 1))
        : acc.concat(val)
     ), []);
  }
  return recursionFun(flatArray, dep, curDep);
}
console.log([12,3,4,[3,34,55]]._flatFunc());