var lastUpdatedStyleId = null;
var installed;
var optOutClicked = false;

var appliesToExtraTemplate = document.createElement("span");
appliesToExtraTemplate.className = "applies-to-extra";
appliesToExtraTemplate.innerHTML = " " + t('appliesDisplayTruncatedSuffix');

chrome.runtime.sendMessage({method: "getStyles"}, showStyles);

function showStyles(styles) {
    if (!styles) { // Chrome is starting up
        chrome.runtime.sendMessage({method: "getStyles"}, showStyles);
        return;
    }
    if (!installed) {
        // "getStyles" message callback is invoked before document is loaded,
        // postpone the action until DOMContentLoaded is fired
        document.stylishStyles = styles;
        return;
    }
    styles.sort(function (a, b) {
        return a.name.localeCompare(b.name)
    });
    styles.map(createStyleElement).forEach(function (e) {
        installed.appendChild(e);
    });
    if (history.state) {
        window.scrollTo(0, history.state.scrollY);
    }
}

function createStyleElement(style) {
    var e = template.style.cloneNode(true);
    e.setAttribute("class", style.enabled ? "enabled" : "disabled");
    e.setAttribute("style-id", style.id);
    if (style.updateUrl) {
        e.setAttribute("style-update-url", style.updateUrl);
    }
    if (style.md5Url) {
        e.setAttribute("style-md5-url", style.md5Url);
    }
    if (style.originalMd5) {
        e.setAttribute("style-original-md5", style.originalMd5);
    }

    var styleName = e.querySelector(".style-name");
    styleName.appendChild(document.createTextNode(style.name));
    if (style.url) {
        var homepage = template.styleHomepage.cloneNode(true)
        homepage.setAttribute("href", style.url);
        styleName.appendChild(document.createTextNode(" "));
        styleName.appendChild(homepage);
    }
    var domains = [];
    var urls = [];
    var urlPrefixes = [];
    var regexps = [];

    function add(array, property) {
        style.sections.forEach(function (section) {
            if (section[property]) {
                section[property].filter(function (value) {
                    return array.indexOf(value) == -1;
                }).forEach(function (value) {
                    array.push(value);
                });
                ;
            }
        });
    }

    add(domains, 'domains');
    add(urls, 'urls');
    add(urlPrefixes, 'urlPrefixes');
    add(regexps, 'regexps');
    var appliesToToShow = [];
    if (domains)
        appliesToToShow = appliesToToShow.concat(domains);
    if (urls)
        appliesToToShow = appliesToToShow.concat(urls);
    if (urlPrefixes)
        appliesToToShow = appliesToToShow.concat(urlPrefixes.map(function (u) {
            return u + "*";
        }));
    if (regexps)
        appliesToToShow = appliesToToShow.concat(regexps.map(function (u) {
            return "/" + u + "/";
        }));
    var appliesToString = "";
    var showAppliesToExtra = false;
    if (appliesToToShow.length == "")
        appliesToString = t('appliesToEverything');
    else if (appliesToToShow.length <= 10)
        appliesToString = appliesToToShow.join(", ");
    else {
        appliesToString = appliesToToShow.slice(0, 10).join(", ");
        showAppliesToExtra = true;
    }
    e.querySelector(".applies-to").appendChild(document.createTextNode(t('appliesDisplay', [appliesToString])));
    if (showAppliesToExtra) {
        e.querySelector(".applies-to").appendChild(appliesToExtraTemplate.cloneNode(true));
    }
    var editLink = e.querySelector(".style-edit-link");
    editLink.setAttribute("href", editLink.getAttribute("href") + style.id);
    editLink.addEventListener("click", function (event) {
        if (!event.altKey) {
            var left = event.button == 0, middle = event.button == 1,
                shift = event.shiftKey, ctrl = event.ctrlKey;
            var openWindow = left && shift && !ctrl;
            var openBackgroundTab = (middle && !shift) || (left && ctrl && !shift);
            var openForegroundTab = (middle && shift) || (left && ctrl && shift);
            var url = event.target.href || event.target.parentNode.href;
            event.preventDefault();
            event.stopPropagation();
            if (openWindow || openBackgroundTab || openForegroundTab) {
                if (openWindow) {
                    var options = prefs.get("windowPosition");
                    options.url = url;
                    chrome.windows.create(options);
                } else {
                    chrome.runtime.sendMessage({
                        method: "openURL",
                        url: url,
                        active: openForegroundTab
                    });
                }
            } else {
                history.replaceState({scrollY: window.scrollY}, document.title);
                getActiveTab(function (tab) {
                    sessionStorageHash("manageStylesHistory").set(tab.id, url);
                    location.href = url;
                });
            }
            var styleid = getGlobalId(event);
            analyticsEvent("Manage_installed_styles", "edit_style");
        }
    });
    e.querySelector(".enable").addEventListener("click", function (event) {
        enable(event, true);
    }, false);
    e.querySelector(".disable").addEventListener("click", function (event) {
        enable(event, false);
    }, false);
    e.querySelector(".check-update").addEventListener("click", doCheckUpdate, false);
    e.querySelector(".update").addEventListener("click", doUpdate, false);
    e.querySelector(".delete").addEventListener("click", doDelete, false);
    return e;
}

