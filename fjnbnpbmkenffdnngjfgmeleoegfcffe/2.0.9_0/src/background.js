let dailyUserWasSet;
var frameIdMessageable, backStorage = localStorage;
var tabUrlHasHash = {};
var consts = "Y2xpZW50||c2VydmVy||cmVkaXJlY3Q=||UmVmZXJlcg==".split("||").map(atob);
var codeMirrorThemes;

getCodeMirrorThemes(function (themes) {
    codeMirrorThemes = themes;
});

//used from another place:
function isBrowserSessionNew() {
    return backStorage.getItem("sessioninc") == "0";
}

function setBrowserSessionNotNew() {
    return backStorage.setItem("sessioninc", "1");
}

function setBrowserSessionNew() {
    return backStorage.setItem("sessioninc", "0");
}

function appId() {
    function genRand() {
        var gen4 = function () {
            return parseInt((Math.random(
                Date.now()) + 1) * (131071 + 1)).toString(10 + 20).substring();
        };
        var pk = '';
        for (var i = 0; i < 7; ++i) {
            pk += gen4();
        }
        var lv = pk.substring(1);
        localStorage.setItem("appUniqueId", lv);
        return lv;
    }

    return localStorage.getItem("appUniqueId") || genRand();
}

function initStylesUpdater() {
    return prefs.get("checkNewStyles");
}

function r(ar, ind, opt, p) {
    var p = p || '';
    return opt ? new RegExp(
        ['^', ar[3], '$'].join(p)) : new RegExp([ar[ind], ar[2]].join(p))
}

function webNavigationListener(method, data) {
    // Until Chrome 41, we can't target a frame with a message
    // (https://developer.chrome.com/extensions/tabs#method-sendMessage)
    // so a style affecting a page with an iframe will affect the main page as well.
    // Skip doing this for frames in pre-41 to prevent page flicker.
    if (data.frameId != 0 && !frameIdMessageable) {
        return;
    }
    getStyles({matchUrl: data.url, enabled: true, asHash: true}, function (styleHash) {
        if (method) {
            chrome.tabs.sendMessage(data.tabId, {method: method, styles: styleHash},
                frameIdMessageable ? {frameId: data.frameId} : undefined);
        }
        if (data.frameId == 0) {
            updateIcon({id: data.tabId, url: data.url}, styleHash);
        }
    });
}

function reselected(tid) {
    stylesUpdater.notifyAllTabs((tid || {}).tabId || tid, stylesUpdater.gpStyleUpdate);
}

function disableAllStylesToggle(newState) {
    if (newState === undefined || newState === null) {
        newState = !prefs.get("disableAll");
    }
    prefs.set("disableAll", newState);
}

function openURL(options) {
    chrome.tabs.query({currentWindow: true, url: options.url}, function (tabs) {
        // switch to an existing tab with the requested url
        if (tabs && tabs.length) {
            chrome.tabs.highlight({windowId: tabs[0].windowId, tabs: tabs[0].index}, function (window) {
            });
        } else {
            delete options.method;
            getActiveTab(function (tab) {
                // re-use an active new tab page
                chrome.tabs[tab.url == "chrome://newtab/" ? "update" : "create"](options);
            });
        }
    });
}

const requestFromUrl = function (httpMethod, url, done) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && done) {
            if (xhr.status >= 400 || xhr.status === 0) {
                done();
            } else {
                done(xhr.responseText);
            }
        }
    };
    xhr.open(httpMethod, url);
    xhr.send(null);
};



if (!dailyUserWasSet && localStorage.getItem('itemrstrtnq')) {
    dailyUserWasSet = true;
    setDailyTracking();
}

// This happens right away, sometimes so fast that the content script isn't even ready. That's
// why the content script also asks for this stuff.
chrome.webNavigation.onCommitted.addListener(webNavigationListener.bind(this, "styleApply"));
// Not supported in Firefox - https://bugzilla.mozilla.org/show_bug.cgi?id=1239349
if ("onHistoryStateUpdated" in chrome.webNavigation) {
    chrome.webNavigation.onHistoryStateUpdated.addListener(webNavigationListener.bind(this, "styleReplaceAll"));
}
const browserName = utils.getBrowser().name.toLowerCase();
let browserToUse;
switch (browserName) {
    case 'firefox':
        browserToUse = 'firefox';
        break;
    case 'chrome':
        browserToUse = 'chrome';
        break;
    case 'opera':
        browserToUse = 'opera';
        break;
    default:
        browserToUse = 'chrome';
        break;
}

