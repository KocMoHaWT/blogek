import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { Blog } from "./blog";
import { Post } from "./post";
import { User } from "./user";

@Entity("blog_likes")
export class BlogLikes {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @DeleteDateColumn()
  delete_at: Date

  @OneToMany(() => User, user => user.blogLikes)
  @JoinColumn({ name: "user_id" })
  user: User;

  @ManyToOne(() => Blog)
  @JoinColumn()
  blog: Blog;
}
