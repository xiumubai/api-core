<!--
 * @Author: 朽木白
 * @Date: 2022-06-08 15:51:08
 * @LastEditors: 1547702880@qq.com
 * @LastEditTime: 2022-06-08 16:26:30
 * @Description:
-->

# preitter + eslint

## preitter

1. 安装

```
npm install --save-dev --save-exact prettier
// or
yarn add --dev --exact prettier
```

2. 创建一个空配置文件，让编辑器和其他工具知道你正在使用 Prettier：

`echo {}> .prettierrc.json`

添加内容

```json
{ "singleQuote": true }
```

3. 创建一个.prettierignore[3]文件，让 Prettier CLI 和编辑器知道哪些文件不能格式化，example：

```
# Ignore artifacts:
dist
build
.husky
```

4. 配置编辑器（VScode 为例）

IDE 中安装 Prettier-Code Formater[4] 插件：
找到 IDE 中设置模块，搜索 format On Save，勾上这个就可以了。

在 test.js 当中添加

`const test = "test";`

现在当我们 Ctrl + S 保存代码时，插件就会帮助我们自动格式化了

## 代码规范之 JS/TS 规范

1. 安装依赖

```
npm install eslint --save-dev
// or
yarn add eslint --dev
```

## 代码规范之 JS/TS 规范

1. 安装依赖

```
npm install eslint --save-dev
// or
yarn add eslint --dev
```

2. 生成配置文件

```
npm init @eslint/config
// or
yarn create @eslint/config
```

3. 配置命令

有了具体的规范后，我们同样需要使用工具去约束：还是通过在 git commit 阶段校验，若不通过则取消提交。

```
 "lint-staged": {
    "src/*": "eslint --ext .js,.ts,.tsx"
  },
```
