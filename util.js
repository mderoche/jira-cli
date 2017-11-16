let colors = {
    black: '\x1b[30m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    white: '\x1b[37m'
};

const normalizeIssueName = issue => {
    let prefix = /[a-zA-Z]+/.exec(issue)[0];
    let nums = +/[0-9]+/.exec(issue)[0];
    return `${prefix.toUpperCase()}-${nums}`;
};

const formatColors = text => {
    for (let color in colors) {
        text = text.replace(`{color:${color}}`, colors[color]);
    }
    text = text.replace(`{color}`, '\x1b[0m');
    return text;
};

const formatMentions = text => {
    return text.replace(/(\[\~.*\])/g, `${colors.cyan}$1\x1b[0m`);
};

const formatQuotes = text => {
    let n = 0;
    text = text.replace(/\{quote\}/g, match => {
        n++;
        return (n % 2 === 0) ? `\n\x1b[0m` : `\x1b[30;47m\n\n`;
    });
    return text;
};

const formatCodes = text => {
    let n = 0;
    text = text.replace(/\{code.*\}/g, match => {
        n++;
        return (n % 2 === 0) ? `\x1b[0m` : `\x1b[33m`;
    });
    return text;
};

const formatUnderlines = text => {
    return text.replace(/\+([^\s].*[^\s])\+/g, `\x1b[4m$1\x1b[0m`);
};

const formatLists = text => {
    text = text.replace(/\*\*\*\s(.+)/g, '------------ \u2022 $1');
    text = text.replace(/\*\*\s(.+)/g, '-------- \u2022 $1');
    text = text.replace(/\*\s(.+)/g, '---- \u2022 $1');
    return text;
};

const formatText = text => {
    text = formatColors(text);
    text = formatMentions(text);
    text = formatQuotes(text);
    text = formatCodes(text);
    text = formatUnderlines(text);
    text = formatLists(text);
    return text;
};

module.exports = {
    normalizeIssueName: normalizeIssueName,
    formatText: formatText
};