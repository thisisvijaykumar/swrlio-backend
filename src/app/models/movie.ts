import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import Genre from "./genre";
import Crew from "./movie_crew";
import UserMovieRating from "./user_movie_rating";
@Entity()
class Movie extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column()
  release_year: string;

  @Column()
  poster: string;

  @Column({ type: "float", default: 0 })
  average_rating: number;

  @Column({ default: 0 })
  no_of_votes: number;

  @ManyToMany(() => Genre, (genres) => genres.movies,{cascade:true})
  @JoinTable()
  genres: Genre[];

  @ManyToMany(() => Crew, (crew) => crew.movie,{cascade:true})
  @JoinTable()
  crew: Crew[];

  @OneToMany(() => UserMovieRating, (user) => user.movie)
  user_rating: UserMovieRating[];

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_on: string;

  @UpdateDateColumn()
  updated_on;
}

export default Movie;
