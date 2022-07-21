import { Application } from "express";
import Router from 'express';
import { itemRouter } from "./item.routes";
import { pedidoRouter } from "./pedido.routes";
import { produtoRouter } from "./produto.routes";
import { deliveryRouter } from "./delivery.routes";
import { clienteRouter } from "./cliente.routes";

export const useRoutes = (app: Application) => {
    const apiRouter = Router();
    apiRouter.use('/cliente', clienteRouter);
    apiRouter.use('/item', itemRouter);
    apiRouter.use('/pedido', pedidoRouter);
    apiRouter.use('/produto', produtoRouter);
    apiRouter.use('/delivery', deliveryRouter);


    app.use('/api/v1', apiRouter);
}
