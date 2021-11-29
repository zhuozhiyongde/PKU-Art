var utils = (function () {

    var parser = new UAParser();
    var browser = parser.getBrowser();
    var device = parser.getDevice();
    var chineseBrowsers = ["baidu", "baidu_other", "spark", "2345", "sogou", "360"];
    var browserUA = getUAString();

    if (isInUA("bidu") || isInUA("baidu")) {
        browser.name = "baidu";
    } else if (isInUA("2345ex")) {
        browser.name = "2345";
    } else if (isInUA("metasr")) {
        browser.name = "sogou";
    } else if (isInUA("spark")) {
        browser.name = "spark";
    } else if (external) {
        if (external.hasOwnProperty("GetSparkInfo")) {
            browser.name = "spark";
        } else if (external.hasOwnProperty("GetOriginalUrl")) {
            browser.name = "baidu"
        } else if (external.hasOwnProperty("AppCmd")) {
            browser.name = "360";
        } else if (external.hasOwnProperty("GetVersion")) {
            browser.name = "baidu_other";
        }
    }

    function isInUA(q) {
        var queryLowerCase = q.toLowerCase();
        var uaStr = browserUA.toLowerCase();
        return uaStr.indexOf(queryLowerCase) > -1;
    }

    function getBrowser() {
        return browser;
    }

    function getDevice() {
        return device;
    }

    function getUAString() {
        return parser.getUA();
    }

    function getSubID() {
        return localStorage.getItem("subid_new");
    }

    function setSubID(subId) {
        return localStorage.setItem("subid_new", subId);
    }

    function isChineseBrowser() {
        if (browser && browser.name)
            return chineseBrowsers.indexOf(browser.name) > -1;
        else
            return false;
    }

    return {
        getBrowser: getBrowser,
        getSubID: getSubID,
        setSubID: setSubID,
        isChineseBrowser: isChineseBrowser,
        getDevice: getDevice
    };

})();