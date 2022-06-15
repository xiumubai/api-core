// this是什么？
// this 就是一个指针，指向调用函数的对象。
// https://juejin.cn/post/6844903805587619854#heading-9
// 1.默认绑定
function sayHi() {
  console.log('Hello,', this.name);
}
var name = 'YvetteLau';
sayHi(); // Hello YvetteLau

// 2.隐式绑定
// xx.fn();fn()前如果什么都没有，那么肯定不是隐式绑定。
// setTimeout的回调函数中，this使用的是默认绑定,非严格模式下，执行的是全局对象
function sayHi() {
  console.log('Hello,', this.name);
}
var person = {
  name: 'YvetteLau',
  sayHi: sayHi,
};
var name = 'Wiliam';
person.sayHi(); // Hello YvetteLau

// 绑定丢失
function sayHi() {
  console.log('Hello,', this.name);
}
var person = {
  name: 'YvetteLau',
  sayHi: sayHi,
};
var name = 'Wiliam';
var Hi = person.sayHi;
Hi(); // Hello,Wiliam.

// 这里的person.sayHi只是赋值给了Hi，调用的时候，跟person没有半毛钱关系，所以才用了默认绑定，this指向的是window

// 3.显式绑定 call,apply,bind

// call和apply都会执行对应的函数，而bind方法不会
// bind会生成一个新的绑定函数，调用绑定函数通常会导致执行包装函数
// call() 提供新的 this 值给当前调用的函数/方法。
// p.call(b) p的this指向了b

// 4.new 绑定

/**
创建一个空对象，构造函数中的this指向这个空对象
这个新对象被执行 [[原型]] 连接
执行构造函数方法，属性和方法被添加到this引用的对象中
如果构造函数中没有返回其它对象，那么返回this，即创建的这个的新对象，否则，返回构造函数中返回的对象。
 */

function _new() {
  let target = {};

  let [constructor, ...args] = arguments;
  target.__proto__ = constructor.prototype;

  let result = constructor.apply(target, args);

  if (result && (typeof result === 'object' || typeof result === 'function')) {
    return result;
  }
  return target;
}

function sayHi(name) {
  this.name = name;
}
var Hi = new sayHi('Yevtte');
console.log('Hello,', Hi.name); // Hello Yevtte
// 在var Hi = new sayHi('Yevtte');这一步，会将sayHi中的this绑定到Hi对象上

// 绑定顺序：new绑定 > 显式绑定 > 隐式绑定 > 默认绑定

/**

箭头函数 () => {}
箭头函数是ES6中新增的，它和普通函数有一些区别，箭头函数没有自己的this，它的this继承于外层代码库中的this。箭头函数在使用时，需要注意以下几点:
（1）函数体内的this对象，继承的是外层代码块的this。
（2）不可以当作构造函数，也就是说，不可以使用new命令，否则会抛出一个错误。
（3）不可以使用arguments对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替。
（4）不可以使用yield命令，因此箭头函数不能用作 Generator 函数。
（5）箭头函数没有自己的this，所以不能用call()、apply()、bind()这些方法去改变this的指向.

 */

var obj = {
  hi: function () {
    console.log(this);
    return () => {
      console.log(this);
    };
  },
  sayHi: function () {
    return function () {
      console.log(this);
      return () => {
        console.log(this);
      };
    };
  },
  say: () => {
    console.log(this);
  },
};
let hi = obj.hi(); //输出obj对象
hi(); //输出obj对象
let sayHi = obj.sayHi();
let fun1 = sayHi(); //输出window 这里的sayHi()属于绑定丢失（xx.fn()），this指向了window
fun1(); //输出window // 箭头函数的this继承于外层，所以是window
obj.say(); //输出window

/**
  ## 准确判断this指向是什么的步骤

  1.函数是否在new中调用(new绑定)，如果是，那么this绑定的是新创建的对象。
  2.函数是否通过call,apply调用，或者使用了bind(即硬绑定)，如果是，那么this绑定的就是指定的对象。
  3.函数是否被某个上下文对象调用(隐式绑定)，如果是的话，this绑定的是那个上下文对象。一般是obj.foo()
  4.如果以上都不是，那么使用默认绑定。如果在严格模式下，则绑定到undefined，否则绑定到全局对象（window）。
  5.如果把null或者undefined作为this的绑定对象传入call、apply或者bind，这些值在调用时会被忽略，实际应用的是默认绑定规则。
  6.如果是箭头函数，箭头函数的this继承的是外层代码块的this。
  
 */

var number = 5;
var obj = {
  number: 3,
  fn: (function () {
    var number;
    this.number *= 2;
    number = number * 2;
    number = 3;
    return function () {
      var num = this.number;
      this.number *= 2;
      console.log(num);
      number *= 3;
      console.log(number);
    };
  })(),
};
var myFun = obj.fn;
myFun.call(null);
obj.fn();
console.log(window.number);

// 10
// 9
// 3
// 27
// 20
