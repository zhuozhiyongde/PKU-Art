var ENABLED_CLASS = "enabled",
    DISABLED_CLASS = "disabled",
    FORUM_DISCUSSION_URL_PATTERN = "https://forum.userstyles.org/post/discussion?Discussion/StyleID={{ID}}",
    ZERO_INSTALLED_CLASS = "zero-installed",
    IMAGE_URL_DEFAULT = "../../images/image_na.png";

function getActiveTabPromise() {
    return new Promise(function (resolve) {
        chrome.tabs.query(
            {currentWindow: true, active: true}, function (tabs) {
                resolve(tabs[0]);
            }
        );
    });
}

function getBodyEl() {
    return document.body;
}

function getZeroStylesEl() {
    return document.getElementById("zerostyles");
}

function getInstalledStylesEl() {
    var installed = document.getElementById("installed");
    if (installed) {
        getInstalledStylesEl = function () {
            return installed;
        }
    }
    return installed;
}

function getInstalledStylesTabContainer() {
    var installedTab = document.getElementById("tab-item-installed");
    return installedTab;
}

function getDisableAllCheckbox() {
    return document.getElementById("disable-all-checkbox");
}

function getDisableAllContainer() {
    return document.getElementById("disable-all-container");
}

function sendDisableAll(value) {
    analyticsEvent("General_menu", "all_styles_toggle_o" + (!!value ? "ff" : "n"), website);
    return new Promise(function (resolve) {
        if (value === undefined || value === null) {
            value = !prefs.get("disableAll");
        }
        prefs.set("disableAll", value);
        notifyAllTabs({method: "styleDisableAll", disableAll: value})
            .then(resolve);
    });
}

function isDisabledAll() {
    return chrome.extension.getBackgroundPage().prefs.get("disableAll");
}

function renderInstalledTab(styles) {
    renderForAllCases();
    document.getElementById('styleCount').innerText = styles.length;
    if (styles.length == 0) {
        renderPageForNoStyles();
    } else {
        renderPageWithStyles(styles);
    }
}

function renderPageForNoStyles() {
    getInstalledStylesTabContainer().classList.add(ZERO_INSTALLED_CLASS);
    getZeroStylesEl().classList.remove('hide');
    getInstalledStylesEl().classList.add('hide');
}

function renderPageWithStyles(styles) {
    getInstalledStylesTabContainer().classList.remove(ZERO_INSTALLED_CLASS);
    getZeroStylesEl().classList.add('hide');
    getInstalledStylesEl().classList.remove('hide');
    var sif = new StyleInfoFetcher().setRequester(new SessionCachedRequester());
    styles.forEach(function (style) {
        if (!isStyleLocal(style)) {
            sif.getStyleInfoByUrl(style.url)
                .then(function (styleInfo) {
                    return new Promise(function (resolve) {

                        let styleId = style.url.split('/').pop();
                        if (!styleInfo.screenshot || style.screenshot === 'n/a') {
                            styleInfo.screenshot = IMAGE_URL_DEFAULT;
                            getScreenshot(styleId)
                                .then(response => {
                                    if (response) {
                                        try {
                                            const parsed = JSON.parse(response);
                                            if (parsed.screenshot) {
                                                styleInfo.screenshot = "https://userstyles.org/style_screenshots/" + parsed.screenshot;
                                            }
                                        } catch (e) {
                                        }
                                    }
                                    Object.assign(style, styleInfo);
                                    resolve(style);
                                })
                                .catch(e => {
                                    Object.assign(style, styleInfo);
                                    resolve(style);
                                });
                        }
                        else {
                            Object.assign(style, styleInfo);
                            resolve(style);
                        }
                    });
                }).then((style) => {
                addStyleToInstalled(style);
            });
        } else {
            preProcessLocalStyle(style);
            addStyleToInstalled(style);
        }
    })
}

function isStyleLocal(style) {
    return !style.url && !style.styleid;
}

function preProcessLocalStyle(style) {
    // mind that preProcessInstalledStyle will still be
    // called but after this
    style.styleid = "local" + style.id;
    preProcessImage(style);
    style.screenshot = style.thumbnail;
    style.additionalClass = "local";
}

function preProcessInstalledStyle(style) {
    style.installs = style.weekly_installs;
    preProcessStyle(style);
    style.editButtonLabel = "edit";
    style.activateButtonLabel = chrome.i18n.getMessage("enableStyleLabel");
    style.deactivateButtonLabel = chrome.i18n.getMessage("disableStyleLabel");
    style.deleteButtonLabel = chrome.i18n.getMessage("deleteStyleLabel");
    style.sendFeedbackLabel = chrome.i18n.getMessage("sendFeedbackLabel");
    style.additionalClass = style.additionalClass || "";
    style.additionalClass += " " + (style.enabled ? "enabled" : "disabled");
    style.active_str = chrome.i18n.getMessage("ON");
    style.inactive_str = chrome.i18n.getMessage("OFF");
    style.style_edit_url = "/edit.html?id=" + style.id;
    style.styleId = getOrParseStyleId(style);
    style.feedback_url = style.url + "?autofb#discussions-area";
    style.discussion_url = FORUM_DISCUSSION_URL_PATTERN.replace("{{ID}}", style.styleId);
}

