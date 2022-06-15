// npm包共用的解决方案

let outterVariable = 'outter';
const createSandbox = () => {};

const sandbox = createSandbox();
sandbox(`
   var a = 1;
   var b = 2;
   // 期待打出 1 2
   console.log(a, b);
   outterVariable = 'sandbox';
   console.log(outterVariable);
`);

try {
  console.log(a, 'fail');
} catch (e) {
  console.log('success');
}
try {
  console.log(b, 'fail');
} catch (b) {
  console.log('success');
}
console.log(outterVariable);

// 1
// 2
// sandbox
// success
// success
// outter

// proxy代理window

let proxy = new Proxy(window, {
  get: (target, key) => {
    return target[key];
  },
  set: (target, key, value, receiver) => {
    return (target[key] = value);
  },
});
