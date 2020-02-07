import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, BeforeUpdate, BeforeInsert} from "typeorm";
import {IsEmail} from 'class-validator'
import {Canvas} from './Canvas'
import {Collaborators} from './Collaborator'
import {Message} from './Message'
import * as crypto from 'crypto'

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsEmail()
    email: string;

    @Column()
    password: string;

    @Column({nullable: true})
    private tempPassword: string;

    @Column({nullable: true})
    salt: string;

    @Column({nullable: true})
    sessionId: string;

    @Column({nullable: true})
    googleId: string;

    @CreateDateColumn()
    createDate: Date;

    @UpdateDateColumn()
    updateDate: Date;

    @OneToMany(type => Canvas, canvas => canvas.owner)
    canvas: Canvas[]

    @OneToMany(type => Message, message => message.user)
    message: Message[]

    @OneToMany(type => Collaborators, sharedCanvas => sharedCanvas.user)
    sharedCanvas: Collaborators[];

    @BeforeUpdate()
    @BeforeInsert()
    static setSaltAndPassword = (instance: User): void => {
      if (instance.tempPassword !== instance.password) {
        instance.salt = User.generateSalt()
        instance.password = User.encryptPassword(instance.password, instance.salt)
      }
    }
    static generateSalt = function(): string {
        return crypto.randomBytes(16).toString('base64')
    }
    static encryptPassword = function(plainText: string, salt: string): string {
        return crypto
          .createHash('RSA-SHA256')
          .update(plainText)
          .update(salt)
          .digest('hex')
    }

    // Instance Methods
    correctPassword = function(candidatePwd: string) {
      return User.encryptPassword(candidatePwd, User.prototype.salt) === User.prototype.password
    }
}
