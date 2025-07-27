__fzf_select__() {
  $(echo "fzf") |
    while read -r item; do
      printf '%q ' "$item"  # escape special chars
    done
}

fzf-file-widget() {
  local selected="$(__fzf_select__)"
  READLINE_LINE="${READLINE_LINE:0:$READLINE_POINT}$selected${READLINE_LINE:$READLINE_POINT}"
  READLINE_POINT=$(( READLINE_POINT + ${#selected} ))
}

# CTRL-/ - Paste the selected file path into the command line
bind -m vi-command -x '"\C-_": fzf-file-widget'
bind -m vi-insert -x '"\C-_": fzf-file-widget'