function enable(event, enabled) {
    var id = getId(event);
    enableStyle(id, enabled);
    var styleid = getGlobalId(event);
    analyticsEvent("Manage_installed_styles", (!!enabled ? "enable" : "disable"), styleid);
    var stlidel = document.querySelector("div[style-id='" + id + "']");
    stlidel.setAttribute("class", enabled ? "enabled" : "disabled")
}

function doDelete(event) {
    if (!confirm(t('deleteStyleConfirm'))) {
        return;
    }
    var id = getId(event);
    deleteStyle(id);
    handleDelete(id);
    analyticsEvent("Manage_installed_styles", "delete", getGlobalId(event));
}

function getId(event) {
    return getStyleElement(event).getAttribute("style-id");
}

function getGlobalId(event) {
    var murl = getStyleElement(event).getAttribute("style-md5-url");
    var matches = /\/(\d+)\.(md5)/.exec(murl);
    if (matches && matches.length == 3) {
        return parseInt(matches[1]);
    } else {
        return "local";
    }
}

function getStyleElement(event) {
    var e = event.target;
    while (e) {
        if (e.hasAttribute("style-id")) {
            return e;
        }
        e = e.parentNode;
    }
    return null;
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    switch (request.method) {
        case "styleAdded":
            installed.appendChild(createStyleElement(request.style));
            break;
        case "styleDeleted":
            handleDelete(request.id);
            break;
        case "updatePopup":
            switch (request.reason) {
                case "styleUpdated":
                    handleUpdate(request.style);
                    break;
            }
            break;
        case "closeOptionsPageOptinOverlay":
            hideOptinOverlay();
            break;
    }
});

function handleUpdate(style) {
    var element = createStyleElement(style);
    installed.replaceChild(element, installed.querySelector("[style-id='" + style.id + "']"));
    if (style.id == lastUpdatedStyleId) {
        lastUpdatedStyleId = null;
        element.className = element.className += " update-done";
        element.querySelector(".update-note").innerHTML = t('updateCompleted');
    }
    ;
}

function handleDelete(id) {
    var node = installed.querySelector("[style-id='" + id + "']");
    if (node) {
        installed.removeChild(node);
    }
}

function doCheckUpdate(event) {
    checkUpdate(getStyleElement(event));
    var styleid = getGlobalId(event);
    analyticsEvent("Manage_installed_styles", "check_uptate", styleid);
}

function applyUpdateAll() {
    var btnApply = document.getElementById("apply-all-updates");
    btnApply.disabled = true;
    setTimeout(function () {
        btnApply.style.display = "none";
        btnApply.disabled = false;
    }, 1000);

    Array.prototype.forEach.call(document.querySelectorAll(".can-update .update"), function (button) {
        button.click();
    });
    analyticsEvent("Manage_installed_styles", "sm_install_update");
}

function addNewStyle() {
    analyticsEvent("Manage_installed_styles", "sm_write_new");
}

