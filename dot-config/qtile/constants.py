from libqtile.config import Match, MatchAll, MatchAny
from libqtile.widget import TextBox
import re

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
    Match(wm_class="nm-connection-editor"),
    Match(wm_class="protonvpn-app"),
    Match(wm_class="soffice"),
    Match(func=lambda c: c.has_fixed_size()),
    Match(func=lambda c: c.has_fixed_ratio()),
    MatchAll(
        Match(wm_class="com.github.maoschanz.drawing"),
        MatchAny(
            Match(title="<no name>"),
            Match(title="Image properties"),
            Match(title="Import a picture"),
            Match(title="Open a picture"),
            Match(title="Preferences"),
            Match(title="Print"),
            Match(title="Save picture as…"),
        ),
    ),
    MatchAll(
        Match(wm_class="firefox"),
        ~Match(title=re.compile(r".*Mozilla Firefox.*")),
    ),
    MatchAll(
        Match(wm_class="Gimp-2.10"),
        ~Match(title="GNU Image Manipulation Program"),
        ~Match(title=re.compile(r".* – GIMP$")),
    ),
    MatchAll(
        Match(wm_class="simple-scan"),
        ~Match(title="Document Scaner"),
    ),
    MatchAll(
        Match(wm_class="system-config-printer"),
        ~Match(title=re.compile(r"Print Settings.*")),
    ),
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
