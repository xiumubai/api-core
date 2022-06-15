// [参考链接](https://juejin.cn/post/6844904197595332622#heading-11)

function copy(object) {}

/**


拷贝对象是对对象的属性的拷贝，有两种

1.浅拷贝

- 基本数据类型 值拷贝
- 引用数据类型 内存地址的拷贝。如果其中一个对象改变了这个地址，就会影响到另一个对象

2.深拷贝

- 从堆内存中开辟出一个新的空间，存放一个拷贝的的新对象

3.赋值操作

当我们把一个对象赋值给一个新的变量的时候，只是赋值的该对象在内存中的地址

这两个对象指向的是同一个存储区域，修改任意一个都会影响另一个

 */

// 1. 浅拷贝的实现方式

// (1) Object.assgin()

let obj1 = { person: { name: 'kobe', age: 41 }, sports: 'basketball' };
let obj2 = Object.assign({}, obj1);

obj2.person.name = 'wade';

console.log(obj1); // { person: { name: 'wade', age: 41 }, sports: 'basketball' }

// (2) 展开运算符...
let obj3 = { name: 'Kobe', address: { x: 100, y: 100 } };
let obj4 = { ...obj1 };
obj3.address.x = 200;
console.log(obj3); // { name: 'Kobe', address: { x: 200, y: 100 } }

//4.Array.prototype.concat()
let arr = [
  1,
  3,
  {
    username: 'kobe',
  },
];
let arr2 = arr.concat();
arr2[2].username = 'wade';
console.log(arr); //[ 1, 3, { username: 'wade' } ]

//5.Array.prototype.slice()
let arr3 = [
  1,
  3,
  {
    username: ' kobe',
  },
];
let arr4 = arr.slice();
arr4[2].username = 'wade';
console.log(ar3); // [ 1, 3, { username: 'wade' } ]

// 2.深拷贝的实现方式

// (1) JSON.parse(JSON.stringify())
// 问题：不能处理函数和正则，基于JSON.stringify和JSON.parse处理后，得到的正则变为空对象，得到的函数变为null了。
let arr5 = [
  1,
  3,
  {
    username: ' kobe',
  },
];
let arr6 = JSON.parse(JSON.stringify(arr5));
arr5[2].username = 'duncan';
console.log(5, arr5);

// (2) 手写递归方法
// 递归方法实现深度克隆原理：遍历对象、数组直到里边都是基本数据类型，然后再去复制，就是深度拷贝。
// 对象存在循环引用的情况：
// 额外开辟一个存储空间，储当前对象和拷贝对象的对应关系
// 当需要拷贝当前对象时，先去存储空间中找，有没有拷贝过这个对象，
// 如果有的话直接返回，如果没有的话继续拷贝，这样就巧妙化解的循环引用的问题。

function deepCopy(object) {
  if (!object || typeof object !== 'object') return;

  let newObject = Array.isArray(object) ? [] : {};

  for (let key in object) {
    if (object.hasOwnproperty(key)) {
      newobject[key] =
        typeof newObject[key] === 'object'
          ? deepCopy(object[key])
          : object[key];
    }
  }
  return newObject;
}
