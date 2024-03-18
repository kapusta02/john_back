import {Repository} from "typeorm";
import {AuthEntity} from "../entities/auth.entity";
import {appDataSource} from "../db/dataSource";
import {IAuth} from "../interfaces/IAuth.interface";

export class AuthRepository extends Repository<AuthEntity> {
    constructor() {
        super(AuthEntity, appDataSource.createEntityManager());
    }

    public registrationUser = async (data: IAuth) => {
        const {email, password} = data;
        const user = new AuthEntity();
        const refreshToken = user.generateRefreshToken();
        const accessToken = user.generateAccessToken();

        const newUser = this.create({
            email,
            password,
            refreshToken
        })
        await this.save(newUser);

        return {user: newUser, accessToken, refreshToken};
    }

    public loginUser = async (email: string) => {
        const user = new AuthEntity();
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        const updateToken = await this.findEmail(email);
        if (!updateToken) console.log(`Email ${email} not found`)

        await this.save({
            ...updateToken,
            refreshToken,
            accessToken
        })

        return {email, accessToken, refreshToken};
    }

    public logoutUser = async (email: string) => {
        const user = await this.findEmail(email);
        if (!user){
            console.log("User not found")
            return false;
        }

        user.refreshToken = '';
        await this.save(user);
        return true;
    }

    public findEmail = async (email: string) => {
        return await this.findOne({where: {email}});
    }

}