function addStyleToInstalled(style) {
    preProcessInstalledStyle(style);
    var el = installedStyleToElement(style);
    bindHandlers(el, style);
    getInstalledStylesEl().appendChild(el);
    return el;
}

function installedStyleToElement(style) {
    return MustacheTemplate.render("style-installed-item", style);
}

function renderAllSwitch() {
    if (!isDisabledAll()) {
        getDisableAllCheckbox().checked = true;
        document.getElementById('stylish_on').style.display = "flex";
        document.getElementById('stylish_off').style.display = "none";
        getInstalledStylesEl().classList.remove("all-off");
        getInstalledStylesEl().classList.add("all-on");
        getBodyEl().classList.remove("all-off");
        getBodyEl().classList.add("all-on");
    } else {
        document.getElementById('stylish_on').style.display = "none";
        document.getElementById('stylish_off').style.display = "flex";
        getInstalledStylesEl().classList.remove("all-on");
        getInstalledStylesEl().classList.add("all-off");
        getBodyEl().classList.remove("all-on");
        getBodyEl().classList.add("all-off");
    }
}

function getUserAuthStatus() {
    return new Promise(function (resolve) {
        getSync().get(function (set) {
            if (set.settings && !set.settings.analyticsEnabled) {
                resolve(false);
            } else {
               resolve(false);
            }
        });
    });
}

function storeUserAuthStatus(isLoggedIn) {
    var installedClasses = getInstalledStylesEl().classList;
    if (isLoggedIn) {
        localStorage.linfo = true;
        installedClasses.remove("notLoggedIn");
        installedClasses.add("loggedIn");
    } else {
        installedClasses.remove("loggedIn");
        installedClasses.add("notLoggedIn");
    }
}

function renderForAllCases() {
    getUserAuthStatus().then(storeUserAuthStatus);
    renderAllSwitch();
    getDisableAllCheckbox().addEventListener('change', onDisableAllCheckboxChange);
    setTimeout(function () {
        getDisableAllContainer().classList.add("animation-on");
    }, 200);
}

function onDisableAllCheckboxChange() {
    sendDisableAll(!this.checked).then(renderAllSwitch);
}

function bindHandlers(el, style) {
    const selectorsToAnalytics = [
        {selector: '.thumbnail_activate', cb: onActivateClick},
        {selector: '.thumbnail_deactivate', cb: onDeactivateClick},
        {selector: '.thumbnail_delete', cb: onDeleteStyleClick},
        {selector: '.thumbnail_edit', cb: onEditStyleClick},
        {selector: '.thumbnail_feedback', cb: onFeedbackStyleClick}
    ];

    selectorsToAnalytics.forEach((data) => {
        el.querySelector(data.selector).addEventListener('click', (e) => {
            data.cb(style)(e);
        });
    });
}

function onFeedbackStyleClick(style) {
    return function (e) {
        analyticsEvent("Installed_styles_menu", "send feedback", style.styleId, () => {
            window.close();
        });
    };
}

function onEditStyleClick(style) {
    return function (e) {
        analyticsEvent("Installed_styles_menu", "edit", style.styleId, () => {
            window.close();
        });
    };
}

function onActivateClick(style, cb) {
    return function (e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        document.getElementsByClassName("thumbnail--" + style.id)[0].style.opacity = 1;
        enableStyle(style.id, true).then(onActivationStatusChanged(style.id, true));
        analyticsEvent("Installed_styles_menu", "enable", style.styleId, cb);
    };
}

function onDeactivateClick(style, cb) {
    return function (e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        document.getElementsByClassName("thumbnail--" + style.id)[0].style.opacity = 0.45;
        enableStyle(style.id, false).then(onActivationStatusChanged(style.id, false));
        analyticsEvent("Installed_styles_menu", "disable", style.styleId, cb);
    }
}

function onDeleteStyleClick(style, cb) {
    return function (e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        deleteStyle(style.id).then(onStyleDeleted(style));
        analyticsEvent("Installed_styles_menu", "delete", style.styleId, cb);
    }
}

function onStyleDeleted(style) {
    return function () {
        var old = document.getElementById("installed-style-" + style.id);
        var parent = old.parentNode;
        parent.removeChild(old);
        const installedStyles = getInstalledStylesEl().childNodes;
        document.getElementById('styleCount').innerText = installedStyles.length;
        if (installedStyles.length == 0) {
            renderPageForNoStyles();
        }
    }
}

function onActivationStatusChanged(styleId, enabled) {
    return function () {
        var old = document.getElementById("installed-style-" + styleId);
        old.classList.remove(ENABLED_CLASS);
        old.classList.remove(DISABLED_CLASS);
        old.classList.add(enabled ? ENABLED_CLASS : DISABLED_CLASS);
    }
}

getActiveTabPromise()
    .then(function (currentTab) {
        getInstalledStyleForUrl(currentTab.url)
            .then(renderInstalledTab);
    });
