---
title: 提交规范
order: 2
---

#### 通用规范：

```
(<scope>): <subject> + <(note|issue|feature),可选>
// 空一行
<body>
```

**要点：**

1. scope 是模块名称
2. subject 是 commit 简短描述,是标题,使用小写字母,不超过 50 个字符,末尾不带句号
3. 用英式英语提交（推荐使用 Google 翻译润色）
4. body 是可选的, 功能复杂的提交记录可以在 body 中进行详细阐述
5. subject 末尾可以添加括号包含说明注释、关联的 issue、关联的 feature 等

**常用的提交类型:**

```
	fixed xxxx
	updated xxxx
	added xxxx
	changed xxxx
	removed xxxx
```

**常用的模块名称：**

```
	(all)     所有模块(对NEWS、README的更改也可以放到all中，取决于工程源码结构)
	(doc)     文档相关的模块
	(core)    核心服务
	(build)   工程编译模块
	(rpm)     CentOS/RHEL打包模块
	(deb)	  Ubuntu/Debian平台打包模块
	(meta)	  metaserver模块
	(chunk)	  chunkserver模块
	(client)  client模块
```

对源码模块的具体类别，由研发成员内部达成共识。

#### 举例

**Normal**:

```
(all): version 4.0.0
(all): updated README files
(doc): added man pages
(client): fixed io error while reading data
(chunk): changed scheduling algorithm
(build): updated make files
(client): fixed typo
```

**With issue:**

```
(client+master): fixed handling keepcache and direct flags (issue #374)
```

**With note:**

```
(client): fixed oom killer disabling (setting oom_adj and oom_score_adj)
```

**With feature:**

```
(client): added flag to allow unmounting network drive from explorer (feature #875)
```

**With body:**

```
(client): don't download Doxygen if in cache

	This makes actually use of the cache. Also run 7z non-interactively,
	so any prompts (like for overwriting files) cannot hang the build.
```