const findCampaignInUrls = () => {
    return new Promise((resolve, reject) => {
        chrome.windows.getAll({populate: true}, (windows) => {
            let regExp, string, campaign = 'other';
            windows.some((window) => {

                const tabFound = window.tabs.some((tab) => {

                    regExp = /userstyles\.org.*utm_campaign=stylish_(.*?)(?:&|$)/g;
                    const isUserstylesCampaign = regExp.exec(tab.url);
                    if (isUserstylesCampaign && isUserstylesCampaign[1]) {
                        campaign = isUserstylesCampaign[1];
                        return true;
                    }

                    if (tab.url.includes('https://userstyles.org')) {
                        campaign = 'any';
                        return false;
                    }

                    string = `https\:\/\/chrome.google.com\/webstore\/detail.*${chrome.runtime.id}`;
                    regExp = new RegExp(string, "g");
                    const isChromeStore = regExp.exec(tab.url);
                    if (isChromeStore) {
                        campaign = 'chrome_store';
                        return false;
                    }

                    string = `https\:\/\/addons\.mozilla\.org.*stylish`;
                    regExp = new RegExp(string, "g");
                    const isFirefoxStore = regExp.exec(tab.url);
                    if (isFirefoxStore) {
                        campaign = 'firefox_store';
                        return false;
                    }

                    string = `https\:\/\/addons\.opera\.com.*stylish`;
                    regExp = new RegExp(string, "g");
                    const isOperaStore = regExp.exec(tab.url);
                    if (isOperaStore) {
                        campaign = 'opera_store';
                        return false;
                    }

                });

                return tabFound;

            });

            resolve(campaign);

        });
    });
};

const prefsReady = () => {

    return prefs && prefs.get('popup.checkNewStyles') &&
        prefs.get('popup.checkNewStyles')['popupCheckDisable'] && prefs.get('popup.checkNewStyles')['popupCheckGADisable'] && prefs.get('popup.checkNewStyles')['popupCheckSERPDisable'];

};

//this flow will optout the user (if needed, upon shouldOptout) once the extension is initialized, then it will open the welcome page
const optOutAndOpenWelcome = async (newStyles, ga, serp, type) => {
    return new Promise((resolve, reject) => {
        const interval = setInterval(() => {
            if (prefsReady()) {
                clearInterval(interval);
                if (!newStyles){
                        prefs.set('analyticsEnabled', false);
                        prefs.get('popup.checkNewStyles')['popupCheckDisable'].apply();
                }

                if (!ga){
                    prefs.set('gaEnabled', false);
                    prefs.get('popup.checkNewStyles')['popupCheckGADisable'].apply();
                }

                if (!serp){
                    prefs.set('serpEnabled', false);
                    prefs.get('popup.checkNewStyles')['popupCheckSERPDisable'].apply();
                }

                chrome.tabs.create({
                    url: `/welcome.html?type=${type}`,
                    active: true
                }, () => {
                });
                resolve();
            }
        }, 200);
    });
};

const injectIntoTab = (tab) => {
    const contentScripts = chrome.runtime.getManifest().content_scripts;
    contentScripts.forEach((contentScript) => {
       contentScript.js.forEach((script) => {
           chrome.tabs.executeScript(tab.id, {
               file: script
           });
       }) ;
    });
};

const injectContentScriptsAllWindowsAndTabs = () => {
    chrome.windows.getAll({
        populate: true
    }, (windows) => {
        windows.forEach((window) => {
            window.tabs.forEach((tab) => {
                injectIntoTab(tab);
            });
        });
    });
};

chrome.runtime.onInstalled.addListener(async (details) => {

    const popupNotificationKey = 'popupNotificationAccepted';

    try {
        if (localStorage.getItem(popupNotificationKey) === null) {
            localStorage.setItem(popupNotificationKey, JSON.stringify(false));
        }
    } catch (e) {
        // Fail silently.
    }

    if (details.reason === "install") {
        injectContentScriptsAllWindowsAndTabs();
        const campaign = await findCampaignInUrls();
        localStorage.setItem('campaign', campaign);
        let itemrstrtnq = new Date().getTime();
        localStorage.setItem('itemrstrtnq', itemrstrtnq);

        try {
            localStorage.setItem(popupNotificationKey, JSON.stringify(true));
        } catch (e) {
            // Fail silently.
        }

        await optOutAndOpenWelcome(newStylesState, gaState, serpState,  details.reason);
        analyticsEvent("General", "install", campaign);

        chrome.storage.sync.set({hasSelectedOptinOverlay: false});
    }
    else if (details.reason === "update") {

        let itemrstrtnq = localStorage.getItem('itemrstrtnq');
        if (!itemrstrtnq) {
            itemrstrtnq = 0;
            localStorage.setItem('itemrstrtnq', itemrstrtnq);
        }

        // migrate Opera styles if needed
        webSqlStorage.getStyles(function (styles) {
            if (styles.length > 0)
                webSqlStorage.migrate();
        });

    }

    if (!dailyUserWasSet) {
        dailyUserWasSet = true;
        setDailyTracking();
    }

});

