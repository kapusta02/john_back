import express, {Application, RequestHandler} from 'express';
import {AppInit} from './interfaces/AppInit.interface';
import {IRoute} from './interfaces/IRoute.interface';
import {appDataSource} from "./db/dataSource";

class App {
  public app: Application;
  public port: number;
  constructor(appInit: AppInit) {
    this.app = express();
    this.port = appInit.port;

    this.initAssets();
    this.initMiddlewares(appInit.middlewares);
    this.initRoutes(appInit.routers);
  }
  private initMiddlewares(middlewares: RequestHandler[]) {
    middlewares.forEach((middleware) => {
      this.app.use(middleware);
    });
  }
  private initRoutes(routes: IRoute[]) {
    routes.forEach((route) => {
      this.app.use(route.path, route.router);
    });
  }
  private initAssets() {
    this.app.use(express.json());
  }
  public async listen() {
    await appDataSource.initialize();
    this.app.listen(this.port, () => {
      console.log(`⚡️ Server is listening on port http://localhost:${this.port}`);
    });
  }
}

export default App;
