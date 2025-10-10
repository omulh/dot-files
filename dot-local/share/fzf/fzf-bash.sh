__fzf_select__() {
    local dir=$(realpath "$1")
    local label=" Search files in $dir 📁 "

    selection=$(
        fd . --hidden --no-ignore-vcs --base-directory "$dir" | \
        fzf --border-label "$label" \
            --preview-window 'right,50%,hidden' \
            --bind 'ctrl-p:change-preview-window(nohidden|down,border-top|)' \
            --preview '$HOME/.vim/plugged/fzf.vim/bin/preview.sh {}' \
    )

    if [[ -n $selection ]]; then
        echo "$selection" |
        while read -r item; do
            # escape special chars and prepend dir. if needed
            if [[ $2 == --as-is ]]; then
                printf "%q " "$item"
            else
                if [[ $dir == / ]]; then
                    printf "$dir%q " "$item"
                else
                    printf "$dir/%q " "$item"
                fi
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

    fzf --disabled --ansi --border-label " Grep files in $PWD 📂 " \
        --preview-window '+{2}/2,right,50%,hidden' \
        --bind 'ctrl-p:change-preview-window(nohidden|down,border-top|)' \
        --bind "start:$RELOAD" --bind "change:$RELOAD" \
        --bind "enter:become:$ACTION" \
        --preview '$HOME/.vim/plugged/fzf.vim/bin/preview.sh {}' \
        --delimiter :
}

__fzf_history__() {
    local output script

    script='BEGIN { getc; $/ = "\n\t"; $HISTCOUNT = $ENV{last_hist} + 1 } s/^[ *]//; s/\n/\n\t/gm; print $HISTCOUNT - $. . "\t$_" if !$seen{$_}++'
    output=$(
        set +o pipefail
        builtin fc -lnr -2147483648 |
        last_hist=$(HISTTIMEFORMAT='' builtin history 1) command perl -n -l0 -e "$script" |
        fzf --read0 --nth 2.. --scheme history --no-multi --query "$READLINE_LINE" \
            --wrap --wrap-sign '	↳' --footer 'CTRL-S (toggle sorting)' \
            --border-label " Search the command history 📋 " \
            --bind 'ctrl-s:toggle-sort'
    ) || return

    READLINE_LINE=$(command perl -pe 's/^\d*\t//' <<< "$output")
    if [[ -z "$READLINE_POINT" ]]; then
        echo "$READLINE_LINE"
    else
        READLINE_POINT=0x7fffffff
    fi
}

fzf-file-widget() {
    local selection
    if [[ -n $1 ]]; then
        selection="$(__fzf_select__ "$@")"
    else
        selection="$(__fzf_ripgrep__)"
    fi
    READLINE_LINE="${READLINE_LINE:0:$READLINE_POINT}$selection${READLINE_LINE:$READLINE_POINT}"
    READLINE_POINT=$(( READLINE_POINT + ${#selection} ))
}

# readline bindings to paste the selected item into the command line
# CTRL-f CTRL-g - Search the contents of files in the current dir.
bind -m vi-command -x '"\C-f\C-g": fzf-file-widget'
bind -m vi-insert -x '"\C-f\C-g": fzf-file-widget'
# CTRL-f CTRL-f - Search files starting from the home dir.
bind -m vi-command -x '"\C-f\C-f": fzf-file-widget $HOME'
bind -m vi-insert -x '"\C-f\C-f": fzf-file-widget $HOME'
# CTRL-f CTRL-r - Search files starting from the root dir.
bind -m vi-command -x '"\C-f\C-r": fzf-file-widget /'
bind -m vi-insert -x '"\C-f\C-r": fzf-file-widget /'
# CTRL-/ - Search files starting from the current dir.
bind -m vi-command -x '"\C-_": fzf-file-widget $PWD --as-is'
bind -m vi-insert -x '"\C-_": fzf-file-widget $PWD --as-is'
# CTRL-R - Search commands in bash's command hisory
bind -m vi-command -x '"\C-r": __fzf_history__'
bind -m vi-insert -x '"\C-r": __fzf_history__'
