import cors from 'cors';
import App from './app';
import logger from './middlewares/logger';
import {AuthRouter} from "./routes/auth.route";
import {config} from "./config";

const app = new App({
    port: 8000,
    middlewares: [logger(), cors({credentials: true, origin: config.frontHost})],
    routers: [new AuthRouter()],
});

app.listen();
