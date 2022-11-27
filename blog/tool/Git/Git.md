---
title: Git版本管理
date: 2018-06-27
category:
  - 工具
tag:
  - git
---

**Git** 是目前世界上最先进的分布式版本控制系统

<!-- more -->

# Git 版本管理工具

**简介：**

**Linus Torvalds** 为了帮助管理 **Linux** 内核开发而花了两周时间用 **C** 写了一个最流行的分布式版本控制系统，**2008** 年 **GitHub** 网站上线

|        | 集中式版本控制系统(SVN)          | 分布式版本控制系统                                                               |
| ------ | -------------------------------- | -------------------------------------------------------------------------------- |
| 安全性 | 中央服务器宕机，所有人都没法干活 | 每人机器都有份完整的版本库，其中一个人的没了，从团队其他人那里复制一份即可       |
| 环境   | 必须联网才能工作                 | 可本地工作，不需要考虑远程库的存在，有网络的时候，再把本地提交推送一下即完成同步 |

---

## 1. 使用安装

### 1.1 安装

**Window 下安装**

[下载 window 版的客户端](http://git-scm.com/download)，以管理员身份运行后，一直选择下一步安装即可，请注意，如果你不熟悉每个选项的意思，请保持默认的选项

::: tabs

@tab Ubuntu

```shell
apt-get install git
```

@tab CentOS

```shell
yum install git
```

@tab Fedora23

```shell
dnf install git
```

@tab Fedora22/21

```shell
yum install git
```

@tab SUSE/OPENSUSE

```shell
sudo zypper install git
```

@tab Mac OS X

```shell
brew install git	# 注:请自行解决环境变量以及Brew工具的问题
```

@tab  编译安装 

仅适合非  **Windows** 系统

 [选取一个版本下载](https://github.com/git/git/releases)，解压缩后进入到 Git 的目录然后依次执行以下代码:

```bash
make configure
./configure
make all
sudo make install
```

> **注意:** 如果遇上无法编译的问题，请自行通过搜索引擎来查找 Git 所需的依赖

@tab Pycharm

```shell
# setting-Version -> Control
```

::: 

如果以上一切正常，打开终端 输入 `git --version ` 应该会显示如下类似的信息

> Window 下请打开安装 `git` 时一并安装的 `bash`

```bash
git version 2.5.0
```

### **1.2 配置**

在新的系统上，我们一般都需要先配置下自己的 **Git** 工作环境。配置工作只需一次，以后升级时还会沿用现在的配置。当然，如果需要，你随时可以用相同的命令修改已有的配置。

**Git** 提供了一个叫做 `git config` 的工具（译注：实际是 git-config 命令，只不过可以通过 git 加一个名字来呼叫此命令。），专门用来配置或读取相应的工作环境变量。而正是由这些环境变量，决定了 Git 在各个环节的具体工作方式和行为。这些变量可以存放在以下三个不同的地方：

> - /etc/gitconfig 文件：系统中对所有用户都普遍适用的配置。若使用 git config 时用 --system 选项，读写的就是这个文件。
> - ~/.gitconfig 文件：用户目录下的配置文件只适用于该用户。若使用 git config 时用 --global 选项，读写的就是这个文件。
> - 当前仓库的 Git 目录中的配置文件（也就是工作目录中的 .git/config 文件）：这里的配置仅仅针对当前仓库有效。每一个级别的配置都会覆盖上层的相同配置，所以 .git/config 里的配置会覆盖 /etc/gitconfig 中的同名变量。

在 Windows 系统上，Git 会找寻用户主目录下的 .gitconfig 文件。主目录即 $HOME 变量指定的目录，一般都是 `C:\Documents and Settings\$USER`。此外，Git 还会尝试找寻 /etc/gitconfig 文件，只不过看当初 Git 装在什么目录，就以此作为根目录来定位。

#### **用户信息配置**

配置你个人的用户名称和电子邮件地址，这两条配置很重要，每次 `Git` 提交时都会引用这两条信息，说明是谁提交了更新，所以会随更新内容一起被永久纳入历史记录，配置命令如下：

```bash
git config --global user.name  "你的新的username"
git config --global user.email  "你的新的email"
```

> **注意: ** 如何 避免重复输入 用户名和密码：执行一下上述命令，然后 **再 pull 一次**，输入密码，之后就无需再次输入了

- `--global`：使用该选项，更改的配置文件就是位于你用户主目录下的那个，以后你所有的仓库都会默认使用其配置的用户信息。若要在某个特定的仓库中使用其他名字或者电邮，只要去掉 `--global` 选项重新配置即可，新的设定保存在当前仓库的 `.git/config` 文件里。

- 如果你是使用 `https` 进行仓库的推拉，你可能需要配置客户端记住密码，避免每次都输入密码

  ```bash
  git config --global credential.helper store
  ```

#### **文本编辑器配置**

接下来要设置的是默认使用的文本编辑器。**Git** 需要你输入一些额外消息的时候，会自动调用一个外部文本编辑器给你用。默认会使用操作系统指定的默认编辑器，一般可能会是 **Vi** 或者 **Vim**。如果你有其他偏好，比如 **Emacs** 的话，可以重新设置：

```bash
$ git config --global core.editor emacs
```

**差异分析工具：**
还有一个比较常用的是，在解决合并冲突时使用哪种差异分析工具。比如要改用 `vimdiff` 的话：

```bash
$ git config --global merge.tool vimdiff
```

**Git** 可以理解 `kdiff3`，`tkdiff`，`meld`，`xxdiff`，`emerge`，`vimdiff`，`gvimdiff`，`ecmerge`，和 `opendiff` 等合并工具的输出信息。当然，你也可以指定使用自己开发的工具

#### **查看配置信息**

要检查已有的配置信息，可以使用 `git config --list` 命令：

```bash
$ git config --list

# user.name=Scott Chacon
# user.email=schacon@gmail.com
# color.status=auto
# color.branch=auto
# color.interactive=auto
# color.diff=auto
# ...
```

有时候会看到重复的变量名，那就说明它们来自不同的配置文件（比如 `/etc/gitconfig` 和 `~/.gitconfig`），不过最终 **Git** 实际采用的是最后一个。

也可以直接查阅某个环境变量的设定，需把特定的名字跟在后面即可，像这样：

```bash
$ git config user.name
# Scott Chacon
```

#### 网络443

若使用是经常出现 **443** 等网络问题，可执行如下命令尝试

```shell
git config --global http.proxy http://127.0.0.1:1080
git config --global https.proxy https://127.0.0.1:1080
git config --global --unset http.proxy
git config --global --unset https.proxy

# 若写入/etc/hosts, 备份删除重试
```

### 1.3. 获取 Git 帮助

想了解 **Git** 的各式工具该怎么用，可以阅读它们的使用帮助，方法有三：

```bash
$ git help <verb>
$ git <verb> --help
$ man git-<verb>
```

比如，要学习 `config` 命令可以怎么用，运行：

```bash
$ git help config
```

### 1.4 创建一个版本库 - 步骤

1. `git init`

   > 瞬间 Git 就把仓库建好了，而且告诉你是一个空的仓库（empty Git repository），细心的读者可以发现当前目录下多了一个.git 的目录，这
   > 个目录是 Git 来跟踪管理版本库的，没事千万不要手动修改这个目录里面的文件，不然改乱了，就把 Git 仓库给破坏了。
   > 如果你没有看到.git 目录，那是因为这个目录默认是隐藏的，用 ls -ah 命令就可以看见。

2. `git add "file"`

   > 用命令 git add 告诉 Git，把文件添加到仓库
   > 执行上面的命令，没有任何显示，这就对了，Unix 的哲学是“没有消息就是好消息”，说明添加成功

3. `git commit -m "add..."`

   > 用命令 git commit 告诉 Git，把文件提交到仓库 -m 后面输入的是本次提交的说明，可以输入任意内容，当然最好是有意义的，这样就能从历史记录里方便地找到改动记录
   >
   > 为什么 Git 添加文件需要 add，commit 一共两步呢？因为 commit 可以一次提交很多文件，所以你可以多次 add 不同的文件。也就是说可以 add n 次并用一次
   > commit 来提交

4. `git status`

   > git status 命令可以让我们时刻掌握仓库当前的状态（查看是否提交等等）

5. `git diff "file"`

   > git diff 顾名思义就是查看 difference，显示的格式正是 Unix 通用的 diff 格式（查看对 file 的修改）

6. `git log`

   > git log 命令显示从最近到最远的提交日志,试试加上--pretty=oneline 参数.
   > 一大串类似 3628164...882e1e0 的是 commit id（版本号）,和 SVN 不一样，Git 的 commit id 不是 1，2，3……递增的数字，而是一个 SHA1 计算出来的
   > 一个非常大的数字，用十六进制表示。为什么 commit id 需要用这么一大串数字表示呢？因为 Git 是分布式的版本控制系统，后面我们还要研究多人在同
   > 一个版本库里工作，如果大家都用 1，2，3……作为版本号，那肯定就冲突了。
   >
   > Git 必须知道当前版本是哪个版本，在 Git 中，用 HEAD 表示当前版本，也就是最新的提交 3628164...882e1e0（注意我的提交 ID 和你的肯定不一样），上一
   > 个版本就是 HEAD^，上上一个版本就是 HEAD^^，当然往上 100 个版本写 100 个^比较容易数不过来，所以写成 HEAD~100。

7. `git reset --hard （id、HEAD^等等）`

   > git reset 命令，用于版本切换，可以指定版本的值任意回退
   > Git 的版本回退速度非常快，因为 Git 在内部有个指向当前版本的 HEAD 指针，当你回退版本的时候，Git 仅仅是把 HEAD 从指向指定的文件。然后顺便把工
   > 作区的文件更新了。所以你让 HEAD 指向哪个版本号，你就把当前版本定位在哪。
   >
   > git push origin HEAD --force 然后执行该命令进行版本回退
   >
   > 现在，你回退到了某个版本，关掉了电脑，第二天早上就后悔了，想恢复到新版本怎么办？找不到新版本的 commit id 怎么办？

8. `git reflog`

   > git reflog 用来记录你的每一次命令，找到显示上次回退版本的 commit id 是 XXXX，再进行回退，要重返未来，用 git reflog 查看命令历史，以便确
   > 定要回到未来的哪个版本。

9. `git revert`

   > 已经 push，对于已经把代码 push 到线上仓库,你回退本地代码其实也想同时回退线上代码,回滚到某个指定的版本,线上,线下代码保持一致.
   > 你要用到下面命令
   >
   > git revert 用一个新提交来消除一个历史提交所做的任何修改. git revert c011eb3c20ba6fb（刚提交的错误 push，执行后本地会回退）
   > revert 之后你的本地代码会回滚到指定的历史版本,这时你再 git push 就可以把线上的代码更新.

10. `git config --list`

    > 查看配置文件的各种设置，包括创建的别名等。

**工作区**：

- 红色标识，未执行 `git add xx` 前的部分，表示暂存
- 简单来说就说项目的所有未提交文件

**版本库：**

- 绿色标识，执行 `git add xx` 前的部分，表示待提交 `commit|加注释`

- 工作区有一个隐藏目录 `.git` ，这个不算工作区，而是 `Git` 的版本库。

  > Git 的版本库里存了很多东西，其中最重要的就是称为 stage（或者叫 index）的暂存
  > 区，还有 Git 为我们自动创建的第一个分支 master，以及指向 master 的一个指针叫 HEAD。

> 因此 第一步是用 git add 把文件添加进去，实际上就是把文件修改添加到暂存区；第二步是用 git commit 提交更改，实际上就是把暂存区的所有内容提交到
> 当前分支。一旦提交后，如果你又没有对工作区做任何修改，那么工作区就是“干净”的。现在提交后的暂存区就没有任何内容了。
>
> 当第一次修改 -> git add -> 第二次修改 -> git add -> git commit ，第二次修改是没有被提交的（如果不 add 到暂存区，那就不会加入到 commit 中）
>
> git diff HEAD -- "file"
>
> 提交后，用 git diff HEAD -- "file"命令可以查看工作区和版本库里面最新版本的区别：

---

## 2. 常用

### 2.1 撤销

- **撤销 改动:** `git checkout -- "file"`

  可以丢弃工作区的修改，总之，就是让这个文件回到最近一次 `git commit` 或 `git add `时的状态。

  > **注意：** 执行 `git checkout` 这个操作，文件的改动就没了！在 **不提交**、**没用的**、**准备删掉的代码** 等场景下使用

  ```bash
  git checkout -- <filename>	# 用版本库里的版本替换工作区的版本
  git checkout -- *	# 可以全删、快速还原之前版本
  git checkout .	# 同上，全删、快速还原之前版本
  ```

- **撤销 add：** `git restore --staged <file> | git reset HEAD "file"`

  恢复 `add` 操作将其置为未添加状态

  - `git reset HEAD file` 则是重置状态为上次 `pull` 下来的状态，是把暂存区的修改撤销掉（_unstage_），重新放回工作区

- **撤销 commit：**`git reset --hard commit id`

  当在错误的分支上提交了一个 `commit`，还没有 `push`，此时想还原

  1. 先 `git log` 找到这一次的 `commit id` 和上一次的 `id`
  2. 再 `git reset --hard` 这一次的 `commit id`
  3. 最后 `git reset` 上一次的 `commit id` 即可撤销 `commit` 并恢复。

- **改写 commit 内容：** `git commit --amend`

  针对于 `commit` 内容写错时使用

- **强制提交：** `git push --force`

  > **场景：**
  >
  > 1. 若发现 **回退中** 有某些步骤 不能重新推上分支
  >
  > 2. 当有 **错误分支被污染** 严重时
  >
  >    比如：第一次 `push` 错误，之后没有正确执行 `revert`，导致产生一系列污染提交

  **最终解决办法**：强推

  > **注意 !!** 这种操作**是不安全的**，一定要确保 本地的代码 绝对没有问题，同时不能覆盖他人代码

  ```bash
  git log # 找到最初想要提交的那一次的 commit id （提交的错误 push）
  git reset # 如上得到的 commit id，得到最初提交前的错误代码
  git push --force # 强推
  
  # reset之后，修改代码。然后正常 add、commit、push 后，前线上错误提交会被删除和覆盖
  ```

### 2.2 删除

- **删除文件：**`git rm "filename"`

  ```bash
  # 若需删除线上文件：
  $ git rm filename
  $ git commit -m "删除说明："
  $ git push

  $ git rm --cache filename # 只在缓存中删除对应的文件
  ```

- **删错 - 还原**

  > **注意：** 针对执行了 `git rm` 操作，但未 `git push` 的情况

  ```bash
  $ git status # 查看: 若出现 deleted: path\xx...\filename 提示，执行

  $ git reset HEAD # 还原工作区，之后运行

  $ git checkout "path\xx...\filename" # 把误删的文件还原
  ```

- **清空操作：**`git clean -df`

  > 当出现如：`error: The following untracked working tree files would be overwritten by checkout` 情况时常用

  ```bash
  $ git clean -df  # 把 Untracked files(未跟踪文件) 进行删除
  
  -d: 删除未被添加到git的路径中的文件
  -f: 强制运行
  -n: 显示将要删除的文件和目录
  -x: 删除忽略文件已经对git来说不识别的文件
  ```

### 2.3 其他内容

- **忽略提交：**`.gitignore`

  > **隐藏文件**，用来控制需要 **忽略** 的 `git` 提交

  - 若 `.gitignore` 文件写错，导致错误 `add` 的恢复办法

    ```bash
    git rm r --cache .
    git add .
    ```

  - **git**无法追踪一个**空的文件夹**，当用户需要 **追踪(track)** 一个空的文件夹的时候:

    1. 在文件夹中添加一个空文件，但无需提交文件时，需创建`.gitkeep` 文件

    2. 将文件夹排除在外，但不包括 **主文件中** 的文件夹，`.gitignore`写入以下：

       ```bash
       folder/*
       !folder/.gitkeep
       ```

       <Alert type="warning">注意：`windows` 下通过命令行：`type null > .gitkeep`来创建文件夹</Alert>

- **同步本地的远程分支**

  查看本地分支和追踪情况

  ```bash
  $ git remote show origin
  ```

  根据提示 `stale` 执行以下命令来同步删除这些分支

  ```bash
  $ git remote prune origin
  ```

  删除本地多余分支（如：删除 `develop-zz` 分支）

  ```bash
  git branch -D develop-zz
  ```

---

## 3. 分支管理

1. 每次提交，**Git** 都把它们串成一条时间线，这条时间线就是一个分支

   - 若截止到目前，只有一条时间线。那么在 **Git**里，这个分支叫主分支，即 `master` 分支
   - `HEAD` 严格来说，不是指向提交，而是指向 `master`，`master` 才是指向提交的，所以 `HEAD` 指向的就是当前分支

2. 开始时，`master` 分支是一条线，**Git** 用 `master` 指向最新的提交，再用 `HEAD` 指向 `master`，就能确定当前分支，以及当前分支的提交点

3. 每次提交，`master` 分支都会向前移动一步，这样，随着你不断提交，`master` 分支的线也越来越长

4. 当我们创建新的分支，例如 `dev` 时，**Git** 新建了一个指针叫 `dev`，指向 `master` 相同的提交，再把 `HEAD`指向 `dev`，就表示当前分支在 `dev` 上

5. **Git** 创建一个分支很快，因为除了增加一个 `dev` 指针，改改 `HEAD` 的指向，工作区的文件都没有任何变化

   - 不过，从现在开始，对工作区的修改和提交就是针对 `dev` 分支了，比如新提交一次后，`dev` 指针往前移动一步，而 `master` 指针不变

6. 假如我们在 `dev` 上的工作完成了，就可以把 `dev` 合并到 `master` 上

   > **Git** 怎么合并呢？
   >
   >  最简单的方法，就是直接把 `master` 指向 `dev` 的当前提交，就完成了合并

7. 所以 **Git** 合并分支也很快，就改改指针，工作区内容也不变

   - 合并完分支后，甚至可以删除 `dev` 分支，删除 `dev` 分支就是把 `dev` 指针给删掉
   - 删掉后，我们就只剩下一条 `master` 分支

### 3.1 基本操作

- **查看分支：** `git branch`

  ```bash
  -a: 查看所有分支
  ```

- **创建分支：**`git branch <name>`

- **切换分支：** `git checkout <name>`

- **创建+切换分支：** `git checkout -b <name>`

- **合并某分支到当前分支：** `git merge <name>`

  - 如：把 `dev` 分支的工作成果合并到 `master` 分支上：

    ```bash
    git merge origin/dev   # 试验得出：需要写 origin (源), 不然不会真正合并
    ```

  - `Fast-forward：` **Git**告诉我们，这次合并是 "快进模式"，即直接把 `master` 指向 `dev` 的当前提交，所以合并速度非常快。

- **删除分支：** `git branch -d <name>`

- **多分支转移提交：** `git cherry-pick commit id`

  ```bash
  git cherry-pick A..B	# 转移从 commit A 到 commit B的提交，但不包含commit A
  
  git cherry-pick A^..B	# 同上，但包含A
  ```

  - 若发生代码 **冲突**，`cherry-pick` 会停下来，让用户决定如何继续操作：

    1. 需要用户手动解决冲突

    2. 解决完后需要手动 `git add`

    3. ```bash
       git cherry-pick --continue # 让其继续执行
       ```

  ```bash
  --abort # 发生代码冲突后，放弃合并，回到操作前的样子。
  --quit	# 发生代码冲突后，退出 Cherry pick，但是不回到操作前的样子。
  ```

### 3.2 解决冲突

当 **Git** 无法自动合并分支时，就必须首先解决冲突

解决冲突后，再提交，合并完成

> **注：** 建议不要 `commit`，直接 `push` 避免覆盖）

- **查看分支的合并情况：** `git log`

- **查看分支合并图：** `git log --graph`

  ```bash
  $ git log --graph --pretty=oneline --abbrev-commit
  ```

- **耐心算法：**`patience`

  > **说明**：常用来 协调一些 **函数** 或者 **标记** 中 没有配对的 **括号**

  ```bash
  git merge --strategy-option=patience # 合并时可以使用“耐心”算法
  ```

### 3.3 分支管理策略

```
    分支管理策略：
        准备合并dev分支，请注意--no-ff参数，表示禁用Fast forward：
        $ git merge --no-ff -m "merge with no-ff" dev
        因为本次合并要创建一个新的commit，所以加上-m参数，把commit描述写进去。

        在实际开发中，我们应该按照几个基本原则进行分支管理：
        首先，master分支应该是非常稳定的，也就是仅用来发布新版本，平时不能在上面干活；
        那在哪干活呢？干活都在dev分支上，也就是说，dev分支是不稳定的，到某个时候，比如1.0版本发布时，再把dev分支合并到master上，在master
        分支发布1.0版本
        你和你的小伙伴们每个人都在dev分支上干活，每个人都有自己的分支，时不时地往dev分支上合并就可以了。

    bug分支：
        修复bug时，我们会通过创建新的bug分支进行修复，然后合并，最后删除；
        当手头工作没有完成时，先把工作现场git stash一下，然后去修复bug，修复后，再git stash pop，回到工作现场。

        注：git stash apply stash@{1} 可以把想要看的工作分支调出来（读数据）。查看用 git stash list。
            git stash drop stash@{0}  这是删除第一个队列
            git stash clear  :注意这是清空你所有的内容

    Feature分支：
        软件开发中，总有无穷无尽的新的功能要不断添加进来。
        添加一个新功能时，你肯定不希望因为一些实验性质的代码，把主分支搞乱了，所以，每添加一个新功能，最好新建一个feature分支，在上面开发，完
        成后，合并，最后，删除该feature分支。

        如果要丢弃一个没有被合并过的分支，可以通过git branch -D <name>强行删除。

    多人协作:
        当你从远程仓库克隆时，实际上Git自动把本地的master分支和远程的master分支对应起来了，并且，远程仓库的默认名称是origin。
        要查看远程库的信息，用git remote
        或者，用git remote -v显示更详细的信息

        推送分支:
            推送分支，就是把该分支上的所有本地提交推送到远程库。推送时，要指定本地分支，这样，Git就会把该分支推送到远程库对应的远程分支上：
            $ git push origin master

            如果要推送其他分支，比如dev，就改成：
            $ git push origin dev

        但是，并不是一定要把本地分支往远程推送，那么，哪些分支需要推送，哪些不需要呢？

            master分支是主分支，因此要时刻与远程同步；

            dev分支是开发分支，团队所有成员都需要在上面工作，所以也需要与远程同步；

            bug分支只用于在本地修复bug，就没必要推到远程了，除非老板要看看你每周到底修复了几个bug；

            feature分支是否推到远程，取决于你是否和你的小伙伴合作在上面开发。

            总之，就是在Git中，分支完全可以在本地自己藏着玩，是否推送，视你的心情而定！

        git push策略配置：
            所有的Git Push的策略:
                nothing     什么都不干（估计只是测试用的）

                matching    本地所有的分支都Push上去, 只是默认的机制

                upstream/tracking 当本地分支有upstream（也就是有对应的远程分支）时Push到对应的远程分支

                simple      和upstream一样, 但不允许将本地分支提交到远程不一样名字的分支

                current     把当前的分支Push到远程的同名分支
            Git 1.x的默认策略是matching, 在Git 2.0之后simple会成为新的默认策略。

            - matching不友好之处在于我们的大部分情况都是同步本地的当前分支到远程，你会看到一长串的本地Branch（如果你本地有二三
            十个的话那就被刷屏了）。如果除了当前分支外的其他分支有新的内容的话，你会看到好多push fail的提示。

            - simple这个选项是非常安全的选项, 至少能阻止新手误操作覆盖远程分支, 所以Git会在2.0时将其作为默认策略。

            大部分情况我们想要做的只是Push当前的分支, 那么最适合的就是upstream。
            我们可以通过git config去配置采用upstream策略。具体的设置命令如下:
                git config --global push.default upstream
抓取分支：
            多人协作时，大家都会往master和dev分支上推送各自的修改。

                1.首先，可以试图用git push origin branch-name推送自己的修改；
                2.如果推送失败，则因为远程分支比你的本地更新，需要先用git pull试图合并；
                3.如果合并有冲突，则解决冲突，并在本地提交；
                4.没有冲突或者解决掉冲突后，再用git push origin branch-name推送就能成功！

            如果git pull提示“no tracking information”，则说明本地分支和远程分支的链接关系没有创建，用命令
            git branch --set-upstream branch-name origin/branch-name。   --  废弃
            此命令改为 git branch --set-upstream-to 若为master分支 直接origin/master即可
            若其他分支也提示，那就直接切到 其他分支上 如 git checkout dev 然后在
            git branch --set-upstream-to origin/dev 即可，还有其他分支也同理

这就是多人协作的工作模式，一旦熟悉了，就非常简单。

            从本地推送分支，使用git push origin branch-name，如果推送失败，先用git pull抓取远程的新提交；

            在本地创建和远程分支对应的分支，使用git checkout -b branch-name origin/branch-name，本地和远程分支的名称最好一致；

            建立本地分支和远程分支的关联，使用git branch --set-upstream branch-name origin/branch-name；

            从远程抓取分支，使用git pull，如果有冲突，要先处理冲突。

        注意：这里的git pull 抓取分支一定是要抓取到可能会有修改的分支，若master有修改则git pull origin master 若正在开发的
         feature分支上有修改则 git pull feature transform 之后再到本地merge解决冲突。因此要理解 git pull 后面的分支指的是
         把后面分支的代码给 down下到 自己当前的开发分支！直接git pull下来的是 配置好对应本地的远程分支（若有改动是因为在不同
         电脑上对同一分支修改产生的改动）   因此 - 以后解决冲突要pull指定别人的那个分支才行
```

---

## 4. 标签管理

```
标签管理:
    发布一个版本时，我们通常先在版本库中打一个标签（tag），这样，就唯一确定了打标签时刻的版本。将来无论什么时候，取某个标签的版本，就
    是把那个打标签的时刻的历史版本取出来。所以，标签也是版本库的一个快照。
    Git的标签虽然是版本库的快照，但其实它就是指向某个commit的指针（跟分支很像对不对？但是分支可以移动，标签不能移动），所以，创建和
    删除标签都是瞬间完成的。
    Git有commit，为什么还要引入tag？
    “请把上周一的那个版本打包发布，commit号是6a5819e...”
    “一串乱七八糟的数字不好找！”
    所以，tag就是一个让人容易记住的有意义的名字，它跟某个commit绑在一起。

    创建标签：
        在Git中打标签非常简单，首先，切换到需要打标签的分支上
        1.命令git tag <name>用于新建一个标签，默认为HEAD，也可以指定一个commit id；git tag v1.0
        2.git tag -a <tagname> -m "blablabla..."可以指定标签信息；
        3.git tag -s <tagname> -m "blablabla..."可以用PGP签名标签；
        4.命令git tag可以查看所有标签。

    操作标签：
        1.命令git push origin <tagname>可以推送一个本地标签；
        2.命令git push origin --tags可以推送全部未推送过的本地标签；
        3.命令git tag -d <tagname>可以删除一个本地标签；
        4.命令git push origin :refs/tags/<tagname>可以删除一个远程标签。

使用GitHub：
    点“Fork”就在自己的账号下克隆了一个bootstrap仓库，然后，从自己的账号下clone：
    一定要从自己的账号下clone仓库，这样你才能推送修改。如果从bootstrap的作者的仓库地址git@github.com:twbs/bootstrap.git克隆，因为
    没有权限，你将不能推送修改。
    如果你想修复bootstrap的一个bug，或者新增一个功能，立刻就可以开始干活，干完后，往自己的仓库推送。
    如果你希望bootstrap的官方库能接受你的修改，你就可以在GitHub上发起一个pull request。当然，对方是否接受你的pull request就不一定了。
```

---

## 5. 远程仓库

    远程仓库:
        （注意，linux下通常不要切换成root用户，直接ubuntu或自己的用户即可）
        第1步：创建SSH Key。在用户主目录下，看看有没有.ssh目录，如果有，再看看这个目录下有没有id_rsa和id_rsa.pub这两个文件，如果已经有了，可直
            接跳到下一步。如果没有，打开Shell（Windows下打开Git Bash），创建SSH Key：
            $ ssh-keygen -t rsa -C "youremail@example.com"      （貌似这里可以不需要指定-C后面的，会进行默认生成）
        你需要把邮件地址换成你自己的邮件地址，然后一路回车，使用默认值即可，由于这个Key也不是用于军事目的，所以也无需设置密码。
        如果一切顺利的话，可以在用户主目录里找到.ssh目录，里面有id_rsa和id_rsa.pub两个文件，这两个就是SSH Key的秘钥对，id_rsa是私钥，不能泄露
        出去，id_rsa.pub是公钥，可以放心地告诉任何人。
    
        第2步：登陆GitHub，打开“Account settings”，“SSH Keys”页面：
        然后，点“Add SSH Key”，填上任意Title，在Key文本框里粘贴id_rsa.pub文件的内容,点“Add Key”，你就应该看到已经添加的Key：
        为什么GitHub需要SSH Key呢？因为GitHub需要识别出你推送的提交确实是你推送的，而不是别人冒充的，而Git支持SSH协议，所以，GitHub只
        要知道了你的公钥，就可以确认只有你自己才能推送。
        当然，GitHub允许你添加多个Key。假定你有若干电脑，你一会儿在公司提交，一会儿在家里提交，只要把每台电脑的Key都添加到GitHub，就可以在
        每台电脑上往GitHub推送了。
    
        点击“Create repository”按钮，就成功地创建了一个新的Git仓库
        目前，在GitHub上的这个新创建的仓库还是空的，GitHub告诉我们，可以从这个仓库克隆出新的仓库，也可以把一个已有的本地仓库与之关联，然后，
        把本地仓库的内容推送到GitHub仓库。
    
        现在，我们根据GitHub的提示，在本地自己的仓库下运行命令：
        $ git remote add origin git@github.com:yourID/yourgit.git   （相当于填写名字）
        添加后，远程库的名字就是origin，这是Git默认的叫法，也可以改成别的，但是origin这个名字一看就知道是远程库。
    
        把本地库的内容推送到远程，用git push命令，实际上是把当前分支master推送到远程。
        由于远程库是空的，我们第一次推送master分支时，加上了-u参数，Git不但会把本地的master分支内容推送的远程新的master分支，还会把本地的master
        分支和远程的master分支关联起来，在以后的推送或者拉取时就可以简化命令。（推送成功后，可以立刻在GitHub页面中看到远程库的内容已经和本地一模一样）
    
        从现在起，只要本地作了提交，就可以通过命令：
        $ git push origin master    把本地master分支的最新修改推送至GitHub，现在，你就拥有了真正的分布式版本库！
    
        SSH警告：
            当你第一次使用Git的clone或者push命令连接GitHub时，会得到一个警告
            这是因为Git使用SSH连接，而SSH连接在第一次验证GitHub服务器的Key时，需要你确认GitHub的Key的指纹信息是否真的来自GitHub的服务器，输入yes回车即可。
            这个警告只会出现一次，后面的操作就不会有任何警告了。
            如果你实在担心有人冒充GitHub服务器，输入yes前可以对照GitHub的RSA Key的指纹信息是否与SSH连接给出的一致。
    
        现在，假设我们从零开发，那么最好的方式是先创建远程库，然后，从远程库克隆。
        首先，登陆GitHub，创建一个新的仓库，勾选Initialize this repository with a README，这样GitHub会自动为我们创建一个README.md文件。
        远程库已经准备好了，下一步是用命令git clone克隆一个本地库：
    
        git clone SSH协议的仓库地址
            如果有多个人协作开发，那么每个人各自从远程克隆一份就可以了。实际上，Git支持多种协议，默认的git://使用ssh，但也可以使用https等其他协议。
            使用https除了速度慢以外，还有个最大的麻烦是每次推送都必须输入口令，但是在某些只开放http端口的公司内部就无法使用ssh协议而只能用https。
            Git支持多种协议，包括https，但通过ssh支持的原生git协议速度最快。





    gitlab多用户配置：
        1.首先需要  ssh-keygen -t rsa -C "zhengze@uit.com.cn"  生成不一样的另一个key 并修改命名为 id_rsa_gitlab
    
        2.将id_rsa_gitlab.pub 内容分别添加到 公司远程的 gitlab SSH Keys 中
    
        3.运行命令：
            ssh-add ~/.ssh/id_rsa // 将 GitHub 私钥添加到本地
            ssh-add ~/.ssh/id_rsa_gitlab // 将 公司的GitLab 私钥添加到本地
    
            ssh-add -l  // 执行命令测试是否能显示出如下类似结果：
    
                3072 SHA256:6i2sMMsZf9kWVapDVEP+c2hGRXRNIMxOTX/v2CJqUTE zhengze@uit.com.cn (RSA)
                3072 SHA256:swyJa6qw6hlXa0Dqe3beuWsUmqUa0R7XGF/YsrmJ+4k 2545369032@qq.com (RSA)
    
        4.打开config配置文件：
            vim ~/.ssh/config
    
            Host github.com //名称随便起
            HostName github.com
            PreferredAuthentications publickey
            IdentityFile ~/.ssh/id_rsa
            User 2545369032@qq.com
    
            Host gitlab
            HostName http://172.18.50.120   //公司ip地址可以，gitlab.com便是指gitlab网站
            User zhengze@uit.com.cn         // 用户名
            PreferredAuthentications publickey
            IdentityFile ~/.ssh/id_rsa_gitlab   //生成的私钥地址
    
        5.运行如下命令，测试是否成功，收到welcome提示则ok
            ssh -T git@172.18.50.120
            ssh -T git@github
    
        注：
             git 的配置分为三级别，System —> Global —>Local
             即对应命令：git config --local user.name/user.email
    
             通过以下命令查看本仓库的所有配置信息：git config --local/--global --list
    
             报：Could not open a connection to your authentication agent.
             请切换到~/.ssh目录下执行ssh-agent bash 然后重复3
    
        若每次重新打开git都需要执行以上操作，那么可以通过以下方法一劳永逸：
    
        那就是把
            eval "$(ssh-agent -s)"
            ssh-add ~/.ssh/helloSSH
    
        放到git的bashrc中：打开git的安装目录，进入到etc/中，使用文本编辑软件（比如Editplus）编辑 bash.bashrc 文件，在末尾添加两行：
    
        eval "$(ssh-agent -s)"
        ssh-add ~/.ssh/helloSSH
    
        这样，在每次新打开git的shell之后，会自动执行这两句话，并在shell中回显出（注：）中的打印
    
    使用码云:
        如果我们希望体验Git飞一般的速度，可以使用国内的Git托管服务——码云（gitee.com）。
        和GitHub相比，码云也提供免费的Git仓库。此外，还集成了代码质量检测、项目演示等功能。对于团队协作开发，码云还提供了项目管理、代码托管、文
        档管理的服务，5人以下小团队免费。(有兴趣自查)
    
    自定义Git：
        我们已经配置了user.name和user.email，实际上，Git还有[很多]可配置项。
        比如，让Git显示颜色，会让命令输出看起来更醒目：
        $ git config --global color.ui true
        这样，Git会适当地显示不同的颜色，比如git status命令
    
        忽略某些文件时，需要编写.gitignore；
        .gitignore文件本身要放到版本库里，并且可以对.gitignore做版本管理！
    
        甚至还有人丧心病狂地把lg配置成了：
        git config --global alias.lg "log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"
        给Git配置好别名，就可以输入命令时偷个懒。
    
        搭建Git服务器非常简单，通常10分钟即可完成；
        要方便管理公钥，用Gitosis；
        要像SVN那样变态地控制权限，用Gitolite。

Git 虽然极其强大，命令繁多，但常用的就那么十来个，掌握好这十几个常用命令，你已经可以得心应手地使用 Git 了-----https://git-scm.com/

其他指令：
ssh 用户名@ip 地址： 用于远程连接，win10 目前自带，例：ssh root@59.110.220.5

    sftp 用户名@ip地址:  同上，用于文件传输连接
    
        put: put指令，用于传输文件到服务器上。 例： put C:\Users\Fuuka\Desktop\YKB.txt /home/admin
