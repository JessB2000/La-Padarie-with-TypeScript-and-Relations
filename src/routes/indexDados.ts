import { Application } from "express";
import Router from 'express';
import { dadosRouter } from "./dados.routes";

export const useRoutes = (app: Application) => {
    const apiRouter = Router();
    apiRouter.use('/products', dadosRouter);

    app.use('/api/v1', apiRouter);
}