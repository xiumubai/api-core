/*
 * @Author: 朽木白
 * @Date: 2022-06-15 16:51:03
 * @LastEditors: 1547702880@qq.com
 * @LastEditTime: 2022-06-15 16:51:07
 * @Description:
 */
// 使用闭包实现
for (var i = 0; i < 5; i++) {
  (function (i) {
    setTimeout(function () {
      console.log(i);
    }, i * 1000);
  })(i);
}
// 使用 let 块级作用域
for (let i = 0; i < 5; i++) {
  setTimeout(function () {
    console.log(i);
  }, i * 1000);
}
