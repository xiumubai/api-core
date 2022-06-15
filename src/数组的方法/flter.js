/*
 * @Author: 朽木白
 * @Date: 2022-06-15 16:37:59
 * @LastEditors: 1547702880@qq.com
 * @LastEditTime: 2022-06-15 16:38:01
 * @Description:
 */
Array.prototype._filter = function (fn) {
  if (typeof fn !== 'function') {
    throw Error('参数必须是一个函数');
  }
  const res = [];
  for (let i = 0, len = this.length; i < len; i++) {
    fn(this[i]) && res.push(this[i]);
  }
  return res;
};
