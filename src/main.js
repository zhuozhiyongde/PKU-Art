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
    removeEmptyTableRows,
    insertHTMLForDebug,
} from './utils.js';

applyStylesForCurrentPage();
initializeThemeManager();
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
removeEmptyTableRows();
// insertHTMLForDebug();
