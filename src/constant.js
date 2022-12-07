const path = require("path");

const PORT = 3000;
const WSS_PORT = PORT + 1;
const staticPath = path.resolve(__dirname, "../public");
const indexHtmlPath = path.resolve(staticPath, "./index.html");
const articleDirPath = path.resolve(__dirname, "../articles");
const templatePath = path.resolve(__dirname, "../template/index.ejs");
const articleTemplatePath = path.resolve(__dirname, "../template/article.ejs");
const readmePath = path.resolve(__dirname, "../README.md");
const showdownOpts = {
    strikethrough: true,
    underline: true,
    tasklists: true,
    tables: true,
    tablesHeaderId: true,
    splitAdjacentBlockquotes: true,
    smartIndentationFix: true,
    simplifiedAutoLink: true,
    simpleLineBreaks: true,
    requireSpaceBeforeHeadingText: true,
    parseImgDimensions: true,
    openLinksInNewWindow: true,
    omitExtraWLInCodeBlocks: true,
    ghMentions: true,
    excludeTrailingPunctuationFromURLs: true,
    encodeEmails: true,
    emoji: true,
    backslashEscapesHTMLTags: true,
    metadata: true,
};
module.exports = {
    PORT,
    WSS_PORT,
    showdownOpts,
    staticPath,
    indexHtmlPath,
    articleDirPath,
    templatePath,
    readmePath,
    articleTemplatePath,
};
