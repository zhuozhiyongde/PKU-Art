/*
 * 主题模式管理器
 * Author: Arthals
 * Email: zhuozhiyongde@126.com
 * Github: https://github.com/zhuozhiyongde
 * Blog: https://arthals.ink
 */

import { sunIcon, moonIcon, autoIcon } from './icon.js';

class ThemeManager {
    constructor() {
        this.themeModes = {
            LIGHT: 'light',
            DARK: 'dark',
            AUTO: 'auto',
        };
        this.storageKeys = {
            primary: 'pku-art-theme-mode',
            legacy: 'themeMode',
        };

        this.currentMode = this.getStoredTheme() || this.themeModes.AUTO;
        this.isDark = false;

        this.init();
    }

    init() {
        // 监听系统主题变化
        if (window.matchMedia) {
            this.mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            this.mediaQuery.addEventListener('change', () => {
                if (this.currentMode === this.themeModes.AUTO) {
                    this.updateTheme();
                }
            });
        }

        this.setupSyncListeners();

        // 应用初始主题
        this.updateTheme();

        console.log('[PKU Art] ThemeManager initialized with mode:', this.currentMode);
    }

    getStoredTheme() {
        const keys = [this.storageKeys.primary, this.storageKeys.legacy];

        if (typeof GM_getValue === 'function') {
            for (const key of keys) {
                try {
                    const value = GM_getValue(key, null);
                    if (this.isValidMode(value)) {
                        return value;
                    }
                } catch (error) {
                    // Tampermonkey GM_getValue unavailable in this context; fall back to localStorage
                }
            }
        }

        try {
            for (const key of keys) {
                const value = localStorage.getItem(key);
                if (this.isValidMode(value)) {
                    return value;
                }
            }
        } catch (error) {
            console.warn('[PKU Art] localStorage unavailable when reading theme mode:', error);
        }

        return null;
    }

    setStoredTheme(mode) {
        if (!this.isValidMode(mode)) {
            return;
        }

        const keys = [this.storageKeys.primary, this.storageKeys.legacy];

        let gmStored = false;
        if (typeof GM_setValue === 'function') {
            for (const key of keys) {
                try {
                    GM_setValue(key, mode);
                    gmStored = true;
                } catch (error) {
                    // Ignore individual GM_setValue failures; we'll fall back to localStorage below.
                }
            }
        }

        let localStored = false;
        for (const key of keys) {
            try {
                localStorage.setItem(key, mode);
                localStored = true;
            } catch (error) {
                // Some contexts (e.g., privacy mode) might block localStorage writes.
            }
        }

        if (!gmStored && !localStored) {
            console.warn('[PKU Art] Failed to persist theme mode. Manual sync may not propagate to other frames.');
        }
    }

    setTheme(mode) {
        if (!Object.values(this.themeModes).includes(mode)) {
            console.warn('[PKU Art] Invalid theme mode:', mode);
            return;
        }

        this.currentMode = mode;
        this.setStoredTheme(mode);
        this.updateTheme();

        console.log('[PKU Art] Theme changed to:', mode);
    }

    updateTheme() {
        const shouldBeDark = this.resolveShouldBeDark(this.currentMode);
        this.isDark = shouldBeDark;
        this.applyTheme(shouldBeDark);
    }

    applyTheme(isDark, broadcast = true) {
        const root = document.documentElement;

        if (isDark) {
            root.classList.add('pku-art-dark');
            root.classList.remove('pku-art-light');
        } else {
            root.classList.add('pku-art-light');
            root.classList.remove('pku-art-dark');
        }

        // 触发自定义事件，通知其他组件主题已改变
        window.dispatchEvent(
            new CustomEvent('pku-art-theme-change', {
                detail: { isDark, mode: this.currentMode },
            })
        );

        // 向所有 iframe 广播主题变化（仅在主动切换时广播，避免循环）
        if (broadcast) {
            this.broadcastThemeToIframes();
        }
    }

    getCurrentMode() {
        return this.currentMode;
    }

    isDarkMode() {
        return this.isDark;
    }

    resolveShouldBeDark(mode) {
        switch (mode) {
            case this.themeModes.LIGHT:
                return false;
            case this.themeModes.DARK:
                return true;
            case this.themeModes.AUTO:
                return this.mediaQuery ? this.mediaQuery.matches : false;
            default:
                return false;
        }
    }

    isValidMode(mode) {
        return Object.values(this.themeModes).includes(mode);
    }

