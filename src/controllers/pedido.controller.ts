import { Request, Response } from 'express';
import { badRequest, internalServerError, validateNumber, notFound, ok } from '../services/util';
import { Pedido, pedidoModel } from '../models/pedido.model';

const insertPedido = (req: Request, res: Response) => {

    {
        const pedido = req.body;
        if (!pedido)
            return badRequest(res, "Pedido inválido");

        if (!pedido.produto)
            return badRequest(res, 'Informe o produto');

        if (!validateNumber(pedido.data))
            return badRequest(res, 'Informe a data');

        if (!validateNumber(pedido.quantidade))
            return badRequest(res, 'Informe a quantidade');
    }

    const pedido = req.body as Pedido;
    return pedidoModel.insertPedido(pedido)
        .then(pedido => {
            res.json(pedido);
        })
        .catch(err => internalServerError(res, err));
}


const updatePedido = async (req: Request, res: Response) => {

    const id = parseInt(req.params.id);
    {
        if(!validateNumber(id))
            return badRequest(res, 'id inválido');

        const pedido = req.body;
        if (!pedido)
            return badRequest(res, "Pedido inválido");

        if (!pedido.produto)
            return badRequest(res, 'Informe o produto');

        if (!validateNumber(pedido.data))
            return badRequest(res, 'Informe a data');

        const pedidoSaved = await pedidoModel.getPedido(id);
        if(!pedidoSaved)
            return notFound(res);
    }

    const pedido = req.body as Pedido;
    return pedidoModel.updatePedido(pedido)
        .then(pedido => {
            res.json(pedido)
        })
        .catch(err => internalServerError(res, err));
}


const listPedido = ({}: Request, res: Response) => {
    pedidoModel.listPedido()
        .then(pedido => {
            res.json(pedido)
        })
        .catch(err => internalServerError(res, err));
}

const getPedido = (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    {
        if(!validateNumber(id))
            return badRequest(res, 'id inválido');
    }

    return pedidoModel.getPedido(id)
        .then((pedido) => {
            if(pedido)
                return res.json(pedido);
            else
                return notFound(res);
        })
        .catch(err => internalServerError(res, err));
}

const deletePedido = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    {
        if(!validateNumber(id))
            return badRequest(res, 'id inválido');

        const pedidoSaved = await pedidoModel.getPedido(id);
        if(!pedidoSaved)
            return notFound(res);
    }

    return pedidoModel.deletePedido(id)
        .then(() => ok(res))
        .catch(err => internalServerError(res, err));
}

export const pedidoController = {
    insertPedido,
    listPedido,
    getPedido,
    deletePedido,
    updatePedido
}