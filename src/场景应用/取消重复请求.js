/*
 * @Author: 朽木白
 * @Date: 2022-06-23 11:33:40
 * @LastEditors: 1547702880@qq.com
 * @LastEditTime: 2022-06-23 11:47:29
 * @Description:取消重复请求 https://juejin.cn/post/6955610207036801031
 */
//  利用cancletoken

// abort可以取消请求
let xhr = new XMLHttpRequest();
xhr.open('GET', 'https://developer.mozilla.org/', true);
xhr.send();
setTimeout(() => xhr.abort(), 300);

// Axios 来说，我们可以通过 Axios 内部提供的 CancelToken 来取消请求：
const CancelToken = axios.CancelToken;
const source = CancelToken.source();

axios.post(
  '/user/12345',
  {
    name: 'semlinker',
  },
  {
    cancelToken: source.token,
  }
);

source.cancel('Operation canceled by the user.'); // 取消请求，参数是可选的
