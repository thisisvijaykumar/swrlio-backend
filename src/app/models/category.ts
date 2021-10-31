import {
    BaseEntity,
    Column,
    Entity,
    Index,
    ManyToMany,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from "typeorm";
import Question from "./questions";
  @Entity()
  class Category extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;
  
    @Column()
    category_name: string;

    @ManyToMany(type=>Question,question=>question.categories)
    questions:Question[];
    
    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    created_on: string;
  
    @UpdateDateColumn()
    updated_on;
  }
  
  export default Category;
  