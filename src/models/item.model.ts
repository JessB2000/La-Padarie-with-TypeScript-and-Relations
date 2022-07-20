import { dbQuery, dbQueryFirst } from "../services/db"

export type Item = {
    id: number;
    nomeItem: string;
    area: string;
}

const insertItem = async (item: Item) => {
    await dbQuery(`INSERT INTO item (nomeItem, area) VALUES(?, ?)`, [item.nomeItem, item.area])
    let retorno = await dbQuery(`SELECT seq AS Id FROM sqlite_sequence WHERE  nomeItem = 'item', area = 'area'`);
    return getItem(retorno[0].Id);
}

const updateItem = async (item: Item) => {
    await dbQuery(`UPDATE item SET nomeItem = ?, area = ? WHERE id = ?`, [item.nomeItem, item.area, item.id])
    return getItem(item.id);
}

const listItem = async () => {
    const retorno = await dbQuery(`SELECT * FROM item`);
    return retorno as Item[];
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