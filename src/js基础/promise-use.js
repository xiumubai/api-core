// (参考链接)[https://juejin.cn/post/6856213486633304078]
// const PENDING = 'pending';
// const RESOVLE = 'resovle';
// const REJECTED = 'rejected';

/**

// 示例1
// 传入的函数立即执行，并且resolve也执行了
const promiseA = new MyPromise((resolve, reject) => {
  resolve(777);
});

// 示例2
// resolve没有执行，在then里面需要有个callbancks数组把resolve和reject保存起来
const promiseA = new MyPromise((resolve, reject) => {});

promiseA.then(
  (resolve) => {},
  (reject) => {}
);

// 例3
// 发现定时器，去执行then，吧then里面的回调函数放在callback数组中
// 1s以后定时器执行，执行resolve(1)
var promiseA = new MyPromise((resolve, reject) => {
  setTimeout(function () {
    resolve(1);
  }, 1000);
});

promiseA.then(
  (value) => {
    console.log(value);
  },
  (err) => {
    console.log(err);
  }
);

// 例4 执行结果是onResolved：1
let promise = new Promise((resolve, reject) => {
  setTimeout(function () {
    resolve(1);
    //reject(1)
  }, 100);
});

promise.then(
  (value) => {
    console.log('onResolved:', value);
  },
  (reason) => {
    console.log('onRejected:', reason);
  }
);

// 当promsie的状态为resolved的时候，执行then的第二个判断语句，分三种情况
// 1.如果then里的回调函数返回的不是promise，return的新promise的状态是则是resolved，value就是返回的值。例如：
// 例5
let promise = new Promise((resolve, reject) => {
  resolve(1);
});

promise.then((value) => {
  return value; //返回的不是promise，是value
});

// 2.如果回调函数返回的是promise，return的promise的结果就是这个promise的结果，如代码所示，我们返回一个新的promise。
// 如果这个promise执行了resolve，返回的新的promise的状态则是resolved的。否则为rejected
// 例6
let promise = new Promise((resolve, reject) => {
  resolve(1);
});

promise.then((value) => {
  return new Promise((resolve, reject) => {
    resolve(2);
    //或者
    //reject(error)
  });
});

// 3.如果执行这段代码的时候抛出错误，则返回的promise的状态为rejected，我们可以用try catch来实现


promise会发生值传透

let promsie = new Promise((resolve,reject)=>{
    resolve(1)
})
promsie
  .then(2)
  .then(3)
  .then(value =>console.log(value))

 */

// 代码实践

function MyPromsie(executor) {
  let self = this;
  this.status = 'pending'; // 状态
  this.data = null; //数据
  this.callbacks = []; // 保存then里面的回调函数

  function resovle(value) {
    // 如果当前状态不是pending，则不执行
    if (this.status !== 'pending') {
      return;
    }

    self.status = 'resolved';
    self.value = value;

    if (self.callbacks.length > 0) {
      setTimeout(() => {
        self.callbacks.forEach((callback) => {
          callback.onResolved(value);
        });
      });
    }
  }
  function reject(value) {
    if (this.status !== 'pending') {
      return;
    }

    self.status = 'rejected';
    self.value = value;

    if (self.callbacks.length > 0) {
      self.callbacks.forEach((callback) => {
        callback.onRejected(value);
      });
    }
  }
  // 执行器
  try {
    executor(resolve, reject);
  } catch (e) {
    reject(e);
  }
}

MyPromsie.prototype.then = function (onResolved, onRejected) {
  // promise会发生值传透
  onResolved = typeof onResolved === 'function' ? onResolved : (value) => value;
  onRejected =
    typeof onRejected === 'function'
      ? onRejected
      : (reason) => {
          throw reason;
        };

  let self = this;
  return new MyPromsie((resolve, reject) => {
    // 封装回调函数，根据不同的结果，改变promise的状态
    function handleCallBack(callback) {
      try {
        const result = callback(self.data);
        if (result instanceof MyPromsie) {
          // / 2. 如果回调函数返回的是promise，return的promise的结果就是这个promise的结果
          result.then(
            (value) => {
              resolve(value);
            },
            (reason) => {
              reject(reason);
            }
          );
        } else {
          // 1. 如果回调函数返回的不是promise，return的promise的状态是resolved，value就是返回的值。
          resolve(result);
        }
      } catch (e) {
        // 3.如果执行onResolved的时候抛出错误，则返回的promise的状态为rejected
        reject(e);
      }
    }
    if (self.status === 'pending') {
      self.callbacks.push({
        onResolved() {
          // onResolved(self.data);
          handleCallBack(onResolved);
        },
        onRejected() {
          // onRejected(self.data);
          handleCallBack(onRejected);
        },
      });
    } else if (self.status === 'resovled') {
      setTimeout(() => {
        handleCallBack(onResolved);
      });
    } else {
      setTimeout(() => {
        handleCallBack(onRejected);
      });
    }
  });
};

