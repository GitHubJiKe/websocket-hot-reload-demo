const showdown = require("showdown");
const fs = require("fs");
const constant = require("./constant");
const { JSDOM } = require("jsdom");

globalThis.window = new JSDOM("", {}).window;

const convert = new showdown.Converter(constant.showdownOpts);

const convertFunc = (filepath) =>
    convert.makeHtml(fs.readFileSync(filepath).toString());

const convert2Markdown = (src) => convert.makeMarkdown(src);

module.exports = {
    convert: convertFunc,
    unconvert: convert2Markdown,
};
