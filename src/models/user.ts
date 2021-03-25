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
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Blog } from "./blog";
import { BlogLikes } from "./blogLikes";
import { Comment } from "./comment";
import { PostLikes } from "./postLIkes";
import { Role } from "./role";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column({ type: "varchar", length: 200, nullable: false, name: "first_name" })
  firstName: string;

  @Column({ type: "varchar", length: 200, nullable: false, name: "last_name" })
  lastName: string;

  @Column({ type: "varchar", length: 200, nullable: false })
  email: string;

  @Column({ type: "varchar", length: 200, nullable: false })
  password: string;

  @Column({ type: "varchar", length: 200 })
  avatar: string;

  @Column({ type: "varchar", nullable: true })
  refresh_token: string;

  @Column({ type: "int", nullable: false, default: 1 })
  roleId: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  delete_at: Date;

  @ManyToOne(() => BlogLikes)
  @JoinColumn()
  blogLikes: BlogLikes[];

  @OneToMany(() => Comment, comment => comment.user)
  @JoinColumn({ name: 'comments'})
  comments: Comment[];

  @OneToMany(() => PostLikes, post => post.user)
  @JoinColumn()
  post: PostLikes[];

  @ManyToOne(() => Role)
  @JoinColumn()
  role: Role;
}
