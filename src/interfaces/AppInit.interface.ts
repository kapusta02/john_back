import { RequestHandler } from 'express';
import { IRoute } from './IRoute.interface';

export interface AppInit {
  port: number;
  middlewares: RequestHandler[];
  routers: IRoute[];
}
