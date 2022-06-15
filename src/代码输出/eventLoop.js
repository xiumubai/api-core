// eventLoop相关的输出题
// (参考链接)[https://mp.weixin.qq.com/s?__biz=MzU5NDM5MDg1Mw==&mid=2247484225&idx=1&sn=b1d26191a41b9a3961f6798d1218fd79&chksm=fe00b96bc977307d2eab27dbd25bf6d27194d7fcdd9d9515822639b0206ad6ca1f946a0de7a9&token=1408690735&lang=zh_CN#rd]

// promsie和setTimeout结合

// 题目一：promise中有setTimeout
const promise = new Promise((resolved, reject) => {
  console.log('promise start');
  setTimeout(() => {
    console.log('setTimeout start');
    resolved('success');
    console.log('setTimeout end');
  });

  console.log('promise end');
});

promise.then((res) => {
  console.log(res);
});

console.log('end');

// 打印结果

/**
  promise start
  promise end
  end
  setTimeout start
  setTimeout end
  success
 */

/**

  ## 代码执行顺序分析

  1、刚开始整个脚本（script）作为一个宏任务来执行,遇到new Promsie，执行同步代码，console.log('promise start')，输出promise start
  2、遇到setTimeout，放入下一个宏任务延迟队列等待执行
  3、继续执行同步代码console.log('setTimeout end')，输出setTimeout end
  4、跳出promise函数，遇到promise.then()，其状态为pending，暂时不执行
  5、继续往下执行，遇到同步代码console.log('end')，输出end
  6、一轮循环过后(一个宏任务队列执行完毕)，进入下一个宏任务队列，发现异步任务setTimeout，开始执行它
  7、首先执行console.log('setTimeout start')，输出setTimeout start
  8、执行resolve，将promise的状态改为resolved，保存结果并将promise.then推入微任务队列
  9、继续执行console.log('setTimeout end')，输出setTimeout，宏任务全部执行完毕
  10、查询微任务队列，发现promise.then这个微任务，执行输出success
 
  ## 总结
  
  第一次执行的时候，整个script脚本是当作一个宏任务来执行的
  执行宏任务的时候，先执行同步任务，继续执行异步延时任务，微任务最后执行
  进入下一个宏任务，继续反复轮询

 */

// 题目二：setTimeout中有setTimeout

setTimeout(() => {
  console.log('timer1');
  setTimeout(() => {
    console.log('timer3');
  }, 0);
}, 0);
setTimeout(() => {
  console.log('timer2');
}, 0);
console.log('start');

/**
 ## 执行结果
 start
 timer1
 timer2
 timer3

 ## 总结分析
 timer3会被加入到下一轮的宏任务中，因此在timer2之后执行

 */

// 题目三：Promise.resolve().then里面有setTimeout

Promise.resolve().then(() => {
  console.log('promise1');
  const timer2 = setTimeout(() => {
    console.log('timer2');
  }, 0);
});
const timer1 = setTimeout(() => {
  console.log('timer1');
  Promise.resolve().then(() => {
    console.log('promise2');
  });
}, 0);
console.log('start');

/**
 
执行分析：

1、整个脚本开始执行，为宏1
2、Promise.resolve().then加入微任务队列，为微1
3、timer1加入宏任务队列，为宏2
4、执行同步任务，输出start，宏1执行结束
5、查询微任务队列，发现有微1，执行输出promise1
6、遇到timer2，加入宏任务队列，为宏3
7、查询宏任务队列，宏2开始执行，输出timer1
8、遇到Promise.resolve().then，假如微任务队列，为微2
9、宏二执行结束，执行微2，输出promsie2
10、查询宏任务队列，开始执行宏三，输出timer2

所以结果为：

'start'
'promise1'
'timer1'
'promise2'
'timer2'

思路：

第一次整个脚本作为一个宏任务执行
  - 遇到微任务，先加入微任务队列等待这个宏任务执行完毕，再执行这个微任务队列
  - 遇到异步宏任务加入到下一个宏任务队列等待执行
  - 执行所有的同步任务
  - 查询微任务队列，执行完毕，进入下一个宏任务

第二次宏任务执行
  - 先执行所有的同步任务
  - 如果有微任务，放入微任务队列等待执行
  - 等所有的同步任务执行完毕，执行所有的微任务
  - 第二次宏任务执行结束，进入下一次宏任务

... 300ms later

反复轮询整个宏任务队列，直到队列执行为空


 */

