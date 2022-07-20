import { Router } from 'express';
import { dadosController } from '../controllers/dados.controller';

const dadosRouter = Router();
dadosRouter.get('/', dadosController.listDados);
dadosRouter.get('/:id', dadosController.getDados);
dadosRouter.post('/', dadosController.insertDados);
dadosRouter.put('/:id', dadosController.updateDados);
dadosRouter.delete('/:id', dadosController.deleteDados);

export { 
    dadosRouter,
}