const showdown = require("showdown");
const { JSDOM } = require("jsdom");
const fs = require("fs");
const util = require("./util");

const opts = {
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

const convert = new showdown.Converter(opts);

function getCompleteHTML(content) {
    const dom = new JSDOM(fs.readFileSync(util.indexHtmlPath).toString());
    dom.window.document.body.querySelector("#app").remove();
    const eles = new JSDOM(content).window.document.body.querySelectorAll("*");
    dom.window.document.body.append(...eles);
    return dom.serialize();
}

const convertFunc = (filepath) => {
    const markdownContent = fs.readFileSync(filepath).toString();
    return getCompleteHTML(convert.makeHtml(markdownContent));
};
module.exports = {
    readme2HTML: () => {
        return convertFunc(util.readmePath);
    },
    convert: convertFunc,
};
