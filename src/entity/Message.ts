import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne} from "typeorm";
import { User } from "./User";

@Entity()
export class Message {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    content: string;

    @CreateDateColumn()
    timestamp: Date;

    @Column()
    userId?: number;

    @Column({nullable: true})
    username?: string;

    @Column({nullable: true})
    profileImage?: string;

    @ManyToOne(type => User, user => user.message)
    user: User;
}
