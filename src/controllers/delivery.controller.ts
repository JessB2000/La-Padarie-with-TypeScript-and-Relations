import { Request, Response } from 'express';
import { badRequest, internalServerError, validateNumber, notFound, ok } from '../services/util';
import { Delivery, deliveryModel } from '../models/delivery.model';

const insertDelivery = (req: Request, res: Response) => {

    {
        const delivery = req.body;
        if (!delivery)
            return badRequest(res, "Delivery inválido");

        if (!validateNumber(delivery.codigo))
            return badRequest(res, 'Informe o valor do código do cliente');
    }

    const delivery = req.body as Delivery;
    return deliveryModel.insertDelivery(delivery)
        .then(delivery => {
            res.json(delivery);
        })
        .catch(err => internalServerError(res, err));
}


const updateDelivery = async (req: Request, res: Response) => {

    const id = parseInt(req.params.id);
    {
        if(!validateNumber(id))
            return badRequest(res, 'id inválido');

        const delivery = req.body;
        if (!delivery)
            return badRequest(res, "Delivery inválido");

        if (!validateNumber(delivery.código))
            return badRequest(res, 'Informe o valor do código do cliente');

        const deliverySaved = await deliveryModel.getDelivery(id);
        if(!deliverySaved)
            return notFound(res);
    }

    const delivery = req.body as Delivery;
    return deliveryModel.updateDelivery(delivery)
        .then(delivery => {
            res.json(delivery)
        })
        .catch(err => internalServerError(res, err));
}


const listDelivery = ({}: Request, res: Response) => {
    deliveryModel.listDelivery()
        .then(delivery => {
            res.json(delivery)
        })
        .catch(err => internalServerError(res, err));
}

const getDelivery = (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    {
        if(!validateNumber(id))
            return badRequest(res, 'id inválido');
    }

    return deliveryModel.getDelivery(id)
        .then((delivery) => {
            if(delivery)
                return res.json(delivery);
            else
                return notFound(res);
        })
        .catch(err => internalServerError(res, err));
}

const deleteDelivery = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    {
        if(!validateNumber(id))
            return badRequest(res, 'id inválido');

        const deliverySaved = await deliveryModel.getDelivery(id);
        if(!deliverySaved)
            return notFound(res);
    }

    return deliveryModel.deleteDelivery(id)
        .then(() => ok(res))
        .catch(err => internalServerError(res, err));
}

export const deliveryController = {
    insertDelivery,
    listDelivery,
    getDelivery,
    deleteDelivery,
    updateDelivery
}