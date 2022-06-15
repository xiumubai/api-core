// 问题： vue组件中的data为什么要用函数？

// 这个问题本身是js原型产生的问题

// 下面从对象和函数上进行分析

// 1.是对象的时候
const Component = function () {
  this.data = this.data;
};

Component.prototype.data = {
  a: 1,
  b: 2,
};

const A = new Component();
const B = new Component();

A.data.a = 10;
console.log(A.data.a); // 10
console.log(B.data.a); // 10

/**

代码分析：

new一个对象的时候，data是在构造函数上的，A和B都是引用的Compnent上的对象的地址，当发生改变的时候，

其实是赋值了一个引用地址，并没有创建一个新的对象

 */

// 1.是函数的时候

const ComponentB = function () {
  this.data = this.data();
};

ComponentB.prototype.data = function () {
  return {
    a: 1,
    b: 2,
  };
};

let C = new ComponentB();
let D = new ComponentB();

C.data.a = 10;
console.log(C.data.a); // 10
console.log(D.data.a); // 1

/**
代码分析：

从执行结果来看，可以看出，两个实例之间的数据并不相互影响

当data为函数时会将其作为工厂函数返回一个全新的对象

 */
