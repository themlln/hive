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

    @Column({select: false})
    password: string;

    @Column({select: false, nullable: true})
    private tempPassword: string;

    @Column({select: false, nullable: true})
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
    setSaltAndPassword = () => {
      console.log("setSALT & PASSWORD RUNNING NOW")
      if (this.tempPassword !== this.password) {
        this.salt = this.generateSalt()
        this.password = this.encryptPassword(this.password, this.salt)
      }
    }

    generateSalt = function(): string {
        return crypto.randomBytes(16).toString('base64')
    }

    encryptPassword = function(plainText: string, salt: string): string {
        console.log("ENCRYPTPASSWORD RUNNING", plainText, salt)
        return crypto
          .createHash('RSA-SHA256')
          .update(plainText)
          .update(salt)
          .digest('hex')
    }

    // Class Methods
    static correctPassword = function(candidatePwd: string): Boolean {
      console.log("INSTANCE METHOD IS RUNNING")
      return this.encryptPassword(candidatePwd, this.salt) === User.prototype.password
    }

}
