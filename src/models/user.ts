import {Entity, PrimaryGeneratedColumn, Column, BeforeInsert, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToOne, JoinColumn} from "typeorm";
import { Role } from "./role";

@Entity()
export class User {

    @PrimaryGeneratedColumn("uuid")
    id: number;

    @OneToOne(() => Role)
    @JoinColumn()
    role: Role;

    @Column("varchar", { length: 200, nullable: false })
    firstName: string;

    @Column("varchar", { length: 200, nullable: false })
    lastName: string;

    @Column("varchar", { length: 200, nullable: false })
    email: string

    @BeforeInsert()
    @Column("varchar", { length: 200, nullable: false })
    password: string

    @Column("varchar", { length: 200, nullable: false })
    logo: string

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @DeleteDateColumn()
    delete_at: Date



}