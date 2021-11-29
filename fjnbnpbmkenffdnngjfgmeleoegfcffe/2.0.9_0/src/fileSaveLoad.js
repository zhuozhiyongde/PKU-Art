var STYLISH_DUMP_FILE_EXT     = ".txt";

/**
 * !!works only when page has representation - backgound page won't work
 *
 * opens open file dialog,
 * gets selected file,
 * gets it's path,
 * gets content of it by ajax
 */
function loadFromFile(formatToFilter){
    return new Promise(function(resolve){
        var fileInput = document.createElement('input');
        fileInput.style = "display: none;";
        fileInput.type = "file";
        fileInput.accept = formatToFilter || STYLISH_DUMP_FILE_EXT;
        fileInput.acceptCharset = "utf8";

        document.body.appendChild(fileInput);
        fileInput.initialValue = fileInput.value;
        fileInput.addEventListener('change', changeHandler);
        function changeHandler(){
            if (fileInput.value != fileInput.initialValue){
                var fReader = new FileReader();
                fReader.readAsDataURL(fileInput.files[0]);
                fReader.onloadend = function(event){
                    fileInput.removeEventListener('change', changeHandler);
                    fileInput.remove();
                    var b64text = event.target.result.split(",")[1],
                        rawText = atob(b64text);
                    resolve(rawText);
                }
            }
        }
        fileInput.click();
    });
}