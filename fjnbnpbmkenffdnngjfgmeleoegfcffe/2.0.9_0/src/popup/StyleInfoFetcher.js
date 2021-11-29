function StyleInfoFetcher(){
    this.requester;
}

StyleInfoFetcher.prototype.setRequester = function(requester){
   if (!(requester instanceof Requester)){
       throw new Error("Invalid function invocation. Instance of Requester expected, got " + typeof Requester);
   }

   this.requester = requester;
   return this;
};
StyleInfoFetcher.prototype.getRequester = function(){
    return this.requester;
};
StyleInfoFetcher.prototype.buildUrl = function(styleUrl){
    return styleUrl + ".json";
};
StyleInfoFetcher.prototype.getStyleInfoByUrl = function(url){
    if (this.requester){
        return this.getRequester().get(this.buildUrl(url)).then(function(rawJson){
            return JSON.parse(rawJson);
        });
    } else{
        throw new Error("Can not fetch. Requester not provided.");
    }
};