    setupSyncListeners() {
        this.setupGMValueListeners();
        this.setupLocalStorageListener();
        this.setupPostMessageListener();
    }

    setupLocalStorageListener() {
        window.addEventListener('storage', (event) => {
            if (!event || !event.key) {
                return;
            }

            if (![this.storageKeys.primary, this.storageKeys.legacy].includes(event.key)) {
                return;
            }

            this.handleExternalThemeChange(event.newValue);
        });
    }

    setupGMValueListeners() {
        if (typeof GM_addValueChangeListener !== 'function') {
            return;
        }

        const keys = [this.storageKeys.primary, this.storageKeys.legacy];
        keys.forEach((key) => {
            try {
                GM_addValueChangeListener(key, (_name, _oldValue, newValue, remote) => {
                    if (!remote) {
                        return;
                    }
                    this.handleExternalThemeChange(newValue);
                });
            } catch (error) {
                console.warn('[PKU Art] GM_addValueChangeListener unavailable for key:', key, error);
            }
        });
    }

    handleExternalThemeChange(rawValue) {
        const incomingMode = this.isValidMode(rawValue) ? rawValue : this.themeModes.AUTO;

        if (incomingMode !== this.currentMode) {
            this.currentMode = incomingMode;
            this.updateTheme();
            return;
        }

        const shouldBeDark = this.resolveShouldBeDark(incomingMode);
        if (shouldBeDark !== this.isDark) {
            this.isDark = shouldBeDark;
            this.applyTheme(shouldBeDark);
        }
    }

    setupPostMessageListener() {
        window.addEventListener('message', (event) => {
            if (!event.data || typeof event.data !== 'object') {
                return;
            }

            // 处理主题请求（来自 iframe 请求父页面的主题）
            if (event.data.type === 'pku-art-theme-request') {
                event.source?.postMessage(
                    {
                        type: 'pku-art-theme-sync',
                        mode: this.currentMode,
                        isDark: this.isDark,
                    },
                    '*'
                );
                return;
            }

            // 处理主题同步消息
            if (event.data.type === 'pku-art-theme-sync') {
                const { mode, isDark } = event.data;

                if (this.isValidMode(mode) && mode !== this.currentMode) {
                    this.currentMode = mode;
                    this.isDark = isDark;
                    // 不广播，避免循环
                    this.applyTheme(isDark, false);
                    // 如果是父页面收到消息，继续向其他 iframe 广播
                    if (window.parent === window) {
                        this.broadcastThemeToIframes(event.source);
                    }
                }
            }
        });

        // 如果当前是 iframe，向父页面请求主题
        this.requestThemeFromParent();
    }

    broadcastThemeToIframes(excludeSource = null) {
        const message = {
            type: 'pku-art-theme-sync',
            mode: this.currentMode,
            isDark: this.isDark,
        };

        // 向所有 iframe 发送
        const iframes = document.querySelectorAll('iframe');
        iframes.forEach((iframe) => {
            try {
                if (iframe.contentWindow && iframe.contentWindow !== excludeSource) {
                    iframe.contentWindow.postMessage(message, '*');
                }
            } catch (e) {
                // 跨域 iframe 可能抛出异常，忽略
            }
        });
    }

    requestThemeFromParent() {
        if (window.parent !== window) {
            try {
                window.parent.postMessage({ type: 'pku-art-theme-request' }, '*');
            } catch (e) {
                // 父页面不可访问，忽略
            }
        }
    }
}

const themeToggleIcons = {
    light: sunIcon,
    dark: moonIcon,
    auto: autoIcon,
};

// 初始化主题管理器
function initializeThemeManager() {
    // 使用 ThemeManager 已有的 getStoredTheme 方法，它已经包含了从 GM 和 localStorage 的回退逻辑
    const userThemeMode = themeManager.getStoredTheme() || 'auto';

    // 设置主题模式
    themeManager.setTheme(userThemeMode);

    console.log('[PKU Art] Theme manager initialized with mode:', userThemeMode);
}

