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

    @ManyToOne(type => User, user => user.message)
    user: User;
}
