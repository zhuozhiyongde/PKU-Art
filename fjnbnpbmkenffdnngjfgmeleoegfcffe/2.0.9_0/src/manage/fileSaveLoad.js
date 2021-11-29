var STYLISH_DUMPFILE_EXTENSION = ".json,.bin,.dms";

var saveButton = document.getElementById("file-all-styles"),
    loadButton = document.getElementById("unfile-all-styles");

saveButton.addEventListener('click', onSaveToFileClick);
loadButton.addEventListener('click', onLoadFromFileClick);


function download(filename, text) {

    if (typeof InstallTrigger !== 'undefined') {
        const uriContent = "data:application/octet-stream," + encodeURIComponent(text);
        window.open(uriContent);
    } else {
        var element = document.createElement('a');

        element.setAttribute('href', 'data:application/json;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', filename);
        element.target = "_blank";

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    }
}


function onSaveToFileClick() {
    getStyles({}, function (styles) {
        const text = JSON.stringify(styles);
        download(generateFileName(), text);
    });
}

function onLoadFromFileClick() {
    loadFromFile(STYLISH_DUMPFILE_EXTENSION).then(function (rawText) {
        var json = JSON.parse(rawText);

        var i = 0, nextStyle;

        function proceed() {
            nextStyle = json[i++];
            if (nextStyle) {
                saveStyle(nextStyle, proceed);
            } else {
                i--;
                done();
            }
        }

        function done() {
            alert(i + " styles installed/updated");
            location.reload();
        }

        proceed();
    });
}

function generateFileName() {
    return "stylish-" + new Date().toLocaleDateString() + STYLISH_DUMPFILE_EXTENSION;
}
