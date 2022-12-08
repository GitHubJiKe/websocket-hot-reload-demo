const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const util = require("./util");
const constant = require("./constant");

router.use((_req, _res, next) => {
    console.log("Time: ", Date.now());
    next();
});

router.get("/", async (_req, res) => {
    const content = await util.getIndexHTMLContent();
    util.handleHTMLRes(res)(content);
});

router.get(`/article/:name`, async (req, res) => {
    const articleName = req.params.name;
    const htmlContent = await util.getArticleContent(
        `${constant.articleDirPath}/${articleName}.md`
    );
    util.handleHTMLRes(res)(htmlContent);
});

module.exports = router;
