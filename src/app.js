const express = require("express");
const path = require("path");
const routes = require("./routes");

const app = express();

app.use("/public", express.static(path.resolve(__dirname, "../public")));
app.get("/", routes.indexRoute);
app.get("/websocket", routes.socketRoute);

module.exports = app;
