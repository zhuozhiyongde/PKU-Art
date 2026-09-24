import applyStylesForCurrentPage from './style.js';
import { initializeVideoTextBridge, initializeBatchTranscript } from './videoText.js';
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
    refactorElectiveSupplementPage,
} from './utils.js';

initializeVideoTextBridge();
initializeBatchTranscript();
applyStylesForCurrentPage();
// Capture the player's first XHR at document-start; DOM helpers need a document.
initializeDirectDownload();
function initializePage() {
    initializeThemeManager();
    initializeThemeToggleButton();
    initializeLogoNavigation();
    ensureSidebarVisible();
    overrideSiteIcons();
    removeCourseSerialNumbers();
    redirectGlobalMoreLink();
    enableDirectOpenLinks();
    manageElectiveCourseQueryForm();
    initializeBatchDownload();
    refactorIaaaPage();
    refactorElectiveFaqPage();
    refactorElectivePlanPage();
    refactorElectiveWorkPage();
    refactorElectiveCourseQueryPage();
    refactorElectiveSupplementPage();
    // insertHTMLForDebug();
}
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializePage, { once: true });
} else {
    initializePage();
}
