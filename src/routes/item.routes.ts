import { Router } from 'express';
import { itemController } from '../controllers/item.controller';

const itemRouter = Router();
itemRouter.get('/', itemController.listItem);
itemRouter.get('/:id', itemController.getItem);
itemRouter.post('/', itemController.insertItem);
itemRouter.put('/:id', itemController.updateItem);
itemRouter.delete('/:id', itemController.deleteItem);

export { 
    itemRouter,
}