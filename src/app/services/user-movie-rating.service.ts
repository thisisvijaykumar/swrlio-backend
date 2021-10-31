import Movie from "../models/movie";
import UserMovieRating from "../models/user_movie_rating";

class MovieRatingByUserService {
  static async addMovieRating(data) {
    try {
      const movie = await Movie.findOneOrFail({ id: data.movie_id });
      data["movie"] = movie;
      console.log(data, "addMovieRating");
      const rating = await UserMovieRating.save(data);
      if (rating?.movie) {
        delete rating.movie;
      }
      return rating;
    } catch (error) {
      throw error;
    }
  }

  static async updateMovieRating(data: any) {
    try {
      await (
        await UserMovieRating.update(
          { id: data?.id },
          { user_rating: data.user_rating }
        )
      );
      const value= await UserMovieRating.findOneOrFail({ id: data?.id });
      console.log(value, "updateMovieRating");

      return value;
    } catch (err) {
      return err;
    }
  }

  static async getMovieRating(options) {
    try {
      const value = await UserMovieRating.findOne(options);
      return value;
    } catch (err) {
      return err;
    }
  }
}

export default MovieRatingByUserService;
