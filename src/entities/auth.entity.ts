import {BeforeInsert, Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {IAuth} from "../interfaces/IAuth.interface";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import {config} from "../config";

@Entity('auth')
export class AuthEntity implements IAuth{
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    email!: string

    @Column()
    password!: string

    @Column({name: 'refresh_token', nullable: true})
    refreshToken!: string;

    @BeforeInsert()
    async hashPassword(){
        const SALT_WORK_FACTOR = 10;
        if(this.password){
            const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
            this.password = await bcrypt.hash(this.password, salt);
        }
    }

    generateRefreshToken(){
        return jwt.sign({id: this.id}, config.secretKeyRefresh, {expiresIn: "30d"})
    }

    generateAccessToken(){
        return jwt.sign({id: this.id}, config.secretKey, {expiresIn: "15m"})
    }
}