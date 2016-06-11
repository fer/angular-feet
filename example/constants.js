var config10Kft = {
    apiKey: 'Tjh5c1JEVUFUdkNhS3B5S0dIc0tOQmdnQjZwTmpCb2FhaGxQLzlXYnc0RmtzanpoMEZLbFBpdkFoejFvCllrL1lYTVdtNXo4TXozTzBOTGk5R0ZpaVpKeTlBVWNOOXBGOTFPb3lKK05oUUlicW9lbW10WWxpR1NsOQpsbGZIQlJWYwo=',
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