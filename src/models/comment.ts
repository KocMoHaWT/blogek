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

@Entity("comments")
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  body: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  delete_at: Date;

  @Column({ name: 'comment_id', nullable: true})
  comment: string;

  @ManyToOne(() => User, user => user.comments)
  @JoinColumn({ name: "user_id" })
  user: User;

  @ManyToOne(() => Post)
  @JoinColumn({ name: 'post_id'})
  post: Post;
}
