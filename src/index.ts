import App from './app';
import logger from './middlewares/logger';
import {AuthRouter} from "./routes/auth.route";

const app = new App({
    port: 8000,
    middlewares: [logger()],
    routers: [new AuthRouter()],
});

app.listen();
