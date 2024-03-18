import {AuthService} from "../services/auth.service";
import {RequestHandler} from "express";

export class AuthController{
    private service: AuthService;

    constructor() {
        this.service = new AuthService();
    }

    public registrationUser: RequestHandler = async (req, res) => {
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

    public loginUser: RequestHandler = async (req, res)=>{
        try{
            const data = req.body;
            if (!data.email || !data.password){
                res.status(400).send({
                    success: false,
                    message: 'You must enter a password or email'
                })
                return;
            }

            const isPasswordCorrect = await this.service.checkPassword(data.email, data.password)
            if (!isPasswordCorrect){
                res.status(400).send({
                    success: false,
                    message: 'Incorrect password'
                })
                return;
            }

            const {email, accessToken, refreshToken} = await this.service.loginUser(data.email);

            res.cookie('refreshToken', refreshToken, {httpOnly: true})
            res.send({email, accessToken});

        } catch (e){
            console.log(e);
            res.status(500).send({
                success: false,
                message: 'Error login user'
            })
        }
    }

    public logoutUser: RequestHandler = async (req, res) =>{
        try{
            const email = req.body.email;
            const isEmail = await this.service.logoutUser(email);
            if (isEmail){
                res.clearCookie('refreshToken')

                res.send({
                    success: true,
                    message: 'User logged out successfully'
                });
            } else{
                res.status(404).send({
                    success: false,
                    message: 'User not found'
                });
            }
        } catch (e){
            console.log(e);
            res.status(500).send({
                success: false,
                message: 'Error logout user'
            })
        }
    }
}