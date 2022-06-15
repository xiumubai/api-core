/*
 * @Author: your name
 * @Date: 2021-11-27 13:49:11
 * @LastEditTime: 2022-03-01 22:59:00
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /docs-code/javascript/throttle.js
 */
// 规定在一个单位时间内，只能触发一次函数。如果这个单位时间内触发多次函数，只有一次生效。
// https://juejin.cn/post/6844903669389885453
function throttle(fn, wait) {
  let curTime = 0;
  return function () {
    let context = this;
    let args = arguments;
    let nowTime = Date.now();
    console.log(nowTime - curTime);
    if (nowTime - curTime >= wait) {
      curTime = Date.now();
      fn.apply(context, args);
    }
  };
}
