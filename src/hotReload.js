const { WebSocketServer } = require("ws");
const chokidar = require("chokidar");
const util = require("./util");
const store = require("./store");
const constant = require("./constant");

const wss = new WebSocketServer({ port: constant.WSS_PORT });
const watcher = chokidar.watch([
    constant.staticPath,
    constant.articleDirPath,
    constant.readmePath,
    constant.templatePath,
]);

// ------------------------websocker建立连接------------------------------
wss.on("connection", function connection(ws) {
    store.wsMap.set(ws, ws);

    ws.on("close", () => store.wsMap.delete(ws));

    ws.on("message", (msg) => {
        if (msg.toString() === "changeColorOfH1") {
            ws.send(JSON.stringify({ color: util.randomColor() }));
        }
    });
});
// -------------------------文件监听-----------------------------
watcher.on("all", () => util.reload());
