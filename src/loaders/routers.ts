import { Application } from "express";

import Middlewares from "./../app/middlewares";
import { authRoute } from "./../app/routes/auth";
import {
  movieUnauthorizedRoute,
  movieAuthorizedRoute,
} from "../app/routes/movie";
import { movieRatingByUserRoute } from "../app/routes/user-movie-rating";

const Routes = (app: Application) => {
  app.use("/api/ratings", Middlewares.validate, movieRatingByUserRoute);
  app.use("/api/movies/noauth", movieUnauthorizedRoute); //For without Logged users
  app.use("/api/movies/auth", Middlewares.validate, movieAuthorizedRoute); //For Logged users
  app.use("/api/user", Middlewares.validate, movieRatingByUserRoute);
  app.use("/api/auth", authRoute);
};

export default Routes;
