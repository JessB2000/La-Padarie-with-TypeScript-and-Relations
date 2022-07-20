import { Router } from 'express';
import { pedidoController } from '../controllers/pedido.controller';

const pedidoRouter = Router();
pedidoRouter.get('/', pedidoController.listPedido);
pedidoRouter.get('/:id', pedidoController.getPedido);
pedidoRouter.post('/', pedidoController.insertPedido);
pedidoRouter.put('/:id', pedidoController.updatePedido);
pedidoRouter.delete('/:id', pedidoController.deletePedido);

export { 
    pedidoRouter,
}