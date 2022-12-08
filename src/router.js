const express = require("express");
const router = express.Router();
const util = require("./util");
const constant = require("./constant");
const fs = require("fs");
const ejs = require("ejs");

function validUrl(url) {
    if (url === "/") {
        return true;
    }
    return /^\/article\/[a-zA-Z\u4e00-\u9fa5]/.test(decodeURI(url));
}

router.all("*", async (req, res, next) => {
    if (validUrl(req.url)) {
        next();
        return;
    }
    const htmlContent = await ejs.renderFile(constant.notFoundPath);
    util.handleHTMLRes(res)(htmlContent);
});

router.get("/", async (_req, res) => {
    const content = await util.getIndexHTMLContent();
    util.handleHTMLRes(res)(content);
});

router.get(`/article/:name`, async (req, res) => {
    const articleName = req.params.name;
    if (articleName) {
        const articlePath = `${constant.articleDirPath}/${articleName}.md`;
        if (fs.existsSync(articlePath)) {
            const htmlContent = await util.getArticleContent(articlePath);
            util.handleHTMLRes(res)(htmlContent);
            return;
        }
    }

    const htmlContent = await ejs.renderFile(constant.notFoundPath);
    util.handleHTMLRes(res)(htmlContent);
});

module.exports = router;