/**

Promise.all()和Promise.race()的用法
 */

//Promise.all()
// 1.都为成功的情况
function runAsync(x) {
  const p = new Promise((r) => setTimeout(() => r(x), 1000));
  return p;
}
Promise.all([runAsync(1), runAsync(2), runAsync(3)]).then((res) =>
  console.log(res)
);
// 都为成功，返回成功的数组，输出结果[1,2,3]

// 2.有一个为失败的情况
function runAsync(x) {
  const p = new Promise((r) => setTimeout(() => r(x), 1000));
  return p;
}
function runRejec(x) {
  const p = new Promise((r, s) => setTimeout(() => s(x), 1000));
  return p;
}
Promise.all([runAsync(1), runRejec(3), runAsync(2)])
  .then((res) => console.log(res))
  .catch((err) => console.log(err));
// 如果有一个状态为rejected,直接返回err，输出3

// romise.race()

function runAsync(x) {
  const p = new Promise((r) => setTimeout(() => r(x), 1000));
  return p;
}
function runReject(x) {
  const p = new Promise((res, rej) =>
    setTimeout(() => rej(`Error: ${x}`), 1000 * x)
  );
  return p;
}
Promise.race([runReject(0), runAsync(1), runAsync(2), runAsync(3)])
  .then((res) => console.log('result: ', res))
  .catch((err) => console.log(err));

// runReject(0)最先执行，最后catch中拿到的结果为: Error:0
// 超时请求

// async/await

// 题目一
async function async1() {
  console.log('async1 start');
  await async2();
  console.log('async1 end');
}
async function async2() {
  console.log('async2');
}
async1();
console.log('start');

/**

输出结果：
async1 start
async2
start
async1 end

总结：

这里的async1 end最后执行，是因为await阻塞了后面语句的执行
这里可以理解为await后面的内容就相当于放到了Promise.then的里面，相当于都放在微任务队列里面去执行了
如果我们把await async2()换成一个new Promise，就不会阻塞
await后面的Promise如果没有返回值，也就是它的状态始终是pending状态，因此相当于一直在await，那么它后面的语句就不会执行了
 */

// async错误捕获

// 如果在async函数中抛出了错误，则终止错误结果，不会继续向下执行。

async function async1() {
  try {
    await Promise.reject('Error');
  } catch (e) {
    console.log(e);
  }
  // 或者
  // await Promise.reject('error!!!').catch((e) => console.log(e));
  console.log('async1 end');
  return Promise.resolve('async1 success');
}

async1().then((res) => {
  console.log(res);
});

console.log('end');

// 大厂面试题

// 1.使用Promise实现每隔1秒输出1,2,3

const arr = [1, 2, 3];

arr.reduce((p, x) => {
  return p.then(() => {
    return new Promise((r) => {
      setTimeout(() => {
        r(console.log(x));
      }, 1000);
    });
  });
}, Promsie.resovle());

// 2.红灯3秒亮一次，黄灯2秒亮一次，绿灯1秒亮一次；如何让三个灯不断交替重复亮灯？（用Promise实现）三个亮灯函数已经存在：
function red() {
  console.log('red');
}
function green() {
  console.log('green');
}
function yellow() {
  console.log('yellow');
}
const light = function (timer, cb) {
  returnnewPromise((resolve) => {
    setTimeout(() => {
      cb();
      resolve();
    }, timer);
  });
};
const step = function () {
  Promise.resolve()
    .then(() => {
      return light(3000, red);
    })
    .then(() => {
      return light(2000, green);
    })
    .then(() => {
      return light(1000, yellow);
    })
    .then(() => {
      return step();
    });
};

step();
