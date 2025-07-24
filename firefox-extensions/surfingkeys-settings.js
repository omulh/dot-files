/* GENERAL SETTINGS */
settings.focusFirstCandidate = true;
settings.defaultSearchEngine = "d";
settings.historyMUOrder = false;
api.Hints.setCharacters('qwfpbarstgzxcdv');

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
// HELP
api.unmap('<Alt-i>'); // enter passthrough mode
api.unmap(';ql'); // show last action
// MOUSE CLICK
api.unmap('<Ctrl-h>'); // mouse over elements
api.unmap('<Ctrl-i>'); // go to edit box with vim editor
api.unmap('<Ctrl-j>'); // mouse out elements
api.unmap(';di'); // * download image
api.unmap(';m'); // mouse out last element
api.unmap('af'); // * open a link in active new tab
api.unmap('C'); // * open a link in non-active new tab
api.unmap('cf'); // * open multiple links in a new tab
api.unmap('f'); // * open a link
api.unmap('gf'); // * open a link in non-active new tab
api.unmap('I'); // go to edit box with vim editor
api.unmap('q'); // * click on an image or a button
api.unmap('[['); // click on the 'previous' link
api.unmap(']]'); // click on the 'next' link
// SCROLL PAGE / ELEMENT
api.unmap(';w'); // focus top window
api.unmap('e'); // * scroll half page up
api.unmap('h'); // * scroll left
api.unmap('j'); // * scroll down
api.unmap('k'); // * scroll up
api.unmap('l'); // * scroll right
api.unmap('P'); // * scroll full page down
// TABS
api.unmap('<Alt-m>'); // mute/unmute current tab
api.unmap('<Alt-p>'); // pin/unpin current tab
api.unmap('E'); // * go one tab left
api.unmap('gxp'); // close playing tab
api.unmap('gxt'); // * close tab on left
api.unmap('gxT'); // * close tab on right
api.unmap('R'); // * go one tab right
api.unmap('yT'); // * duplicate current tab in background
api.unmap('<<'); // * move current tab to left
api.unmap('>>'); // * move current tab to right
// PAGE NAVIGATION
api.unmap('<Ctrl-6>'); // * go to last used tab
api.unmap('B'); // go one tab history back
api.unmap('D'); // * go forward in history
api.unmap('F'); // go one tab history forward
api.unmap('gp'); // go to the playing tab
api.unmap('gt'); // go to last activated tab
api.unmap('gT'); // go to first activated tab
api.unmap('r'); // * reload the page
api.unmap('S'); // * go back in history
// SESSIONS
api.unmap('ZR'); // restore last session
api.unmap('ZQ'); // quit
api.unmap('ZZ'); // save session and quit
// SEARCH SELECTED WITH
api.unmap('sb'); // baidu
api.unmap('sd'); // duckduckgo
api.unmap('se'); // wikipedia
api.unmap('sg'); // google
api.unmap('sh'); // stackoverflow
api.unmap('ss'); // github
api.unmap('sw'); // bing
api.unmap('sy'); // youtube
// CLIPBOARD
api.unmap(';pp'); // paste html on current page
api.unmap(';pj'); // restore settings data from clipboard
api.unmap(';pf'); // fill form with data from yf
api.unmap(';cq'); // clear all URLs in queue to be opened
api.unmap('cc'); // open selected link or link from clipboard
api.unmap('cq'); // query word with Hints
api.unmap('ya'); // * copy a link URL to the clipboard
api.unmap('yd'); // copy current downloading URL
api.unmap('yf'); // copy form data in JSON on current page
api.unmap('yg'); // capture current page
api.unmap('yG'); // capture current full page
api.unmap('yh'); // copy current page's host
api.unmap('yj'); // copy current settings
api.unmap('yl'); // copy current page's title
api.unmap('yma'); // * copy multiple link URLs to the clipboard
api.unmap('yp'); // copy form data for POST on current page
api.unmap('yq'); // copy pretext
api.unmap('yQ'); // copy all query history of OmniQuery
api.unmap('ys'); // copy current page's source
api.unmap('yS'); // capture scrolling element
api.unmap('yy'); // copy current page's URL
api.unmap('yY'); // copy all tabs' URL
// OMNIBAR
api.unmap('ab'); // bookmark current page to selected folder
api.unmap('b'); // * open a bookmark
api.unmap('go'); // * open a URL in current tab
api.unmap('H'); // open opened URL in current tab
api.unmap('ob'); // open search with alias b
api.unmap('od'); // open search with alias d
api.unmap('oe'); // open search with alias e
api.unmap('og'); // open search with alias g
api.unmap('oi'); // * open incognito window
api.unmap('om'); // open URL from vim-like marks
api.unmap('os'); // open search with alias s
api.unmap('ow'); // open search with alias w
api.unmap('ox'); // * open recently closed URL
api.unmap('oy'); // open search with alias y
api.unmap('t'); // * open a URL
api.unmap('Q'); // open omnibar for word translation
// VISUAL MODE
api.unmap('n') // next found text
api.unmap('N') // previous found text
api.vunmap('q'); // translate selected text with google
api.vunmap('t'); // translate word under cursor
api.unmap('zv'); // enter visual mode, and select whole element
api.unmap('/') // find in current page
api.unmap('*'); // find selected text in current page
api.vunmap('*'); // search word under the cursor
// VIM-LIKE MARKS
api.unmap("<Ctrl-'>"); // jump to vim-like mark in new tab
api.unmap("'"); // jump to vim-like mark
api.unmap('m'); // add current URL to vim-like marks
// SETTINGS
// CHROME URLS
api.unmap(';e'); // edit Settings
api.unmap(';j'); // close download shelf
api.unmap(';pm'); // preview markdown
api.unmap('gs'); // view page source
// MISC
api.unmap(';db'); // delete bookmark
api.unmap(';dh'); // delete history
api.unmap(';ph'); // put tab histories
api.unmap(';t'); // translate selected text
api.unmap(';yh'); // yank tab histories
// INSTER MODE
api.iunmap('<Alt-b>'); // move the cursor Backward 1 word
api.iunmap('<Alt-d>'); // delete a word forwards
api.iunmap('<Alt-f>'); // move the cursor Forward 1 word
api.iunmap('<Ctrl-i>'); // open vim editor for current input
api.iunmap('<Alt-w>'); // delete a word backwards
api.iunmap('<Ctrl-e>'); // move the cursor to the end of the line
api.iunmap('<Ctrl-f>'); // move the cursor to the beginning of the line
api.iunmap("<Ctrl-'>"); // toggle quotes in an input element


