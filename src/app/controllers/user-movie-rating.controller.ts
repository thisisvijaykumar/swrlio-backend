import * as Joi from "@hapi/joi";
import { Request, Response } from "express";

import MovieRatingByUserService from "../services/user-movie-rating.service";

const MovieRatingSchema = Joi.object({
  user_id: Joi.string().required(),
  movie_id: Joi.string().required(),
  user_rating: Joi.number().required(),
});
export default class MovieRatingByUserCtrl {
  public static async addMovieRating(req: Request, res: Response) {
    const input = {
      user_id: req["user_id"],
      movie_id: req.body.movie_id,
      user_rating: req.body.user_rating,
    };
    console.log(input, "input");

    const validateResult = MovieRatingSchema.validate(input);
    if (validateResult.error) {
      res.status(401).send({
        code: 401,
        msg: "input details are wrong",
      });
    } else {
      try {
        const data = await MovieRatingByUserService.addMovieRating(input);
        res.status(200).send({
          data,
          msg: "Successfully user rated movie",
        });
      } catch (error) {
        res.status(400).send({
          code: 400,
          msg: "Something went wrong",
          error: error,
        });
      }
    }
  }

  public static async addBulkMovieRating(req: Request, res: Response) {
    const ratings = req.body.ratings;

    // const validateResult = MovieRatingSchema.validate(Joi.array().items(input));
    // if (validateResult.error) {
    //   res.status(401).send({
    //     code: 401,
    //     msg: "input details are wrong",
    //   });
    // } else {
    try {
      const data = [];
      for (const rating of ratings) {
        if (!rating.user_rating_id) {
          const item = await MovieRatingByUserService.addMovieRating({
            user_id: req["user_id"],
            movie_id: rating.movie_id,
            user_rating: rating.user_rating,
          });
          data.push({ ...item, dataIndex: rating.dataIndex });
        } else {
          const item = await MovieRatingByUserService.updateMovieRating({
            user_rating: rating.user_rating,
            id: rating.user_rating_id,
          });
          data.push({ ...item, dataIndex: rating.dataIndex });
        }
      }
      res.status(200).send({
        data,
        msg: "Successfully user rated movies",
      });
    } catch (error) {
      res.status(400).send({
        code: 400,
        msg: "Something went wrong",
        error: error,
      });
    }
    // }
  }

  public static async getUserRatingByMovie(req: Request, res: Response) {
    const schema = Joi.object({
      movie_id: Joi.string().required(),
      user_id: Joi.string().required(),
    });

    const options = {
      movie_id: req.params.movie_id,
      user_id: req["user_id"],
    };

    const validateResult = schema.validate(options);
    if (validateResult.error) {
      res.status(401).send({
        code: 401,
        msg: "input details are wrong",
      });
    } else {
      try {
        const data = await MovieRatingByUserService.getMovieRating(options);
        res.status(200).send({
          data,
          msg: "Successfully retreived movie rating",
        });
      } catch (error) {
        res.status(400).send({
          code: 400,
          msg: "Something went wrong",
          error: error,
        });
      }
    }
  }
}
