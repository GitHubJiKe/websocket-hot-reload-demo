const express = require("express")
const router = express.Router()
const path = require("path")
const fs = require("fs")
const util = require("./util");
const store = require("./store");
const convert = require("./convert");

genArticleRoutes()

router.use((_req, _res, next) => {
    console.log('Time: ', Date.now())
    next()
})

router.get('/', (_req, res) => {
    const htmlContent = util.getHTMLContent(util.indexHtmlPath);
    const hash = util.md5(htmlContent);
    store.hashMap.set(hash, htmlContent);
    const filenames = fs.readdirSync(util.articleDirPath)
    util.handleHTMLRes(res)(util.wrappedArticleNames(util.wrappedWssPort(htmlContent), filenames));
})


function genArticleRoutes() {
    const filenames = fs.readdirSync(util.articleDirPath)
    for (const filename of filenames) {
        const articlePath = path.resolve(util.articleDirPath, filename)
        const articleName = path.parse(articlePath).name
        util.reloadMap[articleName] = () => {
            const htmlContent = convert.convert(articlePath);
            const newHash = md5(htmlContent);
            if (store.hashMap.size !== 0 && store.hashMap.has(newHash)) {
                // 内容没有发生变化，不用刷新
                return;
            }
            store.hashMap.clear();
            return util.reload;
        }
        router.get(`/${articleName}`, (_req, res) => {
            const htmlContent = convert.convert(articlePath);
            const hash = util.md5(htmlContent);
            store.hashMap.set(hash, htmlContent);
            util.handleHTMLRes(res)(util.wrappedWssPort(htmlContent));
        })
    }
}



module.exports = router