const showdown = require("showdown");
const fs = require("fs");
const constant = require("./constant");

const convert = new showdown.Converter(constant.showdownOpts);

const convertFunc = (filepath) =>
    convert.makeHtml(fs.readFileSync(filepath).toString());

module.exports = {
    convert: convertFunc,
};
