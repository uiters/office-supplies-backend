const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const errorHandler = require("./src/middleware/errorHandler.middleware");

const authRoute = require("./src/router/auth.route");
const userRoute = require("./src/router/user.route");
const typeRoute = require("./src/router/type.route")
const productRoute = require("./src/router/product.route");
const categoryRoute = require("./src/router/category.route")

dotenv.config();

mongoose
    .connect(process.env.CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    })
    .then(() => {
        console.log("connect to mongoDb");
    })
    .catch(console.log);

const app = express();


app.use(express.json());
app.use(express.static("./dist"));

app.get("/", (req, res) => {
    res.sendFile("index.html");
    
});

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/type", typeRoute);
app.use("/api/product", productRoute);
app.use("/api/category", categoryRoute);

app.listen(process.env.PORT, () => {
  console.log("sever is running in port ", process.env.PORT);
});

app.use(errorHandler);