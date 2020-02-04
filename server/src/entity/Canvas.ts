import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne} from "typeorm";
import { Collaborators } from "./Collaborator";
import { User } from "./User";

@Entity()
export class Canvas {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    canvasObj: string;

    @CreateDateColumn()
    createDate: Date;

    @UpdateDateColumn()
    updateDate: Date;

    @ManyToOne(type => User, owner => owner.canvas)
    owner: User;

    @OneToMany(type => Collaborators, sharedCanvas => sharedCanvas.canvas)
    sharedCanvas: Collaborators[];
}
