import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne} from "typeorm";
import { User } from "./User";
import { Canvas } from './Canvas'

@Entity()
export class SharedCanvas {

    @PrimaryGeneratedColumn()
    userToCanvasId: number;

    @Column()
    userId: number;

    @Column()
    canvasId: number;

    @CreateDateColumn()
    createDate: Date;

    @UpdateDateColumn()
    updateDate: Date;

    @ManyToOne(type => User, user => user.sharedCanvas)
    user: User;

    @ManyToOne(type => Canvas, canvas => canvas.sharedCanvas)
    canvas: Canvas;
}
