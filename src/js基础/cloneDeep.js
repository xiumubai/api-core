/*
 * @Author: 朽木白
 * @Date: 2022-06-15 16:06:02
 * @LastEditors: 1547702880@qq.com
 * @LastEditTime: 2022-06-15 16:30:02
 * @Description:深拷贝的实现方式:
 */

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

// (3) 函数库lodash的_.cloneDeep方法

var _ = require('lodash');
var obj1 = {
  a: 1,
  b: { f: { g: 1 } },
  c: [1, 2, 3],
};
var obj2 = _.cloneDeep(obj1);
console.log(obj1.b.f === obj2.b.f); // false

// (2) 手写递归方法
// 递归方法实现深度克隆原理：遍历对象、数组直到里边都是基本数据类型，然后再去复制，就是深度拷贝。
// 对象存在循环引用的情况：
// 额外开辟一个存储空间，储当前对象和拷贝对象的对应关系
// 当需要拷贝当前对象时，先去存储空间中找，有没有拷贝过这个对象，
// 如果有的话直接返回，如果没有的话继续拷贝，这样就巧妙化解的循环引用的问题。

function cloneDeep(object) {
  if (!object || typeof object !== 'object') return;

  let newObject = Array.isArray(object) ? [] : {};

  for (let key in object) {
    if (object.hasOwnproperty(key)) {
      newobject[key] =
        typeof newObject[key] === 'object'
          ? cloneDeep(object[key])
          : object[key];
    }
  }
  return newObject;
}
