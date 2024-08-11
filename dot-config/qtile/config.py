# Copyright (c) 2010 Aldo Cortesi
# Copyright (c) 2010, 2014 dequis
# Copyright (c) 2012 Randall Ma
# Copyright (c) 2012-2014 Tycho Andersen
# Copyright (c) 2012 Craig Barnes
# Copyright (c) 2013 horsik
# Copyright (c) 2013 Tao Sauvage
#
# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to deal
# in the Software without restriction, including without limitation the rights
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:
#
# The above copyright notice and this permission notice shall be included in
# all copies or substantial portions of the Software.

#*-----------------------*#
#*   qtile's config.py   *#
#*-----------------------*#

# Qtile imports
from libqtile.backend.wayland import InputConfig
from libqtile import bar, hook, layout, widget
from libqtile.config import Drag, Group, Screen
from libqtile.config import EzKey as Key
from libqtile.lazy import lazy
# Python libs
import subprocess
# My constants
import constants as mc


### AUTOSTART PROCESSES ###

@hook.subscribe.startup_once
def autostart():
    # Start some background processes
    subprocess.Popen("kanshi > ~/.local/share/kanshi/session.log 2>&1 &", shell=True)
    subprocess.Popen("dunst &", shell=True)
    subprocess.Popen("udiskie &", shell=True)
    subprocess.Popen("swayidle -w &", shell=True)
    subprocess.Popen("inotifywait -qme MODIFY '/sys/class/leds/asus::kbd_backlight/brightness_hw_changed' | \
                     while read; do notify-kbd-brightness; done &", shell=True)


### KEY BINDINGS ###

