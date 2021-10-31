import {
    BaseEntity,
    Column,
    Entity,
    Index,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from "typeorm";
import Movie from "./movie";
  
  @Entity()
  class  UserMovieRating extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;
  
    @Column({type:"uuid"})
    movie_id: string;
  
    @Column({type:"uuid"})
    user_id: string;

    @Column({type:"float"})
    user_rating: number;

    @ManyToOne(() => Movie, (movie) => movie.user_rating)
    movie: Movie;
  
    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    created_on: string;
  
    @UpdateDateColumn()
    updated_on;
  }
  
  export default UserMovieRating;
  