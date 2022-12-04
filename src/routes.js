const util = require("./util");
const store = require("./store");
const convert = require("./convert");

const indexRoute = (_req, res) => {
    const htmlContent = util.getHTMLContent(util.indexHtmlPath);
    const hash = util.md5(htmlContent);
    store.hashMap.set(hash, htmlContent);
    util.handleHTMLRes(res)(util.wrappedWssPort(htmlContent));
};

const socketRoute = (_req, res) => {
    const htmlContent = convert.readme2HTML();
    const hash = util.md5(htmlContent);
    store.hashMap.set(hash, htmlContent);
    util.handleHTMLRes(res)(util.wrappedWssPort(htmlContent));
};

module.exports = {
    indexRoute,
    socketRoute,
};