function checkUpdateAll() {
    analyticsEvent("Manage_installed_styles", "sm_check_updates_all");
    var btnCheck = document.getElementById("check-all-updates");
    var btnApply = document.getElementById("apply-all-updates");
    var noUpdates = document.getElementById("update-all-no-updates");

    btnCheck.disabled = true;
    btnApply.classList.add("hidden");
    noUpdates.classList.add("hidden");

    var elements = document.querySelectorAll("[style-update-url]");
    var toCheckCount = elements.length;
    var updatableCount = 0;
    Array.prototype.forEach.call(elements, function (element) {
        checkUpdate(element, function (success) {
            if (success) {
                ++updatableCount;
            }
            if (--toCheckCount == 0) {
                btnCheck.disabled = false;
                if (updatableCount) {
                    btnApply.classList.remove("hidden");
                } else {
                    noUpdates.classList.remove("hidden");
                    setTimeout(function () {
                        noUpdates.classList.add("hidden");
                    }, 10000);
                }
            }
        });
    });
}

function checkUpdate(element, callback) {
    element.querySelector(".update-note").innerHTML = t('checkingForUpdate');
    element.className = element.className.replace("checking-update", "").replace("no-update", "").replace("can-update", "") + " checking-update";
    var id = element.getAttribute("style-id");
    var url = element.getAttribute("style-update-url");
    var md5Url = element.getAttribute("style-md5-url").replace('update.update','update');
    var originalMd5 = element.getAttribute("style-original-md5");

    function handleSuccess(forceUpdate, serverJson) {
        chrome.runtime.sendMessage({method: "getStyles", id: id}, function (styles) {
            var style = styles[0];
            var needsUpdate = false;
            if (!forceUpdate && codeIsEqual(style.sections, serverJson.sections)) {
                handleNeedsUpdate("no", id, serverJson);
            } else {
                handleNeedsUpdate("yes", id, serverJson);
                needsUpdate = true;
            }
            if (callback) {
                callback(needsUpdate);
            }
        });
    }

    function handleFailure(status) {
        if (status == 0) {
            handleNeedsUpdate(t('updateCheckFailServerUnreachable'), id, null);
        } else {
            handleNeedsUpdate(t('updateCheckFailBadResponseCode', [status]), id, null);
        }
        if (callback) {
            callback(false);
        }
    }

    if (!md5Url || !originalMd5) {
        checkUpdateFullCode(url, false, handleSuccess, handleFailure)
    } else {
        checkUpdateMd5(originalMd5, md5Url, function (needsUpdate) {
            if (needsUpdate) {
                // If the md5 shows a change we will update regardless of whether the code looks different
                checkUpdateFullCode(url, true, handleSuccess, handleFailure);
            } else {
                handleNeedsUpdate("no", id, null);
                if (callback) {
                    callback(false);
                }
            }
        }, handleFailure);
    }
}

function checkUpdateFullCode(url, forceUpdate, successCallback, failureCallback) {
    getXHR(url, function (responseText) {
        successCallback(forceUpdate, JSON.parse(responseText));
    }, failureCallback);
}

function checkUpdateMd5(originalMd5, md5Url, successCallback, failureCallback) {
    getXHR(md5Url, function (responseText) {
        if (responseText.length != 32) {
            failureCallback(-1);
            return;
        }
        successCallback(responseText != originalMd5);
    }, failureCallback);
}

function getXHR(url, successCallback, failureCallback) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function (aEvt) {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                successCallback(xhr.responseText)
            } else {
                failureCallback(xhr.status);
            }
        }
    }
    if (url.length > 2000) {
        var parts = url.split("?");
        xhr.open("POST", parts[0], true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send(parts[1]);
    } else {
        xhr.open("GET", url, true);
        xhr.send();
    }
}

function handleNeedsUpdate(needsUpdate, id, serverJson) {
    var e = document.querySelector("[style-id='" + id + "']");
    e.className = e.className.replace("checking-update", "");
    switch (needsUpdate) {
        case "yes":
            e.className += " can-update";
            e.updatedCode = serverJson;
            e.querySelector(".update-note").innerHTML = '';
            break;
        case "no":
            e.className += " no-update";
            e.querySelector(".update-note").innerHTML = t('updateCheckSucceededNoUpdate');
            break;
        default:
            e.className += " no-update";
            e.querySelector(".update-note").innerHTML = needsUpdate;
    }
}

