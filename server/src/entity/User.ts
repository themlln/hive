import "reflect-metadata";
import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne} from "typeorm";
import {IsEmail} from 'class-validator'
import {Canvas} from './Canvas'
import {SharedCanvas} from './SharedCanvas'

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsEmail()
    email: string;

    @Column()
    password: string;

    @Column()
    salt: string;

    @Column()
    sessionId: string;

    @Column()
    googleId: string;

    @CreateDateColumn()
    createDate: Date;

    @UpdateDateColumn()
    updateDate: Date;

    @OneToMany(type => Canvas, canvas => canvas.owner)
    canvas: Canvas[]

    @ManyToOne(type => Canvas, collaboratorCanvas => collaboratorCanvas.collaborator)
    collaboratorCanvas: Canvas

    @OneToMany(type => SharedCanvas, sharedCanvas => sharedCanvas.userId)
    sharedCanvas: SharedCanvas[];
}
