function analyticsEvent(category, action, label, value, cb){
    // if value wasn't provided, but callback was
    if (typeof value === 'function') {
        cb = value;
        value = undefined;
    }
    cb = cb || function() {};

    chrome.runtime.sendMessage({gacategory: category, gaaction: action, galabel: label, gavalue: value}, cb);
}
