from libqtile.config import Match
from libqtile.widget import TextBox

terminal = "foot"

### GEOMETRIES ###
margin = 6
marginWide = 150
border = 3
borderThin = 2

### COLORS ###
# Purple shades, from darker to lighter
purples = ["342640","413050","4e3960","5b4370","684d80","75568f","9b80b3","cdbfd9","ece6f2"]
# Black shades, from darker to lighter
shadows = ["171717","232323","2f2f2f","3b3b3b","474747","535353","5f5f5f","6b6b6b"]
# Other colors
black = "000000"
white = "ffffff"
red = "f23232"

### FONTS ###
symbolsPropo = "Symbols Nerd Font"
monoMedium = "Roboto Mono Medium"
monoNormal = "Roboto Mono"

### FLOAT WINDOW RULES ###
floatRules = [
    Match(wm_class=terminal, title="Calc"),
    Match(wm_class=terminal, title="Calcurse"),
    Match(wm_class=terminal, title="Peaclock"),
    Match(wm_class="com.github.maoschanz.drawing", title="Preferences"),
    Match(wm_class="com.github.maoschanz.drawing", title="Image Properties"),
    Match(wm_class="com.github.maoschanz.drawing", title="<no name>"),
    Match(wm_class="com.github.maoschanz.drawing", title="Open a picture"),
    Match(wm_class="com.github.maoschanz.drawing", title="Import a picture"),
    Match(wm_class="com.github.maoschanz.drawing", title="Save picture as…"),
    Match(wm_class="com.github.maoschanz.drawing", title="Print"),
    Match(wm_class="firefox", title="Enter name of file to save to…"),
    Match(wm_class="firefox", title="File Upload"),
    Match(wm_class="firefox", title="Library"),
    Match(wm_class="firefox", title="Print"),
    Match(wm_class="firefox", title="Save As"),
    Match(wm_class="firefox", title="Save Image"),
    Match(wm_class="nm-connection-editor"),
    Match(wm_class="protonvpn-app"),
    Match(wm_class="soffice"),
    Match(wm_class="system-config-printer"),
    Match(func=lambda c: c.has_fixed_size()),
    Match(func=lambda c: c.has_fixed_ratio()),
]

### FUNCTIONS ###
def truncate_long_window_name(text):
    if text.find("Mozilla Firefox") != -1:
        text = "Mozilla Firefox"
    return text

def slash_sep(leftSide, colorLeft, colorRight):
    icon = "󱨉" if leftSide == True else "󱨊"
    return TextBox(
        icon, width=18, padding=0,
        font=symbolsPropo, fontsize=110, fontshadow=None,
        foreground=colorRight, background=colorLeft)
