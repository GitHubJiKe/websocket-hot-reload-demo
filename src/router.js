const express = require("express");
const router = express.Router();
const util = require("./util");
const constant = require("./constant");
const fs = require("fs");
const convert = require("./convert");
const { promisify } = require("util");

const writeFilePro = promisify(fs.writeFile);

function validUrl(url) {
    if (["/", "/editor", "/post"].includes(url)) {
        return true;
    }
    const regxs = [
        /^\/article\/[0-9a-zA-Z\u4e00-\u9fa5]/,
        /^\/editor\/[0-9a-zA-Z\u4e00-\u9fa5]/,
    ];
    return regxs.some((regx) => regx.test(decodeURI(url)));
}

router.all("*", async (req, res, next) => {
    if (validUrl(req.url)) {
        next();
        return;
    }
    const htmlContent = await util.getNotFoundContent();
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

    const htmlContent = await util.getNotFoundContent();
    util.handleHTMLRes(res)(htmlContent);
});

router.get("/editor", async (_req, res) => {
    const htmlContent = await util.getEditorContent();
    util.handleHTMLRes(res)(htmlContent);
});

router.get("/editor/:name", async (req, res) => {
    const articleName = req.params.name;
    const articlePath = `${constant.articleDirPath}/${articleName}.md`;
    const content = convert.convert(articlePath);
    const htmlContent = await util.getEditorContent(content, articleName);
    util.handleHTMLRes(res)(htmlContent);
});

router.post("/post", async (req, res) => {
    const { content, title } = req.body;
    const markdownContent = convert.unconvert(content);
    await writeFilePro(
        `${constant.articleDirPath}/${title || Date.now()}.md`,
        markdownContent
    );
    res.end("OK");
});

module.exports = router;
