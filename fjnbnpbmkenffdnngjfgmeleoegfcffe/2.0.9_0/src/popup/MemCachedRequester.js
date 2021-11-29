function MemСachedRequester(){
    this.memcache = {};
}

MemСachedRequester.prototype           = new Requester();
MemСachedRequester.prototype._superGet = MemСachedRequester.prototype.get;
MemСachedRequester.prototype.setCache  = function(url){
    var self = this;
    return function(data){
        self.memcache[url] = data;
        return data;
    }
};
MemСachedRequester.prototype.getCache  = function(url){
    return this.memcache[url];
};
MemСachedRequester.prototype.hasCache  = function(url){
    return !!this.getCache(url);
};
MemСachedRequester.prototype.get       = function(url){
    var self = this;
    return new Promise(function(resolve){
        if (self.hasCache(url)){
            resolve(self.getCache(url));
        }else{
            self._superGet(url).then(self.setCache(url)).then(resolve);
        }
    });
};