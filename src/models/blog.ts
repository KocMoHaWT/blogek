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
} from "typeorm";
import { BlogLikes } from "./blogLikes";
import { Post } from "./post";
import { User } from "./user";

@Entity("blogs")
export class Blog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 200, nullable: false })
  title: string;

  @Column()
  small_description: string;

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @DeleteDateColumn()
  delete_at: Date

  @OneToMany(() => BlogLikes, (blogLikes) => blogLikes.blog)
  @JoinColumn()
  blog_likes = BlogLikes;

  @OneToMany(() => Post, (post) => post.blog)
  @JoinColumn({ name: "post_id" })
  post: Post[];

  @OneToOne(() => User)
  @JoinColumn({ name: "author_id" })
  author: User;
}