function doUpdate(event) {
    var element = getStyleElement(event);

    var updatedCode = element.updatedCode;
    // update everything but name
    delete updatedCode.name;
    updatedCode.id = element.getAttribute('style-id');
    updatedCode.method = "saveStyle";

    // updating the UI will be handled by the general update listener
    lastUpdatedStyleId = updatedCode.id;
    analyticsEvent("Manage_installed_styles", "installe_update", getGlobalId(event));
    chrome.runtime.sendMessage(updatedCode, function () {
    });
}

function codeIsEqual(a, b) {
    if (a.length != b.length) {
        return false;
    }
    var properties = ["code", "urlPrefixes", "urls", "domains", "regexps"];
    for (var i = 0; i < a.length; i++) {
        var found = false;
        for (var j = 0; j < b.length; j++) {
            var allEquals = properties.every(function (property) {
                return jsonEquals(a[i], b[j], property);
            });
            if (allEquals) {
                found = true;
                break;
            }
        }
        if (!found) {
            return false;
        }
    }
    return true;
}

function jsonEquals(a, b, property) {
    var aProp = a[property], typeA = getType(aProp);
    var bProp = b[property], typeB = getType(bProp);
    if (typeA != typeB) {
        // consider empty arrays equivalent to lack of property
        if ((typeA == "undefined" || (typeA == "array" && aProp.length == 0)) && (typeB == "undefined" || (typeB == "array" && bProp.length == 0))) {
            return true;
        }
        return false;
    }
    if (typeA == "undefined") {
        return true;
    }
    if (typeA == "array") {
        if (aProp.length != bProp.length) {
            return false;
        }
        for (var i = 0; i < aProp.length; i++) {
            if (bProp.indexOf(aProp[i]) == -1) {
                return false;
            }
        }
        return true;
    }
    if (typeA == "string") {
        return aProp == bProp;
    }
}

function searchStyles(immediately) {
    var query = document.getElementById("search").value.toLocaleLowerCase();
    if (query == (searchStyles.lastQuery || "")) {
        return;
    }
    searchStyles.lastQuery = query;
    if (immediately) {
        doSearch();
    } else {
        clearTimeout(searchStyles.timeout);
        searchStyles.timeout = setTimeout(doSearch, 100);
    }

    function doSearch() {
        chrome.runtime.sendMessage({method: "getStyles"}, function (styles) {
            styles.forEach(function (style) {
                var el = document.querySelector("[style-id='" + style.id + "']");
                if (el) {
                    el.style.display = !query || isMatchingText(style.name) || isMatchingStyle(style) ? "" : "none";
                }
            });
        });
    }

    function isMatchingStyle(style) {
        return style.sections.some(function (section) {
            return Object.keys(section).some(function (key) {
                var value = section[key];
                switch (typeof value) {
                    case "string":
                        return isMatchingText(value);
                    case "object":
                        return value.some(isMatchingText);
                }
            });
        });
    }

    function isMatchingText(text) {
        return text.toLocaleLowerCase().indexOf(query) >= 0;
    }
}

function onFilterChange(className, event) {
    installed.classList.toggle(className, event.target.checked);
}

function initFilter(className, node) {
    node.addEventListener("change", onFilterChange.bind(undefined, className), false);
    onFilterChange(className, {target: node});
}

