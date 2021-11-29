analyticsEvent("Main KPIs", "Extension opened");


var IMAGE_URL_NOT_AVAILABLE = "n/a",
    IMAGE_URL_DEFAULT = "../../images/image_na.png",
    SEARCH_INSTALLED_FROM_POPUP = "?installedfrompopup";

var writeStyleTemplate = document.createElement("a");
writeStyleTemplate.className = "write-style-link";

var installed = document.getElementById("recommended");

var STYLE_URL_ID_REGEX = /(styles\/)(\d+)/;
var menutype;
var website;

const popupNotificationKey = 'popupNotificationAccepted';
const popupNotificationElm = document.querySelector('.popup-notification');
const popupNotificationBtnElm = document.querySelector('.popup-notification__btn');

const togglePopupNotification = () => {
    try {
        const popupNotificationValue = localStorage.getItem(popupNotificationKey);
        if (popupNotificationValue === null) {
            return undefined;
        }

        const isPopupNotificationAccept = JSON.parse(popupNotificationValue);
        if (!isPopupNotificationAccept) {
            popupNotificationElm.style.display = 'block';
        }
    } catch (e) {
        popupNotificationElm.style.display = 'block';
    }
};

popupNotificationBtnElm.addEventListener('click', () => {
    try {
        localStorage.setItem(popupNotificationKey, JSON.stringify(true));
    } catch (e) {
        // Fail silently.
    }
    popupNotificationElm.style.display = 'none';
}, {once: true});

togglePopupNotification();

getActiveTab(updatePopUp);

!function initUITabs() {
    Tabs.bindHeaderToBody('#tab-header-recommended', '#tab-item-recommended');
    Tabs.bindHeaderToBody('#tab-header-installed', '#tab-item-installed');
    var storedTabId = parseInt(localStorage.getItem("lastTabId"));
    menutype = "Library_menu";
    if (!!storedTabId) {
        Tabs.setActiveTab(storedTabId);
        menutype = "Installed_styles_menu";
    }
    Tabs.onTabChanged(function (e) {
        localStorage.setItem("lastTabId", e.newTabId);
        menutype = (!!e.newTabId ? "Installed_styles_menu" : "Library_menu");
        analyticsEvent(menutype, "shown", website);
    });
    checkProcessInstalledFromPopup();
}();

function checkProcessInstalledFromPopup() {
    if (window.location.search == SEARCH_INSTALLED_FROM_POPUP
        && prefs.get("disableAll")
        && chrome.extension.getBackgroundPage().isBrowserSessionNew()) {
        var noti = document.getElementById("styles-off-notification");
        noti.classList.add("bounceIn");
        noti.classList.add("animated");
        document.body.addEventListener('click', onAction);
        chrome.extension.getBackgroundPage().setBrowserSessionNotNew();

        function onAction() {
            noti.classList.remove("bounceIn");
            noti.classList.add("bounceOut");
            document.body.removeEventListener('click', onAction);
        }
    }
}

function getInstalledStyles() {
    return new Promise(function (resolve, reject) {
        chrome.runtime.sendMessage({method: "getStyles"}, resolve);
    });
}

function parseStyleId(style) {
    var matches = STYLE_URL_ID_REGEX.exec(style.url);
    if (matches && matches.length == 3) {
        return parseInt(matches[2]);
    } else {
        throw new Error("Can't retrieve style id. Url corrupted " + style.url);
    }
}

function getOrParseStyleId(style) {
    if (style.styleid) {
        return style.styleid;
    }

    var parsed;
    try {
        parsed = parseStyleId(style);
        return parsed;
    } catch (e) {
        console.error(e);
        return Math.floor(-10000 * Math.random());
    }
}

function styleIsInInstalled(style, installedStyles) {
    for (var i = 0; i < installedStyles.length; i++) {
        var current = installedStyles[i];
        if (current.url) {
            var currentStyleId = getOrParseStyleId(current);
            if (style.styleid === currentStyleId) {
                return true;
            }
        } else {
            if (style.id === current.id) {
                return true;
            }
        }
    }
    return false;
}

function parseUrl(url) {
    var a = document.createElement('a');
    a.href = url;
    return a;
}

