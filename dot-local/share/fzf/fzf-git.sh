# Based on https://github.com/junegunn/fzf-git.sh
# removing unneeded parts and with
# some tweaks to match my config

__fzf_git_pager() {
    local pager
    pager="${GIT_PAGER:-$(git config --get core.pager 2> /dev/null)}"
    echo "${pager:-cat}"
}

if [[ $1 = --list ]]; then
    shift
    if [[ $# -eq 1 ]]; then
        branches() {
            git branch "$@" --sort=-committerdate --sort=-HEAD --format=$'%(HEAD) %(color:yellow)%(refname:short) %(color:green)(%(committerdate:relative))\t%(color:blue)%(subject)%(color:reset)' --color=always | column -ts$'\t'
        }
        hashes() {
            git log --date=short --format="%C(green)%C(bold)%cd %C(auto)%h%d %s (%an)" --graph --color=always "$@" $LIST_OPTS
        }
        case "$1" in
            branches)
                branches
                ;;
            all-branches)
                branches -a
                ;;
            hashes)
                hashes
                ;;
            all-hashes)
                hashes --all
                ;;
            *) exit 1 ;;
        esac
    elif [[ $# -gt 1 ]]; then
        set -e

        branch=$(git rev-parse --abbrev-ref HEAD 2> /dev/null)
        if [[ $branch = HEAD ]]; then
            branch=$(git describe --exact-match --tags 2> /dev/null || git rev-parse --short HEAD)
        fi

        # Only supports GitHub URLs
        case "$1" in
            commit)
                hash=$(grep -o "[a-f0-9]\{7,\}" <<< "$2" | head -n 1)
                path=/commit/$hash
                ;;
            branch|remote-branch)
                branch=$(sed 's/^[* ]*//' <<< "$2" | cut -d' ' -f1)
                remote=$(git config branch."${branch}".remote || echo 'origin')
                branch=${branch#$remote/}
                path=/tree/$branch
                ;;
            remote)
                remote=$2
                path=/tree/$branch
                ;;
            file) path=/blob/$branch/$(git rev-parse --show-prefix)$2 ;;
            tag)  path=/releases/tag/$2 ;;
            *) exit 1 ;;
        esac

        remote=${remote:-$(git config branch."${branch}".remote || echo 'origin')}
        remote_url=$(git remote get-url "$remote" 2> /dev/null || echo "$remote")

        if [[ $remote_url =~ ^git@ ]]; then
            url=${remote_url%.git}
            url=${url#git@}
            url=https://${url/://}
        elif [[ $remote_url =~ ^http ]]; then
            url=${remote_url%.git}
        fi

        mime-open -q "$url$path"
        exit 0
    fi
fi

if [[ $- =~ i ]] || [[ $1 = --run ]]; then

    if [[ $__fzf_git_fzf ]]; then
        eval "$__fzf_git_fzf"
    else
        # Redefine this function to change the options
        _fzf_git_fzf() {
            fzf --multi \
                --preview-window 'right,50%,hidden' \
                --bind 'ctrl-p:change-preview-window(nohidden|down,border-top|)' "$@"
        }
    fi

    _fzf_git_check() {
        git rev-parse HEAD > /dev/null 2>&1 && return
        return 1
    }

    __fzf_git=${BASH_SOURCE[0]}
    __fzf_git=$(readlink -f "$__fzf_git" 2> /dev/null)

    _fzf_git_files() {
        _fzf_git_check || return

        local root query
        root=$(git rev-parse --show-toplevel)
        [[ $root != "$PWD" ]] && query='!../ '

        (git -c color.status=always status --short --no-branch
        git ls-files "$root" | grep -vxFf <(git status -s | grep '^[^?]' | cut -c4-; echo :) | sed 's/^/   /') |
            _fzf_git_fzf -m --ansi --nth 2..,.. \
            --border-label ' Git Files 📁 ' \
            --footer 'CTRL-W (open in web browser) ╱ CTRL-O (open in editor)' \
            --bind "ctrl-w:execute-silent:bash \"$__fzf_git\" --list file {-1}" \
            --bind "ctrl-o:execute:${EDITOR:-vim} {-1} > /dev/tty" \
            --query "$query" \
            --preview "git diff --no-ext-diff --color=always -- {-1} | $(__fzf_git_pager); pistol {-1}" "$@" |
            cut -c4- | sed 's/.* -> //'
    }

    _fzf_git_branches() {
        _fzf_git_check || return

        local footer="CTRL-W (open in web browser) ╱ CTRL-R (reveal all branches)
CTRL-G (change to git hashes)"
        local alt_footer="CTRL-W (open in web browser) ╱ CTRL-F (accept without remote)
CTRL-G (change to git hashes)"

        bash "$__fzf_git" --list branches |
            __fzf_git_fzf=$(declare -f _fzf_git_fzf) _fzf_git_fzf --ansi \
            --border-label ' Git Branches 🌲 ' \
            --footer "$footer" \
            --tiebreak begin \
            --preview-window 'down,border-top,hidden' \
            --color hl:underline,hl+:underline \
            --no-hscroll \
            --bind 'ctrl-p:change-preview-window(nohidden|)' \
            --bind "ctrl-w:execute-silent:bash \"$__fzf_git\" --list branch {}" \
            --bind "ctrl-r:change-border-label( All Branches 🌳 )+change-footer($alt_footer)+reload:bash \"$__fzf_git\" --list all-branches" \
            --bind "ctrl-g:become:LIST_OPTS=\$(cut -c3- <<< {} | cut -d' ' -f1) bash \"$__fzf_git\" --run ghashes" \
            --bind "ctrl-f:become:printf '%s\n' {+} | cut -c3- | sed 's@[^/]*/@@'" \
            --preview "git log --oneline --graph --date=short --color=always --pretty='format:%C(auto)%cd %h%d %s' \$(cut -c3- <<< {} | cut -d' ' -f1) --" "$@" |
            sed 's/^\* //' | awk '{print $1}' # Slightly modified to work with hashes as well
    }

    _fzf_git_tags() {
        _fzf_git_check || return

        git tag --sort -version:refname |
            _fzf_git_fzf \
            --border-label ' Git Tags 🏷️ ' \
            --footer 'CTRL-W (open in web browser)' \
            --bind "ctrl-w:execute-silent:bash \"$__fzf_git\" --list tag {}" \
            --preview "git show --color=always {} | $(__fzf_git_pager)" "$@"
    }

    _fzf_git_ghashes() {
        _fzf_git_check || return

        local footer="CTRL-W (open in web browser) ╱ CTRL-F (show diff)
CTRL-S (toggle sorting) ╱ CTRL-R (reveal all hashes)"
        local alt_footer="CTRL-W (open in web browser) ╱ CTRL-F (show diff)
CTRL-S (toggle sorting)"

        bash "$__fzf_git" --list hashes |
            _fzf_git_fzf --ansi --no-sort --bind 'ctrl-s:toggle-sort' \
            --border-label ' Git Hashes 📙 ' \
            --footer "$footer" \
            --bind "ctrl-w:execute-silent:bash \"$__fzf_git\" --list commit {}" \
            --bind "ctrl-f:execute:grep -o '[a-f0-9]\{7,\}' <<< {} | head -n 1 | xargs \
                git -c pager.diff='/usr/share/git/diff-highlight/diff-highlight | less -cR' diff --color=always > /dev/tty" \
            --bind "ctrl-r:change-border-label( All Hashes 📚 )+change-footer($alt_footer)+reload:bash \"$__fzf_git\" --list all-hashes" \
            --color hl:underline,hl+:underline \
            --preview "grep -o '[a-f0-9]\{7,\}' <<< {} | head -n 1 | xargs git show --color=always | $(__fzf_git_pager)" "$@" |
            awk 'match($0, /[a-f0-9][a-f0-9][a-f0-9][a-f0-9][a-f0-9][a-f0-9][a-f0-9][a-f0-9]*/) { print substr($0, RSTART, RLENGTH) }'
    }

    _fzf_git_remotes() {
        _fzf_git_check || return

        git remote -v | awk '{print $1 "\t" $2}' | uniq |
            _fzf_git_fzf --tac \
            --border-label ' Git Remotes 📡 ' \
            --footer 'CTRL-W (open in web browser)' \
            --preview-window 'down,border-top,hidden' \
            --bind 'ctrl-p:change-preview-window(nohidden|)' \
            --bind "ctrl-w:execute-silent:bash \"$__fzf_git\" --list remote {1}" \
            --preview "git log --oneline --graph --date=short --color=always --pretty='format:%C(auto)%cd %h%d %s' '{1}/$(git rev-parse --abbrev-ref HEAD)' --" "$@" |
            cut -d$'\t' -f1
    }

    _fzf_git_stashes() {
        _fzf_git_check || return

        git stash list | _fzf_git_fzf \
            --border-label ' Git Stashes 🚧 ' \
            --footer 'CTRL-X (drop stash)' \
            --bind 'ctrl-x:reload(git stash drop -q {1}; git stash list)' \
            -d: --preview "git show --color=always {1} | $(__fzf_git_pager)" "$@" |
            cut -d: -f1
    }
fi

if [[ $1 = --run ]]; then
    shift
    type=$1
    shift
    eval "_fzf_git_$type" "$@"
elif [[ $- =~ i ]]; then
    __fzf_git_init() {
        bind -m emacs-standard '"\er":  redraw-current-line'
        bind -m emacs-standard '"\C-z": vi-editing-mode'
        bind -m vi-command     '"\C-z": emacs-editing-mode'
        bind -m vi-insert      '"\C-z": emacs-editing-mode'

        local o c
        for o in "$@"; do
            c=${o:0:1}
            bind -m emacs-standard '"\C-g\C-'$c'": " \C-u \C-a\C-k`_fzf_git_'$o'`\e\C-e\C-y\C-a\C-y\ey\C-h\C-e\er\C-h"'
            bind -m vi-command     '"\C-g\C-'$c'": "\C-z\C-g\C-'$c'\C-z"'
            bind -m vi-insert      '"\C-g\C-'$c'": "\C-z\C-g\C-'$c'\C-z"'
            bind -m emacs-standard '"\C-g'$c'":    " \C-u \C-a\C-k`_fzf_git_'$o'`\e\C-e\C-y\C-a\C-y\ey\C-h\C-e\er\C-h"'
            bind -m vi-command     '"\C-g'$c'":    "\C-z\C-g'$c'\C-z"'
            bind -m vi-insert      '"\C-g'$c'":    "\C-z\C-g'$c'\C-z"'
        done
    }
    __fzf_git_init files branches tags remotes ghashes stashes
fi
