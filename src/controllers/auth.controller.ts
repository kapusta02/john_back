import {AuthService} from "../services/auth.service";
import {RequestHandler} from "express";

export class AuthController{
    private service: AuthService;

    constructor() {
        this.service = new AuthService();
    }

    public registrationUser: RequestHandler = async (req, res, next) => {
        try{
            const data = req.body;
            if (!data.email || !data.password){
                res.status(400).send({
                    success: false,
                    message: 'You must enter a password or email'
                })
                return;
            }

            const isEmail = await this.service.findEmail(data.email);
            if(!isEmail){
                const {user, accessToken, refreshToken} = await this.service.registrationUser(data);

                res.cookie('refreshToken', refreshToken, {httpOnly: true})
                res.send({user, accessToken});
            } else{
                res.status(400).send({
                    success: false,
                    message: 'Such mail already exists'
                })
            }
        } catch (e){
            console.log(e);
            res.status(500).send({
                success: false,
                message: 'Error creating user'
            })
        }
    }
}