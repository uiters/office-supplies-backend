import express from "express";
import errorHandler from "errorhandler";
import helmet from "helmet";
import bodyParser from "body-parser";
import logger from "morgan";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { Routes } from "./routes";
import cors from "cors";
import passport from "passport";

dotenv.config();

class App {
  public app: express.Application;
  public routes: Routes = new Routes();
  public mongoUrl: string = process.env.CONNECTION_STRING || "";
  constructor() {
    this.app = express();
    this.mongoSetup();
    this.config();
    this.routes.init(this.app);
  }

  private mongoSetup(): void {
    mongoose
      .connect(
        process.env.MONGODB_URI || "",
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useCreateIndex: true,
          useFindAndModify: false
        }
      )
      .then(() => {
        console.log("connect to mongoDb");
      })
      .catch(console.log);
  }

  private config(): void {
    this.app.use(cors());
    this.app.use(helmet());
    this.app.use(express.json());
    this.app.use(logger("tiny"));
    this.app.use(bodyParser.json());
    this.app.use(passport.initialize());
    this.app.use(passport.session());
  }
}

const server = new App().app;

server.use(errorHandler());

server.listen(process.env.PORT, () => {
  console.log("server is running on Port: ", process.env.PORT);
});
