# [0.0.3](https://github.com/wc19950724/vue3-base-cli/compare/v0.0.2...v0.0.3) (2023-4-24)

### Features

- **version:** update version to v0.0.3
- **settings:** files.exclude: ".vscode", "\*.lock", "node_modules", "LICENSE", ".github"

# [0.0.2](https://github.com/wc19950724/vue3-base-cli/compare/v0.0.1...v0.0.2) (2023-4-24)

### Doc

- **version:** update version to v0.0.2

# [0.0.1](https://github.com/wc19950724/vue3-base/compare/master...v0.0.1) (2023-4-24)

## 技术栈

Vue3 + pinia + tdesign

## 文件夹/文件命名规范

目录的命名规范

1. 目录名全部使用小写,`kebab-case`形式命名,如果需要有多个单词表达,使用中划线连接。如`new-page`、`components`。

文件的命名规范

1. 文件名全部使用小写,`kebab-case`形式命名。如`td-layout.tsx`、 `td-header.tsx`。

## 开发约定

### script

使用 setup 语法糖。

### style

切记不要随意修改或影响全局样式

## 开发分支管理

develop 作为开发主分支，各开发人员自行基于 develop 检出新分支，命名规范为: dev-\*\*\*

## 运行

```bash
# 项目根目录
yarn install
yarn start
```
