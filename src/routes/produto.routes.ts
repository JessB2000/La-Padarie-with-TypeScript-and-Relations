import { Router } from 'express';
import { produtoController } from '../controllers/produto.controller';

const produtoRouter = Router();
produtoRouter.get('/', produtoController.listProduto);
produtoRouter.get('/:id', produtoController.getProduto);
produtoRouter.post('/', produtoController.insertProduto);
produtoRouter.put('/:id', produtoController.updateProduto);
produtoRouter.delete('/:id', produtoController.deleteProduto);

export { 
    produtoRouter,
}