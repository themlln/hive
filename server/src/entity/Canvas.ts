import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne} from "typeorm";
import { SharedCanvas } from "./SharedCanvas";
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

    @OneToMany(type => SharedCanvas, sharedCanvas => sharedCanvas.canvas)
    sharedCanvas: SharedCanvas[];
}
