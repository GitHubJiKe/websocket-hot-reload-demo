const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const util = require("./util");
const constant = require("./constant");

genArticleRoutes();

router.use((_req, _res, next) => {
    console.log("Time: ", Date.now());
    next();
});

router.get("/", async (_req, res) => {
    const content = await util.getIndexHTMLContent();
    util.handleHTMLRes(res)(content);
});

function appendRoute(articleName, articlePath) {
    router.get(`/${encodeURI(articleName)}`, async (_req, res) => {
        const htmlContent = await util.getArticleContent(articlePath);
        util.handleHTMLRes(res)(htmlContent);
    });
}

function genArticleRoutes() {
    const filenames = fs.readdirSync(constant.articleDirPath);
    for (const filename of filenames) {
        const articlePath = path.resolve(constant.articleDirPath, filename);
        const articleName = path.parse(articlePath).name;
        appendRoute(articleName, articlePath);
    }
}

module.exports = {
    router,
    appendRoute,
};
