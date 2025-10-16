/*
 * 主题模式管理器
 * Author: Arthals
 * Email: zhuozhiyongde@126.com
 * Github: https://github.com/zhuozhiyongde
 * Blog: https://arthals.ink
 */

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

    applyTheme(isDark) {
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
}

// 创建全局主题管理器实例
window.PKUArtThemeManager = new ThemeManager();

export default window.PKUArtThemeManager;
