import { Application } from "express";
import Router from 'express';
import { produtoRouter } from "./produto.routes";

export const useRoutes = (app: Application) => {
    const apiRouter = Router();
    apiRouter.use('/produto', produtoRouter);

    app.use('/api/v1', apiRouter);
}