import { Application } from "express";
import Router from 'express';
import { clienteRouter } from "./cliente.routes";

export const useRoutes = (app: Application) => {
    const apiRouter = Router();
    apiRouter.use('/cliente', clienteRouter);

    app.use('/api/v1', apiRouter);
}