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
    manageElectiveCourseQueryForm,
    insertHTMLForDebug,
    initializeBatchDownload,
    refactorIaaaPage,
    refactorElectiveFaqPage,
    refactorElectivePlanPage,
    refactorElectiveWorkPage,
    refactorElectiveCourseQueryPage,
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
manageElectiveCourseQueryForm();
initializeBatchDownload();
refactorIaaaPage();
refactorElectiveFaqPage();
refactorElectivePlanPage();
refactorElectiveWorkPage();
refactorElectiveCourseQueryPage();
// insertHTMLForDebug();
