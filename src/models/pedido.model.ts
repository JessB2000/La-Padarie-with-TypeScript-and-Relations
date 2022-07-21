import { dbQuery, dbQueryFirst } from "../services/db"

export type Pedido = {
    id: number;
    entrega: number; 
}
const listPedido = async () => {
    const retorno = await dbQuery(`SELECT * FROM pedido`);
    return retorno as Pedido[];
}
const insertPedido = async (pedido: Pedido) => {
    await dbQuery(`INSERT INTO pedido (entrega) VALUES(?, ?, ?)`, [pedido.entrega])
    let retorno = await dbQuery(`SELECT seq AS Id FROM sqlite_sequence WHERE  entrega = 'pedido'`);
    return getPedido(retorno[0].Id);
}

const updatePedido = async (pedido: Pedido) => {
    await dbQuery(`UPDATE pedido SET entrega = ? WHERE id = ?`, [pedido.entrega, pedido.id])
    return getPedido(pedido.id);
}

const getPedido = async (id: number) => {
    const retorno = await dbQueryFirst(`SELECT * FROM pedido WHERE id = ?`, [id]);
    return retorno as Pedido | undefined;
}

const deletePedido = async (id: number) => {
    await dbQueryFirst(`DELETE FROM pedido WHERE id = ?`, [id]);
}

export const pedidoModel = {
    insertPedido,
    listPedido,
    getPedido,
    deletePedido,
    updatePedido
}