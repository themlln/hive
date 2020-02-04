import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany} from "typeorm";
import {IsEmail} from 'class-validator'
import {Canvas} from './Canvas'
import {Collaborators} from './Collaborator'

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

    @OneToMany(type => Collaborators, sharedCanvas => sharedCanvas.user)
    sharedCanvas: Collaborators[];
}