keys = [
    # Sound control
    Key("<XF86AudioMute>",
        lazy.spawn("wpctl set-mute @DEFAULT_AUDIO_SINK@ toggle && notify-volume", shell=True),
        desc="Toggle mute state of the default audio sink and show a hint notification",
    ),
    Key("<XF86AudioRaiseVolume>",
        lazy.spawn("wpctl set-volume @DEFAULT_AUDIO_SINK@ 2%+ -l 1.20 && notify-volume", shell=True),
        desc="Increase volume of the default audio sink by 2% and show a hint notification",
    ),
    Key("<XF86AudioLowerVolume>",
        lazy.spawn("wpctl set-volume @DEFAULT_AUDIO_SINK@ 2%- && notify-volume", shell=True),
        desc="Decrease volume of the default audio sink by 2% and show a hint notification",
    ),
    Key("<XF86AudioMicMute>",
        lazy.spawn("wpctl set-mute @DEFAULT_AUDIO_SOURCE@ toggle && notify-mic-state", shell=True),
        desc="Toggle mute state of the default audio source and show a hit notification",
    ),

    # Screen brightness control
    Key("<XF86MonBrightnessUp>",
        lazy.spawn("brightnessctl -q -d intel_backlight -e1.4 set +5% && notify-scr-brightness", shell=True),
        desc="Increase screen brightness by 5% and show a hint notification",
    ),
    Key("<XF86MonBrightnessDown>",
        lazy.spawn("brightnessctl -q -d intel_backlight -e1.4 -n6 set 5%- && notify-scr-brightness", shell=True),
        desc="Decrease screen brightness by 5% and show a hint notification",
    ),
    
    # Keyboard layout control
    Key("M-<space>",
        lazy.widget["keyboardlayout"].next_keyboard(),
        lazy.spawn("notify-kbd-layout"),
        desc="Change to the next keyboard layout and show a hint notification",
    ),

    # Spawn a command with the prompt widget
    Key("M-S-r", lazy.spawncmd(),
        desc="Spawn a command using a prompt widget",
    ),

    # Spawn some apps and menus
    Key("M-<Return>",
        lazy.spawn(mc.terminal),
        desc="Launch a new terminal window",
    ),
    Key("M-r",
        lazy.spawn("fuzzel && rm ~/.cache/fuzzel", shell=True),
        desc="Launch a fuzzel application launcher",
    ),
    Key("M-b",
        lazy.spawn("firefox"),
        desc="Launch Firefox web browser",
    ),
    Key("M-e",
        lazy.spawn(f"{mc.terminal} lf"),
        desc="Launch an lf file explorer window",
    ),
    Key("M-<equal>",
        lazy.spawn(f"{mc.terminal} -W 65x19 -T Calc calc"),
        desc="Launch a calculator terminal app",
    ),
    Key("M-p",
        lazy.spawn(f"{mc.terminal} display-setup-helper"),
        desc="Open a terminal with wlr-randr hints",
    ),
    Key("<XF86Launch1>",
        lazy.spawn("set-power-profile"),
        desc="Launch a fuzzel power profile selection menu",
    ),
    Key("M-C-q",
        lazy.spawn("power-menu"),
        desc="Launch a fuzzel power menu",
    ),
    Key("M-C-a",
        lazy.spawn("set-audio-output"),
        desc="Launch a fuzzel audio output selection menu",
    ),
    Key("M-S-a",
        lazy.spawn("set-audio-input"),
        desc="Launch a fuzzel audio input selection menu",
    ),
    Key("M-<period>",
        lazy.spawn("fuzzmoji"),
        desc="Launch a fuzzel emoji selection menu",
    ),

    # Capture screenshots
    Key("M-<Print>",
        lazy.spawn("screenshot-full"),
        desc="Save and copy to clipboard a screenshot of the full screen",
    ),
    Key("M-s",
        lazy.spawn("screenshot-crop"),
        desc="Save and copy to clipboard a screenshot of a selected area of the screen",
   ),

    # Switch focus between windows
    Key("M-h", lazy.layout.left(), desc="Move focus to left"),
    Key("M-l", lazy.layout.right(), desc="Move focus to right"),
    Key("M-j", lazy.layout.down(), desc="Move focus down"),
    Key("M-k", lazy.layout.up(), desc="Move focus up"),
    Key("M-n", lazy.group.next_window(), desc="Move focus to next window"),

    # Change the position of the windows
    Key("M-S-h", lazy.layout.shuffle_left(), desc="Move window to the left"),
    Key("M-S-l", lazy.layout.shuffle_right(), desc="Move window to the right"),
    Key("M-S-j", lazy.layout.shuffle_down(), desc="Move window down"),
    Key("M-S-k", lazy.layout.shuffle_up(), desc="Move window up"),

    # Change the size of the windows
    Key("M-C-h", lazy.layout.grow_left(), desc="Grow window to the left"),
    Key("M-C-l", lazy.layout.grow_right(), desc="Grow window to the right"),
    Key("M-C-j", lazy.layout.grow_down(), desc="Grow window down"),
    Key("M-C-k", lazy.layout.grow_up(), desc="Grow window up"),
    Key("M-C-n", lazy.layout.normalize(), desc="Reset all window sizes"),

    # Window and layout control
    Key("M-w", lazy.window.kill(), desc="Kill the focused window"),
    Key("M-t", lazy.window.toggle_floating(), desc="Toggle floating on the focused window"),
    Key("M-f", lazy.window.toggle_fullscreen(), desc="Toggle fullscreen on the focused window"),
    Key("M-S-f", lazy.layout.toggle_split(), desc="Toggle between split and unsplit stacks"),
    Key("M-<Tab>", lazy.next_layout(), desc="Cycle between layouts"),

    # Reload the configuration
    Key("M-S-q", lazy.reload_config(), desc="Reload the Qtile configuration"),
]


### WINDOW GROUPS ###

groupLabels = ["󰈹","󰝰","󰆍","󱓟",""]
groups = [Group(name=str(i+1), label=icon) for i,icon in enumerate(groupLabels)]

# Groups key bindings
for group in groups:
    keys.extend(
        [
            Key(f"M-{group.name}",
                lazy.group[group.name].toscreen(),
                desc="Switch screen focus to the indicated group",
            ),
            Key(f"M-C-{group.name}",
                lazy.window.togroup(group.name),
                desc="Move focused window to the indicated group",
            ),
            Key(f"M-S-{group.name}",
                lazy.window.togroup(group.name, switch_group=True),
                desc="Move focused window and switch screen focus to the indicated group",
            ),
        ]
    )


