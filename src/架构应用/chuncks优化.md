<!--
 * @Author: 朽木白
 * @Date: 2022-07-08 23:52:59
 * @LastEditors: 1547702880@qq.com
 * @LastEditTime: 2022-07-09 00:08:05
 * @Description:
-->

https://blog.csdn.net/u013468030/article/details/115456420

## 为什么要进行 Chunks 优化

页面 a 和页面 b 都引用了组件 b，并被同时打包进了页面 a 和 页面 b 的 chunks(1.js 和 2.js) 中，很明显我们打包了重复的模块，该打包模式至少有两个问题：

- 重复模块增大了 chunks 的体积，不仅浪费了用户流量，也降低了首屏速度
- 模块更新会导致包含它的所有 chunks 缓存都失效，如果发版比较频繁，缓存利用率会很低，严重影响首屏速度

## SplitChunkPlugin 插件对 chunks 进行优化

公共组件 b 从页面 a 和 b 的 chunks(1.js 和 3.js) 中抽离出来了，构成了一个单独的 chunk(2.js)，这样就解决了上面两个问题，从而提高了首屏速度

## 如何进行 Chunks 优化

极限去重定义：最终生成的任意一个 chunk 所包含的模块仅在该 chunk 中，也就是说，任意两个 chunk 都不包含相同的模块

为什么不能极限去重：在 HTTP/1.1 协议下，浏览器每个域名下的并发连接数是有限制（多少个）的，如果这些 chunks 都是 initial chunks（初始加载 chunks），那么这些细碎的 chunks 的加载可能会拖慢首屏速度（在 HTTP/2 协议下，这个问题就不存在了）

### SplitChunkPlugin

将部分 chunks 合并成单一 chunks，使得最终的 chunks 数量不超过浏览器的连接数限制