MyPromise.prototype.catch = function (onRejected) {
  return this.then(undifined, onRejected);
};

/**

Promise.resolve方法可以传三种值

不是promise
成功状态的promise
失败状态的promise

Promise.resolve(1)
Promise.resolve(Promise.resolve(1))
Promise.resolve(Promise.reject(1))

 */
MyPromise.resolve = function (value) {
  return new MyPromsie((resolved, reject) => {
    if (value instanceof Promise) {
      value.then(
        (value) => {
          resolved(value);
        },
        (reason) => {
          reject(reason);
        }
      );
    } else {
      resolved(value);
    }
  });
};

MyPromise.reject = function (reason) {
  return new Promise((resolved, reject) => {
    reject(reason);
  });
};

/**

Promise.all()

返回一个promise对象，只有当所有promise都成功时返回的promise状态才成功

两种结果：

1.遍历到有一个promise是reject状态，则直接返回的promise状态为rejected

2.遍历所有的promise的状态都为resolved,则返回的promise状态为resolved，并且还要每个promise产生的值传递下去

 */
MyPromise.all = function (promsies) {
  let values = new Array(promsies.length);
  let count = 0; // 记录成功的状态数量
  return new MyPromise((resolved, reject) => {
    promsies.forEach((p, index) => {
      MyPromise.resolved(p).then(
        (value) => {
          values[index] = value;
          count++;
          if (count === promsies.length) {
            resolved(values);
          }
        },
        (reason) => {
          reject(reason);
        }
      );
    });
  });
};

/**

promise.race()
返回一个promise对象，状态由第一个完成的promise决定
 */

MyPromise.race = function (promsies) {
  return new MyPromise((resolved, reject) => {
    promsies.forEach((p) => {
      MyPromise.resolve(p).then(
        (value) => {
          resolved(value);
        },
        (reason) => {
          reject(value);
        }
      );
    });
  });
};

// promise相关的封装

// 1、图片异步加载

function loadImg(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = function () {
      resolve(img);
    };
    img.onError = function () {
      reject(new Error('url not found!'));
    };
    img.src = url;
  });
}

// promise顺序执行

const time = (timer) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, timer);
  });
};

const ajax1 = () =>
  time(2000).then(() => {
    console.log(1);
    return 1;
  });

const ajax2 = () =>
  time(1000).then(() => {
    console.log(2);
    return 2;
  });

const ajax3 = () =>
  time(1000).then(() => {
    console.log(3);
    return 3;
  });

function mergePromise(ajaxArr) {
  const data = [];
  let promise = Promise.resolve();
  ajaxArr.forEach((ajax) => {
    promise = promise.then(ajax).then((res) => {
      data.push(res);
      return data;
    });
  });
  return promise;
}

mergePromise([ajax1, ajax2, ajax3]).then((data) => {
  console.log('done');
  console.log(data); // data 为 [1, 2, 3]
});

// 要求分别输出
// 1
// 2
// 3
// done
// [1, 2, 3]

// 3.限制异步操作的并发个数并尽可能快的完成全部

function limitLoad(urls, handler, limit) {
  let sequence = [].concat(urls); // 复制urls
  // 这一步是为了初始化 promises 这个"容器"
  let promises = sequence.splice(0, limit).map((url, index) => {
    return handler(url).then(() => {
      // 返回下标是为了知道数组中是哪一项最先完成
      return index;
    });
  });
  // 注意这里要将整个变量过程返回，这样得到的就是一个Promise，可以在外面链式调用
  return sequence
    .reduce((pCollect, url) => {
      return pCollect
        .then(() => {
          returnPromise.race(promises); // 返回已经完成的下标
        })
        .then((fastestIndex) => {
          // 获取到已经完成的下标
          // 将"容器"内已经完成的那一项替换
          promises[fastestIndex] = handler(url).then(() => {
            return fastestIndex; // 要继续将这个下标返回，以便下一次变量
          });
        })
        .catch((err) => {
          console.error(err);
        });
    }, Promise.resolve()) // 初始化传入
    .then(() => {
      // 最后三个用.all来调用
      returnPromise.all(promises);
    });
}

var urls = [
  'https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/AboutMe-painting1.png',
  'https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/AboutMe-painting2.png',
  'https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/AboutMe-painting3.png',
  'https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/AboutMe-painting4.png',
  'https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/AboutMe-painting5.png',
  'https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/bpmn6.png',
  'https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/bpmn7.png',
  'https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/bpmn8.png',
];

function loadImg(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = function () {
      console.log('一张图片加载完成');
      resolve(img);
    };
    img.onerror = function () {
      reject(newError('Could not load image at' + url));
    };
    img.src = url;
  });
}

limitLoad(urls, loadImg, 3).then((res) => {
  console.log(res); // 最终得到的是长度为8的img数组: [img, img, img, ...]
  res.forEach((img) => {
    document.body.appendChild(img);
  });
});