/* NEW KEY MAPPINGS */

// HELP
api.mapkey('<Alt-p>', '#0Enter passthrough mode', function() {
    api.Normal.passThrough();
});
// Non-disabled default bindings
// <Alt-s>  toggle SurfingKeys on current site
// .        repeat last action
// p        enter ephemeral passthrough mode
// ?        show usage

// MOUSE CLICK
api.mapkey(',di', '#1Download image', function() {
    api.Hints.create('img', function(element) {
        api.RUNTIME('download', {
            url: element.src
        });
    });
});
api.mapkey('fb', '#1Open a link in a non-active new tab', function() {
    api.Hints.create("", api.Hints.dispatchMouseClick, {tabbed: true, active: false});
});
api.mapkey('ff', '#1Open a link', function() {
    api.Hints.create("", api.Hints.dispatchMouseClick);
});
api.mapkey('fi', '#1Click on an Image or a button', function() {
    api.Hints.create("img, button", api.Hints.dispatchMouseClick);
});
api.mapkey('fm', '#1Open multiple links in a new tab', function() {
    api.Hints.create("", api.Hints.dispatchMouseClick, {multipleHits: true});
});
api.mapkey('ft', '#1Open a link in an active new tab', function() {
    api.Hints.create("", api.Hints.dispatchMouseClick, {tabbed: true, active: true});
});
api.map('fr', 'O'); // open detected links from text
api.unmap('O'); // open detected links from text
api.map('h', 'i'); // go to edit box
api.unmap('i'); // go to edit box
api.map('gh', 'gi'); // go to the first edit box
api.unmap('gi'); // go to the first edit box
api.map('sf', ';fs'); // display hints to focus scrollable elements
api.unmap(';fs'); // display hints to focus scrollable elements
// Non-disabled default bindings

