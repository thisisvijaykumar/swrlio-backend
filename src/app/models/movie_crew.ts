import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import Movie from "./movie";
@Entity()
class Crew extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  // @Column({type:"uuid"})
  // movie_id: string;

  @Column()
  name: string;

  @Column({ enum: ["director", "writer","screenplay"], default: "director" })
  role: string;

  @ManyToMany(()=>Movie,movie=>movie.crew,)
  @JoinTable()
  movie:Movie[];

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_on: string;

  @UpdateDateColumn()
  updated_on;
}

export default Crew;
