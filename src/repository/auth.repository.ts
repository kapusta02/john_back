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

    public findEmail = async (email: string) => {
        return await this.findOne({where: {email}});
    }
}