// SCROLL PAGE / ELEMENT
api.mapkey(',w', '#2Focus top window', function() {
    top.focus();
});
api.mapkey('D', '#2Scroll full page down', function() {
    api.Normal.scroll("fullPageDown");
}, {repeatIgnore: true});
api.mapkey('e', '#2Scroll up', function() {
    api.Normal.scroll("up");
}, {repeatIgnore: true});
api.mapkey('i', '#2Scroll right', function() {
    api.Normal.scroll("right");
}, {repeatIgnore: true});
api.mapkey('m', '#2Scroll left', function() {
    api.Normal.scroll("left");
}, {repeatIgnore: true});
api.mapkey('n', '#2Scroll down', function() {
    api.Normal.scroll("down");
}, {repeatIgnore: true});
api.map('sr', 'cS'); // reset scroll target
api.unmap('cS'); // reset scroll target
api.map('ss', 'cs'); // change scroll target
api.unmap('cs'); // change scroll target
// Non-disabled default bindings
// d   scroll half page down
// G   scroll to the bottom of the page
// gg  scroll to the top of the page
// U   scroll full page up
// u   scroll half page up
// w   switch frames
// 0   scroll all the way to the left
// $   scroll all the way to the right
// %   scroll to percentage of current page

// TABS
api.map(',gt', ';gt'); // gather filtered tabs into current window
api.unmap(';gt'); // gather filtered tabs into current window
api.map(',gw', ';gw'); // gather all tabs into current window
api.unmap(';gw'); // gather all tabs into current window
api.mapkey('gxj', '#3Close tab on left', function() {
    api.RUNTIME("closeTabLeft");
});
api.mapkey('gxy', '#3Close tab on right', function() {
    api.RUNTIME("closeTabRight");
});
api.mapkey('J', '#3Go one tab left', function() {
    api.RUNTIME("previousTab");
}, {repeatIgnore: true});
api.map('tn', 'on'); // open newtab
api.unmap('on'); // open newtab
api.map('tt', 'T'); // choose a tab
api.unmap('T'); // choose a tab
api.mapkey('Y', '#3Go one tab right', function() {
    api.RUNTIME("nextTab");
}, {repeatIgnore: true});
api.mapkey('yb', '#3Duplicate current tab in background', function() {
    api.RUNTIME("duplicateTab", {active: false});
});
api.mapkey('<', '#3Move current tab to left', function() {
    api.RUNTIME('moveTab', {step: -1});
});
api.mapkey('>', '#3Move current tab to right', function() {
    api.RUNTIME('moveTab', {step: 1});
});
// Non-disabled default bindings
// gxx  close all tabs except current one
// gx0  close all tabs on left
// gx$  close all tabs on right
// g0   go to the first tab
// g$   go to the last tab
// W    move current tab to another window
// x    close current tab
// X    restore closed tab
// yt   duplicate current tab
// zi   zoom in
// zo   zoom out
// zr   zoom reset

// PAGE NAVIGATION
api.map(',u', ';u'); // edit current URL with vim editor and open in new tab
api.unmap(';u'); // edit current URL with vim editor and open in new tab
api.map(',U', ';U'); // edit current URL with vim editor and reload
api.unmap(';U'); // edit current URL with vim editor and reload
api.mapkey('I', '#4Go forward in history', function() {
    history.go(1);
}, {repeatIgnore: true});
api.mapkey('L', '#3Go to last used tab', function() {
    api.RUNTIME("goToLastTab");
});
api.mapkey('M', '#4Go back in history', function() {
    history.go(-1);
}, {repeatIgnore: true});
api.mapkey('R', '#4Reload the page', function() {
    api.RUNTIME("reloadTab", { nocache: false });
});
// Non-disabled default bindings
// gU  go to root of current URL hierarchy
// gu  go up one path in the URL
// g#  reload current page without hash fragment
// g?  reload current page without query string(all parts after question mark)

// SESSIONS
// Non-disabled default bindings

// SEARCH SELECTED WITH
// Non-disabled default bindings

