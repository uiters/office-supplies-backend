const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const errorHandler = require("./src/middleware/errorHandler.middleware");
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");

const authRoute = require("./src/router/auth.route");
const userRoute = require("./src/router/user.route");
const typeRoute = require("./src/router/type.route");
const productRoute = require("./src/router/product.route");
const categoryRoute = require("./src/router/category.route");
const addressRoute = require("./src/router/address.route");
const invoiceRoute = require("./src/router/invoice.route");
const invoiceDetailRoute = require("./src/router/invoiceDetail.route");
// const a = require('./src/router')
/* 
    Swagger
*/

dotenv.config();

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Swagger Express API",
            version: "1.0.0",
            description: "access with account admin@gmail.com 123456",
        },
        components: {
            securitySchemes: {
                ApiKeyAuth: {
                    type: "apiKey",
                    in: "header",
                    name: "x-auth-token",
                },
            },
        },
        security: {
            ApiKeyAuth: [],
        },
        schemes: ["http", "https"],
    },
    // path to the API DOCS
    apis: ["./src/router/user.route.js"],
};

const swaggerSpec = swaggerJSDoc(options);

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

app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/type", typeRoute);
app.use("/api/product", productRoute);
app.use("/api/category", categoryRoute);
app.use("/api/address", addressRoute);
app.use("/api/invoice", invoiceRoute);
app.use("/api/invoice_detail", invoiceDetailRoute);

app.use("/api-documentation", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(process.env.PORT, () => {
    console.log("sever is running in port ", process.env.PORT);
});

app.use(errorHandler);
