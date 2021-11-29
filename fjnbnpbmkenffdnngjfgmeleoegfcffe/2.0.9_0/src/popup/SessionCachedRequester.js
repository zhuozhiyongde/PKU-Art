function SessionCachedRequester(){
    this.cache = sessionStorage;
}

SessionCachedRequester.prototype = new MemСachedRequester();
SessionCachedRequester.prototype.setCache  = function(url){
    var self = this;
    return function(data){
        self.cache.setItem(url, data);
        return data;
    }
};
SessionCachedRequester.prototype.getCache  = function(url){
    return this.cache.getItem(url);
};