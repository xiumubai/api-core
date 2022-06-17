/*
 * @Author: 朽木白
 * @Date: 2022-06-15 16:17:12
 * @LastEditors: 1547702880@qq.com
 * @LastEditTime: 2022-06-17 21:34:40
 * @Description: 判断类型
 */
function getType(obj) {
  return typeof obj === 'object'
    ? Object.prototype.toString
        .call(obj)
        .replace('[object ', '')
        .replace(']', '')
        .toLowerCase()
    : typeof obj;
}

// 测试
console.log(getType(123)); // number
console.log(getType('string')); // string
console.log(getType(true)); // boolean
console.log(getType(undefined)); // undefined
console.log(getType(null)); // null
console.log(getType({})); // object
console.log(getType([])); // array
console.log(getType(/123/)); // regexp
console.log(getType(new Date())); // date
