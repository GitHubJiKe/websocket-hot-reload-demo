const express = require("express");
const router = require("./router");
const constant = require("./constant");

const app = express();
app.use("/public", express.static(constant.staticPath));
app.use("/", router.router);

module.exports = app;
