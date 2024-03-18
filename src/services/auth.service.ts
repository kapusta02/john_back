import {AuthRepository} from "../repository/auth.repository";
import {IAuth} from "../interfaces/IAuth.interface";
import bcrypt from "bcrypt";

export class AuthService{
    private repository: AuthRepository;

    constructor() {
        this.repository = new AuthRepository();
    }

    public registrationUser = async (data: IAuth) => {
        return await this.repository.registrationUser(data);
    }

    public loginUser = async (email: string) => {
        return await this.repository.loginUser(email);
    }

    public logoutUser = async (email: string) => {
        return await this.repository.logoutUser(email);
    }

    public findEmail = async (email: string) => {
        return await this.repository.findEmail(email);
    }

    async checkPassword(email: string, password: string): Promise<boolean> {
        try {
            const user = await this.findEmail(email)
            return await bcrypt.compare(password, user!.password);
        } catch (e) {
            throw new Error('Ошибка при проверке пароля' + e);
        }
    }
}