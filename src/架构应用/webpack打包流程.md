## webpack 打包过程

https://zhuanlan.zhihu.com/p/400015634
代码头部首先引入 webpack 和配置文件参数 options,通过执行 webpack(options)即可生成 compiler 对象,再执行对象的 run 方法就能开始启动代码编译.

```js
const webpack = require('webpack');
const options = require('../webpack.config.js');

const compiler = webpack(options);
compiler.run(); // 启动代码编译
```

当 compiler 执行 make 阶段时,标志着代码的编译工作正式开始,这时候会创建 compilation 对象完成相关任务.

compilation 对象它会依次执行它定义的一系列钩子函数,像代码的编译、依赖分析、优化、封装正是在这个阶段完成的.

compilation 会依次执行 3 个钩子,它会先触发 buildModule 阶段定义的钩子,此时 compilation 实例依次进入每一个入口文件(entry),加载相应的 loader 对代码编译.

代码编译完成后,再将编译好的文件内容调用 acorn 解析生成 AST 语法树,按照此方法继续递归、重复执行该过程.

所有模块和和依赖分析完成后,compilation 进入 seal 阶段,对每个 chunk 进行整理,接下来进入 optimize 阶段,开启代码的优化和封装.

我们编写的 plugin 就是在上面这些不同的时间节点里绑定一个事件监听函数,等到 webpack 执行到那里便触发函数.

等到代码的编译工作结束后,主线程又回到了 compiler,继续往下执行 emit 钩子.

entryOption:webpack 开始读取配置文件的 Entries,递归遍历所有的入口文件.
run: 程序即将进入构建环节

compile: 程序即将创建 compilation 实例对象

make:compilation 实例启动对代码的编译和构建

buildModule: 在模块构建开始之前触发,这个钩子下可以用来修改模块的参数
seal: 构建工作完成了,compilation 对象停止接收新的模块时触发
optimize: 优化阶段开始时触发

emit: 所有打包生成的文件内容已经在内存中按照相应的数据结构处理完毕,下一步会将文件内容输出到文件系统,emit 钩子会在生成文件之前执行(通常想操作打包后的文件可以在 emit 阶段编写 plugin 实现).
done: 编译后的文件已经输出到目标目录,整体代码的构建工作结束时触发

## plugin

webpack 基于插件的架构体系.我们编写的 plugin 就是在上面这些不同的时间节点里绑定一个事件监听函数,等到 webpack 执行到那里便触发函数.

webpack 中的 compiler 和 compilation 都继承了 Tapable,因此 compiler 和 compilation 才具备了事件绑定和触发事件的能力.

plugin 本质上是一个对外导出的 class，类中包含一个固定方法名 apply.

apply 函数的第一个参数就是 compiler,我们编写的插件逻辑就是在 apply 函数下面进行编写.

既然程序中已经获取了 compiler 参数,理论上我们就可以在 compiler 的各个钩子函数中绑定监听事件.比如下面代码会在 emit 阶段绑定一个监听事件.

主程序一旦执行到 emit 阶段,绑定的回调函数就会触发.主程序处于 emit 阶段时,compilation 已经将代码编译构建完了,下一步会将内容输出到文件系统.

此时 compilation.assets 存放着即将输出到文件系统的内容,如果这时候我们操作 compilation.assets 数据,势必会影响最终打包的结果.
