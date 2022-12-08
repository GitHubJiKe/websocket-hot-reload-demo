const express = require("express");
const router = require("./router");
const constant = require("./constant");

const app = express();
app.use(express.json());
app.use("/public", express.static(constant.staticPath));
app.use("/", router);

module.exports = app;
