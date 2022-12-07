const showdown = require("showdown");
const { JSDOM } = require("jsdom");
const fs = require("fs");
const constant = require("./constant");

const convert = new showdown.Converter(constant.showdownOpts);

function getCompleteHTML(content) {
    const dom = new JSDOM(fs.readFileSync(constant.indexHtmlPath).toString());
    dom.window.document.body.querySelector("#app").remove();
    const eles = new JSDOM(content).window.document.body.querySelectorAll("*");
    dom.window.document.body.append(...eles);
    return dom.serialize();
}

const convertFunc = (filepath) => {
    try {
        const markdownContent = fs.readFileSync(filepath).toString();
        return getCompleteHTML(convert.makeHtml(markdownContent));
    } catch (error) {
        return getCompleteHTML(`<p style="color:red;">Not found File:${filepath}</p>`)
    }
};
module.exports = {
    convert: convertFunc,
};
