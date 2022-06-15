function myinstance(left, right) {
  let proto = Object.getPrototypeOf(left);

  let prototype = right.prototype;

  while (true) {
    if (!proto) return false;
    if (proto === prototype) return true;
    proto = Object.getPrototypeOf(proto);
  }
}

// 用法
function Person() {}
const p = new Person();
console.log(p instanceof Person);

// instanceof 运算符用于判断构造函数的 prototype 属性是否出现在对象的原型链中的任何位置。
