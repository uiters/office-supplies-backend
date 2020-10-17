const express = require("express");
const app = express();
const mongoose = require("mongoose");
const authRoute = require("./src/router/auth.route");
const userRoute = require("./src/router/user.route");
const categoryRoute = require("./src/router/category.route");

mongoose
    .connect("mongodb://localhost:27017/office-and-book", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
    .then(() => {
        console.log("connect to mongoDb");
    })
    .catch((err) => console.log);

app.use(express.json());

const port = 3000;

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/category", categoryRoute);

app.listen(port, () => {
    console.log("sever is running in port ", port);
});
