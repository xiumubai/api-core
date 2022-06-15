/*
 * @Author: 朽木白
 * @Date: 2022-06-15 16:40:02
 * @LastEditors: 1547702880@qq.com
 * @LastEditTime: 2022-06-15 16:40:06
 * @Description:
 */
String.prototype._reverse = function (a) {
  return a.split('').reverse().join('');
};
var obj = new String();
var res = obj._reverse('hello');
console.log(res); // olleh
