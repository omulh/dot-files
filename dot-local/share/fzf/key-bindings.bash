__fzf_select__() {
    local dir=$(realpath "$1")
    local label=" Search in $dir "

    selection=$(fd . --hidden --no-ignore-vcs --base-directory "$dir" | fzf --border-label="$label")

    if [[ -n $selection ]]; then
        echo "$selection" |
        while read -r item; do
            # prepend dir. and escape special chars
            if [[ $dir == / ]]; then
                printf "$dir%q " "$item"
            else
                printf "$dir/%q " "$item"
            fi
        done
    fi
}

__fzf_ripgrep__() {
    RELOAD='reload:rg --column --color=always --smart-case {q} || :'
    ACTION='if [[ $FZF_SELECT_COUNT -eq 0 ]]; then
                echo {1} +{2}
            else
                echo {+1}
            fi'

    fzf --disabled --ansi --border-label=" Search in $PWD " \
        --preview-window "+{2}/2" \
        --bind "start:$RELOAD" --bind "change:$RELOAD" \
        --bind "enter:become:$ACTION" \
        --delimiter :
}

fzf-file-widget() {
    if [[ -n $1 ]]; then
        local selected="$(__fzf_select__ $1)"
    else
        local selected="$(__fzf_ripgrep__)"
    fi
    READLINE_LINE="${READLINE_LINE:0:$READLINE_POINT}$selected${READLINE_LINE:$READLINE_POINT}"
    READLINE_POINT=$(( READLINE_POINT + ${#selected} ))
}

# readline bindings to paste the selected file path into the command line
# CTRL-f CTRL-g - Start rg search from the current dir.
bind -m vi-command -x '"\C-f\C-g": fzf-file-widget'
bind -m vi-insert -x '"\C-f\C-g": fzf-file-widget'
# CTRL-f CTRL-f - Start search from the current dir.
bind -m vi-command -x '"\C-f\C-f": fzf-file-widget $HOME'
bind -m vi-insert -x '"\C-f\C-f": fzf-file-widget $HOME'
# CTRL-f CTRL-r - Start search from the root dir.
bind -m vi-command -x '"\C-f\C-r": fzf-file-widget /'
bind -m vi-insert -x '"\C-f\C-r": fzf-file-widget /'
# CTRL-/ - Start search from the home dir.
bind -m vi-command -x '"\C-_": fzf-file-widget $PWD'
bind -m vi-insert -x '"\C-_": fzf-file-widget $PWD'
