var Tabs;

!function () {

    var TAB_CHANGED = "tab-changed";

    function Tab(headerEl, bodyEl) {
        this.headerEl = headerEl;
        this.headerContainerEl = this.headerEl && this.headerEl.parentNode;
        this.bodyEl = bodyEl;
    };

    Tab.prototype.activate = function () {
        if (!this.headerEl.checked) this.headerEl.checked = true;
        this.bodyEl.classList.add('active');
        this.headerContainerEl.classList.add('active');
    };

    Tab.prototype.deactivate = function () {
        if (this.headerEl.checked) this.headerEl.checked = false;
        this.bodyEl.classList.remove('active');
        this.headerContainerEl.classList.remove('active');
    };

    function TabController() {
        this.tabs = [];
        this.onChangeHandler = this.onChangeHandler();
    }

    TabController.prototype.bindHeaderToBody = function (headerEl, bodyEl) {
        if (typeof headerEl == "string") {
            headerEl = document.querySelector(headerEl);
        }

        if (typeof bodyEl == "string") {
            bodyEl = document.querySelector(bodyEl);
        }

        if (!headerEl || !bodyEl) {
            throw new Error("Header and body need to be elements.");
        }

        this.tabs.push(new Tab(headerEl, bodyEl));

        headerEl.addEventListener('change', this.onChangeHandler);
    };

    TabController.prototype.onChangeHandler = function () {
        var self = this;
        return function () {
            var activeTab, activeId;
            self.tabs.forEach(function (tab, id) {
                if (tab.headerEl.checked) {
                    tab.activate();
                    activeTab = tab;
                    activeId = id;
                } else {
                    tab.deactivate();
                }
            });
            self._dispatchTabChanged(activeTab, activeId);
        }
    };

    TabController.prototype.setActiveTab = function (id) {
        if (id > this.tabs.length - 1) {
            throw new Error("Index our of bounds. No tab with id " + id);
            return;
        }

        var activeTab, activeId;
        this.tabs.forEach(function (tab, tabId) {
            if (tabId == id) {
                tab.activate();
                activeTab = tab;
                activeId = tabId;
            } else {
                tab.deactivate();
            }
        });
        this._dispatchTabChanged(activeTab, activeId);
    };

    TabController.prototype.onTabChanged = function (handler) {
        this._triggerer = this._triggerer || document.createElement('div');
        this._triggerer.addEventListener(TAB_CHANGED, handler);
    };

    TabController.prototype._dispatchTabChanged = function (tab, tabId) {
        if (this._triggerer) {
            var ev = new Event(TAB_CHANGED);
            ev.newTab = tab;
            ev.newTabId = tabId;
            this._triggerer.dispatchEvent(ev);
        }
    };

    Tabs = new TabController();
}();