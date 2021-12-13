import "dotenv/config";
import "reflect-metadata";
import "express-async-errors";
import helmet from "helmet";
import cors from "cors";
import { mainRouter } from "./router";
import express, { Express } from "express";
import { errorHandler } from "@desenvolvimento-intuix/middleware-api";
import { isOperationalError } from "@desenvolvimento-intuix/app-error-api";

class AppController {
  express: Express;

  constructor() {
    process.on("unhandledRejection", error => {
      throw error;
    });

    process.on("uncaughtException", error => {
      console.error(error);
      if (!isOperationalError(error)) {
        process.exit(1);
      }
    });

    this.express = express();
    this.express.use(express.urlencoded({ extended: true }));
    this.express.use(express.json());
    this.express.use(helmet());
    this.express.use(cors());
    this.routes();
    this.errorHandler();
  }

  routes() {
    this.express.use(mainRouter);
  }

  errorHandler() {
    this.express.use(errorHandler);
  }
}

export default new AppController().express;
