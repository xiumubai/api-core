// 发布订阅模式
//ttps://juejin.cn/post/6844903686737494030#heading-1

class Publishser {
  constructor() {
    this.list = {};
  }
  publish() {
    const args = arguments;
    const key = Array.prototype.shift.call(args);
    const fns = this.list[key];
    if (!fns) {
      return false;
    }

    for (let i = 0; i < fns.length; i++) {
      fns[i].apply(this, args);
    }
  }
  subScriber(key, fn) {
    if (!this.list[key]) {
      this.list[key] = [];
    }
    this.list[key].push(fn);
  }
  unSubScriber(key) {
    delete this.list[key];
  }
}

let pubSub = new Publishser();
pubSub.subScriber('name', (name) => {
  console.log(name);
});

pubSub.subScriber('sex', (sex) => {
  console.log(sex);
});

pubSub.publish('name', 'ttsy1');
pubSub.publish('sex', 'male');

pubSub.unSubscribe('name');
