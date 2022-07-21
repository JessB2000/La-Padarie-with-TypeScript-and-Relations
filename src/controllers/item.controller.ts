import { Request, Response } from 'express';
import { badRequest, internalServerError, validateNumber, notFound, ok } from '../services/util';
import { Item, itemModel } from '../models/item.model';

const insertItem = (req: Request, res: Response) => {

    {
        const item = req.body;
        if (!item)
            return badRequest(res, "Item inválido");

        if (!item.quantidade)
            return badRequest(res, 'Informe o nome do item');

    }

    const item = req.body as Item;
    return itemModel.insertItem(item)
        .then(item => {
            res.json(item);
        })
        .catch(err => internalServerError(res, err));
}


const updateItem = async (req: Request, res: Response) => {

    const id = parseInt(req.params.id);
    {
        if(!validateNumber(id))
            return badRequest(res, 'id inválido');

        const item = req.body;
        if (!item)
            return badRequest(res, "Item inválido");

        if (!item.quantidade)
            return badRequest(res, 'Informe o nome do Item');
            
        const itemSaved = await itemModel.getItem(id);
        if(!itemSaved)
            return notFound(res);
    }

    const item = req.body as Item;
    return itemModel.updateItem(item)
        .then(item => {
            res.json(item)
        })
        .catch(err => internalServerError(res, err));
}


const listItem = ({}: Request, res: Response) => {
    itemModel.listItem()
        .then(item => {
            res.json(item)
        })
        .catch(err => internalServerError(res, err));
}

const getItem = (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    {
        if(!validateNumber(id))
            return badRequest(res, 'id inválido');
    }

    return itemModel.getItem(id)
        .then((item) => {
            if(item)
                return res.json(item);
            else
                return notFound(res);
        })
        .catch(err => internalServerError(res, err));
}

const deleteItem = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    {
        if(!validateNumber(id))
            return badRequest(res, 'id inválido');

        const itemSaved = await itemModel.getItem(id);
        if(!itemSaved)
            return notFound(res);
    }

    return itemModel.deleteItem(id)
        .then(() => ok(res))
        .catch(err => internalServerError(res, err));
}

export const itemController = {
    insertItem,
    listItem,
    getItem,
    deleteItem,
    updateItem
}