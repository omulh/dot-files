__fzf_select__() {
    if [[ $1 == 'CWD' ]]; then
        selection=$(fzf --border-label=" Search in $PWD ")
        pre=''
    elif [[ $1 == 'ROOT' ]]; then
        selection=$(fd . --hidden --no-ignore --base-directory / | fzf --border-label=" Search in / ")
        pre='/'
    elif [[ $1 == 'HOME' ]]; then
        selection=$(fd . --hidden --no-ignore --base-directory $HOME | fzf --border-label=" Search in $HOME ")
        pre='~/'
    fi
    if [[ -n $selection ]]; then
        echo "$selection" |
        while read -r item; do
            # prepend dir. and escape special chars
            printf "$pre%q " "$item"
        done
    fi
}

fzf-file-widget() {
    local selected="$(__fzf_select__ $1)"
    READLINE_LINE="${READLINE_LINE:0:$READLINE_POINT}$selected${READLINE_LINE:$READLINE_POINT}"
    READLINE_POINT=$(( READLINE_POINT + ${#selected} ))
}

# CTRL-/ - Paste the selected file path into the command line
bind -m vi-command -x '"\C-_": fzf-file-widget'
bind -m vi-insert -x '"\C-_": fzf-file-widget'
