```css
  _,-._                              ,   ,
 / \_/ \   ┏┓     ╹    ┓   ┏•┓      { \w/ }
 >-(_)-<   ┃┃┏┳┓┓┏ ┏  ┏┫┏┓╋╋┓┃┏┓┏    `>!<`
 \_/ \_/   ┗┛┛╹┗┗┻ ┛  ┗┻┗┛┗┛┗┗┗ ┛    (/^\)
   `-'                               '   '
```

### Setup

`$ git clone https://github.com/omulh/dot-files ~/`  
`$ cd ~/dot-files`  
`$ stow -v .`  

#### Manually copying files

Some programs do not play well with symlinks as their config. files.  
Those config. files are ignored by the stow command and should be copied manually.  

`$ cp dot-config/fcitx5/* ~/.config/fcitx5/`  
`$ cp dot-config/htop/* ~/.config/htop/`  

This also means that any changes to such config. files has to be manually updated in the dotfiles repo.  
