/*
 * @Author: xiumubai 1547702880@qq.com
 * @Date: 2022-05-28 14:28:26
 * @LastEditors: 1547702880@qq.com
 * @LastEditTime: 2022-06-15 16:55:07
 * @FilePath: /event-emiter/lib/EventEmiter.js
 * @Description: EventEmiter
 */

/**
 * @description: EventEmiter
 * @return {*}
 */
function EventEmiter() {
  this.listeners = {};
  this.maxListener = 10;
}

/**
 * listeners用于存放事件监听器函数
{
  "event1": [f1,f2,f3]，
  "event2": [f4,f5]，
  ...
}
 */

/**

通过Array.prototype.slice.call(arguments)取出方法的参数列表args，（因为考虑简单性和兼容性所以采用ES5的冗长编码方式）
调用args.shift踢掉数组第一个参数即event，留下来的这些是要传给监听器的
遍历监听器,通过apply方法把上面得到的args参数传进去
当触发emit的时候，就会调用对应的on事件
 */

EventEmiter.prototype.emit = function (event) {
  var args = Array.prototype.slice.call(arguments);
  args.shift();
  this.listeners[event].forEach((cb) => {
    cb.apply(null, args);
  });
};

/**
 * 
判断该事件的监听器数量是否已超限，超限则报警告
判断该事件监听器数组是否初始化，若未初始化，则将listeners[event]初始化为数组，并加入监听器cb
若监听器数组已经被初始化，则判断数组中是否已存在cb,不存在则添加，已存在则不做操作。
指定addListener等于on方法
 */

/**
 * @description: on方法
 * @return {*}
 */

EventEmiter.prototype.on = function (event, cb) {
  var listeners = this.listeners;
  if (listeners[event] && listeners[event].length >= this.maxListener) {
    throw console.error(`监听的最大数量是${this.maxListener}, 您已经超出限制`);
  }
  if (listeners[event] instanceof Array) {
    if (listeners[event].indexOf(cb) === -1) {
      listeners[event].push(cb);
    }
  } else {
    listeners[event] = [].concat(cb);
  }
};

EventEmitter.prototype.addListener = EventEmitter.prototype.on;

/**
 * removeListener
 
通过indexOf确定监听器回调在数组listeners[event]中的位置
通过splice(i,1)删除之
 */

EventEmiter.prototype.removeListener = function (event, cb) {
  var listeners = this.listeners;
  var eventList = listeners[event] || [];
  var i = eventList.indexOf(cb);
  if (i >= 0) {
    listeners[event].splice(i, 1);
  }
};

/**
 * once方法
 once方法是on方法和removeListener方法的结合：用on方法监听，在回调结束的最后位置，通过removeListener删掉监听函数自身
 */

EventEmiter.prototype.once = function (event, cb) {
  var self = this;
  function fn() {
    var args = Array.prototype.slice.call(arguments);
    cb.apply(null, args);
    self.removeListener(event, fn);
  }
  this.on(event, fn);
};

EventEmiter.prototype.removeAllListener = function (event) {
  this.listeners[event] = [];
};

EventEmiter.prototype.listeners = function (event) {
  return this.listeners[event];
};

EventEmiter.prototype.setMaxListeners = function (num) {
  this.maxListener = num;
};

export default EventEmiter;