function initializeThemeToggleButton() {
    if (!/^https:\/\/(course|elective)\.pku\.edu\.cn\//.test(window.location.href)) {
        return;
    }

    let attempts = 0;
    const maxAttempts = 20;

    const attachToggle = () => {
        if (document.querySelector('.pku-art-theme-toggle')) {
            return;
        }

        const remindLink = document.querySelector('#global-nav-link');
        const navWrap = document.querySelector('.global-nav-bar-wrap');

        if (/^https:\/\/course\.pku\.edu\.cn\//.test(window.location.href)) {
            if (!remindLink || !navWrap) {
                if (attempts < maxAttempts) {
                    attempts += 1;
                    setTimeout(attachToggle, 300);
                }
                return;
            }
        }

        const menuExit = document.querySelector('#menu li:first-of-type:has(a[href="/elective2008/logout.do"])');

        if (/^https:\/\/elective\.pku\.edu\.cn\//.test(window.location.href)) {
            if (!menuExit) {
                if (attempts < maxAttempts) {
                    attempts += 1;
                    setTimeout(attachToggle, 300);
                }
                return;
            }
        }

        const wrapper = document.createElement('div');
        wrapper.className = 'pku-art-theme-toggle-bar';

        const toggleButton = document.createElement('button');
        toggleButton.type = 'button';
        toggleButton.className = 'pku-art-theme-toggle';
        toggleButton.setAttribute('aria-label', '切换日夜模式');

        const setIconMarkup = (mode) => {
            const normalizedMode = themeToggleIcons[mode] ? mode : 'auto';
            if (toggleButton.dataset.icon !== normalizedMode) {
                toggleButton.innerHTML = themeToggleIcons[normalizedMode];
                toggleButton.dataset.icon = normalizedMode;
            }
        };

        const updateButtonState = () => {
            const currentMode = themeManager.getCurrentMode();
            const isDark = themeManager.isDarkMode();
            let tooltipText = '切换主题';

            if (currentMode === 'auto') {
                toggleButton.dataset.mode = 'auto';
                toggleButton.dataset.state = isDark ? 'dark' : 'light';
                tooltipText = isDark ? '跟随系统（当前：黑夜模式）' : '跟随系统（当前：日间模式）';
                setIconMarkup('auto');
            } else if (currentMode === 'dark') {
                tooltipText = '黑夜模式';
                toggleButton.dataset.mode = 'dark';
                toggleButton.removeAttribute('data-state');
                setIconMarkup('dark');
            } else {
                tooltipText = '日间模式';
                toggleButton.dataset.mode = 'light';
                toggleButton.removeAttribute('data-state');
                setIconMarkup('light');
            }

            toggleButton.setAttribute('title', tooltipText);
        };

        const persistThemeMode = (mode) => {
            try {
                if (typeof GM_setValue !== 'undefined') {
                    GM_setValue('themeMode', mode);
                    return;
                }
            } catch (error) {
                console.warn('[PKU Art] GM_setValue unavailable for themeMode persistence:', error);
            }

            try {
                localStorage.setItem('themeMode', mode);
            } catch (storageError) {
                console.warn('[PKU Art] localStorage unavailable for themeMode persistence:', storageError);
            }
        };

        const cycleThemeMode = () => {
            const currentMode = themeManager.getCurrentMode();
            let nextMode = 'light';

            if (currentMode === 'light') {
                nextMode = 'dark';
            } else if (currentMode === 'dark') {
                nextMode = 'auto';
            }

            themeManager.setTheme(nextMode);
            persistThemeMode(nextMode);
            updateButtonState();
        };

        toggleButton.addEventListener('click', (event) => {
            event.preventDefault();
            event.stopPropagation();
            cycleThemeMode();
        });

        wrapper.appendChild(toggleButton);

        if (/^https:\/\/course\.pku\.edu\.cn\//.test(window.location.href)) {
            const navBarItem = remindLink.closest('.global-nav-bar');
            wrapper.classList.add('global-nav-bar');

            if (navBarItem && navBarItem.parentElement) {
                navBarItem.parentElement.insertBefore(wrapper, navBarItem.nextSibling);
            } else {
                navWrap.appendChild(wrapper);
            }
        }

        if (/^https:\/\/elective\.pku\.edu\.cn\//.test(window.location.href)) {
            if (menuExit && menuExit.parentElement) {
                menuExit.parentElement.insertBefore(wrapper, menuExit.nextSibling);
            }
        }

        updateButtonState();

        window.addEventListener('pku-art-theme-change', updateButtonState);
    };

    attachToggle();
    document.addEventListener('DOMContentLoaded', attachToggle);
    window.addEventListener('load', attachToggle);
}

// 创建全局主题管理器实例
window.PKUArtThemeManager = new ThemeManager();
const themeManager = window.PKUArtThemeManager;

export { initializeThemeManager, initializeThemeToggleButton };
