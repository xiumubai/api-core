/*
 * @Author: 朽木白
 * @Date: 2022-06-22 12:09:06
 * @LastEditors: 1547702880@qq.com
 * @LastEditTime: 2022-06-22 17:10:35
 * @Description:vue2响应式
 */

function defieneReactive(obj, key, val) {
  const dep = new Dep();
  Object.defineProperty(obj, key, {
    get: function reactiveGetter() {
      if (Dep.target) {
        dep.depend();
      }
      return val;
    },
  });
}

class Dep {
  static target;
  subs;

  constructor() {
    this.subs = [];
  }
  addSub(sub) {
    this.subs.push(sub);
  }
  removeSub(sub) {
    remove(this.sub, sub);
  }
  depend() {
    if (Dep.target) {
      Dep.target.addDep(this);
    }
  }
  notify() {
    const subs = this.subds.slice();
    for (let i = 0; i < subs.length; i++) {
      subs[i].update();
    }
  }
}
class Watcher {
  getter;
  constructor(vm, expression) {
    this.getter = expression;
    this.get();
  }
  get() {
    pushTarget(this);
    value = this.getter.call(vm, vm);
    return value;
  }
  addDep(dep) {
    dep.addSub(this);
  }
}
function pushTarget(_target) {
  Dep.target = _target;
}
updateComponent = () => {
  vm._update(vm._render());
};
new Watcher(vm, updateComponent);
