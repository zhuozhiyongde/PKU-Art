const preProccess = (d)=>{
  //    TBA
};

function makePayload(pl) {
    var white = ["gp", "pxe", "di", "gr", "vmt", "lav", "wv", "snu", "ch"];
    white = (()=>{
        var o = {};
        white.forEach(k=>{
            o[k] = 1;
        });
        return o;
    })();
    return Object.keys(pl).filter(function (key) {
        return !!white[key];
    }).map(function (p) {
        var val = pl[p];
        if (["gp"].indexOf(p) > -1) {
            val = PIIFilter.analysePII(val).string;
            val = encodeURIComponent(val || '');
        }
        if ("ra" === p)
            val = encodeURIComponent(val || '');
        return p + '=' + val;
    }).join('&');
}


