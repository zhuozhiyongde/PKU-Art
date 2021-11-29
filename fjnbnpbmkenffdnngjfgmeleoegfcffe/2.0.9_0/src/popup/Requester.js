function Requester(){}

Requester.prototype.get = function(url){
    return new Promise(function(resolve, reject){
        var xhr = new XMLHttpRequest();

        xhr.open('GET', url, true);

        xhr.send(); // (1)

        xhr.onreadystatechange = function() { // (3)
            if (xhr.readyState != 4) return;

            if (xhr.status != 200) {
                reject(xhr.status, xhr.statusText);
            } else {
                resolve(xhr.responseText);
            }
        }
    });
};