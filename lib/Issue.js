class Issue {
    constructor (def) {
        this.load(def);
    }

    load(issue) {
        this.name = issue.key;
        this.status = issue.fields.status.name;
        this.summary = issue.fields.summary;
        this.description = issue.fields.description;
        this.reporter = issue.fields.reporter.name;
        this.assignee = issue.fields.assignee.name;

        this.time = {
            original: (issue.fields.timetracking && issue.fields.timetracking.originalEstimate) || '-',
            remaining: (issue.fields.timetracking && issue.fields.timetracking.remainingEstimate) || '-',
            logged: (issue.fields.timetracking && issue.fields.timetracking.timeSpent) || '-'
        };

        this.comments = (issue.fields.comment && issue.fields.comment.comments) || [];
        this.worklogs = (issue.fields.worklog && issue.fields.worklog.worklogs) || [];

        if (this.comments.length) {
            this.comments.sort((a, b) => new Date(b.created) - new Date(a.created));

            this.comments = this.comments.map(comment => ({
                author: comment.author.name,
                text: comment.body
            }));
        }

        if (this.worklogs.length) {
            this.worklogs.sort((a, b) => new Date(b.created) - new Date(a.created));

            this.worklogs = this.worklogs.map(wl => ({
                author: wl.author.name,
                time: wl.timeSpent,
                text: wl.comment
            }));
        }
    }

    hasComments() {
        return this.comments.length > 0;
    }

    hasWorklogs() {
        return this.worklogs.length > 0;
    }
}

module.exports = Issue;