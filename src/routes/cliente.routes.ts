import { Router } from 'express';
import { clienteController } from '../controllers/cliente.controller';

const clienteRouter = Router();
clienteRouter.get('/', clienteController.listCliente);
clienteRouter.get('/:id', clienteController.getCliente);
clienteRouter.post('/', clienteController.insertCliente);
clienteRouter.put('/:id', clienteController.updateCliente);
clienteRouter.delete('/:id', clienteController.deleteCliente);

export { 
    clienteRouter,
}