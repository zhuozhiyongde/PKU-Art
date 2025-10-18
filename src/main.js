import applyStylesForCurrentPage from './style.js';
import { initializeThemeManager, initializeThemeToggleButton } from './theme.js';
import {
    initializeLogoNavigation,
    ensureSidebarVisible,
    overrideSiteIcons,
    removeCourseSerialNumbers,
    initializeDirectDownload,
    redirectGlobalMoreLink,
    enableDirectOpenLinks,
    restoreCourseQueryValues,
    refactorCourseQueryPagination,
    formValueStorage,
    insertHTMLForDebug,
} from './utils.js';

initializeThemeManager();
applyStylesForCurrentPage();
initializeThemeToggleButton();
initializeLogoNavigation();
ensureSidebarVisible();
overrideSiteIcons();
removeCourseSerialNumbers();
initializeDirectDownload();
redirectGlobalMoreLink();
enableDirectOpenLinks();
restoreCourseQueryValues();
refactorCourseQueryPagination();
formValueStorage();
// insertHTMLForDebug();
