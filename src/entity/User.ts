import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, BeforeUpdate, BeforeInsert } from "typeorm";
import { IsEmail } from 'class-validator'
import { Canvas } from './Canvas'
import { Collaborators } from './Collaborator'
import * as crypto from 'crypto'
import { Message } from "./Message";

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true , nullable: true})
  @IsEmail()
  email: string;

  @Column({ nullable: true })
  password: string;

  @Column({default: 'Anonymous bee'})
  username: string;

  @Column({default: "/bee-profile.png"})
  profileImage: string;

  @Column({ select: false, nullable: true })
  private tempPassword: string;

  @Column({ nullable: true })
  salt: string;

  @Column({ nullable: true})
  sessionId: string;

  @Column({ nullable: true })
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

  // @BeforeUpdate()
  @BeforeInsert()
  setSaltAndPassword = () => {
    if (this.tempPassword !== this.password) {
      this.salt = this.generateSalt()
      this.password = this.encryptPassword(this.password, this.salt)
    }
  }

  generateSalt = function (): string {
    return crypto.randomBytes(16).toString('base64')
  }

  encryptPassword = function (plainText: string, salt: string): string {
    return crypto
      .createHash('RSA-SHA256')
      .update(plainText)
      .update(salt)
      .digest('hex')
  }

  // Class Methods
  correctPassword = function (candidatePwd: string): Boolean {
    return this.encryptPassword(candidatePwd, this.salt) === this.password
  }

}
