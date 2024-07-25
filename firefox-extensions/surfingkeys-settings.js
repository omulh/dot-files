/* GENERAL SETTINGS */
settings.focusFirstCandidate = true;
settings.defaultSearchEngine = "d";
settings.historyMUOrder = false;

/* REMOVE DEFAULT SEARCH ALIASES */
api.removeSearchAlias('b'); // baidu
api.removeSearchAlias('d'); // duckduckgo
api.removeSearchAlias('e'); // wikipedia
api.removeSearchAlias('g'); // google
api.removeSearchAlias('h'); // github
api.removeSearchAlias('s'); // stackoverflow
api.removeSearchAlias('w'); // bing
api.removeSearchAlias('y'); // youtube

// Add duckduckgo alias with no search suggestions
api.addSearchAlias('ddg', 'duckduckgo', 'https://duckduckgo.com/?q=');

/* DISABLE SOME DEFAULT KEY MAPPINGS */
// Help
api.unmap(';ql'); // show last action
// Mouse click
api.unmap('af'); // open a link in active new tab
api.unmap('C'); // open a link in non-active new tab
api.unmap('cf'); // open multiple links in a new tab
api.unmap('gf'); // open a link in non-active new tab
api.unmap('I'); // go to edit box with vim editor
api.unmap('q'); // click on an image or a button
api.unmap(';m'); // mouse out last element
api.unmap('<Ctrl-h>'); // mouse over elements
api.unmap('<Ctrl-j>'); // mouse out elements
// Scroll page / Element
api.unmap('e'); // scroll half page up
api.unmap('P'); // scroll full page down
// Tabs
api.unmap('E'); // go one tab left
api.unmap('gxt'); // close tab on left
api.unmap('gxT'); // close tab on right
api.unmap('R'); // go one tab right
api.unmap('<Alt-m>'); // mute/unmute current tab
api.unmap('<Alt-p>'); // pin/unpin current tab
// Page navigation
api.unmap('B'); // go one tab history back
api.unmap('D'); // go forward in history
api.unmap('F'); // go one tab history forward
api.unmap('gp'); // go to the playing tab
api.unmap('gt'); // go to last activated tab
api.unmap('gT'); // go to first activated tab
api.unmap('r'); // reload the page
api.unmap('S'); // go back in history
api.unmap('<Ctrl-6>'); // go to last used tab
// Sessions
api.unmap('ZR'); // restore last session
api.unmap('ZZ'); // save session and quit
api.unmap('ZQ'); // quit
// Search selected with
api.unmap('sb'); // baidu
api.unmap('sd'); // duckduckgo
api.unmap('se'); // wikipedia
api.unmap('sg'); // google
api.unmap('sh'); // stackoverflow
api.unmap('ss'); // github
api.unmap('sw'); // bing
api.unmap('sy'); // youtube
// Clipboard
api.unmap('cc'); // open selected link or link from clipboard
api.unmap('cq'); // query word with Hints
api.unmap('yc'); // copy a column of a table
api.unmap('yd'); // copy current downloading URL
api.unmap('yf'); // copy form data in JSON on current page
api.unmap('yh'); // copy current page's host
api.unmap('yj'); // copy current settings
api.unmap('yl'); // copy current page's title
api.unmap('ymc'); // copy multiple columns of a table
api.unmap('yp'); // copy form data for POST on current page
api.unmap('yq'); // copy pretext
api.unmap('yQ'); // copy all query history of OmniQuery
api.unmap('ys'); // copy current page's source
api.unmap('yS'); // capture scrolling element
api.unmap('yY'); // copy all tabs' URL
api.unmap(';pp'); // paste html on current page
api.unmap(';pj'); // restore settings data from clipboard
api.unmap(';pf'); // fill form with data from yf
api.unmap(';cq'); // clear all URLs in queue to be opened
// Omnibar
api.unmap('b'); // open a bookmark
api.unmap('go'); // open a URL in current tab
api.unmap('H'); // open opened URL in current tab
api.unmap('ob'); // open search with alias b
api.unmap('od'); // open search with alias d
api.unmap('oe'); // open search with alias e
api.unmap('og'); // open search with alias g
api.unmap('oi'); // open incognito window
api.unmap('om'); // open URL from vim-like marks
api.unmap('os'); // open search with alias s
api.unmap('ow'); // open search with alias w
api.unmap('ox'); // open recently closed URL
api.unmap('oy'); // open search with alias y
api.unmap('t'); // open a URL
api.unmap('Q'); // open omnibar for word translation
// Visual mode
api.vunmap('q'); // translate selected text with google
api.vunmap('t'); // translate word under cursor
// vim-like marks
api.unmap('m'); // add current URL to vim-like marks
api.unmap("'"); // jump to vim-like mark
api.unmap("<Ctrl-'>"); // jump to vim-like mark in new tab
// Settings
// Chrome URLs
api.unmap('gs'); // view page source
api.unmap(';j'); // close download shelf
// Misc
api.unmap(';db'); // delete bookmark
api.unmap(';dh'); // delete history
api.unmap(';ph'); // put tab histories
api.unmap(';t'); // translate selected text
api.unmap(';yh'); // yank tab histories
// Inster mode
api.iunmap("<ctrl-'>"); // toggle quotes in an input element


