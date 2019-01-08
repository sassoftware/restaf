let config = {a:1, b: { x:1, y:2}};
let t = {...config};
config.a=100;

console.log(t)
