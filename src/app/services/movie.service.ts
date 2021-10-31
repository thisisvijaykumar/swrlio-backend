// import MovieGenreCategory from "../models/movie_genre_category";
import { getRepository, ILike } from "typeorm";
import Movie from "../models/movie";
import UserMovieRating from "../models/user_movie_rating";

class MovieSerivce {
  static async getAllMovies(options) {
    try {
      // console.log(options, "options");
      const value = await Movie.findAndCount({
        relations: ["crew", "genres"],
        where: { title: ILike(`%${options.query}%`) },
        order: {
          title: options.order,
        },
        skip: options.start,
        take: options.limit,
      });

      return {
        data: value[0],
        count: value[1],
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async getMoviesWithUserRating(options) {
    try {
      // const value = await Movie.findAndCount({
      //   relations: ["crew", "genres","user_rating"],
      //   where: { title: ILike(`%${options.query}%`) },
      //   order: {
      //     title: options.order,
      //   },
      // });
      const value = await getRepository(Movie)
        .createQueryBuilder("m")
        .leftJoinAndSelect("m.genres", "genre")
        .leftJoinAndSelect("m.crew", "crew")
        .leftJoinAndMapOne(
          "m.user_rating",
          UserMovieRating,
          "umr",
          "umr.user_id = :user_id AND umr.movieId=m.id",
          { user_id: options.user_id }
        )
        .where(`LOWER(m.title) like LOWER(:search_query)`, {
          search_query: `%${options.query}%`,
        })
        .orderBy("m.title", options.order)
        .skip(options.start)
        .take(options.limit)
        .getManyAndCount();
      console.log(value[0].length);
      return {
        data: value[0],
        count: value[1],
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  static async getMyListOfMovies(options) {
    try {
      const value = await getRepository(Movie)
        .createQueryBuilder("m")
        .leftJoinAndSelect("m.genres", "genre")
        .leftJoinAndSelect("m.crew", "crew")
        .leftJoinAndMapOne(
          "m.user_rating",
          UserMovieRating,
          "umr",
          "umr.user_id = :user_id AND umr.movieId=m.id",
          { user_id: options.user_id }
        )
        .where(`LOWER(m.title) like LOWER(:search_query)`, {
          search_query: `%${options.query}%`,
        })
        .andWhere("umr.user_id = :user_id", { user_id: options.user_id })
        .orderBy("m.title", options.order)
        .skip(options.start)
        .take(options.limit)
        .getManyAndCount();

      console.log(value[0].length);
      return {
        data: value[0],
        count: value[1],
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

export default MovieSerivce;
