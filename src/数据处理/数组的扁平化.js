/*
 * @Author: 朽木白
 * @Date: 2022-06-15 16:35:09
 * @LastEditors: 1547702880@qq.com
 * @LastEditTime: 2022-06-15 16:45:05
 * @Description:
 */
// （1）递归实现
// 普通的递归思路很容易理解，就是通过循环递归的方式，一项一项地去遍历，如果每一项还是一个数组，那么就继续往下遍历，利用递归程序的方法，来实现数组的每一项的连接：
let arr = [1, [2, [3, 4, 5]]];
function flatten(arr) {
  let result = [];

  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      result = result.concat(flatten(arr[i]));
    } else {
      result.push(arr[i]);
    }
  }
  return result;
}
flatten(arr); //  [1, 2, 3, 4，5]
// （2）reduce 函数迭代

// 从上面普通的递归函数中可以看出，其实就是对数组的每一项进行处理，那么其实也可以用reduce 来实现数组的拼接，从而简化第一种方法的代码，改造后的代码如下所示：

function flatten(arr) {
  return arr.reduce(function (prev, next) {
    return prev.concat(Array.isArray(next) ? flatten(next) : next);
  }, []);
}
console.log(flatten(arr)); //  [1, 2, 3, 4，5]

// (3）扩展运算符实现

// 这个方法的实现，采用了扩展运算符和 some 的方法，两者共同使用，达到数组扁平化的目的：

function flatten(arr) {
  while (arr.some((item) => Array.isArray(item))) {
    arr = [].concat(...arr);
  }
  return arr;
}
console.log(flatten(arr)); //  [1, 2, 3, 4，5]

// （4）split 和 toString

function flatten(arr) {
  return arr.toString().split(',');
}
console.log(flatten(arr)); //  [1, 2, 3, 4，5]

// （5）ES6 中的 flat

function flatten(arr) {
  return arr.flat(Infinity);
}
console.log(flatten(arr)); //  [1, 2, 3, 4，5]
