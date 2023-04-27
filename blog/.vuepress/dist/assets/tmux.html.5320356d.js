import{_ as s}from"./plugin-vueexport-helper.2444895f.js";import{o as n,c as a,f as e}from"./app.c323a8c1.js";const l={},i=e(`<h2 id="tmux" tabindex="-1"><a class="header-anchor" href="#tmux" aria-hidden="true">#</a> Tmux</h2><p><code>2021-07-16 15:00</code> <strong>5 \u697C</strong> \u7814\u53D1\u4F1A\u8BAE\u5BA4</p><p>\u4F60\u4F1A\u6536\u83B7\u4EC0\u4E48 <strong>tmux</strong> \u4F7F\u7528\u6307\u5357\uFF0C\u66F4\u4FBF\u6377\u7684\u7BA1\u7406\uFF0C\u5F00\u53D1\u4EE5\u53CA\u8FD0\u7EF4\u65B9\u5F0F\uFF0C\u4EE5\u53CA\u66F4\u70AB\u9177\u7684\u7EC8\u7AEF\u4F7F\u7528\u65B9\u5F0F</p><p><strong>note</strong>\xA0\u914D\u7F6E\u6587\u4EF6</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token string">&quot;shell General settings&quot;</span>
<span class="token builtin class-name">set</span> <span class="token parameter variable">-g</span> default-terminal 

<span class="token string">&quot;screen-256color&quot;</span>
set-option <span class="token parameter variable">-ga</span> terminal-overrides <span class="token string">&quot;,*256col*:Tc&quot;</span>
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
<span class="token builtin class-name">set</span> <span class="token parameter variable">-g</span> set-titles-string <span class="token string">&#39;#h \u2750 #S \u25CF #I #W&#39;</span>
<span class="token builtin class-name">set</span> <span class="token parameter variable">-s</span> escape-time <span class="token number">0</span>
setw <span class="token parameter variable">-g</span> monitor-activity on
<span class="token builtin class-name">set</span> <span class="token parameter variable">-g</span> visual-activity off
<span class="token builtin class-name">set</span> <span class="token parameter variable">-g</span> repeat-time <span class="token number">400</span>

<span class="token comment"># ==========================</span>
<span class="token comment"># ===    Colorscheme     ===</span>
<span class="token comment"># ==========================</span>
<span class="token builtin class-name">set</span> <span class="token parameter variable">-g</span> message-style <span class="token assign-left variable">fg</span><span class="token operator">=</span><span class="token string">&#39;colour222&#39;</span>,bg<span class="token operator">=</span><span class="token string">&#39;colour238&#39;</span>
<span class="token builtin class-name">set</span> <span class="token parameter variable">-g</span> message-command-style <span class="token assign-left variable">fg</span><span class="token operator">=</span><span class="token string">&#39;colour222&#39;</span>,bg<span class="token operator">=</span><span class="token string">&#39;colour238&#39;</span>
<span class="token builtin class-name">set</span> <span class="token parameter variable">-g</span> pane-border-style <span class="token assign-left variable">fg</span><span class="token operator">=</span><span class="token string">&#39;colour238&#39;</span>
<span class="token builtin class-name">set</span> <span class="token parameter variable">-g</span> pane-active-border-style <span class="token assign-left variable">fg</span><span class="token operator">=</span><span class="token string">&#39;colour154&#39;</span>
set-option <span class="token parameter variable">-g</span> status-style        <span class="token assign-left variable">fg</span><span class="token operator">=</span>colour15,bg<span class="token operator">=</span><span class="token comment">#282c34</span>
set-option <span class="token parameter variable">-g</span> pane-border-style            <span class="token assign-left variable">fg</span><span class="token operator">=</span>green
set-option <span class="token parameter variable">-g</span> pane-active-border-style     <span class="token assign-left variable">fg</span><span class="token operator">=</span>yellow
set-option <span class="token parameter variable">-g</span> window-status-activity-style <span class="token assign-left variable">fg</span><span class="token operator">=</span>colour111

<span class="token comment"># =====================================</span>
<span class="token comment"># ===    Appearence and status bar  ===</span>
<span class="token comment"># ======================================</span>
<span class="token builtin class-name">set</span> <span class="token parameter variable">-g</span> status <span class="token string">&#39;on&#39;</span>
<span class="token builtin class-name">set</span> <span class="token parameter variable">-g</span> status-position <span class="token string">&#39;top&#39;</span>
<span class="token builtin class-name">set</span> <span class="token parameter variable">-g</span> status-justify <span class="token string">&#39;left&#39;</span>
<span class="token builtin class-name">set</span> <span class="token parameter variable">-g</span> status-left-length <span class="token string">&#39;100&#39;</span>
<span class="token builtin class-name">set</span> <span class="token parameter variable">-g</span> status-right-length <span class="token string">&#39;100&#39;</span>

set-window-option <span class="token parameter variable">-g</span> window-status-format <span class="token string">&#39;#[bg=colour238]#[fg=colour107] #I #[bg=colour239]#[fg=colour110] #[bg=colour240]#W#[bg=colour239]#[fg=colour195]#F#[bg=colour238] &#39;</span>

set-window-option <span class="token parameter variable">-g</span> window-status-current-format <span class="token string">&#39;#[bg=colour236]#[fg=colour215,bold] #I:#[bg=colour235]#[fg=colour167] #[bg=colour234]#W#[bg=colour235]#[fg=colour195]#F#[bg=colour236] &#39;</span>

<span class="token builtin class-name">set</span> <span class="token parameter variable">-g</span> status-left <span class="token string">&#39;\\
#[fg=colour232,bg=#6272a4] status: #{continuum_status} \\
#[bg=#1b2b34] \\
#[fg=colour232,bg=#6272a4] %H:%M \\
#[bg=#1b2b34] \\
#{prefix_highlight} &#39;</span>

<span class="token builtin class-name">set</span> <span class="token parameter variable">-g</span> status-right <span class="token string">&#39;\\
#[fg=colour232,bg=#6272a4] CPU:#{cpu_percentage} \\
#[bg=#1b2b34] \\
#[fg=colour232,bg=#6272a4] MEM:#{ram_percentage} &#39;</span>

<span class="token comment"># ==========================</span>
<span class="token comment"># ===   Key bindings     ===</span>
<span class="token comment"># ==========================</span>
<span class="token builtin class-name">set</span> <span class="token parameter variable">-g</span> prefix C-n
unbind C-b
unbind <span class="token string">&#39;&quot;&#39;</span>
unbind %  
<span class="token builtin class-name">bind</span> <span class="token operator">|</span> split-window <span class="token parameter variable">-h</span> <span class="token parameter variable">-c</span> <span class="token string">&quot;#{pane_current_path}&quot;</span>
<span class="token builtin class-name">bind</span> _ split-window <span class="token parameter variable">-v</span> <span class="token parameter variable">-c</span> <span class="token string">&quot;#{pane_current_path}&quot;</span>

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
<span class="token builtin class-name">bind</span> R source-file <span class="token environment constant">$HOME</span>/.tmux.conf <span class="token punctuation">\\</span><span class="token punctuation">;</span> display <span class="token string">&quot;Configuration Reloading...&quot;</span>

<span class="token comment"># ==========================</span>
<span class="token comment"># ===   Plugin Resurrect ===</span>
<span class="token comment"># ==========================</span>
<span class="token builtin class-name">set</span> <span class="token parameter variable">-g</span> @resurrect-capture-pane-contents <span class="token string">&#39;on&#39;</span>

<span class="token comment"># save vim session</span>
<span class="token builtin class-name">set</span> <span class="token parameter variable">-g</span> @resurrect-strategy-vim <span class="token string">&#39;session&#39;</span>

<span class="token comment"># save neovim session</span>
<span class="token builtin class-name">set</span> <span class="token parameter variable">-g</span> @resurrect-strategy-nvim <span class="token string">&#39;session&#39;</span>
<span class="token builtin class-name">set</span> <span class="token parameter variable">-g</span> @continuum-restore <span class="token string">&#39;on&#39;</span>
<span class="token builtin class-name">set</span> <span class="token parameter variable">-g</span> @continuum-boot <span class="token string">&#39;on&#39;</span>
<span class="token builtin class-name">set</span> <span class="token parameter variable">-g</span> @continuum-save-interval <span class="token string">&#39;10&#39;</span>
<span class="token builtin class-name">set</span> <span class="token parameter variable">-g</span> @plugin <span class="token string">&#39;tmux-plugins/tmux-cpu&#39;</span>
<span class="token builtin class-name">set</span> <span class="token parameter variable">-g</span> @plugin <span class="token string">&#39;thewtex/tmux-mem-cpu-load&#39;</span>
<span class="token builtin class-name">set</span> <span class="token parameter variable">-g</span> @plugin <span class="token string">&#39;tmux-plugins/tmux-net-speed&#39;</span>
<span class="token builtin class-name">set</span> <span class="token parameter variable">-g</span> @plugin <span class="token string">&#39;tmux-plugins/tmux-prefix-highlight&#39;</span>
<span class="token builtin class-name">set</span> <span class="token parameter variable">-g</span> @plugin <span class="token string">&#39;tmux-plugins/tmux-resurrect&#39;</span>
<span class="token builtin class-name">set</span> <span class="token parameter variable">-g</span> @plugin <span class="token string">&#39;tmux-plugins/tmux-continuum&#39;</span>
<span class="token builtin class-name">set</span> <span class="token parameter variable">-g</span> @plugin <span class="token string">&#39;tmux-plugins/tmux-yank&#39;</span>
run <span class="token string">&#39;~/.tmux/plugins/tpm/tpm&#39;</span>
\`\`\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,5),t=[i];function p(r,c){return n(),a("div",null,t)}const u=s(l,[["render",p],["__file","tmux.html.vue"]]);export{u as default};
