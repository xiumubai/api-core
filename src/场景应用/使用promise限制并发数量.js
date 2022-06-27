/*
 * @Author: 朽木白
 * @Date: 2022-06-27 16:53:18
 * @LastEditors: 1547702880@qq.com
 * @LastEditTime: 2022-06-27 21:05:30
 * @Description:Promise解决并发请求
 */

/**
 * 场景： 现在提供10个id和请求函数（请求返回promise对象），
 * 现在要求你设置一个并发数（假设为3），达到并发设置效果。
 */

let request = function (id) {
  return new Promise((resolve, reject) => {
    //随机一个执行时间
    let time = Math.floor(10000 * Math.random());
    console.log(`id为${id}开始请求,预计执行时间${time / 1000}`);
    setTimeout(() => {
      resolve(id);
    }, time);
  }).then((id) => {
    console.log(`id为${id}的请求进行逻辑处理`);
    return id;
  });
};
let idArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

/**
 * 意思就是先发并发数的请求，然后每有一个请求回调结束接着发呗，保证同一时刻最多三个请求在处理过程中。
 */

/**
 * 1.Promise版本
 * 思路： 设置一个pool池放置这些请求返回的promise，
 * 然后发max个（构造函数发送），函数中每次都把promise push到pool中，
 * 然后进行then回调的注册，里边首先把promise拿出来，然后拿数组id，判断进行递归。
 * 总结：先启动，后序then方法进行递归调用，注意pool的控制
 */

function run() {
  //启动函数，直接将max个请求进行执行
  for (let i = 0; i < max; i++) {
    send(request(idArray.shift()));
  }
}
function send(promise) {
  pool.push(promise);
  promise.then((res) => {
    console.log(`id${res}的请求已经处理完毕,当前并发${pool.length}`);
    //移除已处理的请求
    pool.splice(pool.indexOf(promise), 1);
    let id = idArray.shift();
    if (id !== undefined) {
      send(request(id));
    }
  });
}
run();

/**
 * 2.Async+Promise.race
 * 思路：利用async写成同步代码，用Promise.race(pool) 来控制，
 * 每次pool中有resolve的promise（处理完的请求）,就可以继续发送新请求了。
 */
async function run() {
  for (let i = 0; i < idArray.length; i++) {
    let promise = request(idArray[i]);
    promise.then((res) => {
      console.log(`id${res}的请求已经处理完毕,当前并发为${pool.length}`);
      pool.splice(pool.indexOf(promise), 1);
    });
    pool.push(promise);
    //这里是重点，当满了就阻塞
    if (pool.length == max) {
      await Promise.race(pool);
    }
  }
}
run();