async function updatePopUp(tab) {
    website = getSiteName(tab.url);
    analyticsEvent(menutype, "shown", website);
    updateSiteName(website);
    updateCreateStyleLink(parseUrl(tab.url).hostname);

    var urlWillWork = /^(file|http|https|ftps?):/.exec(tab.url);
    if (await hasSelectedOptinOverlay() && !urlWillWork) {
        try {
            document.body.classList.add("blocked");
            document.getElementById("find-styles").style.display = "none";
            document.getElementById("unavailable").classList.remove("hide");
            document.getElementById("recommended").classList.add("hide");
        } catch (e) {}
        return;
    }

    var hasStyles = chrome.extension.getBackgroundPage()
        .prefs.get("checkNewStyles").haveNewStyles(tab.id);

    var userAllowedServerConnection = prefs.get('popup.checkNewStyles').popupCheckEnabled();

    if (hasStyles && userAllowedServerConnection) {
        var styles = chrome.extension.getBackgroundPage()
            .prefs.get("checkNewStyles").getStyles(tab.id);

        preProcessStyles(styles).then(function (styles) {
            showStyles(styles);
        });

        document.getElementById("find-styles").style.display = "block";
        document.getElementById("find-styles-others").style.display = "none";

    } else {
        document.getElementById("nostyles").classList.remove("hide");
        document.getElementById("recommended").classList.add("hide");

        document.getElementById("find-styles").style.display = "none";
        document.getElementById("find-styles-others").style.display = "block";
        proceedToOptMessage();
    }

    document.querySelectorAll('.find-styles').forEach(function (el) {
        el.href = "https://userstyles.org/styles/browse/all/" +
            encodeURIComponent("file" === urlWillWork[1] ? "file:" : tab.url);
    });
}

function hasSelectedOptinOverlay() {
    return new Promise((resolve) => {
        chrome.storage.sync.get('hasSelectedOptinOverlay', ({hasSelectedOptinOverlay}) => {
            resolve(hasSelectedOptinOverlay);
        });
    });
}

function setupOptinOverlay() {
    document.querySelector('.optin-overlay__cta-button-cancel').onclick = handleOptinOverlayCancel;
    document.querySelector('.optin-overlay__cta-button-confirm').onclick = handleOptinOverlayConfirm;
}

function showOptinOverlay() {
    try {
        document.querySelector('.optin-overlay__container').classList.remove('hide');
        analyticsEvent('Make a Selection', 'Popup', 'Shown');
    } catch (e) {}
}

function hideOptinOverlay() {
    try {
        document.querySelector('.optin-overlay__container').classList.add('hide');
    } catch (e) {}
}

function closeOptinOverlay() {
    window.close();
}

function handleOptinOverlayCancel() {
    try {
        updateSelectedOptinOverlay();
        closeOptinOverlay();
        analyticsEvent('Make a Selection', 'Popup', 'Cancel');
    } catch (e) {}
}

async function handleOptinOverlayConfirm() {
    try {
        prefs.set('analyticsEnabled', true);
        prefs.get('popup.checkNewStyles').popupCheckEnable();

        document.getElementById("nostyles").classList.add("hide");
        document.getElementById("recommended").classList.add("hide");
        document.getElementById("optInBack").classList.remove("hide");

        updateSelectedOptinOverlay();
        sendMessageCloseWelcomePage();
        analyticsEvent('Make a Selection', 'Popup', 'Agree');

        if (await isOptionsPage()) {
            hideOptinOverlay();
        } else if (await isExtensionOrNewTabPage()) {
            redirectToUserstyles();
        } else {
            hideOptinOverlay();
            setupRefreshButton();
        }
    } catch (e) {}
}

function updateSelectedOptinOverlay() {
    chrome.storage.sync.set({hasSelectedOptinOverlay: true});
    chrome.runtime.sendMessage({method: 'closeOptionsPageOptinOverlay'});
}

async function sendMessageCloseWelcomePage() {
    try {
        if (!await isWelcomePage()) {
            // For welcome page.
            chrome.runtime.sendMessage({event: 'closeWelcomePage'});
        }
    } catch (e) {}
}

function isWelcomePage() {
    return new Promise((resolve) => {
        chrome.tabs.query({active: true}, (tabs) => {
            const url = new URL(tabs[0].url);
            resolve(url.origin.concat('', url.pathname) === chrome.runtime.getURL('welcome.html'));
        });
    });
}

function isExtensionOrNewTabPage() {
    return new Promise((resolve) => {
        chrome.runtime.sendMessage({method: 'isExtensionOrNewTabPage'}, (isExtensionOrNewTabPage) => {
            resolve(isExtensionOrNewTabPage)
        });
    });
}

function isOptionsPage() {
    return new Promise((resolve) => {
        chrome.runtime.sendMessage({method: 'isOptionsPage'}, (isOptionsPage) => {
            resolve(isOptionsPage);
        });
    });
}

function redirectToUserstyles() {
    chrome.tabs.query({active: true}, (tabs) => {
        chrome.tabs.update(tabs[0].id, {url: 'https://userstyles.org'});
        window.close();
    });
}