### WINDOW LAYOUTS ###

# Layouts to cycle through
layouts = [
    layout.Columns(
        initial_ratio=1.2,
        border_on_single=True,
        border_width=mc.border,
        border_normal=mc.purples[0], border_focus=mc.purples[6],
        border_normal_stack=mc.purples[3], border_focus_stack=mc.purples[7],
        margin=mc.margin, margin_on_single=[mc.margin, mc.marginWide, mc.margin, mc.marginWide],
    ),
    layout.Max(
        only_focused=True,
        border_width=mc.border,
        border_normal=mc.purples[0], border_focus=mc.purples[6],
    ),
]

# Floating window layout
floating_layout = layout.Floating(
    float_rules=mc.floatRules,
    border_width=mc.borderThin,
    border_normal=mc.purples[0], border_focus=mc.purples[6],
)


### WIDGETS ###

widget_defaults = dict(
    font=mc.monoMedium,
    fontsize=14,
    fontshadow=mc.black,
    padding=2,
    foreground=mc.purples[8],
)

widget_list = [
    # Current layout icon
    widget.CurrentLayoutIcon(
        scale=0.85,
        padding=6,
        foreground=mc.purples[7], background=mc.purples[0],
    ),

    # Group box
    widget.GroupBox(
        disable_drag=True, toggle=False, use_mouse_wheel=False,
        highlight_method="line",
        highlight_color=[mc.purples[2], mc.purples[4]], this_current_screen_border=mc.purples[7],
        active=mc.purples[8], inactive=mc.purples[3],
        urgent_alert_method="border", urgent_border="ce0695",
        padding=0,
        background=mc.purples[1],
        font=mc.symbolsPropo, fontsize=19,
    ),
    mc.slash_sep(True, mc.purples[1], mc.purples[2]),

    # Prompt
    widget.Prompt(
        bell_style=None, record_history=False,
        cursor_color=mc.purples[6],
        font=mc.monoNormal, fontshadow=None,
        foreground=mc.white, background=mc.purples[2],
    ),
    mc.slash_sep(True, mc.purples[2], mc.purples[6]),

    # Window name
    widget.WindowName(
        parse_text=mc.truncate_long_window_name,
        fontshadow=mc.shadows[5],
        foreground=mc.white, background=mc.purples[6],
    ),

    # Show every widget that might be empty in a single 'colored section'
    mc.slash_sep(False, mc.purples[6], mc.purples[5]),
    # Status notifier, aka 'systray'
    widget.StatusNotifier(
        icon_size=18,
        padding=5,
        background=mc.purples[5],
    ),
    # MPRIS controls
    widget.Mpris2(
        name="wMpris2",
        format="",
        playing_text="󰲸 󰏤",
        paused_text="󰲸 󰐊",
        stopped_text="",
        no_metadata_text="",
        font=mc.symbolsPropo, fontsize=23,
        mouse_callbacks={
            'Button1': lazy.widget["wMpris2"].play_pause(),
            'Button3': lazy.widget["wMpris2"].stop(),
            'Button4': None,
            'Button5': None,
        },
        scroll=False,
        padding=5,
        foreground="cfdfef", background=mc.purples[5],
    ),
    # Current power profile
    widget.GenPollCommand(
        name="wPowerProfilePoll",
        cmd="get-power-profile-icon",
        update_interval=1.0,
        font=mc.symbolsPropo, fontsize=22,
        padding=5,
        foreground="a6adc8", background=mc.purples[5],
    ),

    # Network status
    mc.slash_sep(False, mc.purples[5], mc.purples[4]),
    widget.Wlan(
        format="󱚽",
        ethernet_message="󰌗",
        disconnected_message="󱛅",
        use_ethernet=True,
        interface="wlo1",
        ethernet_interface="eth0",
        update_interval=1.0,
        font=mc.symbolsPropo, fontsize=20,
        background=mc.purples[4],
    ),

    # Volume level
    mc.slash_sep(False, mc.purples[4], mc.purples[3]),
    widget.Volume(
        emoji=True,
        emoji_list=['','','',''],
        update_interval=0.5,
        font=mc.symbolsPropo, fontsize=18,
        background=mc.purples[3],
    ),
    widget.Volume(
        mute_format='M',
        unmute_format='{volume}%',
        mouse_callbacks={'Button3': lazy.spawn("set-audio-output")},
        update_interval=0.2,
        background=mc.purples[3],
    ),

    # Battery level
    mc.slash_sep(False, mc.purples[3], mc.purples[2]),
    widget.Battery(
        format="{char}",
        show_short_text=False,
        full_char="󱟣", not_charging_char="󱟣", charge_char="󰢟", discharge_char="󱟟", empty_char="󱟩",
        low_percentage=0.10, low_foreground=mc.red,
        update_interval=1.0,
        font=mc.symbolsPropo, fontsize=22,
        background=mc.purples[2],
    ),
    widget.Battery(
        format="{percent:2.0%}",
        show_short_text=False,
        low_percentage=0.10, low_foreground=mc.red,
        update_interval=1.0,
        notify_below=10, notification_timeout=0,
        background=mc.purples[2],
    ),

    # Keyboard layout
    mc.slash_sep(False, mc.purples[2], mc.purples[1]),
    widget.TextBox(
        "󰥻",
        font=mc.symbolsPropo, fontsize=24,
        background=mc.purples[1],
    ),
    widget.KeyboardLayout(
        fmt="[{}]",
        configured_keyboards=["us","es","de"],
        option="caps:escape_shifted_capslock",
        background=mc.purples[1],
    ),

    # Date
    mc.slash_sep(False, mc.purples[1], mc.purples[0]),
    widget.Clock(
        format="%Y/%m/%d",
        mouse_callbacks={'Button3': lazy.spawn(f"{mc.terminal} -W 90x35 -T Calcurse calcurse")},
        padding=6,
        background=mc.purples[0],
    ),
    # Clock
    widget.Clock(
        format="%H:%M",
        mouse_callbacks={'Button3': lazy.spawn(f"{mc.terminal} -W 65x13 -T Peaclock peaclock")},
        padding=6,
        background=mc.purples[0],
    ),
    widget.Spacer(
        length=6,
        background=mc.purples[0],
    ),
]


