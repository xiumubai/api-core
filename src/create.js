/*
 * @Author: 朽木白
 * @Date: 2022-06-15 16:06:02
 * @LastEditors: 1547702880@qq.com
 * @LastEditTime: 2022-06-15 16:08:54
 * @Description:
 */
// 思路：将传入的对象作为原型
function create(obj) {
  function F() {}
  F.prototype = obj;
  return new F();
}