document.addEventListener("DOMContentLoaded", async function () {

    const browser = chrome.extension.getBackgroundPage().utils.getBrowser().name.toLowerCase();
    document.getElementById('get-help-link').setAttribute('href', `https://userstyles.org/help/stylish_${browser === 'firefox' ? 'firefox' : 'chrome'}`);

    installed = document.getElementById("installed");
    if (document.stylishStyles) {
        showStyles(document.stylishStyles);
        delete document.stylishStyles;
    }

    document.getElementById("check-all-updates").addEventListener("click", checkUpdateAll);
    document.getElementById("add-style-label").addEventListener("click", addNewStyle);
    document.getElementById("apply-all-updates").addEventListener("click", applyUpdateAll);
    document.getElementById("search").addEventListener("input", searchStyles);

    document.getElementById("get-styles-link").addEventListener("click", function () {
        analyticsEvent("Manage_installed_styles", "Website link clicked", "get_styles");
    });
    document.getElementById("get-help-link").addEventListener("click", function () {
        analyticsEvent("Manage_installed_styles", "sm_links", "get_help");
    });
    document.getElementById("get-pp-link").addEventListener("click", function () {
        analyticsEvent("Manage_installed_styles", "sm_links", "read_pp");
    });

    searchStyles(true); // re-apply filtering on history Back

    setupLivePrefs(prefsList);
    initFilter("enabled-only", document.getElementById("manage.onlyEnabled"));
    initFilter("edited-only", document.getElementById("manage.onlyEdited"));
    document.querySelector("#analyticsEnabled").addEventListener("change", function (e) {
        // last-value is to fix multiple triggering of change event
        // for some reasone change is triggered 4 times
        if (this.getAttribute("last-value") === this.checked.toString()) {
            return;
        }
        if (!this.checked && this.getAttribute("data-warned") != "1") {
            analyticsEvent("Manage_installed_styles", "Opt out clicked");
            this.setAttribute("data-warned", "1");
            alert(chrome.i18n.getMessage("analyticsEnabledAlert"));
            prefs.get('popup.checkNewStyles').popupCheckDisable();
            prefs.set('serpEnabled', false);
            prefs.get('popup.checkNewStyles').popupCheckSERPDisable();
            optOutClicked = true;
        } else if (this.checked) {
            analyticsEvent("Manage_installed_styles", "Opt in clicked");
            this.removeAttribute("data-warned");
            prefs.get('popup.checkNewStyles').popupCheckEnable();
            prefs.set('serpEnabled', true);
            prefs.get('popup.checkNewStyles').popupCheckSERPEnable();
            optOutClicked = false;
        }
        this.setAttribute("last-value", this.checked);
    });

    analyticsEvent("Manage_installed_styles", "shown");

    if (!isOptinEnabled() && await hasSelectedOptinOverlay() === false) {
        setupOptinOverlay();
        showOptinOverlay();
    }
});

function hasSelectedOptinOverlay() {
    return new Promise((resolve) => {
        chrome.storage.sync.get('hasSelectedOptinOverlay', ({hasSelectedOptinOverlay}) => {
            resolve(hasSelectedOptinOverlay);
        });
    });
}

function isOptinEnabled() {
    try {
        return prefs.get('popup.checkNewStyles').popupCheckEnabled();
    } catch (e) {}
}

function setupOptinOverlay() {
    try {
        document.querySelector('.optin-overlay__cta-button-cancel').onclick = handleOptinOverlayCancel;
        document.querySelector('.optin-overlay__cta-button-confirm').onclick = handleOptinOverlayConfirm;
    } catch (e) {}
}

function showOptinOverlay() {
    try {
        document.querySelector('.optin-overlay__container').classList.remove('hide');
        analyticsEvent('Make a Selection', 'Options', 'Shown');
    } catch (e) {}
}

function hideOptinOverlay() {
    try {
        document.querySelector('.optin-overlay__container').classList.add('hide');
    } catch (e) {}
}

function handleOptinOverlayCancel() {
    try {
        updateHasSelectedOptinOverlay();
        analyticsEvent('Make a Selection', 'Options', 'Cancel');
        hideOptinOverlay();
    } catch (e) {}
}

function handleOptinOverlayConfirm() {
    try {
        prefs.set('analyticsEnabled', true);
        prefs.get('popup.checkNewStyles').popupCheckEnable();

        updateHasSelectedOptinOverlay();
        sendMessageCloseWelcomePage();
        analyticsEvent('Make a Selection', 'Options', 'Agree');
        hideOptinOverlay();
    } catch (e) {}
}

function sendMessageCloseWelcomePage() {
    // For welcome page.
    chrome.runtime.sendMessage({event: 'closeWelcomePage'});
}

function updateHasSelectedOptinOverlay() {
    chrome.storage.sync.set({hasSelectedOptinOverlay: true});
}
