import "reflect-metadata";

import * as express from "express";
import { NextFunction, Request, Response } from "express";


import Database from "../loaders/database";
import Environment from "../loaders/environment";
import ExpressConfiguration from "../loaders/express-configuration";
import Routes from "../loaders/routers";
import Security from "../loaders/security";


console.time("Server Start time");

import path = require("path");

const static_path = path.join(__dirname, "../client");
const argv = require("minimist")(process.argv.slice(2));

const app: express.Application = express();

const http = require("http");
const server = http.Server(app);


Environment();
ExpressConfiguration(app);
Security(app);
Database();
Routes(app);

app.use("/client", express.static(static_path));
app.use("*", express.static(static_path));

/**
 * https://nodejs.org/api/process.html#process_warning_using_uncaughtexception_correctly
 */
 process.on("uncaughtException", e => {
    console.error(e);
    process.exit(1);
  });
  process.on("unhandledRejection", e => {
    console.error(e);
    process.exit(1);
  });
  let port = process.env.PORT || argv.port || 9090;
  
  if (argv && argv.port) {
    port = argv.port;
  }


  /**
 * Server Connection
 */
if (process.env.APP_MODE === "dev") {
    server.listen(port, () => {
      console.timeEnd("Server Start time");
      console.info("Backend sever start at localhost:" + port);
    });
  } else {
    server.listen(port, () => {
      console.timeEnd("Server Start time");
      console.info("Backend sever start at localhost:" + port);

    });
  }
  