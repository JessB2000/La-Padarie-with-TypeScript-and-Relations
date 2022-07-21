import { dbQuery, dbQueryFirst } from "../services/db"

export type Item = {
    id: number;
    quantidade: number; 
}
const listItem = async () => {
    const retorno = await dbQuery(`SELECT * FROM item`);
    return retorno as Item[];
}

const insertItem = async (item: Item) => {
    await dbQuery(`INSERT INTO item (quantidade) VALUES(?, ?)`, [item.quantidade])
    let retorno = await dbQuery(`SELECT seq AS Id FROM sqlite_sequence WHERE  quantidade = 'item'`);
    return getItem(retorno[0].Id);
}

const updateItem = async (item: Item) => {
    await dbQuery(`UPDATE item SET quantidade = ? WHERE id = ?`, [item.quantidade, item.id])
    return getItem(item.id);
}

const getItem = async (id: number) => {
    const retorno = await dbQueryFirst(`SELECT * FROM item WHERE id = ?`, [id]);
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