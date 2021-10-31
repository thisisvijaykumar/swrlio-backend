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
import QuestionUser from "./question_user";
  @Entity()
  class Question extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;
  
    @Column()
    title: string;
    
    @ManyToMany(type=>Category,categories=>categories.questions,{cascade:true})
    @JoinTable()
    categories:Category[];

    @ManyToOne(type=>QuestionUser,questionuser=>questionuser.questions)
    // @JoinTable()
    user:QuestionUser;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    created_on: string;
  
    @UpdateDateColumn()
    updated_on;
  }
  
  export default Question;
  