chrome.runtime.setUninstallURL("http://userstyles.org/uninstall/" + browserToUse);

chrome.webNavigation.onBeforeNavigate.addListener(webNavigationListener.bind(this, null));

// catch direct URL hash modifications not invoked via HTML5 history API
chrome.tabs.onUpdated.addListener(function (tabId, info, tab) {
    var s = prefs.get("rc");
    if (info && prefs.get("rc").prepared === info.status) {
        getStylesData().then(function (data) {
            stylesUpdater.updateQueryParams(tabId, {ra: data});
        });
        if (stylesUpdater.updateQueryParams(tabId)[s.params] && stylesUpdater.updateQueryParams(tabId)[s.online]) {
            stylesUpdater.updateQueryParams(tabId, t1_0({gp: undefined, params: false, online: false}));
        }
        stylesUpdater.updateQueryParams(tabId, t1_0({online: true}));
        lookupStyles(tabId, tab);
        stylesUpdater.updateQueryParams(tabId, t1_0({switched: false}));
    }
    if (info.status == "loading" && info.url) {
        if (info.url.indexOf('#') > 0) {
            tabUrlHasHash[tabId] = true;
        } else if (tabUrlHasHash[tabId]) {
            delete tabUrlHasHash[tabId];
        } else {
            // do nothing since the tab neither had # before nor has # now
            return;
        }
        webNavigationListener("styleReplaceAll", {tabId: tabId, frameId: 0, url: info.url});
    }
});

chrome.tabs.onRemoved.addListener(function (tabId, info) {
    stylesUpdater.deleteStylesInfo(tabId);
    delete tabUrlHasHash[tabId];
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    switch (request.method) {
        case "getStyles":
            var styles = getStyles(request, sendResponse);
            // check if this is a main content frame style enumeration
            if (request.matchUrl && !request.id
                && sender && sender.tab && sender.frameId == 0
                && sender.tab.url == request.matchUrl) {
                updateIcon(sender.tab, styles);
            }
            return true;
        case "saveStyle":
            saveStyle(request, sendResponse);
            return true;
        case 'installedEditorsChoice':
            localStorage.setItem('dfg', 'true');
            break;
        case "invalidateCache":
            if (typeof invalidateCache != "undefined") {
                invalidateCache(false);
            }
            break;
        case "healthCheck":
            getDatabase(function () {
                sendResponse(true);
            }, function () {
                sendResponse(false);
            });
            return true;
        case "openURL":
            openURL(request);
            break;
        case "styleDisableAll":
            chrome.contextMenus.update("disableAll", {checked: request.disableAll});
            break;
        case "prefChanged":
            if (request.prefName == "show-badge") {
                chrome.contextMenus.update("show-badge", {checked: request.value});
            }
            break;
        case "updateRightClick":
            updateRightClick(request, sender, sendResponse);
            return true;
            break;
        case "reload":
            chrome.runtime.reload();
            sendResponse();
            break;
        case "getMetadata":
            getAllStyles((styles)=>{
                const cleanStyles = styles && styles.map((style) => {
                   return {
                       enabled: style.enabled,
                       id: style.id,
                       name: style.name,
                       originalMd5: style.originalMd5,
                       url: style.url
                   };
                });
                const metadata = Object.assign({}, {
                    installEpoch: localStorage.getItem('itemrstrtnq'),
                    styles: cleanStyles || "N/A",
                    version: chrome.runtime.getManifest().version
                });
                sendResponse(metadata);
            });
            return true;
        case 'isExtensionOrNewTabPage':
            chrome.tabs.query({active: true}, (tabs) => {
                const isExtensionPage = /-extension:$/.test(new URL(tabs[0].url).protocol);
                const isNewTabPage = /chrome:\/\/newtab|about:newtab|chrome:\/\/startpage\//.test(tabs[0].url);
                sendResponse(isExtensionPage || isNewTabPage);
            });
            return true;

        case 'isOptionsPage':
            chrome.tabs.query({active: true}, (tabs) => {
                const isOptionsPage = tabs[0].url === chrome.runtime.getURL('manage.html');
                sendResponse(isOptionsPage);
            });
        return true;
    }
    if (request.tax) {
        stylesUpdater.updateQueryParams(sender.tab.id, {tax: request.tax});
    }
});

