import { Router } from 'express';
import { deliveryController } from '../controllers/delivery.controller';

const deliveryRouter = Router();
deliveryRouter.get('/', deliveryController.listDelivery);
deliveryRouter.get('/:id', deliveryController.getDelivery);
deliveryRouter.post('/', deliveryController.insertDelivery);
deliveryRouter.put('/:id', deliveryController.updateDelivery);
deliveryRouter.delete('/:id', deliveryController.deleteDelivery);

export { 
    deliveryRouter,
}