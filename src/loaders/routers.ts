import { Application } from "express";

import { authRoute } from "./../app/routes/auth";
import {
  movieAuthorizedRoute,
} from "../app/routes/movie";
import { movieRatingByUserRoute } from "../app/routes/user-movie-rating";
import UserValidate from "../app/middlewares/user";
import MovieValidate from "../app/middlewares/movie";

const Routes = (app: Application) => {
  app.use("/api/ratings", UserValidate, movieRatingByUserRoute);
  app.use("/api/movies", MovieValidate, movieAuthorizedRoute); 
  app.use("/api/user", UserValidate, movieRatingByUserRoute);
  app.use("/api/auth", authRoute);
};

export default Routes;
