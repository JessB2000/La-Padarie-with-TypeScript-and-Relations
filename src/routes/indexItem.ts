import { Application } from "express";
import Router from 'express';
import { itemRouter } from "./item.routes";

export const useRoutes = (app: Application) => {
    const apiRouter = Router();
    apiRouter.use('/item', itemRouter);

    app.use('/api/v1', apiRouter);
}
