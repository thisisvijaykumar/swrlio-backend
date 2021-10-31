import * as express from "express";

import MovieRatingByUserCtrl from "../controllers/user-movie-rating.controller";

export const movieRatingByUserRoute = express.Router();

// movieRatingByUserRoute.get("/movie-rating/:movie_id",MovieRatingByUserCtrl.getUserRatingByMovie)
// movieRatingByUserRoute.post("/bulk", MovieRatingByUserCtrl.addBulkMovieRating);
movieRatingByUserRoute.post("/movie/:movie_id", MovieRatingByUserCtrl.addMovieRating);
movieRatingByUserRoute.post("/bulk/movies", MovieRatingByUserCtrl.addBulkMovieRating);


