// 观察者模式

function Subject() {
  this.observers = [];
}

Subject.prototype = {
  add(oberver) {
    this.observers.push(oberver);
  },
  notify() {
    var observers = this.observers;
    for (let i = 0; i < this.observers.length; i++) {
      observers[i].update();
    }
  },
  remove(oberver) {
    var observers = this.observers;
    for (let i = 0; i < this.observers.length; i++) {
      if (oberver === observers[i]) {
        observers.splice(i, 1);
      }
    }
  },
};

function Observer(name) {
  this.name = name;
}

Observer.prototype.update = function () {
  console.log('my name is' + this.name);
};

var sub = new Subject();

var obs1 = new Observer('name1');
var obs2 = new Observer('name2');

sub.add(obs1);
sub.add(obs2);

sub.notify();
// my name isname1
// my name isname2

sub.remove(obs2);

sub.notify();
// my name isname1
