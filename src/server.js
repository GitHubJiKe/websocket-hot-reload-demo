const constant = require("./constant");
const app = require("./app");

require("./hotReload");

// --------------------------http server监听----------------------------
app.listen(constant.PORT, () => {
    console.log(`running at:http://localhost:${constant.PORT}`);
});
