import mainStyles from './css/main.css?inline';
import arcoPaletteStyles from './css/arco-palette.css?inline';
import iaaaOAuthPageStyles from './css/iaaaOAuthPage.css?inline';
import courseLoginPageStyles from './css/courseLoginPage.css?inline';
import courseHomePageStyles from './css/courseHomePage.css?inline';
import courseContentStyles from './css/courseContent.css?inline';
import courseAnnouncementStyles from './css/courseAnnouncement.css?inline';
import courseTeachingStaffListStyles from './css/courseTeachingStaffList.css?inline';
import courseClassinStyles from './css/courseClassin.css?inline';
import courseBlankPageStyles from './css/courseBlankPage.css?inline';
import courseVideolistStyles from './css/courseVideolist.css?inline';
import courseOtherStyles from './css/courseOther.css?inline';
import courseClassGradeStyles from './css/courseClassGrade.css?inline';
import courseListContentStyles from './css/courseListContent.css?inline';
import courseViewAttemptStyles from './css/courseViewAttempt.css?inline';
import courseToolFrameStyles from './css/courseToolFrame.css?inline';
import courseToolAlertStyles from './css/courseToolAlert.css?inline';
import courseToolGradeStyles from './css/courseToolGrade.css?inline';
import courseToolGradeClassStyles from './css/courseToolGradeClass.css?inline';
import courseToolGradeItemStyles from './css/courseToolGradeItem.css?inline';
import courseFileEmbedStyles from './css/courseFileEmbed.css?inline';
import courseAssignmentUploadStyles from './css/courseAssignmentUpload.css?inline';
import courseGlobalPageStyles from './css/courseGlobalPage.css?inline';
import courseGlobalAnnouncementStyles from './css/courseGlobalAnnouncement.css?inline';
import courseVideoPlayStyles from './css/courseVideoPlay.css?inline';
import courseVideoPlayFrameStyles from './css/courseVideoPlayFrame.css?inline';
import courseTaskStyles from './css/courseTask.css?inline';
import courseDiscussionStyles from './css/courseDiscussion.css?inline';
import courseExternalLinkStyles from './css/courseExternalLink.css?inline';
import courseToolCalendarStyles from './css/courseToolCalendar.css?inline';
import courseOralTrainingStyles from './css/courseOralTraining.css?inline';
import courseViewGroupStyles from './css/courseViewGroup.css?inline';
import electiveSsoLoginStyles from './css/electiveSsoLogin.css?inline';
import electiveMainStyles from './css/electiveMain.css?inline';
import electivePlanStyles from './css/electivePlan.css?inline';
import electiveResultsStyles from './css/electiveResults.css?inline';
import electiveHelpStyles from './css/electiveHelp.css?inline';
import electiveDetailStyles from './css/electiveDetail.css?inline';
import electiveCourseQueryStyles from './css/electiveCourseQuery.css?inline';
import electiveFaqStyles from './css/electiveFaq.css?inline';

function injectStyles(styleString, cssFileName) {
    const styleElement = document.createElement('style');
    styleElement.textContent = styleString;
    styleElement.dataset.cssFileName = cssFileName;
    styleElement.dataset.author = 'Arthals';
    styleElement.className = 'PKU-Art';

    document.documentElement.appendChild(styleElement);
}

const currentUrl = window.location.href;

const globalStyleScopes = [
    /^https:\/\/iaaa\.pku\.edu\.cn\/\S*$/,
    /^https:\/\/course\.pku\.edu\.cn\/\S*$/,
    /^https:\/\/onlineroomse\.pku\.edu\.cn\/\S*$/,
    // 选课网，已完成，待选课时进行验证
    /^https:\/\/elective\.pku\.edu\.cn\/\S*$/,
    // local development
    // /^file:\/\/\S*$/,
];

