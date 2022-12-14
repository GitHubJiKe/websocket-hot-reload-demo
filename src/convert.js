const showdown = require("showdown");
const md = require("markdown-it")({
    html: true,
    linkify: true,
    typographer: true,
});
const fs = require("fs");
const constant = require("./constant");
const { JSDOM } = require("jsdom");

globalThis.window = new JSDOM("", {}).window;

const convert = new showdown.Converter(constant.showdownOpts);

const convertFunc = (filepath, mode = "markdown-it") => {
    const contentStr = fs.readFileSync(filepath).toString();
    return mode === "showdown"
        ? convert.makeHtml(contentStr)
        : md.render(contentStr);
};

const convert2Markdown = (src) => convert.makeMarkdown(src);

module.exports = {
    convert: convertFunc,
    unconvert: convert2Markdown,
};