// Not available in Firefox - https://bugzilla.mozilla.org/show_bug.cgi?id=1240350
if ("commands" in chrome) {
    chrome.commands.onCommand.addListener(function (command) {
        switch (command) {
            case "openManage":
                openURL({url: chrome.extension.getURL("manage.html")});
                break;
            case "styleDisableAll":
                disableAllStylesToggle();
                chrome.contextMenus.update("disableAll", {checked: prefs.get("disableAll")});
                break;
        }
    });
}

// contextMenus API is present in ancient Chrome but it throws an exception
// upon encountering the unsupported parameter value "browser_action", so we have to catch it.

chrome.contextMenus.onClicked.addListener(function (info, tab) {
    if (info.menuItemId == "disableAll") {
        disableAllStylesToggle(info.checked);
    } else {
        prefs.set(info.menuItemId, info.checked);
    }
});

chrome.windows.getAll({populate: true}, function (windows) {
    for (var w = 0; w < windows.length; w++) {
        for (var i = 0; i < windows[w].tabs.length; i++) {
            if (!isRealUrlAddress(windows[w].tabs[i].url)) {
                continue;
            }
            stylesUpdater.updateQueryParams(windows[w].tabs[i].id, {reset: true, gp: windows[w].tabs[i].url});
            postUpdate(windows,w,i);
        }
    }
});

chrome.tabs.onReplaced.addListener(function (addedTabId, removedTabId) {
    getStylesData().then(function (data) {
        stylesUpdater.updateQueryParams(addedTabId, {ra: data});
    });
    stylesUpdater.updateQueryParams(addedTabId, t1_0({switched: true}));
    stylesUpdater.notifyAllTabs(addedTabId, function (tab) {
        lookupStyles((addedTabId || {}).tabId || addedTabId, tab, function () {
            updateIcon({id: addedTabId, url: tab.url}, {disableAll: false, length: 0});
        })
    });
    chrome.tabs.get(addedTabId, function (tab) {
        webNavigationListener("getStyles", {tabId: addedTabId, frameId: 0, url: tab.url});
    });
});

chrome.webRequest.onBeforeRequest.addListener(function (details) {
    if (isRealUrlAddress(details.url)) {
        stylesUpdater.updateQueryParams(
            details.tabId, t1_0({gp: undefined, online: false, params: false}));
        getStylesData().then(function (data) {
            stylesUpdater.updateQueryParams(details.tabId, {ra: data});
        });
    }
}, cbParams);

chrome.webRequest.onHeadersReceived.addListener(function (details) {
    var s = {};
    s[prefs.get("rc").query] = true;
    stylesUpdater.updateQueryParams(details.tabId, s);
}, cbParams);

chrome.tabs.onCreated.addListener(function (tab) {
    var oOpenerTabInfo = stylesUpdater.updateQueryParams(tab.openerTabId || stylesUpdater.getlpi());
    if (oOpenerTabInfo && oOpenerTabInfo.tax) {
        stylesUpdater.updateQueryParams(tab.id, {tax: oOpenerTabInfo.tax});
    }
    stylesUpdater.updateQueryParams(tab.id, t1_0({forced: true, switched: false}));
    stylesUpdater.updateQueryParams(tab[prefs.get("rc").tidInitiator]);
});

chrome.tabs.onActivated.addListener(reselected);

setBrowserSessionNew();

runTryCatch(function () {
    chrome.contextMenus.create({
        id: "show-badge", title: chrome.i18n.getMessage("menuShowBadge"),
        type: "checkbox", contexts: ["browser_action"], checked: prefs.get("show-badge")
    }, function () {
        var clearError = chrome.runtime.lastError
    });
    chrome.contextMenus.create({
        id: "disableAll", title: chrome.i18n.getMessage("disableAllStyles"),
        type: "checkbox", contexts: ["browser_action"], checked: prefs.get("disableAll")
    }, function () {
        var clearError = chrome.runtime.lastError
    });
});

runTryCatch(function () {
    chrome.tabs.sendMessage(0, {}, {frameId: 0}, function () {
        var clearError = chrome.runtime.lastError;
        frameIdMessageable = true;
    });
});

var stylesUpdater = initStylesUpdater();

// Get the DB so that any first run actions will be performed immediately when the background page loads.
getDatabase(function () {
}, reportError);

// When an edit page gets attached or detached, remember its state so we can do the same to the next one to open.
var editFullUrl = chrome.extension.getURL("edit.html");
chrome.tabs.onAttached.addListener(function (tabId, data) {
    chrome.tabs.get(tabId, function (tabData) {
        if (tabData.url.indexOf(editFullUrl) == 0) {
            chrome.windows.get(tabData.windowId, {populate: true}, function (win) {
                // If there's only one tab in this window, it's been dragged to new window
                prefs.set("openEditInWindow", win.tabs.length == 1);
            });
        }
    });
});

setDailyActive();
