const JiraClient = require('jira-connector');

let jira;

module.exports = () => {
    if (!jira) {
        jira = new JiraClient( {
            host: '.atlassian.net',
            basic_auth: {
                base64: ''
            }
        });
    }
    return jira;
}