import test from 'node:test';
import assert from 'node:assert/strict';
import {
    buildGeneralEducationPaginationUrls,
    getGeneralEducationFilterCounts,
    getGeneralEducationFilterDefinitions,
    getGeneralEducationSeries,
    isGeneralEducationCourseQueryResultUrl,
    matchesGeneralEducationFilter,
} from '../src/utils.js';

test('classifies numbered general education categories', () => {
    assert.equal(getGeneralEducationSeries('通识核心课II'), '二');
    assert.equal(getGeneralEducationSeries('通选课IV'), '四');
});

test('separates unnumbered and non-general categories', () => {
    assert.equal(getGeneralEducationSeries('通选课'), '未区分');
    assert.equal(getGeneralEducationSeries('专业必修课'), null);
});

test('matches only its requested filter', () => {
    assert.equal(matchesGeneralEducationFilter('通识核心课III', 'allTsk'), true);
    assert.equal(matchesGeneralEducationFilter('通识核心课III', '三'), true);
    assert.equal(matchesGeneralEducationFilter('通识核心课III', '二'), false);
    assert.equal(matchesGeneralEducationFilter('专业必修课', 'all'), true);
});

test('counts all filter categories for the current course page', () => {
    assert.deepEqual(getGeneralEducationFilterCounts(['专业必修课', '通识核心课I', '通选课IV', '通选课']), {
        all: 4,
        allTsk: 3,
        一: 1,
        二: 0,
        三: 0,
        四: 1,
        未区分: 1,
    });
});

test('defines a count key for every series button', () => {
    assert.deepEqual(
        getGeneralEducationFilterDefinitions().map(({ key, label }) => [key, label]),
        [
            ['all', '全部'],
            ['allTsk', '通识课'],
            ['一', '一'],
            ['二', '二'],
            ['三', '三'],
            ['四', '四'],
            ['未区分', '未区分'],
        ],
    );
});

test('builds every result-page URL from the query form offsets', () => {
    assert.deepEqual(
        buildGeneralEducationPaginationUrls(
            'queryCurriculum.jsp',
            'https://elective.pku.edu.cn/elective2008/edu/pku/stu/elective/controller/courseQuery/getCurriculmByForm.do',
            [['semester', '20261']],
            ['syllabusListGrid;0', 'syllabusListGrid;100'],
        ),
        [
            'https://elective.pku.edu.cn/elective2008/edu/pku/stu/elective/controller/courseQuery/queryCurriculum.jsp?semester=20261&netui_row=syllabusListGrid%3B0',
            'https://elective.pku.edu.cn/elective2008/edu/pku/stu/elective/controller/courseQuery/queryCurriculum.jsp?semester=20261&netui_row=syllabusListGrid%3B100',
        ],
    );
});

test('limits the filter to course query result pages', () => {
    assert.equal(
        isGeneralEducationCourseQueryResultUrl(
            'https://elective.pku.edu.cn/elective2008/edu/pku/stu/elective/controller/courseQuery/getCurriculmByForm.do',
        ),
        true,
    );
    assert.equal(
        isGeneralEducationCourseQueryResultUrl(
            'https://elective.pku.edu.cn/elective2008/edu/pku/stu/elective/controller/electivePlan/ElectivePlanController.jpf',
        ),
        false,
    );
});
