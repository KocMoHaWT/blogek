import {Entity, PrimaryGeneratedColumn, Column, BeforeInsert, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToOne, JoinColumn, ManyToOne} from "typeorm";
import { Blog } from "./blog";
import { User } from "./user";

@Entity('posts')
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 200, nullable: false })
    title: string;

    @Column({type: 'varchar', nullable: false })
    body: string;

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @DeleteDateColumn()
    delete_at: Date

    @OneToOne(() => User)
    @JoinColumn({ name: 'author_id'})
    author: User;

    @ManyToOne(() => Blog, blog => blog.post)
    @JoinColumn({ name: 'blog_id'})
    blog: Blog;
}