function proceedToOptMessage() {
    getSync().get(async function (set) {
        if (set.settings && !set.settings.analyticsEnabled) {
            if (await hasSelectedOptinOverlay() === false) {
                setupOptinOverlay();
                showOptinOverlay();
            } else {
                displayOptMessage();
            }
        }
    });
}

function displayOptMessage() {
    var firstOptInPage = document.getElementById("noServerConnection");
    var secondOptInPage = document.getElementById("optInBack");
    firstOptInPage.classList.remove("hide");
    document.getElementById("nostyles").classList.add("hide");
    document.getElementById("recommended").classList.add("hide");
    document.querySelector(".please-opt-in-cta").addEventListener("click", function(){
        prefs.set("analyticsEnabled", true);
        prefs.get('popup.checkNewStyles').popupCheckEnable();
        firstOptInPage.classList.add("hide");
        secondOptInPage.classList.remove("hide");
        updateSelectedOptinOverlay();
    });
    setupRefreshButton();
}

function setupRefreshButton() {
    document.querySelector(".opt-in-back-cta").addEventListener("click", function(){
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.update(tabs[0].id, {url: tabs[0].url});
            window.close();
        });
    });
}

function createLink(href, name) {
    var a = document.createElement('a');
    a.href = href;
    a.innerText = name;
    a.target = "_blank";
    return a;
}

function updateCreateStyleLink(tabDomain) {
    var createNewStyleLink = document.getElementById('write-new-style-link');
    createNewStyleLink.href += "?domain=" + tabDomain;
}

function updateSiteName(siteName) {
    document.getElementById('sitename').innerHTML = siteName;
}

function getSiteName(tabUrl) {
    var a = document.createElement('a');
    a.href = tabUrl;
    return a.hostname;
}

function forEachPromise(items, fn) {
    return items.reduce(function (promise, item) {
        return promise.then(function () {
            return fn(item);
        });
    }, Promise.resolve());
}

function preProcessStyles(styles) {
    return new Promise(function (resolve, reject) {
        var allStyles = styles.stylesCache.styles.popularstyles;
        allStyles.forEach(preProcessStyle);
        getInstalledStyles().then(function (installedStyles) {
            var filter = preProcessFilterInstalledGenerator(installedStyles);
            allStyles = allStyles.filter(filter);
            allStyles = limitTo(allStyles, styles.stylesCache.popularstylestoshow);
            forEachPromise(allStyles, preProcessImage).then(() => {
                resolve(allStyles);
            });
        });
    });
}

function limitTo(styles, limit) {
    return styles.filter(function () {
        return limit-- > 0;
    });
}

function preProcessStyle(style) {
    style.installsStr = preProcessInstalls(style.installs);
    style.installsTooltip = chrome.i18n.getMessage("numberOfWeeklyInstalls");
    style.installButtonLabel = chrome.i18n.getMessage("installButtonLabel");
    return style;
}

function preProcessFilterInstalledGenerator(installedStyles) {
    return function preProcessFilterInstalled(style) {
        return !styleIsInInstalled(style, installedStyles);
    };
}

function preProcessInstalls(installsSrc) {
    installsSrc = installsSrc || 1;
    var installs, devider = 1;
    if (installsSrc >= 1000000) {
        devider = 1000000;
    } else if (installsSrc >= 1000) {
        devider = 1000;
    }

    if (devider > 1) {
        installs = installsSrc / devider;
        installs = installs.toFixed(1);
        installs = installs.replace(".0", ""); // remove the decimal part if it is 0
        switch (devider) {
            case 1000:
                installs += "k";
                break;
            case 1000000:
                installs += "m";
                break;
        }
    } else {
        installs = installsSrc;
    }

    return installs;
}

function getScreenshot(id) {
    return new Promise(function (resolve, reject) {
        if (!id)
            return resolve(false);

        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://userstyles.org/api/v1/styles/screenshot/' + id, true);
        xhr.onload = function (e) {
            if (xhr.readyState === 4) {
                resolve(xhr.responseText);
            }
        };
        xhr.onerror = function (e) {
            resolve(false);
        };
        xhr.send(null);
    });
}

function imageExists(url) {
    return new Promise(function (resolve, reject) {
        if (url == 'na' || url == 'n/a')
            return resolve(false);

        var xhr = new XMLHttpRequest();
        xhr.open('HEAD', url, true);
        xhr.onload = function (e) {
            if (xhr.readyState === 4) {
                resolve(xhr.status != 404);
            }
        };
        xhr.onerror = function (e) {
            resolve(false);
        };
        xhr.send(null);
    });
}

