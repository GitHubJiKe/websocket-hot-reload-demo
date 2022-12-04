const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const constant = require("./constant");
const store = require("./store");

const staticPath = path.resolve(__dirname, "../public");
const indexHtmlPath = path.resolve(staticPath, "./index.html");
const readmePath = path.resolve(__dirname, "../README.md");

// 创建md5 hash字符串
const md5 = (content) => crypto.createHash("md5").update(content).digest("hex");
// 获取html文本字符串
const getHTMLContent = (htmlPath) => fs.readFileSync(htmlPath).toString();
// 生成随机颜色
const randomColor = () =>
    `#${Math.floor(Math.random() * 16777215).toString(16)}`;

const wrappedWssPort = (content) =>
    content.replace("$PORT$", constant.WSS_PORT);

const handleHTMLRes = (res) => (content) => {
    res.setHeader("content-type", "text/html");
    res.statusCode = 200;
    res.end(content);
};

const reload = () => {
    console.log("send reload message");
    store.wsMap.forEach((ws) => ws.send("reload"));
};

module.exports = {
    indexHtmlPath,
    staticPath,
    readmePath,
    md5,
    getHTMLContent,
    randomColor,
    wrappedWssPort,
    handleHTMLRes,
    reload,
    reloadMap: {
        [indexHtmlPath]: () => {
            const newHash = md5(getHTMLContent(indexHtmlPath));
            if (store.hashMap.size !== 0 && store.hashMap.has(newHash)) {
                // 内容没有发生变化，不用刷新
                return;
            }
            store.hashMap.clear();
            return reload;
        },
        [readmePath]: () => {
            const htmlContent = require("./convert").readme2HTML();
            const newHash = md5(htmlContent);
            if (store.hashMap.size !== 0 && store.hashMap.has(newHash)) {
                // 内容没有发生变化，不用刷新
                return;
            }
            store.hashMap.clear();
            return reload;
        },
    },
};
