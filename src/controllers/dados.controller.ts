import { Request, Response } from 'express';
import { badRequest, internalServerError, validateNumber, notFound, ok } from '../services/util';
import { Dados, dadosModel } from '../models/dados.model';

const insertDados = (req: Request, res: Response) => {

    {
        const dados = req.body;
        if (!dados)
            return badRequest(res, "Dados inválidos");

        if (!dados.endereco)
            return badRequest(res, 'Informe a descrição do dados');

        if (!!validateNumber(dados.cpf))
            return badRequest(res, 'Informe o cpf correto');
    }

    const dados = req.body as Dados;
    return dadosModel.insertDados(dados)
        .then(dados => {
            res.json(dados);
        })
        .catch(err => internalServerError(res, err));
}


const updateDados = async (req: Request, res: Response) => {

    const id = parseInt(req.params.id);
    {
        if(!validateNumber(id))
            return badRequest(res, 'id inválido');

        const dados = req.body;
        if (!dados)
            return badRequest(res, "Dados inválido");

        if (!dados.endereco)
            return badRequest(res, 'Informe o endereço');

        if (!!validateNumber(dados.cpf))
            return badRequest(res, 'Informe o cpf');

        const dadosSaved = await dadosModel.getDados(id);
        if(!dadosSaved)
            return notFound(res);
    }

    const dados = req.body as Dados;
    return dadosModel.updateDados(dados)
        .then(dados => {
            res.json(dados)
        })
        .catch(err => internalServerError(res, err));
}


const listDados = ({}: Request, res: Response) => {
    dadosModel.listDados()
        .then(dados => {
            res.json(dados)
        })
        .catch(err => internalServerError(res, err));
}

const getDados = (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    {
        if(!validateNumber(id))
            return badRequest(res, 'id inválido');
    }

    return dadosModel.getDados(id)
        .then((dados) => {
            if(dados)
                return res.json(dados);
            else
                return notFound(res);
        })
        .catch(err => internalServerError(res, err));
}

const deleteDados = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    {
        if(!validateNumber(id))
            return badRequest(res, 'id inválido');

        const dadosSaved = await dadosModel.getDados(id);
        if(!dadosSaved)
            return notFound(res);
    }

    return dadosModel.deleteDados(id)
        .then(() => ok(res))
        .catch(err => internalServerError(res, err));
}

export const dadosController = {
    insertDados,
    listDados,
    getDados,
    deleteDados,
    updateDados
}