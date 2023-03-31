---
title: vim 快捷键
date: 2020-03-24
category:
  - Linux
  - Vim
tag:
  - Linux
  - vim
---

**vim** 的使用方法 **&** 快捷键

<!-- more -->

### 1. 查询

**vim** 下要查找字符串的时候， 都是输入 `/要查找的字段` 或者 `?name`，区别是前者是从上往下搜索，后者是从下往上搜索

- <1> 但最快的方式是让光标停留在想要查找的单词的任意一个字母上面， 然后输入 <kbd>Shift + \*</kbd> 即可快速选中该单词，
  并且可以通过 **n** 或 **N** 进行上一个或下一个的匹配
- <2> 让光标停留在单词的第一个字母上， 然后输入 **yw** 拷贝该单词， 然后输入 / (<kbd>Ctrl + R</kbd>) 0 （即 /”0），回车，
  就查找到了第一个匹配的单词， 并且可以通过 **n** 或 **N** 进行上一个或下一个的匹配
- <3> 将单词拷贝到系统剪贴板， 然后再从系统剪贴板拿出来。 即选中需要查找的单词， 然后输入 “+y， 然后输入/（<kbd>Shfit + Ctrl + v</kbd>）就查找到了第一个匹配的单词， 并且可以通过 n 或 N 进行上一个或下一个的匹配

### 2. 跳行和换首尾

- 跳到第一行
  - <1> 输入 :0 或 :1
  - <2> 按下小写键 gg
- 跳至尾行
  - <1> 输入 :$ 回车
  - <2> 键盘按下大写 G （跳至 66 行 66 + G）
- 换至行首
  - <1> 编辑键 Home
  - <2> "^"（即 <kbd>Shift + 6</kbd>）或 0（数字 0）
- 换至行尾
  - <1> 编辑键 End
  - <2> "$"（<kbd>Shift + 4</kbd>）使用"1$"表示当前行的行尾，"2$"表示当前行的下一行的行尾。

### 3. 复制和粘贴

最简单的办法 鼠标选中 <kbd>ctrl/shift + insert</kbd> 但是这样看上去就会很傻

- 复制命令： y

  - yy 复制整行 nyy 复制 n 行
  - y^/y$ 复制当前到行头/行尾的内容
  - yw 复制一个 word
  - yG 复制至档尾 nyG 复制到第 n 行档尾

- 剪切命令： d

  - dd 剪切整行 ndd 剪切 n 行
  - 后续同上 y 命令

- 粘贴命令： p

  - p 小写 p 代表粘贴到游标尺之后
  - P 大写 P 代表粘贴到游标尺之前

- 撤销上一次操作： u

  - u 小写 u 撤销刚才的操作
  - U 大写 U 撤销某一行最近的所有更改

- 恢复上一次操作：<kbd>ctrl + r</kbd> 

### VIM 配置

下载 **vim-colorschemes、vim-tarbar** 等 **Vim** 插件，将它们解压放置在 `~/.vim` 目录中

```shell
wget https://github.com/flazz/vim-colorschemes/archive/master.zip

wget https://github.com/majutsushi/tagbar/archive/master.zip
```

配置文件 `~/.vimrc` 内容如下

```shell
"common setting
set t_Co=256
colorscheme molokai
set autoindent
set smartindent
set tabstop=4
set shiftwidth=4
set softtabstop=4
set number
set nobackup
set noundofile
filetype plugin on
syntax on

"hi Type ctermfg=118 cterm=none
"hi Structure ctermfg=118 cterm=none
"hi Macro ctermfg=161 cterm=bold
"hi PreCondit ctermfg=161 cterm=bold
set cursorline

">>>ctags begin
nmap <F8> :TagbarToggle<CR>
nmap <F5> :tprev<CR>
nmap <F6> :tnext<CR>
"<<<ctags end

">>>for windows begin 
set encoding=utf-8
set fileencodings=utf-8,chinese,latin-1
if has("win32")
  set fileencoding=chinese
else
  set fileencoding=utf-8
endif

source $VIMRUNTIME/delmenu.vim
source $VIMRUNTIME/menu.vim

set guifont=Consolas:h11
language messages zh_CN.utf-8
"<<<for windows end 

">>>set max window bengin
if has('win32')
    au GUIEnter * simalt ~x
else
    au GUIEnter * call MaximizeWindow()
endif

function! MaximizeWindow()
    silent !wmctrl -r :ACTIVE: -b add,maximized_vert,maximized_horz
endfunction
"<<<set max window end
```
