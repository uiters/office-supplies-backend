const express = require("express");
const mongoose = require("mongoose");
const dotenv = require('dotenv')

const authRoute = require("./src/router/auth.route");
const userRoute = require("./src/router/user.route");
const categoryRoute = require("./src/router/category.route");


dotenv.config();

const app = express();
app.use(express.json());

app.use(express.static('./dist'));
app.get("/", (req, res) => {
    res.sendFile('index.html');
})

mongoose
    .connect(process.env.CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
    .then(() => {
        console.log("connect to mongoDb");
    })
    .catch(console.log);

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/category", categoryRoute);

app.listen(process.env.PORT, () => {
    console.log("sever is running in port ", process.env.PORT);
});
