/*
 * @Author: 朽木白
 * @Date: 2022-06-15 16:16:15
 * @LastEditors: 1547702880@qq.com
 * @LastEditTime: 2022-06-15 16:16:37
 * @Description:
 */
Promise.race = function (args) {
  return new Promise((resolve, reject) => {
    for (let i = 0, len = args.length; i < len; i++) {
      args[i].then(resolve, reject);
    }
  });
};