### SCREENS ###

screens = [
    Screen(
        top = bar.Bar(widget_list, 26, margin = [0, 0, mc.margin, 0]),
        right = bar.Gap(mc.margin),
        left = bar.Gap(mc.margin),
        bottom = bar.Gap(mc.margin),
        wallpaper = "~/Images/Wallpapers/black-landscape-wp.png",
        wallpaper_mode = "fill",
    ),
]


### MOUSE CONFIGURATION ###

mouse = [
    Drag(["mod4"], "Button1", lazy.window.set_position_floating(), start=lazy.window.get_position()),
    Drag(["mod4"], "Button3", lazy.window.set_size_floating(), start=lazy.window.get_size()),
]


### OTHER CONFIGURATIONS ###

auto_fullscreen = True
bring_front_click = "floating_only"
cursor_warp = False
dgroups_key_binder = None
dgroups_app_rules = []
#floats_kept_above = True (currently X11 only)
focus_on_window_activation = "urgent"
follow_mouse_focus = False
reconfigure_screens = True
auto_minimize = True


### INPUT DEVICES ###

wl_input_rules = {
    "type:keyboard":    InputConfig(
                            kb_options = "caps:escape_shifted_capslock",
                            kb_repeat_delay = 370,
                            kb_repeat_rate = 25
                        ),
    "type:touchpad":    InputConfig(
                            dwt = True,
                            tap = True,
                            drag = True,
                            drag_lock = False,
                            natural_scroll = False,
                            tap_button_map = "lrm",
                            accel_profile = "adaptive",
                            scroll_method = "two_finger",
                            click_method = "button_areas"
                        ),
}
