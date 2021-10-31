import * as express from "express";
import { Application } from "express";

const ExpressConfiguration = (app: Application) => {
  // ** To enable get the json Request data */
  app.use(express.json());
  // **To enable get the POST request data */
  app.use(
    express.urlencoded({
      extended: false,
    }),
  );
};

export default ExpressConfiguration;
