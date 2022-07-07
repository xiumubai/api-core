/*
 * @Author: 朽木白
 * @Date: 2022-07-07 17:47:22
 * @LastEditors: 1547702880@qq.com
 * @LastEditTime: 2022-07-07 18:03:03
 * @Description:
 */

// （1）typeof
console.log(typeof 2); // number
console.log(typeof true); // boolean
console.log(typeof 'str'); // string
console.log(typeof []); // object
console.log(typeof function () {}); // function
console.log(typeof {}); // object
console.log(typeof undefined); // undefined
console.log(typeof null); // object

// 其中数组、对象、null都会被判断为object，其他判断都正确。

// （2）instanceof

// instanceof可以正确判断对象的类型，其内部运行机制是判断在其原型链中能否找到该类型的原型。

console.log(2 instanceof Number); // false
console.log(true instanceof Boolean); // false
console.log('str' instanceof String); // false

console.log([] instanceof Array); // true
console.log(function () {} instanceof Function); // true
console.log({} instanceof Object); // true

// 可以看到，instanceof只能正确判断引用数据类型，而不能判断基本数据类型。instanceof 运算符可以用来测试一个对象在其原型链中是否存在一个构造函数的 prototype 属性。

// 3） constructor

console.log((2).constructor === Number); // true
console.log(true.constructor === Boolean); // true
console.log('str'.constructor === String); // true
console.log([].constructor === Array); // true
console.log(function () {}.constructor === Function); // true
console.log({}.constructor === Object); // true

// constructor有两个作用，一是判断数据的类型，二是对象实例通过 constructor 对象访问它的构造函数。需要注意，如果创建一个对象来改变它的原型，constructor就不能用来判断数据类型了：

function Fn() {}

Fn.prototype = new Array();

var f = new Fn();

console.log(f.constructor === Fn); // false
console.log(f.constructor === Array); // true

// （4）Object.prototype.toString.call()

// Object.prototype.toString.call() 使用 Object 对象的原型方法 toString 来判断数据类型：

var a = Object.prototype.toString;

console.log(a.call(2));
console.log(a.call(true));
console.log(a.call('str'));
console.log(a.call([]));
console.log(a.call(function () {}));
console.log(a.call({}));
console.log(a.call(undefined));
console.log(a.call(null));

// > "[object Number]"
// > "[object Boolean]"
// > "[object String]"
// > "[object Array]"
// > "[object Function]"
// > "[object Object]"
// > "[object Undefined]"
// > "[object Null]"
