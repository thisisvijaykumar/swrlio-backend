import * as express from "express";

import MovieCtrl from "../controllers/movie.controller";

// export const movieUnauthorizedRoute = express.Router();

// movieUnauthorizedRoute.get("/all",MovieCtrl.getAllMovies)

export const movieAuthorizedRoute = express.Router();

movieAuthorizedRoute.get("/all",MovieCtrl.getAllMovies)
movieAuthorizedRoute.get("/rated-list",MovieCtrl.getMyListOfMovies)


// movieRoute.post("/", MovieCtrl.createListing);
