var config10Kft = {
    apiKey: 'bzhBenVpQnY1UnJkTHNqTGdwNTQ2ejYxZldOcTJQbEROK3NIQUJETWsydXdtQjRYalBwblcybVpXZmIvCmEvYWNQWHlMQkxaejdSRGY4MlhBME56dGNGd2lOS3pLRERHYmhJQW5Wa1hBYzhlUGhKcHpIT1lCZlc0VwpTVy9zWWlhQgo=',
    baseUrl: 'https://vnext-api.10000ft.com/api/v1',
    perPage: 1000
};

var apiItems = [];

var apiSections = [
    'API Documentation',
    'Projects',
    'Phases',
    'Leave Types',
    'Project Budgets',
    'Bill Rates by Project',
    'Users',
    'User Status',
    'Assignments',
    'User per Project',
    'Time Entries by User',
    'Time Entries by Project',
    'Expense Entries',
    'Budget Item Categories',
    'Tags per User',
    'Tags per Project'
];

apiSections.forEach(function(section){
    var strHyphenated = strToHyphenated(section);

    apiItems.push({
        title: section,
        route: strHyphenated,
        tplUrl: 'templates/' + strHyphenated + '.html',
        ctrl: toCamelCase(section) + 'Controller',
        modCtrl: 'controllers.' + toCamelCase(section) + 'Controller',
        docLink: 'https://www.10000ft.com/plans/reference/' + strHyphenated + '/overview#top'
    })
});
