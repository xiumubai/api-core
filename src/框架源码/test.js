/*
 * @Author: 朽木白
 * @Date: 2022-07-12 11:38:43
 * @LastEditors: 1547702880@qq.com
 * @LastEditTime: 2022-08-05 19:38:42
 * @Description: 
 */
let num =1
console.log(num++)

console.log(num)
console.log(++num)
console.log(num)
console.log(++1)

'a' - 1
'a' + 1



null == undefined
true
typeof NaN
'number'
typeof Object
'function'
typeof Function
'function'
typeof {}
'object'



console.log('1')

setTimeout(() => {
  console.log('2')
  Promise.resolve().then(() => {
    console.log(3)
  })
})

new Promise((resolve, reject) => {
  console.log(4)
  resolve(5)
}).then((data => {
  console.log(data);
  
}))

setTimeout(() => {
  console.log('6');
  
})

console.log('7');


// write something 
// api