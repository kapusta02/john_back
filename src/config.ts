import dotenv from "dotenv";
import * as process from "process";

dotenv.config({path: ".env"});

export interface Config {
    port: number;
    secretKey: string;
    secretKeyRefresh: string;
    secretKeyPasswordReset: string;
    host: string;
    postgresUser: string;
    postgresPassword: string;
    postgresDatabase: string;
}

const config: Config = {
    port: +(process.env.PORT || 3000),
    secretKey: process.env.SECRET_KEY || '',
    secretKeyRefresh: process.env.SECRET_KEY_REFRESH || '',
    secretKeyPasswordReset: process.env.SECRET_KEY_PASSWORD_RESET || '',
    host: process.env.HOST || '',
    postgresUser: process.env.POSTGRES_USER || '',
    postgresPassword: process.env.POSTGRES_PASSWORD || '',
    postgresDatabase: process.env.POSTGRES_DATABASE || ''
};
console.log({config});

export {config};