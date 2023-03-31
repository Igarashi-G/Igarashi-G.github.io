<template><div><h2 id="tmux" tabindex="-1"><a class="header-anchor" href="#tmux" aria-hidden="true">#</a> Tmux</h2>
<p><code v-pre>2021-07-16 15:00</code> <strong>5 楼</strong> 研发会议室</p>
<p>你会收获什么 <strong>tmux</strong> 使用指南，更便捷的管理，开发以及运维方式，以及更炫酷的终端使用方式</p>
<p><strong>note</strong> 配置文件</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token string">"shell General settings"</span>
<span class="token builtin class-name">set</span> <span class="token parameter variable">-g</span> default-terminal 

<span class="token string">"screen-256color"</span>
set-option <span class="token parameter variable">-ga</span> terminal-overrides <span class="token string">",*256col*:Tc"</span>
<span class="token builtin class-name">set</span> <span class="token parameter variable">-g</span> status-interval <span class="token number">1</span>
<span class="token builtin class-name">set</span> <span class="token parameter variable">-g</span> history-limit <span class="token number">10000</span>
<span class="token builtin class-name">set</span> <span class="token parameter variable">-g</span> history-file ~/.tmux/tmux_history
<span class="token builtin class-name">set</span> <span class="token parameter variable">-s</span> focus-events on
<span class="token builtin class-name">set</span> <span class="token parameter variable">-g</span> base-index <span class="token number">1</span>
<span class="token builtin class-name">set</span> <span class="token parameter variable">-g</span> pane-base-index <span class="token number">1</span>
setw <span class="token parameter variable">-g</span> automatic-rename on
<span class="token builtin class-name">set</span> <span class="token parameter variable">-g</span> renumber-windows on
<span class="token builtin class-name">set</span> <span class="token parameter variable">-g</span> set-titles on

<span class="token comment"># set terminal title</span>
<span class="token builtin class-name">set</span> <span class="token parameter variable">-g</span> set-titles-string <span class="token string">'#h ❐ #S ● #I #W'</span>
<span class="token builtin class-name">set</span> <span class="token parameter variable">-s</span> escape-time <span class="token number">0</span>
setw <span class="token parameter variable">-g</span> monitor-activity on
<span class="token builtin class-name">set</span> <span class="token parameter variable">-g</span> visual-activity off
<span class="token builtin class-name">set</span> <span class="token parameter variable">-g</span> repeat-time <span class="token number">400</span>

<span class="token comment"># ==========================</span>
<span class="token comment"># ===    Colorscheme     ===</span>
<span class="token comment"># ==========================</span>
<span class="token builtin class-name">set</span> <span class="token parameter variable">-g</span> message-style <span class="token assign-left variable">fg</span><span class="token operator">=</span><span class="token string">'colour222'</span>,bg<span class="token operator">=</span><span class="token string">'colour238'</span>
<span class="token builtin class-name">set</span> <span class="token parameter variable">-g</span> message-command-style <span class="token assign-left variable">fg</span><span class="token operator">=</span><span class="token string">'colour222'</span>,bg<span class="token operator">=</span><span class="token string">'colour238'</span>
<span class="token builtin class-name">set</span> <span class="token parameter variable">-g</span> pane-border-style <span class="token assign-left variable">fg</span><span class="token operator">=</span><span class="token string">'colour238'</span>
<span class="token builtin class-name">set</span> <span class="token parameter variable">-g</span> pane-active-border-style <span class="token assign-left variable">fg</span><span class="token operator">=</span><span class="token string">'colour154'</span>
set-option <span class="token parameter variable">-g</span> status-style        <span class="token assign-left variable">fg</span><span class="token operator">=</span>colour15,bg<span class="token operator">=</span><span class="token comment">#282c34</span>
set-option <span class="token parameter variable">-g</span> pane-border-style            <span class="token assign-left variable">fg</span><span class="token operator">=</span>green
set-option <span class="token parameter variable">-g</span> pane-active-border-style     <span class="token assign-left variable">fg</span><span class="token operator">=</span>yellow
set-option <span class="token parameter variable">-g</span> window-status-activity-style <span class="token assign-left variable">fg</span><span class="token operator">=</span>colour111

<span class="token comment"># =====================================</span>
<span class="token comment"># ===    Appearence and status bar  ===</span>
<span class="token comment"># ======================================</span>
<span class="token builtin class-name">set</span> <span class="token parameter variable">-g</span> status <span class="token string">'on'</span>
<span class="token builtin class-name">set</span> <span class="token parameter variable">-g</span> status-position <span class="token string">'top'</span>
<span class="token builtin class-name">set</span> <span class="token parameter variable">-g</span> status-justify <span class="token string">'left'</span>
<span class="token builtin class-name">set</span> <span class="token parameter variable">-g</span> status-left-length <span class="token string">'100'</span>
<span class="token builtin class-name">set</span> <span class="token parameter variable">-g</span> status-right-length <span class="token string">'100'</span>

set-window-option <span class="token parameter variable">-g</span> window-status-format <span class="token string">'#[bg=colour238]#[fg=colour107] #I #[bg=colour239]#[fg=colour110] #[bg=colour240]#W#[bg=colour239]#[fg=colour195]#F#[bg=colour238] '</span>

