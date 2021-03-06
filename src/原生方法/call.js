Function.prototype.myCall = function (context) {
  if (typeof context !== 'function') {
    console.error('error');
  }

  let args = [...arguments].slice(1);
  let result = null;

  context = context || window;

  context.fn = this;
  result = context.fn(...args);

  delete context.fn;
  return result;
};
