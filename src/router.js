const express = require("express")
const router = express.Router()
const path = require("path")
const fs = require("fs")
const util = require("./util");
const store = require("./store");
const constant = require("./constant");

genArticleRoutes()

router.use((_req, _res, next) => {
    console.log('Time: ', Date.now())
    next()
})

router.get('/', (_req, res) => {
    util.handleHTMLRes(res)(util.getIndexHTMLContent());
})

function genArticleRoutes() {
    const filenames = fs.readdirSync(constant.articleDirPath)
    for (const filename of filenames) {
        const articlePath = path.resolve(constant.articleDirPath, filename)
        const articleName = path.parse(articlePath).name
        router.get(`/${encodeURI(articleName)}`, (_req, res) => {
            const htmlContent = util.getArticleContent(articlePath)
            util.handleHTMLRes(res)(htmlContent);
        })
    }
}



module.exports = router