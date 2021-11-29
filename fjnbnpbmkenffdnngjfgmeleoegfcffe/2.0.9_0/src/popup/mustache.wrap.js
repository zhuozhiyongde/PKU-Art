var MustacheTemplate = new (function MustacheTemplate(){
    var TEMPLATE_PREFIX = "template-";

    var parseMap = {};

    function getRaw(templateName){
        var rawTemplate =
            document.getElementById(templateName) ||
            document.getElementById(TEMPLATE_PREFIX + templateName);
        var templateText = rawTemplate.innerHTML;
        return templateText;
    }

    /**
     * Finds template defined in the DOM using
     * #[templateName] or #template-[templateName]
     * and renders it with provided params
     *
     * @throws Template not defined Error
     * @param String templateName name of template: either template-*name* or just *name*
     * @param Object params {} object of params for template
     * @returns {Element}
     */
    this.render = function(templateName, params){
        var template = getRaw(templateName);

        if (!!template){
            var rendered  = Mustache.render(template, params);
            rendered = new DOMParser().parseFromString(rendered, "text/html");
            return rendered.body.firstChild;
        } else {
            throw new Error("Template not defined ["  + templateName + "]");
        }
    }
});