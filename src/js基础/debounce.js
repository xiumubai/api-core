//所谓防抖，就是指触发事件后 n 秒后才执行函数，如果在 n 秒内又触发了事件，则会重新计算函数执行时间
// https://juejin.cn/post/6844903669389885453

function debounce(fn, wait) {
  let timer = null;

  return function () {
    let context = this;
    let args = arguments;
    console.log(args);
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }

    timer = setTimeout(function () {
      fn.apply(context, args);
    }, wait);
  };
}

function ajax(name) {
  console.log(name);
}
debounce(ajax('janney'), 1000);