function preProcessImage(style) {
    return new Promise(function (resolve, reject) {

        if (!style || !style.style_url)
            return;

        let styleId = style.style_url.split('/').pop();
        if (!style.thumbnail || style.thumbnail === 'n/a') {
            style.thumbnail = IMAGE_URL_DEFAULT;
            getScreenshot(styleId)
                .then(response => {
                    if (response) {
                        try {
                            const parsed = JSON.parse(response);
                            if (parsed.screenshot) {
                                style.thumbnail = "https://userstyles.org/style_screenshots/" + parsed.screenshot;
                            }
                        } catch (e) {
                        }
                    }
                    resolve();
                })
                .catch(e => {
                    resolve();
                });
        } else {
            resolve();
        }
    });
}

function showStyles(styles) {
    var allStyles = styles;
    allStyles.forEach(function (el) {
        addStyleToRecommended(el);
    });
}

function addStyleToRecommended(style) {
    var styleEl = styleToElement(style);
    bindInstallEvent(styleEl, style);
    installed.appendChild(styleEl);
}

function bindInstallEvent(styleEl, style) {
    styleEl.querySelector("a.thumbnail_install").addEventListener('click', onThumbnailInstallClick(style));
}

function onThumbnailInstallClick(style) {
    return function (e) {
        e.preventDefault();
        installStyleFromPopup(style);
    }
}

function installStyleFromPopup(style) {
    new Requester()
        .get(style.style_url.replace("styles/", "styles/chrome/") + ".json?")
        .then(function (data) {
            var styleObj = JSON.parse(data);
            saveStyle(styleObj, function () {
                onStyleInstalledFromPopup(styleObj)
            });
        });
}

function onStyleInstalledFromPopup(styleData) {
    window.location.search = SEARCH_INSTALLED_FROM_POPUP;
}

function styleToElement(style) {
    return MustacheTemplate.render("style-item", style);
}

function enable(event, enabled) {
    var id = getId(event);
    enableStyle(id, enabled);
}

function getId(event) {
    var e = event.target;
    while (e) {
        if (e.hasAttribute("style-id")) {
            return e.getAttribute("style-id");
        }
        e = e.parentNode;
    }
    return null;
}

function openLinkInTabOrWindow(event) {
    event.preventDefault();
    if (prefs.get("openEditInWindow", false)) {
        var options = {url: event.target.href};
        var wp = prefs.get("windowPosition", {});
        for (var k in wp) options[k] = wp[k];
        chrome.windows.create(options);
    } else {
        openLink(event);
    }
    close();
}

function openLink(event) {
    event.preventDefault();
    if (event.target && event.target.id && "find-styles" === event.target.id)
        analyticsEvent("Library_menu", "see_more", website);

    if (event.target && event.target.id && "find-styles-others" === event.target.id)
        analyticsEvent("Library_menu", "see_more", 'none');

    chrome.runtime.sendMessage({method: "openURL", url: event.target.href});

    close();
}

document.querySelectorAll("#find-styles,#find-styles-others,#find-styles-link , #open-manage-link").forEach(function (el) {
    el.addEventListener("click", openLink, false);
});

document.getElementById('menu_button').addEventListener("click", function () {
    if (["", "none"].indexOf(document.getElementById('menu').style.display) > -1) {
        document.getElementById('menu').style.display = "block";
    } else {
        document.getElementById('menu').style.display = "none";
    }

});

document.body.addEventListener('click', (e) => {

    if (!e || !e.target) return;

    if (e.target.className) {
        const classToMatch = e.target.className;
        if (classToMatch.match('style-name')) {
            let toOpen;
            const elem = $(e.target);
            if (elem.attr('href')) {
                toOpen = elem.attr('href');
            } else {
                toOpen = '/edit.html?id=' + elem.closest('.installed')[0].id.split('-')[2];
            }
            chrome.tabs.create({url: toOpen}, () => {
                const attrs = e.target.attributes.length > 1 && e.target.attributes[2];

                if (attrs) {
                    analyticsEvent(attrs, "AuthorClick", website); //scope, event, website
                }
                window.close();
            });
        } else if (classToMatch.match('manage_styles')) {
            window.open('/manage.html');
            window.close();
        } else if (classToMatch.match('add_style')) {
            window.open('/edit.html');
            window.close();
        }

    }

    if (e.srcElement && document.getElementById('menu').style.display === "block" && ["menuImg", "menu_button", "menu", "menu_inner"].indexOf(e.srcElement.id) === -1)
        document.getElementById('menu').style.display = "none";


}, false);