set-window-option <span class="token parameter variable">-g</span> window-status-current-format <span class="token string">'#[bg=colour236]#[fg=colour215,bold] #I:#[bg=colour235]#[fg=colour167] #[bg=colour234]#W#[bg=colour235]#[fg=colour195]#F#[bg=colour236] '</span>

<span class="token builtin class-name">set</span> <span class="token parameter variable">-g</span> status-left <span class="token string">'\
#[fg=colour232,bg=#6272a4] status: #{continuum_status} \
#[bg=#1b2b34] \
#[fg=colour232,bg=#6272a4] %H:%M \
#[bg=#1b2b34] \
#{prefix_highlight} '</span>

<span class="token builtin class-name">set</span> <span class="token parameter variable">-g</span> status-right <span class="token string">'\
#[fg=colour232,bg=#6272a4] CPU:#{cpu_percentage} \
#[bg=#1b2b34] \
#[fg=colour232,bg=#6272a4] MEM:#{ram_percentage} '</span>

<span class="token comment"># ==========================</span>
<span class="token comment"># ===   Key bindings     ===</span>
<span class="token comment"># ==========================</span>
<span class="token builtin class-name">set</span> <span class="token parameter variable">-g</span> prefix C-n
unbind C-b
unbind <span class="token string">'"'</span>
unbind %  
<span class="token builtin class-name">bind</span> <span class="token operator">|</span> split-window <span class="token parameter variable">-h</span> <span class="token parameter variable">-c</span> <span class="token string">"#{pane_current_path}"</span>
<span class="token builtin class-name">bind</span> _ split-window <span class="token parameter variable">-v</span> <span class="token parameter variable">-c</span> <span class="token string">"#{pane_current_path}"</span>

<span class="token comment"># switch window</span>
<span class="token builtin class-name">bind</span> h select-pane <span class="token parameter variable">-L</span>
<span class="token builtin class-name">bind</span> j select-pane <span class="token parameter variable">-D</span>
<span class="token builtin class-name">bind</span> k select-pane <span class="token parameter variable">-U</span>
<span class="token builtin class-name">bind</span> l select-pane <span class="token parameter variable">-R</span>

<span class="token comment">#unbind C-w</span>
<span class="token builtin class-name">bind</span> C-w resize-window <span class="token parameter variable">-a</span>
<span class="token builtin class-name">bind</span> m <span class="token builtin class-name">set</span> <span class="token parameter variable">-g</span> mouse on
<span class="token builtin class-name">bind</span> M <span class="token builtin class-name">set</span> <span class="token parameter variable">-g</span> mouse off

<span class="token comment"># reload the tmux config</span>
<span class="token builtin class-name">bind</span> R source-file <span class="token environment constant">$HOME</span>/.tmux.conf <span class="token punctuation">\</span><span class="token punctuation">;</span> display <span class="token string">"Configuration Reloading..."</span>

<span class="token comment"># ==========================</span>
<span class="token comment"># ===   Plugin Resurrect ===</span>
<span class="token comment"># ==========================</span>
<span class="token builtin class-name">set</span> <span class="token parameter variable">-g</span> @resurrect-capture-pane-contents <span class="token string">'on'</span>

<span class="token comment"># save vim session</span>
<span class="token builtin class-name">set</span> <span class="token parameter variable">-g</span> @resurrect-strategy-vim <span class="token string">'session'</span>

<span class="token comment"># save neovim session</span>
<span class="token builtin class-name">set</span> <span class="token parameter variable">-g</span> @resurrect-strategy-nvim <span class="token string">'session'</span>
<span class="token builtin class-name">set</span> <span class="token parameter variable">-g</span> @continuum-restore <span class="token string">'on'</span>
<span class="token builtin class-name">set</span> <span class="token parameter variable">-g</span> @continuum-boot <span class="token string">'on'</span>
<span class="token builtin class-name">set</span> <span class="token parameter variable">-g</span> @continuum-save-interval <span class="token string">'10'</span>
<span class="token builtin class-name">set</span> <span class="token parameter variable">-g</span> @plugin <span class="token string">'tmux-plugins/tmux-cpu'</span>
<span class="token builtin class-name">set</span> <span class="token parameter variable">-g</span> @plugin <span class="token string">'thewtex/tmux-mem-cpu-load'</span>
<span class="token builtin class-name">set</span> <span class="token parameter variable">-g</span> @plugin <span class="token string">'tmux-plugins/tmux-net-speed'</span>
<span class="token builtin class-name">set</span> <span class="token parameter variable">-g</span> @plugin <span class="token string">'tmux-plugins/tmux-prefix-highlight'</span>
<span class="token builtin class-name">set</span> <span class="token parameter variable">-g</span> @plugin <span class="token string">'tmux-plugins/tmux-resurrect'</span>
<span class="token builtin class-name">set</span> <span class="token parameter variable">-g</span> @plugin <span class="token string">'tmux-plugins/tmux-continuum'</span>
<span class="token builtin class-name">set</span> <span class="token parameter variable">-g</span> @plugin <span class="token string">'tmux-plugins/tmux-yank'</span>
run <span class="token string">'~/.tmux/plugins/tpm/tpm'</span>
```
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


