import {
    BaseEntity,
    Column,
    Entity,
    Index,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from "typeorm";
import Category from "./category";
import Question from "./questions";
  @Entity()
  class QuestionUser extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;
  
    @Column()
    name: string;
    
    @OneToMany(type=>Question,questions=>questions.user,{cascade:true})
    // @JoinTable()
    questions:Question[];

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    created_on: string;
  
    @UpdateDateColumn()
    updated_on;
  }
  
  export default QuestionUser;
  