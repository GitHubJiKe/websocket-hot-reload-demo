const { WebSocketServer } = require("ws");
const chokidar = require("chokidar");
const util = require("./util");
const store = require("./store");
const constant = require("./constant");

const wss = new WebSocketServer({ port: constant.WSS_PORT });
const watcher = chokidar.watch([util.staticPath, util.readmePath]);

// ------------------------websocker建立连接------------------------------
wss.on("connection", function connection(ws) {
    store.wsMap.set(ws, ws);
    ws.on("close", () => {
        // 链接断开的时候，从列表内移除ws对象
        store.wsMap.delete(ws);
    });
    ws.on("message", (msg) => {
        if (msg.toString() === "changeColorOfH1") {
            ws.send(JSON.stringify({ color: util.randomColor() }));
        }
    });
});
// -------------------------文件监听-----------------------------
watcher.on("change", async (filepath) => {
    const func = util.reloadMap[filepath];
    if (typeof func === "function") {
        const reload = func();
        if (reload) {
            reload();
        }
    } else {
        util.reload();
    }
});
