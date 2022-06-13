# husky-Commitlint

husky7.0.1 + commitlint 配置提交代码检查和规范模板

## husky 安装

1、项目内安装
`npm i lint-staged husky -save-dev `
2、创建.husky/目录并指定该目录为 git hooks 所在的目录

```
{
  "scripts": {
      "prepare": "husky install"
  }
}

```

3、添加 git hooks

`npx husky add .husky/pre-commit "npm run lint"`

4、规范 commit message 信息

`npx husky add .husky/commit-msg 'npx --no-install commitlint --edit "$1"' `

## husky 使用

随便 commit 一下

`git commit -m "feat: pre-commit优化"`

报错信息如下：

```
npm ERR! Missing script: "lint"
npm ERR!
npm ERR! Did you mean this?
npm ERR!     npm link # Symlink a package folder
npm ERR!
npm ERR! To see a list of scripts, run:
npm ERR!   npm run

npm ERR! A complete log of this run can be found in:
npm ERR!     /Users/janney/.npm/_logs/2022-06-08T05_34_04_938Z-debug-0.log
husky - pre-commit hook exited with code 1 (error)
```

## commitlint 安装与配置

`npm i @commitlint/cli @commitlint/config-conventional -D`

到目前为止我们还没有配置 `npm run lint` 这个命令，所以 commit 的时候回报错

在 pre-commit 文件中把`npm run lint`注释了就可以了。

现在我们按照 commit 的规范来提交，就可以成功的提交代码了

## 定制自己的校验规范

现在我想提交个这样的 commit

`git commit -m 'xiumu: 解决报错问题'`

给我提示报错信息

```
> git -c user.useConfigOnly=true commit --quiet --allow-empty-message --file -
⧗   input: xiumu: 解决报错问题
✖   type must be one of [build, chore, ci, docs, feat, fix, perf, refactor, revert, style, test] [type-enum]
```

可以看出，`doc`这个`type`在 commitlint 的规范中不存在，所以我们需要进行自定义。

### 第一步：定制 Commitizen 适配器

首先，安装 cz-customizable，它是一个第三方适配器，提供了灵活的配置项。

`npm install --save-dev cz-customizable`

然后，在 package.json 中配置 config.commitizen.path，把 cz-customizable 作为 Commitizen 的插件使用。

```
{
  ...
  "config": {
    "commitizen": {
      "path": "node_modules/cz-customizable"
    }
  }
}
```

接着在项目目录下添加.cz-config.js 文件，作为配置文件。这里我们希望添加一个新的 type 选项 wip，含义是"Work in progress"。所以添加以下配置：

```
module.exports = {
  types: [
    { value: 'feat', name: 'feat: A new feature' },
    { value: 'fix', name: 'fix: A bug fix' },
    { value: 'docs', name: 'docs: Documentation only changes' },
    {
      value: 'style',
      name: 'style: Changes that do not affect the meaning of the code\n(white-space, formatting, missing semi-colons, etc)',
    },
    {
      value: 'refactor',
      name: 'refactor: A code change that neither fixes a bug nor adds a feature',
    },
    {
      value: 'perf',
      name: 'perf: A code change that improves performance',
    },
    { value: 'test', name: 'test: Adding missing tests' },
    {
      value: 'chore',
      name: 'chore: Changes to the build process or auxiliary tools\nand libraries such as documentation generation',
    },
    { value: 'revert', name: 'revert: Revert to a commit' },
    { value: 'xiumu', name: 'xiumu: Work in progress' },
  ],
};
```

### 第二步：定制 Commitlint 校验规则

完成第一步，我们现在可以使用 Commitizen 写出 type 为 xiumu 的 commit message 了。但是，提交时会发现 Commitlint 校验不通过：

这是因为 Commitlint 对 type 的枚举值有所限制。我们还要更新 Commitlint 中关于 type 枚举值的校验规则。定制规范中的其他配置项时也要注意同步更新 Commitlint 的校验配置。
更新.commitlint.config.js 中的配置，主要是更新 type-enum 的规则：

```js
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'build',
        'chore',
        'ci',
        'docs',
        'feat',
        'fix',
        'perf',
        'refactor',
        'revert',
        'style',
        'test',
        'xiumu',
      ],
    ],
  },
};
```

至此，关于 husky 相关的配置到此结束。
