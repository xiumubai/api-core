/*
 * @Author: 朽木白
 * @Date: 2022-06-15 16:38:20
 * @LastEditors: 1547702880@qq.com
 * @LastEditTime: 2022-06-15 16:38:29
 * @Description:
 */
function repeat(s, n) {
  return new Array(n + 1).join(s);
}

// 递归
function repeat(s, n) {
  return n > 0 ? s.concat(repeat(s, --n)) : '';
}
