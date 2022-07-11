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

```js
{
  automaticNamePrefix: "",
  minChunks: 2,
  priority: -20,
  reuseExistingChunk: true
}

```

- minChunks，用于筛选缓存组中的 chunks 组合，也就是说只有 chunks 组合元素个数 >=2，该组合的公共模块子集才会被分离打包
- priority 决定了缓存组的优先级（应用次序），被优先级高的缓存组分离打包的模块不会再次被优先级低的缓存组处理，同一缓存组中的不同模块子集（不同 chunks 组合的公共模块子集）的优先级首先依据模块子集所对应的 chunk 组合的元素个数（数量大的优先处理），其次依据模块子集的所有模块总大小（size 大的优先处理），再次依据模块子集的模块数（数量大的优先处理）
- reuseExistingChunk 定义了在一种特定场景下的处理方式，如果需要打包的模块子集与与之对应的 chunk 组合中的某一个 chunk 所包含的模块集合相同，那么该模块子集就不会被重新打包

```js
{
  automaticNamePrefix: "vendors",
  priority: -10,
  test: /[\\/]node_modules[\\/]/
}

```

- automaticNamePrefix 定义了打包模块子集 chunk 的名称前缀，chunk 的名称默认由该前缀，模块子集对应的 chunk 组合中各个 chunk 的名称，加上分隔符（automaticNameDelimiter）拼接而成
- priority 定义了该缓存组配置的优先级高于默认缓存组, 因此会先于默认缓存组被处理
- test 接受函数（module => true | false）、布尔（true | false）、字符串（前缀匹配）或正则表达式（匹配模块名称或包含该模块的 chunk 名称），用于定义缓存组的模块集合

因此 vendors 缓存组用于定义分离打包所有 node_modules 模块，由于 node_modules 模块一般更新不频繁，因此该配置可以有效提高应用的缓存使用率

在对 vendors 缓存组处理完之后，默认缓存组模块集合中的 node_modules 模块就已经被移除了，剩下的模块按照默认缓存组的配置被分离打包
