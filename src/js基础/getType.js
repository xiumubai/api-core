/*
 * @Author: 朽木白
 * @Date: 2022-06-15 16:17:12
 * @LastEditors: 1547702880@qq.com
 * @LastEditTime: 2022-06-15 16:17:17
 * @Description: 判断类型
 */
function getType(value) {
  // 判断数据是 null 的情况
  if (value === null) {
    return value + '';
  }
  // 判断数据是引用类型的情况
  if (typeof value === 'object') {
    let valueClass = Object.prototype.toString.call(value),
      type = valueClass.split(' ')[1].split('');
    type.pop();
    return type.join('').toLowerCase();
  } else {
    // 判断数据是基本数据类型的情况和函数的情况
    return typeof value;
  }
}
