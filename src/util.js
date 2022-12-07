const fs = require("fs");
const path = require("path");
const constant = require("./constant");
const convert = require("./convert");
const store = require("./store");
const ejs = require("ejs");
const router = require("./router");

const randomColor = () =>
    `#${Math.floor(Math.random() * 16777215).toString(16)}`;

const wrappedWssPort = (content) =>
    content.replace("$PORT$", constant.WSS_PORT);

const handleHTMLRes = (res) => (content) => {
    res.setHeader("content-type", "text/html");
    res.statusCode = 200;
    res.end(content);
};

const reload = () => store.wsMap.forEach((ws) => ws.send("reload"));

function getArticleFilenames() {
    return fs
        .readdirSync(constant.articleDirPath)
        .map((v) => path.parse(v).name);
}

async function getIndexHTMLContent() {
    return await ejs.renderFile(constant.templatePath, {
        port: constant.WSS_PORT,
        articleNames: getArticleFilenames(),
        title: "主页",
        content: convert.convert(constant.readmePath),
    });
}

async function getArticleContent(articlePath) {
    return await ejs.renderFile(constant.articleTemplatePath, {
        port: constant.WSS_PORT,
        content: convert.convert(articlePath),
        title: path.parse(articlePath).name,
    });
}

module.exports = {
    getIndexHTMLContent,
    randomColor,
    handleHTMLRes,
    reload,
    getArticleContent,
};
