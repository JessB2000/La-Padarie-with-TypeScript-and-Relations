import { Application } from "express";
import Router from 'express';
import { pedidoRouter } from "./pedido.routes";

export const useRoutes = (app: Application) => {
    const apiRouter = Router();
    apiRouter.use('/pedido', pedidoRouter);

    app.use('/api/v1', apiRouter);
}