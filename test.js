Promise.all([new Promise((resolve,reject) => {
  resolve(1);
  console.log(11);
}),new Promise((resolve,reject) => {
  resolve(2);
  console.log(22);
})]).then(res => {
  console.log(res);
})