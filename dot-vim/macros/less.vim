" Vim script to work like "less"

" Avoid loading this file twice, allow the user to define his own script.
if exists("loaded_less")
    finish
endif
let loaded_less = 1

" If not reading from stdin, skip files that can't be read.
" Exit if there is no file at all.
if argc() > 0
    let s:i = 0
    while 1
        if filereadable(argv(s:i))
            if s:i != 0
                sleep 3
            endif
            break
        endif
        if isdirectory(argv(s:i))
            echomsg "Skipping directory " . argv(s:i)
        elseif getftime(argv(s:i)) < 0
            echomsg "Skipping non-existing file " . argv(s:i)
        else
            echomsg "Skipping unreadable file " . argv(s:i)
        endif
        echo "\n"
        let s:i = s:i + 1
        if s:i == argc()
            quit
        endif
        next
    endwhile
endif

" we don't want 'compatible' here
if &cp
    set nocp
endif

" enable syntax highlighting if not done already
if !get(g:, 'syntax_on', 0)
    syntax enable
endif

set so=0
set hlsearch
set incsearch
nohlsearch
" Don't remember file names and positions
set viminfo=
set nows
" Inhibit screen updates while searching
let s:lz = &lz
set lz

" Allow the user to define a function, which can set options specifically for
" this script.
if exists('*LessInitFunc')
    call LessInitFunc()
endif

" Used after each command: display position
noremap <SID>L :redraw<CR>:file<CR>

" When reading from stdin don't consider the file modified.
au VimEnter * set nomod

" Can't modify the text or write the file.
set nomodifiable readonly

" Give help
noremap h :call <SID>Help()<CR>
fun! s:Help()
  echo "                                  SUMMARY OF COMMANDS"
  echo "---------------------------------------------------------------------------------------"
  echo "<C-f>          One page forward        <C-b>          One page backward"
  echo "<C-d>          Half a page forward     <C-u>          Half a page backward"
  echo "n,<C-n>,<C-e>  One line forward        e,<C-p>,<C-y>  One line backward"
  echo "G              End of file             gg             Start of file"
  echo "N%,Np,NP       Go to N percent of file"
  echo "\n"
  echo "/pattern       Search for pattern      ?pattern       Search backward for pattern"
  echo "j              next pattern match      J              Previous pattern match"
  if &foldmethod != "manual"
    echo "\n"
    echo "zR             open all folds          zm             increase fold level"
  endif
  echo "\n"
  echo ":n<Enter>      Next file               :p<Enter>      Previous file"
  echo "\n"
  echo "q              Quit"
  echo "\n"
  let i = input("Hit Enter to continue")
endfun

" Unmap some editing commands
nnoremap a <Nop>
nnoremap A <Nop>
xnoremap A <Nop>
nnoremap c <Nop>
xnoremap c <Nop>
nnoremap C <Nop>
xnoremap C <Nop>
nnoremap d <Nop>
xnoremap d <Nop>
nnoremap D <Nop>
xnoremap D <Nop>
nnoremap i <Nop>
nnoremap I <Nop>
xnoremap I <Nop>
nnoremap o <Nop>
nnoremap O <Nop>
nnoremap s <Nop>
xnoremap s <Nop>
nnoremap S <Nop>
xnoremap S <Nop>
nnoremap u <Nop>
xnoremap u <Nop>
nnoremap U <Nop>
xnoremap U <Nop>
nnoremap x <Nop>
xnoremap x <Nop>
nnoremap X <Nop>
xnoremap X <Nop>

" Scroll one page forward
noremap <script> <Space> :call <SID>NextPage()<CR><SID>L
map <C-F> <Space>
map <PageDown> <Space>
map <kPageDown> <Space>
map <S-Down> <Space>
" If 'foldmethod' was changed keep the "z" commands, e.g. "zR" to open all
" folds.
if &foldmethod == "manual"
    map z <Space>
endif
map <Esc><Space> <Space>
fun! s:NextPage()
    if line(".") == line("$")
        if argidx() + 1 >= argc()
            " Don't quit at the end of the last file
            return
        endif
        next
        1
    else
        exe "normal! \<C-F>"
    endif
endfun

" Scroll half a page forward
noremap <script> <C-D> <C-D><SID>L

" Scroll one line forward
noremap <script> <CR> <C-E><SID>L
map n <CR>
map <C-N> <CR>
map <C-E> <CR>

" Scroll one page backward
noremap <script> <C-B> <C-B><SID>L
map <PageUp> <C-B>
map <kPageUp> <C-B>
map <S-Up> <C-B>

" Scroll half a page backward
noremap <script> <C-U> <C-U><SID>L

" Scroll one line backward
noremap <script> e <C-Y><SID>L
map <C-Y> e
map <C-P> e

" Redraw
noremap <script> r <C-L><SID>L
noremap <script> <C-R> <C-L><SID>L
noremap <script> R <C-L><SID>L

" Start of file
noremap <script> gg gg<SID>L
map < gg
map <Esc>< gg
map <Home> gg
map <kHome> gg

" End of file
noremap <script> G G<SID>L
map > G
map <Esc>> G
map <End> G
map <kEnd> G

" Go to percentage
noremap <script> % %<SID>L
map p %
map P %

" Search
noremap <script> / H$:call <SID>Forward()<CR>/
if &wrap
    noremap <script> ? H0:call <SID>Backward()<CR>?
else
    noremap <script> ? Hg0:call <SID>Backward()<CR>?
endif

fun! s:Forward()
    " Searching forward
    noremap <script> j H$nzt<SID>L
    if &wrap
        noremap <script> J H0Nzt<SID>L
    else
        noremap <script> J Hg0Nzt<SID>L
    endif
    cnoremap <silent> <script> <CR> <CR>:cunmap <lt>CR><CR>zt<SID>L
endfun

fun! s:Backward()
    " Searching backward
    if &wrap
        noremap <script> j H0nzt<SID>L
    else
        noremap <script> j Hg0nzt<SID>L
    endif
    noremap <script> J H$Nzt<SID>L
    cnoremap <silent> <script> <CR> <CR>:cunmap <lt>CR><CR>zt<SID>L
endfun

call s:Forward()
cunmap <CR>

" Quitting
noremap q :q<CR>

" vim: sw=2
