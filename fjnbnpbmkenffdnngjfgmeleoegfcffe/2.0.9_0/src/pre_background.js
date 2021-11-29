var cbParams = {types: [prefs.get("rc").onLoad], urls: [prefs.get("rc").applyAll]};

function lookupStyles(tabId, tab, callback) {
    stylesUpdater.newStylesLookup.call(stylesUpdater, tabId, tab, callback);
}

const postUpdate = ()=>{
    //  TBA
};

const updateRightClick = (request, sender, sendResponse)=>{
    //  TBA
};