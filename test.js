console.log(Date.now());
console.log(new Date().getTimezoneOffset());
console.log(new Date().getTime());
var d = new Date();
console.log(d.getTime() + (d.getTimezoneOffset() * 60000));