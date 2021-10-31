//@ts-nocheck
const cheerio = require("cheerio");
const axios = require("axios");
import Movie from "../src/app/models/movie";
import Crew from "../src/app/models/movie_crew";
import MovieGenreCategory from "../src/app/models/movie_genre_category";
import Genre from "../src/app/models/genre";
import Database from "../src/loaders/database";
import Environment from "../src/loaders/environment";
import Category from "../src/app/models/category";
import Question from "../src/app/models/questions";
import QuestionUser from "../src/app/models/question_user";
const movies =require("./movie_imges.json");
async function dataEntry(data: any) {
  try {
    console.log({ data });
    data["average_rating"] = !isNaN(data?.average_rating)
      ? typeof data?.average_rating === "string"
        ? Math.round(parseFloat(data?.average_rating) * 10) / 10
        : data?.average_rating
      : 0;
    const movie: any = new Movie();
    movie.title = data?.title;
    movie.release_year = data?.year;
    movie.poster = data?.poster;
    movie.average_rating = data?.average_rating;
    movie.no_of_votes = data?.no_of_votes;
    // console.log(data?.average_rating, "average_rating");
    let genreSchema = [];
    for (const item of data?.genre) {
      console.log(item, "item");
      const foundGenre = await Genre.findOne({ name: item });
      if (!foundGenre?.id) {
        const schema = new Genre();
        schema.name = item;
        console.log(schema, "schema");
        await genreSchema.push(schema);
      } else {
        console.log(foundGenre, "foundGenre");

        await genreSchema.push(foundGenre);
      }
    }
    // data.genre.forEach(async (item) => {
    //   const foundGenre = await Genre.findOne({ name: item });
    //   if (foundGenre?.id) {
    //     genres.push(new Genre({ name: item }));
    //   } else {
    //     genres.push(foundGenre);
    //   }
    // });

    let directorSchema = [];

    for (const name of data?.directors) {
      const foundCrew = await Crew.findOne({
        name: name,
        role: "director",
      });
      if (!foundCrew?.id) {
        const schema = new Crew();
        schema.name = name;
        schema.role = "director";
        console.log(schema, "schema");
        directorSchema.push(schema);
      } else {
        directorSchema.push(foundCrew);
      }
    }
    movie.genres = [...genreSchema];
    movie.crew = directorSchema;
    console.log(movie, "movie");
    await Movie.save(movie);
  } catch (error) {
    console.log(error);
  }
}

const fetchHTMLData = async () => {
  let limit = 5;
  let count = 20;
  // let lists = [];
  for (let index = 0; index < limit; index++) {
    let movies = [];
    console.log(index * count + 1, "index * count + 1");
    let url = `https://www.imdb.com/search/title/?title_type=feature&sort=num_votes,desc&count=${count}&start=${
      index * count + 1
    }&ref_=adv_nxt`;
    let page = await axios.get(url);
    let $ = cheerio.load(page?.data);
    await new Promise((resolve) => setTimeout(resolve, 5000));
    let movieListUI = $(".lister-list .lister-item");
    movieListUI.each(async function (i, elem) {
      let movie: any = {};
      let title: any = $(this).find(".lister-item-header a").text();
      let year: any = $(this)
        .find(".lister-item-year")
        .text()
        .replace(/\(|\)/g, "");
      let directors: any = [];
      $(this)
        .find("a")
        .each(function (i, elem) {
          if ($(this).attr("href").indexOf("_dr_") > -1) {
            let director: any = $(this).text().trim();
            directors.push(director);
          }
        });
      let poster: any = $(this).find(".loadlate").attr("src");
      let rating: any = $(this)
        .find(".ratings-bar .ratings-imdb-rating")
        .data("value");
      let no_of_votes: any = $(this)
        .find(".sort-num_votes-visible [name='nv']")
        .data("value");
      let genre: any = $(this)
        .find(".genre")
        .text()
        .replace(/[\n\s]+/g, "")
        .split(",");

      //   genre = genre.map(item=>item.trim());

      movie["title"] = title;
      movie["year"] = year;
      movie["directors"] = directors;
      movie["poster"] = poster;
      movie["genre"] = genre;
      movie["average_rating"] = rating;
      movie["no_of_votes"] = no_of_votes;
      console.log(movie, "movie");
      if (movie.title) {
        await dataEntry(movie);
      }
    });
  }
};

const fetchJSONData = async () => {
  
 if(movies){ 
  // console.log(movieJson,"movies parsing");

  //  const movies = JSON.parse(movieJson);
  // console.log(movies, "movies");
  
  for (const movie of movies) {
    await dataEntry(movie);
  }
 }
};

Environment();
Database();

setTimeout(async () => {
  // fetchHTMLData();
  fetchJSONData();
  console.log("finished");
}, 100000);
