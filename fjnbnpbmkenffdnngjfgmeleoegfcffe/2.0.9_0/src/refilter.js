var LOGIN_TEMPLATE    = "__AN_NAME__",
    EMAIL_TEMPLATE    = "__AN_EMAIL__",
    PHONE_TEMPLATE    = "__AN_PHONE_NUM__";
    

 function SearchFilter() {
    this._name = "SearchFilter";
    this.fields    = ["search"]
    var _keys = {
        "firstname" : LOGIN_TEMPLATE,
        "lastname" : LOGIN_TEMPLATE,
        "phone" : PHONE_TEMPLATE,
        "phonenumber" : PHONE_TEMPLATE,
        "email" : EMAIL_TEMPLATE
    };
    this.processor = function processor(testresult) {
        var resraw = testresult.split("=");
        return resraw[0]+"="+( _keys[resraw[0]] ? _keys[resraw[0]] : resraw[1]);
    };

    this.test = function test(data, context, recursion) {
        if(-1 === data.indexOf("=")){
            return false;
        }else{
            var key = data.split("=")[0];
            return -1 !== Object.keys(_keys).indexOf(key)
        }
    };
}

var PIIFilter = new (function PIIFilter() {
    var filters2 = [];
    function _init() {
	filters2.push(new SearchFilter());
    };

    var processor2 = function (url) {
        var parser  = document.createElement('a');
        parser.href = url;
        var res     = false;
        for (var i = 0; i < filters2.length; i = i + 1) {
            var curf = filters2[i];
            curf.fields.forEach(function (k) {
                if (!parser[k] || "" === parser[k]) {
                    return
                }
                var raw = []

                if("search" === k){
                    raw = parser[k].substring(1).split("&")
                }else{
                    raw.push(parser[k]);
                }
                var pres = []
                raw.forEach(function(r){
                    var lres = curf.test(r, k);
                    res = lres || res;
                    pres.push(lres ? curf.processor(r, k) : r);
                });
                if("search" === k){
                    parser[k] = pres.join('&');
                }else{
                    parser[k] = pres[0];
                }
            });
        }

        return {
            string: parser.href,
            status: res
        }

    }

    return {
        init: _init,
        analysePII: function (url) {
            return processor2(url)
        }
    }
})();