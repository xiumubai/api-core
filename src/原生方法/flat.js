/*
 * @Author: 朽木白
 * @Date: 2022-06-15 16:37:10
 * @LastEditors: 1547702880@qq.com
 * @LastEditTime: 2022-06-15 16:37:22
 * @Description:
 */
function _flat(arr, depth) {
  if (!Array.isArray(arr) || depth <= 0) {
    return arr;
  }
  return arr.reduce((prev, cur) => {
    if (Array.isArray(cur)) {
      return prev.concat(_flat(cur, depth - 1));
    } else {
      return prev.concat(cur);
    }
  }, []);
}