/* NEW KEY MAPPINGS */

// Mouse click
api.mapkey('bf', '#1Open a link in non-active new tab', function() {
    api.Hints.create("", api.Hints.dispatchMouseClick, {tabbed: true, active: false});
});
api.mapkey('F', '#1Open a link in active new tab', function() {
    api.Hints.create("", api.Hints.dispatchMouseClick, {tabbed: true, active: true});
});
api.mapkey('gf', '#1Click on an Image or a button', function() {
    api.Hints.create("img, button", api.Hints.dispatchMouseClick);
});
api.mapkey('mf', '#1Open multiple links in a new tab', function() {
    api.Hints.create("", api.Hints.dispatchMouseClick, {multipleHits: true});
});
api.mapkey('tf', '#1Open a link in active new tab', function() {
    api.Hints.create("", api.Hints.dispatchMouseClick, {tabbed: true, active: true});
});
api.map('rf', 'O'); // open detected links from text
api.unmap('O'); // open detected links from text

// Scroll page / Element
api.mapkey('D', '#2Scroll full page down', function() {
    api.Normal.scroll("fullPageDown");
}, {repeatIgnore: true});

// Tabs
api.mapkey('B', '#3Go to last used tab', function() {
    api.RUNTIME("goToLastTab");
});
api.mapkey('gp', '#3Go to the playing tab', function() {
    api.RUNTIME('getTabs', { queryInfo: {audible: true}}, response => {
        if (response.tabs?.at(0)) {
            tab = response.tabs[0]
            api.RUNTIME('focusTab', {
                windowId: tab.windowId,
                tabId: tab.id
            });
        }
    })
}, { repeatIgnore: true });
api.mapkey('gxJ', '#3Close tab on right', function() {
    api.RUNTIME("closeTabRight");
});
api.mapkey('gxK', '#3Close tab on left', function() {
    api.RUNTIME("closeTabLeft");
});
api.mapkey('J', '#3Go one tab right', function() {
    api.RUNTIME("nextTab");
}, {repeatIgnore: true});
api.mapkey('K', '#3Go one tab left', function() {
    api.RUNTIME("previousTab");
}, {repeatIgnore: true});
api.mapkey('oi', '#3Open new incognito window', function() {
    api.RUNTIME("openIncognito");
});
api.map('tn', 'on'); // open newtab
api.unmap('on'); // open newtab
api.map('tt', 'T'); // choose a tab
api.unmap('T'); // choose a tab

// Page navigation
api.mapkey('H', '#4Go back in history', function() {
    history.go(-1);
}, {repeatIgnore: true});
api.mapkey('L', '#4Go forward in history', function() {
    history.go(1);
}, {repeatIgnore: true});
api.mapkey('R', '#4Reload the page', function() {
    api.RUNTIME("reloadTab", { nocache: false });
});

// Omnibar
api.mapkey('ob', '#8Open a bookmark in current tab', function() {
    api.Front.openOmnibar({type: "Bookmarks", tabbed: false});
});
api.mapkey('oh', '#8Open URL from history in current tab', function() {
    api.Front.openOmnibar({type: "History", tabbed: false});
});
api.mapkey('os', '#8Open search with duckduckgo in current tab', function() {
    api.Front.openOmnibar({type: "SearchEngine", extra: 'ddg', tabbed: false});
});
api.mapkey('ox', '#8Open recently closed URL in current tab', function() {
    api.Front.openOmnibar({type: "RecentlyClosed", tabbed: false});
});
api.mapkey('tb', '#8Open a bookmark in active new tab', function() {
    api.Front.openOmnibar({type: "Bookmarks", tabbed: true});
});
api.mapkey('th', '#8Open URL from history in active new tab', function() {
    api.Front.openOmnibar({type: "History", tabbed: true});
});
api.mapkey('ts', '#8Open search with duckduckgo in active new tab', function() {
    api.Front.openOmnibar({type: "SearchEngine", extra: 'ddg', tabbed: true});
});
api.mapkey('tx', '#8Open recently closed URL in active new tab', function() {
    api.Front.openOmnibar({type: "RecentlyClosed", tabbed: true});
});


/* SET THEME */
settings.theme = `
.sk_theme {
    font-family: Input Sans Condensed, Charcoal, sans-serif;
    font-size: 10pt;
    background: #24272e;
    color: #abb2bf;
}
.sk_theme tbody {
    color: #fff;
}
.sk_theme input {
    color: #d0d0d0;
}
.sk_theme .url {
    color: #61afef;
}
.sk_theme .annotation {
    color: #56b6c2;
}
.sk_theme .omnibar_highlight {
    color: #528bff;
}
.sk_theme .omnibar_timestamp {
    color: #e5c07b;
}
.sk_theme .omnibar_visitcount {
    color: #98c379;
}
.sk_theme #sk_omnibarSearchResult ul li:nth-child(odd) {
    background: #303030;
}
.sk_theme #sk_omnibarSearchResult ul li.focused {
    background: #3e4452;
}
#sk_status, #sk_find {
    font-size: 20pt;
}`;
