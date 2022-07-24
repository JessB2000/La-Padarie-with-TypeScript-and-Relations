import { dbQuery, dbQueryFirst } from "../services/db"

export type Item = {
    id: number;
    quantidade: number; 
    id_produto: number;
    id_pedido: number; 
}
const listItem = async () => {
    const retorno = await dbQuery(`SELECT produto.id, produto.nomeP, produto.area, item.quantidade, produto.preco FROM item JOIN produto ON item.id_produto = produto.id WHERE item.id_pedido = 1`);
    return retorno as Item[];
}

const insertItem = async (item: Item) => {
    await dbQuery(`INSERT INTO item (quantidade, id_produto, id_pedido) VALUES(?, ?, ?)`, [item.quantidade, item.id_produto, item.id_pedido])
    let retorno = await dbQuery(`SELECT seq AS Id FROM sqlite_sequence WHERE quantidade = 'item', id_produto = 'item', id_pedido = 'item'`);
    return getItem(retorno[0].Id);
}

const updateItem = async (item: Item) => {
    await dbQuery(`UPDATE item SET quantidade = ?, id_produto = ?, id_pedido = ? WHERE id = ?`, [item.quantidade, item.id_produto, item.id_pedido, item.id])
    return getItem(item.id);
}

const getItem = async (id: number) => {
    const retorno = await dbQueryFirst(`SELECT produto.id, produto.nomeP, produto.area, item.quantidade, produto.preco FROM item JOIN produto ON item.id_produto = produto.id WHERE item.id_pedido = 1 WHERE id = ?`, [id]);
    return retorno as Item | undefined;
}

const deleteItem = async (id: number) => {
    await dbQueryFirst(`DELETE FROM item WHERE id = ?`, [id]);
}

export const itemModel = {
    insertItem,
    listItem,
    getItem,
    deleteItem,
    updateItem
}