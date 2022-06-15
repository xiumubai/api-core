/*
 * @Author: 朽木白
 * @Date: 2022-06-15 16:22:58
 * @LastEditors: 1547702880@qq.com
 * @LastEditTime: 2022-06-15 16:26:57
 * @Description: 浅拷贝
 */

/**

1）Object.assign()
Object.assign()是ES6中对象的拷贝方法，接受的第一个参数是目标对象，其余参数是源对象，用法：Object.assign(target, source_1, ···)，该方法可以实现浅拷贝，也可以实现一维对象的深拷贝。


注意：

如果目标对象和源对象有同名属性，或者多个源对象有同名属性，则后面的属性会覆盖前面的属性。
如果该函数只有一个参数，当参数为对象时，直接返回该对象；当参数不是对象时，会先将参数转为对象然后返回。
因为null 和 undefined 不能转化为对象，所以第一个参数不能为null或 undefined，会报错。


```js
let target = {a: 1};
let object2 = {b: 2};
let object3 = {c: 3};
Object.assign(target,object2,object3);  
console.log(target);  // {a: 1, b: 2, c: 3}
```

2）扩展运算符
使用扩展运算符可以在构造字面量对象的时候，进行属性的拷贝。语法：

let cloneObj = { ...obj };


3）数组方法实现数组浅拷贝,不需要添加参数

Array.prototype.slice()
Array.prototype.concat()

 */

/**
 * 手写实现浅拷贝
 */

// 浅拷贝的实现;

function shallowCopy(object) {
  // 只拷贝对象
  if (!object || typeof object !== 'object') return;

  // 根据 object 的类型判断是新建一个数组还是对象
  let newObject = Array.isArray(object) ? [] : {};

  // 遍历 object，并且判断是 object 的属性才拷贝
  for (let key in object) {
    if (object.hasOwnProperty(key)) {
      newObject[key] = object[key];
    }
  }

  return newObject;
} // 浅拷贝的实现;

function shallowCopy(object) {
  // 只拷贝对象
  if (!object || typeof object !== 'object') return;

  // 根据 object 的类型判断是新建一个数组还是对象
  let newObject = Array.isArray(object) ? [] : {};

  // 遍历 object，并且判断是 object 的属性才拷贝
  for (let key in object) {
    if (object.hasOwnProperty(key)) {
      newObject[key] = object[key];
    }
  }

  return newObject;
} // 浅拷贝的实现;
function shallowCopy(object) {
  // 只拷贝对象
  if (!object || typeof object !== 'object') return;
  // 根据 object 的类型判断是新建一个数组还是对象
  let newObject = Array.isArray(object) ? [] : {};
  // 遍历 object，并且判断是 object 的属性才拷贝
  for (let key in object) {
    if (object.hasOwnProperty(key)) {
      newObject[key] = object[key];
    }
  }
  return newObject;
}
