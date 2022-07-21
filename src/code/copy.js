/*
 * @Author: 朽木白
 * @Date: 2022-07-19 17:17:06
 * @LastEditors: 1547702880@qq.com
 * @LastEditTime: 2022-07-21 21:14:10
 * @Description:
 */
/** 可继续遍历的数据类型 */
const mapTag = '[object Map]';
const setTag = '[object Set]';
const arrayTag = '[object Array]';
const objectTag = '[object Object]';
const argsTag = '[object Arguments]';
/** 不可继续遍历的数据类型 */
const boolTag = '[object Boolean]';
const dateTag = '[object Date]';
const errorTag = '[object Error]';
const numberTag = '[object Number]';
const regexpTag = '[object RegExp]';
const stringTag = '[object String]';
const symbolTag = '[object Symbol]';
const funcTag = '[object Function]';

const deepTag = [mapTag, setTag, arrayTag, objectTag, argsTag];

/**
 * @description: 使用while模拟forEach函数
 * @param {*} array
 * @param {*} iteratee
 * @return {*}
 */
function forEach(array, iteratee) {
  let index = -1;
  const length = array.length;
  while (++index < length) {
    iteratee(array[index], index);
  }
  return array;
}

/**
 * @description: 判断是否为引用类型
 * @param {*} target
 * @return {*}
 */
function isObject(target) {
  const type = typeof target;
  return target !== null && (type === 'object' || type === 'function');
}

/**
 * @description: 获取数据类型
 * @param {*} target
 * @return {*}
 */
function getType(target) {
  return Object.prototype.toString.call(target);
}

/**
 * @description: 初始化被克隆的对象，保证原型被复制
 * @param {*} target
 * @return {*}
 */
function getInit(target) {
  const Ctor = target.constructor;
  return new Ctor();
}

/**
 * @description: 克隆Symbol类型
 * @param {*} target
 * @return {*}
 */
function cloneSymbol(target) {
  return Object(Symbol.prototype.valueOf.call(target));
}

/**
 * @description: 克隆正则
 * @param {*} target
 * @return {*}
 */
function cloneReg(target) {
  const reFlags = /\w*$/;
  const result = new target.constructor(target.source, reFlags.exec(target));
  result.lastIndex = target.lastIndex;
  return result;
}

/**
 * @description: 克隆函数部分功能拆分，用于区分普通函数和箭头函数
 * @param {*} func
 * @return {*}
 */
function cloneFunction(func) {
  const bodyReg = /(?<={)(.|\n)+(?=})/m;
  const paramReg = /(?<=\().+(?=\)\s+{)/;
  const funcString = func.toString();
  if (func.prototype) {
    const param = paramReg.exec(funcString);
    const body = bodyReg.exec(funcString);
    if (body) {
      // console.log('匹配到函数体：', body[0]);
      if (param) {
        const paramArr = param[0].split(',');
        // console.log('匹配到参数：', paramArr);
        return new Function(...paramArr, body[0]);
      } else {
        return new Function(body[0]);
      }
    } else {
      return null;
    }
  } else {
    return eval(funcString);
  }
}

/**
 * @description: 克隆不可遍历的数据类型
 * @param {*} target
 * @param {*} type
 * @return {*}
 */
function cloneOtherType(target, type) {
  const Ctor = target.constructor;
  switch (type) {
    case boolTag:
    case numberTag:
    case stringTag:
    case errorTag:
    case dateTag:
      return new Ctor(target);
    case regexpTag:
      return cloneReg(target);
    case symbolTag:
      return cloneSymbol(target);
    case funcTag:
      return cloneFunction(target);
    default:
      return null;
  }
}

/**
 * @description: 成型的克隆函数
 * @param {*} target
 * @param {*} map
 * @return {*}
 */
function clone(target, map = new WeakMap()) {
  // 克隆原始类型
  if (!isObject(target)) {
    return target;
  }

  // 根据不同的数据类型进行克隆操作
  const type = getType(target);
  let cloneTarget;
  if (deepTag.includes(type)) {
    cloneTarget = getInit(target, type);
  } else {
    return cloneOtherType(target, type);
  }

  // 防止循环引用
  if (map.get(target)) {
    return map.get(target);
  }
  map.set(target, cloneTarget);

  // 克隆set
  if (type === setTag) {
    target.forEach((value) => {
      cloneTarget.add(clone(value, map));
    });
    return cloneTarget;
  }

  // 克隆map
  if (type === mapTag) {
    target.forEach((value, key) => {
      cloneTarget.set(key, clone(value, map));
    });
    return cloneTarget;
  }

  // 克隆对象和数组
  const keys = type === arrayTag ? undefined : Object.keys(target);
  forEach(keys || target, (value, key) => {
    if (keys) {
      key = value;
    }
    cloneTarget[key] = clone(target[key], map);
  });

  return cloneTarget;
}

// 测试用例

const map = new Map();
map.set('key', 'value');
map.set('ConardLi', 'code秘密花园');

const set = new Set();
set.add('ConardLi');
set.add('code秘密花园');

const target = {
  field1: 1,
  field2: undefined,
  field3: {
    child: 'child',
  },
  field4: [2, 4, 8],
  empty: null,
  map,
  set,
  bool: new Boolean(true),
  num: new Number(2),
  str: new String(2),
  symbol: Object(Symbol(1)),
  date: new Date(),
  reg: /\d+/,
  error: new Error(),
  func1: () => {
    console.log('code秘密花园');
  },
  func2: function (a, b) {
    return a + b;
  },
};

const result = clone(target);
console.log(result);