const styleRules = [
    {
        patterns: globalStyleScopes,
        excludePatterns: [],
        styleContent: mainStyles,
        fileName: 'main.css',
    },
    {
        patterns: globalStyleScopes,
        excludePatterns: [],
        styleContent: arcoPaletteStyles,
        fileName: 'arco-palette.css',
    },
    {
        patterns: [/^https:\/\/iaaa\.pku\.edu\.cn\/\S*$/],
        excludePatterns: [],
        styleContent: iaaaOAuthPageStyles,
        fileName: 'iaaaOAuthPage.css',
    },
    {
        patterns: [/^https:\/\/course\.pku\.edu\.cn\/webapps\/login\S*$/, /^https:\/\/course\.pku\.edu\.cn[\/]?$/],
        excludePatterns: [],
        styleContent: courseLoginPageStyles,
        fileName: 'courseLoginPage.css',
    },
    {
        patterns: [
            /^https:\/\/course\.pku\.edu\.cn\/webapps\/?$/,
            /^https:\/\/course\.pku\.edu\.cn\/webapps\/portal\/\S*$/,
        ],
        excludePatterns: [],
        styleContent: courseHomePageStyles,
        fileName: 'courseHomePage.css',
    },
    {
        patterns: [/^https:\/\/course\.pku\.edu\.cn\/webapps\/\S*course_id\S*$/],
        excludePatterns: [],
        styleContent: courseContentStyles,
        fileName: 'courseContent.css',
    },
    {
        patterns: [/^https:\/\/course\.pku\.edu\.cn\/webapps\/blackboard\S*announcement\S*$/],
        excludePatterns: [],
        styleContent: courseAnnouncementStyles,
        fileName: 'courseAnnouncement.css',
    },
    {
        patterns: [/^https:\/\/course\.pku\.edu\.cn\/webapps\S*getTeachingStaffList\S*$/],
        excludePatterns: [],
        styleContent: courseTeachingStaffListStyles,
        fileName: 'courseTeachingStaffList.css',
    },
    {
        patterns: [/^https:\/\/course\.pku\.edu\.cn\/webapps\S*classinCourseClass\S*$/],
        excludePatterns: [],
        styleContent: courseClassinStyles,
        fileName: 'courseClassin.css',
    },
    {
        patterns: [/^https:\/\/course\.pku\.edu\.cn\/webapps\S*blankPage\S*$/],
        excludePatterns: [],
        styleContent: courseBlankPageStyles,
        fileName: 'courseBlankPage.css',
    },
    {
        patterns: [/^https:\/\/course\.pku\.edu\.cn\/webapps\S*videoList\S*$/],
        excludePatterns: [],
        styleContent: courseVideolistStyles,
        fileName: 'courseVideolist.css',
    },
    {
        patterns: [/^https:\/\/course\.pku\.edu\.cn\/webapps\S*((discussionboard)|(groupContentList))\S*$/],
        excludePatterns: [],
        styleContent: courseOtherStyles,
        fileName: 'courseOther.css',
    },
    {
        patterns: [/^https:\/\/course\.pku\.edu\.cn\/webapps\S*myGrades\S*course_id\S*is_stream=false\S*$/],
        excludePatterns: [],
        styleContent: courseClassGradeStyles,
        fileName: 'courseClassGrade.css',
    },
    {
        patterns: [/^https:\/\/course\.pku\.edu\.cn\/webapps\S*listContent\S*$/],
        excludePatterns: [],
        styleContent: courseListContentStyles,
        fileName: 'courseListContent.css',
    },
    {
        patterns: [/^https:\/\/course\.pku\.edu\.cn\/webapps\S*viewAttempts\S*$/],
        excludePatterns: [],
        styleContent: courseViewAttemptStyles,
        fileName: 'courseViewAttempt.css',
    },
    {
        patterns: [/^https:\/\/course\.pku\.edu\.cn\/webapps\S*toolId\S*$/],
        excludePatterns: [],
        styleContent: courseToolFrameStyles,
        fileName: 'courseToolFrame.css',
    },
    {
        patterns: [/^https:\/\/course\.pku\.edu\.cn\/webapps\/streamViewer\/streamViewer\S*streamName=alerts\S*$/],
        excludePatterns: [],
        styleContent: courseToolAlertStyles,
        fileName: 'courseToolAlert.css',
    },
    {
        patterns: [/^https:\/\/course\.pku\.edu\.cn\/webapps\/streamViewer\/streamViewer\S*streamName=mygrades\S*$/],
        excludePatterns: [],
        styleContent: courseToolGradeStyles,
        fileName: 'courseToolGrade.css',
    },
    {
        patterns: [/^https:\/\/course\.pku\.edu\.cn\/webapps\/\S*course_id\S*stream_name=mygrades$/],
        excludePatterns: [],
        styleContent: courseToolGradeClassStyles,
        fileName: 'courseToolGradeClass.css',
    },
    {
        patterns: [
            /^https:\/\/course\.pku\.edu\.cn\/webapps\/\S*course_id\S*stream_name=mygrades_d\S*gradable_item_id\S*$/,
        ],
        excludePatterns: [],
        styleContent: courseToolGradeItemStyles,
        fileName: 'courseToolGradeItem.css',
    },
    {
        patterns: [/^https:\/\/course\.pku\.edu\.cn\/webapps\/\S*content\/file\?cmd=view\S*$/],
        excludePatterns: [],
        styleContent: courseFileEmbedStyles,
        fileName: 'courseFileEmbed.css',
    },
    {
        patterns: [/^https:\/\/course\.pku\.edu\.cn\/webapps\/\S*assignment\/uploadAssignment\?\S*$/],
        excludePatterns: [],
        styleContent: courseAssignmentUploadStyles,
        fileName: 'courseAssignmentUpload.css',
    },
    {
        patterns: [
            /^https:\/\/course\.pku\.edu\.cn\/webapps\/\S*context=mybb\S*$/,
            /^https:\/\/course\.pku\.edu\.cn\/webapps\/blackboard\/execute\/announcement$/,
            /^https:\/\/course\.pku\.edu\.cn\/webapps\/\S*playVideo\S*$/,
        ],
        excludePatterns: [],
        styleContent: courseGlobalPageStyles,
        fileName: 'courseGlobalPage.css',
    },
    {
        patterns: [
            /^https:\/\/course\.pku\.edu\.cn\/webapps\/\S*announcement\S*context=mybb\S*$/,
            /^https:\/\/course\.pku\.edu\.cn\/webapps\/blackboard\/execute\/announcement$/,
        ],
        excludePatterns: [],
        styleContent: courseGlobalAnnouncementStyles,
        fileName: 'courseGlobalAnnouncement.css',
    },
    {
        patterns: [/^https:\/\/course\.pku\.edu\.cn\/webapps\/\S*playVideo\S*$/],
        excludePatterns: [],
        styleContent: courseVideoPlayStyles,
        fileName: 'courseVideoPlay.css',
    },
    {
        patterns: [/^https:\/\/onlineroomse\.pku\.edu\.cn\/player\?course_id\S*$/],
        excludePatterns: [],
        styleContent: courseVideoPlayFrameStyles,
        fileName: 'courseVideoPlayFrame.css',
    },
    {
        patterns: [/^https:\/\/course\.pku\.edu\.cn\/webapps\/\S*taskView\S*$/],
        excludePatterns: [],
        styleContent: courseTaskStyles,
        fileName: 'courseTask.css',
    },
    {
        patterns: [/^https:\/\/course\.pku\.edu\.cn\/webapps\/\S*discussionboard\S*$/],
        excludePatterns: [],
        styleContent: courseDiscussionStyles,
        fileName: 'courseDiscussion.css',
    },
    {
        patterns: [/^https:\/\/course\.pku\.edu\.cn\/webapps\/\S*contentWrapperNoFrame\S*$/],
        excludePatterns: [],
        styleContent: courseExternalLinkStyles,
        fileName: 'courseExternalLink.css',
    },
    // https://course.pku.edu.cn/webapps/calendar/viewMyBb?globalNavigation=false
    {
        patterns: [/^https:\/\/course\.pku\.edu\.cn\/webapps\/calendar\/\S*$/],
        excludePatterns: [],
        styleContent: courseToolCalendarStyles,
        fileName: 'courseToolCalendar.css',
    },
    {
        patterns: [/^https:\/\/course\.pku\.edu\.cn\/webapps\/\S*oralTraining\S*$/],
        excludePatterns: [],
        styleContent: courseOralTrainingStyles,
        fileName: 'courseOralTraining.css',
    },
    {
        patterns: [/^https:\/\/course\.pku\.edu\.cn\/webapps\/\S*viewGroup\S*$/],
        excludePatterns: [],
        styleContent: courseViewGroupStyles,
        fileName: 'courseViewGroup.css',
    },
    // 选课网，已完成，待选课时进行验证
    {
        patterns: [/^https:\/\/elective\.pku\.edu\.cn\/elective2008\/ssoLogin\.do\?_rand\S*$/],
        excludePatterns: [],
        styleContent: electiveSsoLoginStyles,
        fileName: 'electiveSsoLogin.css',
    },
    {
        patterns: [/^https:\/\/elective\.pku\.edu\.cn\/elective2008\/edu\/pku\/stu\/elective\/controller\S*$/],
        excludePatterns: [/^\S*goNested\.do\S*$/, /^\S*courseQuery\S*$/, /^\S*getCourseDetail\.do\S*$/],
        styleContent: electiveMainStyles,
        fileName: 'electiveMain.css',
    },
    {
        patterns: [
            /^https:\/\/elective\.pku\.edu\.cn\/elective2008\/edu\/pku\/stu\/elective\/controller\/electivePlan\/\S*$/,
        ],
        excludePatterns: [],
        styleContent: electivePlanStyles,
        fileName: 'electivePlan.css',
    },
    {
        patterns: [
            /^https:\/\/elective\.pku\.edu\.cn\/elective2008\/edu\/pku\/stu\/elective\/controller\/electiveWork\/showResults\.do\S*$/,
        ],
        excludePatterns: [],
        styleContent: electiveResultsStyles,
        fileName: 'electiveResults.css',
    },
    {
        patterns: [
            /^https:\/\/elective\.pku\.edu\.cn\/elective2008\/edu\/pku\/stu\/elective\/controller\/help\/HelpController\.jpf\S*$/,
        ],
        excludePatterns: [],
        styleContent: electiveHelpStyles,
        fileName: 'electiveHelp.css',
    },
    {
        patterns: [
            /^https:\/\/elective\.pku\.edu\.cn\/elective2008\/edu\/pku\/stu\/elective\/controller\/\S*\/goNested\.do\S*$/,
            /^https:\/\/elective\.pku\.edu\.cn\/elective2008\/edu\/pku\/stu\/elective\/controller\/\S*\/getCourseDetail.do\S*$/,
        ],
        excludePatterns: [],
        styleContent: electiveDetailStyles,
        fileName: 'electiveDetail.css',
    },
    {
        patterns: [
            /^https:\/\/elective\.pku\.edu\.cn\/elective2008\/edu\/pku\/stu\/elective\/controller\/courseQuery\/\S*$/,
        ],
        excludePatterns: [/^\S*goNested\.do\S*$/, /^\S*getCourseDetail\.do\S*$/],
        styleContent: electiveCourseQueryStyles,
        fileName: 'electiveCourseQuery.css',
    },
    {
        // https://elective.pku.edu.cn/elective2008/edu/pku/stu/elective/controller/help/faqForUnderGrad.jsp
        patterns: [
            /^https:\/\/elective\.pku\.edu\.cn\/elective2008\/edu\/pku\/stu\/elective\/controller\/help\/faqForUnderGrad\.jsp\S*$/,
        ],
        excludePatterns: [],
        styleContent: electiveFaqStyles,
        fileName: 'electiveFaq.css',
    },
];

function matchesAnyPattern(patterns, url) {
    return patterns.some((pattern) => pattern.test(url));
}

function applyStylesForCurrentPage(url = currentUrl) {
    styleRules.forEach(({ patterns, excludePatterns, styleContent, fileName }) => {
        if (matchesAnyPattern(patterns, url) && !matchesAnyPattern(excludePatterns, url)) {
            injectStyles(styleContent, fileName);
            console.log(`[PKU Art] ${fileName} imported`);
        }
    });
}

export default applyStylesForCurrentPage;
