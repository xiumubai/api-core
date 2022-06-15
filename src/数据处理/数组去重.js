/*
 * @Author: 朽木白
 * @Date: 2022-06-15 16:35:24
 * @LastEditors: 1547702880@qq.com
 * @LastEditTime: 2022-06-15 16:35:37
 * @Description:
 */

// ES6方法（使用数据结构集合）：

const array = [1, 2, 3, 5, 1, 5, 9, 1, 2, 8];

Array.from(new Set(array)); // [1, 2, 3, 5, 9, 8]

// ES5方法：使用map存储不重复的数字
const array2 = [1, 2, 3, 5, 1, 5, 9, 1, 2, 8];

uniqueArray(array2); // [1, 2, 3, 5, 9, 8]

function uniqueArray(array) {
  let map = {};
  let res = [];
  for (var i = 0; i < array.length; i++) {
    if (!map.hasOwnProperty([array[i]])) {
      map[array[i]] = 1;
      res.push(array[i]);
    }
  }
  return res;
}
