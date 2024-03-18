import {AuthRepository} from "../repository/auth.repository";
import {IAuth} from "../interfaces/IAuth.interface";

export class AuthService{
    private repository: AuthRepository;

    constructor() {
        this.repository = new AuthRepository();
    }

    public registrationUser = async (data: IAuth) => {
        return await this.repository.registrationUser(data);
    }

    public findEmail = async (email: string) => {
        return await this.repository.findEmail(email);
    }
}