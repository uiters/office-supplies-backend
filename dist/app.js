"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const errorhandler_1 = __importDefault(require("errorhandler"));
const helmet_1 = __importDefault(require("helmet"));
const body_parser_1 = __importDefault(require("body-parser"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const routes_1 = require("./routes");
const cors_1 = __importDefault(require("cors"));
const passport_1 = __importDefault(require("passport"));
dotenv_1.default.config();
class App {
    constructor() {
        this.routes = new routes_1.Routes();
        this.mongoUrl = process.env.CONNECTION_STRING || "";
        this.app = express_1.default();
        this.mongoSetup();
        this.config();
        this.routes.init(this.app);
    }
    mongoSetup() {
        mongoose_1.default
            .connect(process.env.CONNECTION_STRING || "", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        })
            .then(() => {
            console.log("connect to mongoDb");
        })
            .catch(console.log);
    }
    config() {
        this.app.use(cors_1.default());
        this.app.use(helmet_1.default());
        this.app.use(express_1.default.json());
        this.app.use(morgan_1.default("tiny"));
        this.app.use(body_parser_1.default.json());
        this.app.use(passport_1.default.initialize());
        this.app.use(passport_1.default.session());
    }
}
const server = new App().app;
server.use(errorhandler_1.default());
server.listen(process.env.PORT, () => {
    console.log("server is running on Port: ", process.env.PORT);
});