// CLIPBOARD
api.mapkey('yf', '#7Copy a link URL to the clipboard', function() {
    api.Hints.create('*[href]', function(element) {
        api.Clipboard.write(element.href);
    });
});
api.mapkey('ymf', '#7Copy multiple link URLs to the clipboard', function() {
    var linksToYank = [];
    api.Hints.create('*[href]', function(element) {
        linksToYank.push(element.href);
        api.Clipboard.write(linksToYank.join('\n'));
    }, {multipleHits: true});
});
api.mapkey('yu', "#7Copy current page's URL", function() {
    var url = window.location.href;
    if (url.indexOf(chrome.runtime.getURL("/pages/pdf_viewer.html")) === 0) {
        const filePos = window.location.search.indexOf("=") + 1;
        url = window.location.search.substr(filePos);
    }
    api.Clipboard.write(url);
});
// Non-disabled default bindings
// yc   copy a column of a table
// yi   yank text of an input
// ymc  copy multiple columns of a table
// ymv  yank text of multiple elements
// yv   yank text of an element

// OMNIBAR
api.mapkey('ob', '#8Open a bookmark in current tab', function() {
    api.Front.openOmnibar({type: "Bookmarks", tabbed: false});
});
api.mapkey('oh', '#8Open URL from history in current tab', function() {
    api.Front.openOmnibar({type: "History", tabbed: false});
});
api.mapkey('oi', '#3Open new incognito window', function() {
    api.RUNTIME("openIncognito");
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
// Non-disabled default bindings
// :            open commands
// <Ctrl-c>     copy selected item url or all listed item urls
// <Ctrl-d>     delete focused item from bookmark or history
// <Ctrl-D>     delete all listed items from bookmark or history
// <Ctrl-i>     edit selected URL with vim editor, then open
// <Ctrl-j>     toggle Omnibar's position
// <Ctrl-m>     create vim-like mark for selected item
// <Ctrl-n>     forward cycle through the candidates
// <Ctrl-p>     backward cycle through the candidates
// <Ctrl-r>     re-sort history by visitCount or lastVisitTime
// <Ctrl-'>     toggle quotes in an input element
// <Ctrl-,>     show results of previous page
// <Ctrl-.>     show results of next page
// <ArrowDown>  forward cycle through the candidates
// <ArrowUp>    backward cycle through the candidates
// <Esc>        close Omnibar
// <Shift-Tab>  backward cycle through the candidates
// <Tab>        forward cycle through the candidates

// VISUAL MODE
api.vmap('i', 'l'); // forward character
api.vunmap('l'); // forward character
api.vmap('l', 'e'); // forward word
api.vunmap('e'); // forward word
api.vmap('e', 'k'); // backward line
api.vunmap('k'); // backward line
api.vmap('m', 'h'); // backward character
api.vunmap('h'); // backward character
api.vmap('n', 'j'); // forward line
api.vunmap('j'); // forward line
api.vmap('<ArrowLeft>', 'm'); // backward character
api.vmap('<ArrowDown>', 'n'); // forward line
api.vmap('<ArrowUp>', 'e'); // backward line
api.vmap('<ArrowRight>', 'i'); // forward character
// Non-disabled default bindings
// <Ctrl-d>       forward 20 lines
// <Ctrl-u>       backward 20 lines
// ,              repeat latest f, F in opposite direction
// ;              repeat latest f, F
// b              backward word
// F              backward to next char
// f              forward to next char
// G              forward documentboundary
// gg             backward documentboundary
// o              go to Other end of highlighted text
// p              expand selection to parent element
// V              restore visual mode
// V              select a word(w) or line(l) or sentence(s) or paragraph(p)
// v              toggle visual mode
// w              forward word
// zb             make cursor at bottom of window
// zt             make cursor at top of window
// zz             make cursor at center of window
// 0              backward lineboundary
// {              backward paragraphboundary
// }              forward paragraphboundary
// $              forward lineboundary
// (              backward sentence
// )              forward sentence
// <Enter>        click on node under cursor
// <Shift-Enter>  click on node under cursor

// VIM-LIKE MARKS
// Non-disabled default bindings

// SETTINGS
// Non-disabled default bindings

// CHROME URLS
// Non-disabled default bindings

// MISC
// Non-disabled default bindings

// INSTER MODE
// Non-disabled default bindings
// <Ctrl-u>  delete all entered characters before the cursor
// <Esc>     exit insert mode


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
