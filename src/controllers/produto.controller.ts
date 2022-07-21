import { Request, Response } from 'express';
import { badRequest, internalServerError, validateNumber, notFound, ok } from '../services/util';
import { Produto, produtoModel } from '../models/produto.models';

const insertProduto = (req: Request, res: Response) => {

    {
        const produto = req.body;
        if (!produto)
            return badRequest(res, "Produto inválido");

        if (!produto.nomeP)
            return badRequest(res, 'Informe o produto');

        if (!produto.area)
            return badRequest(res, 'Informe a área');

    }

    const produto = req.body as Produto;
    return produtoModel.insertProduto(produto)
        .then(produto => {
            res.json(produto);
        })
        .catch(err => internalServerError(res, err));
}


const updateProduto = async (req: Request, res: Response) => {

    const id = parseInt(req.params.id);
    {
        if(!validateNumber(id))
            return badRequest(res, 'id inválido');

        const produto = req.body;
        if (!produto)
            return badRequest(res, "Produto inválido");

        if (!produto.nomeP)
            return badRequest(res, 'Informe o produto');

        if (!produto.area)
            return badRequest(res, 'Informe a área');

        const produtoSaved = await produtoModel.getProduto(id);
        if(!produtoSaved)
            return notFound(res);
    }

    const produto = req.body as Produto;
    return produtoModel.updateProduto(produto)
        .then(produto => {
            res.json(produto)
        })
        .catch(err => internalServerError(res, err));
}


const listProduto = ({}: Request, res: Response) => {
    produtoModel.listProduto()
        .then(produto => {
            res.json(produto)
        })
        .catch(err => internalServerError(res, err));
}

const getProduto = (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    {
        if(!validateNumber(id))
            return badRequest(res, 'id inválido');
    }

    return produtoModel.getProduto(id)
        .then((produto) => {
            if(produto)
                return res.json(produto);
            else
                return notFound(res);
        })
        .catch(err => internalServerError(res, err));
}

const deleteProduto = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    {
        if(!validateNumber(id))
            return badRequest(res, 'id inválido');

        const produtoSaved = await produtoModel.getProduto(id);
        if(!produtoSaved)
            return notFound(res);
    }

    return produtoModel.deleteProduto(id)
        .then(() => ok(res))
        .catch(err => internalServerError(res, err));
}

export const produtoController = {
    insertProduto,
    listProduto,
    getProduto,
    deleteProduto,
    updateProduto
}