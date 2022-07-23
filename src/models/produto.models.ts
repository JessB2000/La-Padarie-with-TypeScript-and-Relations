import { dbQuery, dbQueryFirst } from "../services/db"

export type Produto = {
    id: number;
    nomeP: string; 
    area: string;
    preco: number;  
}
const listProduto = async () => {
    const retorno = await dbQuery(`SELECT produto.nomeP, produto.area, produto.preco FROM produto`);
    return retorno as Produto[];
}
const insertProduto = async (produto: Produto) => {
    await dbQuery(`INSERT INTO produto (nomeP, area, preco) VALUES(?, ?, ?)`, [produto.nomeP, produto.area, produto.preco])
    let retorno = await dbQuery(`SELECT seq AS Id FROM sqlite_sequence WHERE  nomeP = 'produto', area = 'produto', preco = 'produto' `);
    return getProduto(retorno[0].Id);
}

const updateProduto = async (produto: Produto) => {
    await dbQuery(`UPDATE produto SET nomeP = ?, area = ?, preco = ? WHERE id = ?`, [produto.nomeP, produto.area, produto.preco, produto.id])
    return getProduto(produto.id);
}

const getProduto = async (id: number) => {
    const retorno = await dbQueryFirst(`SELECT * FROM produto WHERE id = ?`, [id]);
    return retorno as Produto | undefined;
}

const deleteProduto = async (id: number) => {
    await dbQueryFirst(`DELETE FROM produto WHERE id = ?`, [id]);
}

export const produtoModel = {
    insertProduto,
    listProduto,
    getProduto,
    deleteProduto,
    updateProduto
}