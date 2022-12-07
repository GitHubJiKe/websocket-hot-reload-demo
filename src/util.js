const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const constant = require("./constant");
const convert = require("./convert");
const store = require("./store");

const getHTMLContent = (htmlPath) => fs.readFileSync(htmlPath).toString();


const randomColor = () =>
    `#${Math.floor(Math.random() * 16777215).toString(16)}`;

const wrappedWssPort = (content) =>
    content.replace("$PORT$", constant.WSS_PORT);

const wrappedArticleNames = (content, filenames) =>
    content.replace("$ARTICLES$", filenames);

const handleHTMLRes = (res) => (content) => {
    res.setHeader("content-type", "text/html");
    res.statusCode = 200;
    res.end(content);
};

const reload = () => store.wsMap.forEach((ws) => ws.send("reload"));

function getArticleFilenames() {
    return fs.readdirSync(constant.articleDirPath).map(v => path.parse(v).name)
}

function getIndexHTMLContent() {
    const filenames = getArticleFilenames()
    return wrappedArticleNames(wrappedWssPort(getHTMLContent(constant.indexHtmlPath)), filenames)
}
function getArticleContent(articlePath) {
    return wrappedWssPort(convert.convert(articlePath))
}

module.exports = {
    getIndexHTMLContent,
    randomColor,
    handleHTMLRes,
    reload,
    getArticleContent,
};
