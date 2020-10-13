"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var app = express();
app.get("/", function (req, res) {
    res.send("hello");
});
app.listen(3000, function () {
    console.log('App listening on port 3000');
});
