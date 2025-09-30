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

        // 应用初始主题
        this.updateTheme();

        console.log('[PKU Art] ThemeManager initialized with mode:', this.currentMode);
    }

    getStoredTheme() {
        try {
            return GM_getValue('pku-art-theme-mode', null);
        } catch (e) {
            return localStorage.getItem('pku-art-theme-mode');
        }
    }

    setStoredTheme(mode) {
        try {
            GM_setValue('pku-art-theme-mode', mode);
        } catch (e) {
            localStorage.setItem('pku-art-theme-mode', mode);
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
        let shouldBeDark = false;

        switch (this.currentMode) {
            case this.themeModes.LIGHT:
                shouldBeDark = false;
                break;
            case this.themeModes.DARK:
                shouldBeDark = true;
                break;
            case this.themeModes.AUTO:
                shouldBeDark = this.mediaQuery ? this.mediaQuery.matches : false;
                break;
        }

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
}

// 创建全局主题管理器实例
window.PKUArtThemeManager = new ThemeManager();

export default window.PKUArtThemeManager;
