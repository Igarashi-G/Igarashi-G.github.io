---
title: Tmux
order: 5
---

## Tmux

`2021-07-16 15:00` **5 楼** 研发会议室

你会收获什么 **tmux** 使用指南，更便捷的管理，开发以及运维方式，以及更炫酷的终端使用方式



**note** 配置文件

~~~shell
"shell General settings"
set -g default-terminal 

"screen-256color"
set-option -ga terminal-overrides ",*256col*:Tc"
set -g status-interval 1
set -g history-limit 10000
set -g history-file ~/.tmux/tmux_history
set -s focus-events on
set -g base-index 1
set -g pane-base-index 1
setw -g automatic-rename on
set -g renumber-windows on
set -g set-titles on

# set terminal title
set -g set-titles-string '#h ❐ #S ● #I #W'
set -s escape-time 0
setw -g monitor-activity on
set -g visual-activity off
set -g repeat-time 400

# ==========================
# ===    Colorscheme     ===
# ==========================
set -g message-style fg='colour222',bg='colour238'
set -g message-command-style fg='colour222',bg='colour238'
set -g pane-border-style fg='colour238'
set -g pane-active-border-style fg='colour154'
set-option -g status-style        fg=colour15,bg=#282c34
set-option -g pane-border-style            fg=green
set-option -g pane-active-border-style     fg=yellow
set-option -g window-status-activity-style fg=colour111

# =====================================
# ===    Appearence and status bar  ===
# ======================================
set -g status 'on'
set -g status-position 'top'
set -g status-justify 'left'
set -g status-left-length '100'
set -g status-right-length '100'

set-window-option -g window-status-format '#[bg=colour238]#[fg=colour107] #I #[bg=colour239]#[fg=colour110] #[bg=colour240]#W#[bg=colour239]#[fg=colour195]#F#[bg=colour238] '

set-window-option -g window-status-current-format '#[bg=colour236]#[fg=colour215,bold] #I:#[bg=colour235]#[fg=colour167] #[bg=colour234]#W#[bg=colour235]#[fg=colour195]#F#[bg=colour236] '

set -g status-left '\
#[fg=colour232,bg=#6272a4] status: #{continuum_status} \
#[bg=#1b2b34] \
#[fg=colour232,bg=#6272a4] %H:%M \
#[bg=#1b2b34] \
#{prefix_highlight} '

set -g status-right '\
#[fg=colour232,bg=#6272a4] CPU:#{cpu_percentage} \
#[bg=#1b2b34] \
#[fg=colour232,bg=#6272a4] MEM:#{ram_percentage} '

# ==========================
# ===   Key bindings     ===
# ==========================
set -g prefix C-n
unbind C-b
unbind '"'
unbind %  
bind | split-window -h -c "#{pane_current_path}"
bind _ split-window -v -c "#{pane_current_path}"

# switch window
bind h select-pane -L
bind j select-pane -D
bind k select-pane -U
bind l select-pane -R

#unbind C-w
bind C-w resize-window -a
bind m set -g mouse on
bind M set -g mouse off

# reload the tmux config
bind R source-file $HOME/.tmux.conf \; display "Configuration Reloading..."

# ==========================
# ===   Plugin Resurrect ===
# ==========================
set -g @resurrect-capture-pane-contents 'on'

# save vim session
set -g @resurrect-strategy-vim 'session'

# save neovim session
set -g @resurrect-strategy-nvim 'session'
set -g @continuum-restore 'on'
set -g @continuum-boot 'on'
set -g @continuum-save-interval '10'
set -g @plugin 'tmux-plugins/tmux-cpu'
set -g @plugin 'thewtex/tmux-mem-cpu-load'
set -g @plugin 'tmux-plugins/tmux-net-speed'
set -g @plugin 'tmux-plugins/tmux-prefix-highlight'
set -g @plugin 'tmux-plugins/tmux-resurrect'
set -g @plugin 'tmux-plugins/tmux-continuum'
set -g @plugin 'tmux-plugins/tmux-yank'
run '~/.tmux/plugins/tpm/tpm'
```
~~~
