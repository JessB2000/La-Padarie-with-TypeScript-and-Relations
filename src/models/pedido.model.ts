import { dbQuery, dbQueryFirst } from "../services/db"

export type Pedido = {
    id: number;
    produto: string;
    data: number;
    quantidade: number; 
}

const insertPedido = async (pedido: Pedido) => {
    await dbQuery(`INSERT INTO pedido (produto, data, quantidade) VALUES(?, ?, ?)`, [pedido.produto, pedido.data, pedido.quantidade])
    let retorno = await dbQuery(`SELECT seq AS Id FROM sqlite_sequence WHERE  produto = 'pedido', data = 'pedido', quantidade = 'quantidade'`);
    return getPedido(retorno[0].Id);
}

const updatePedido = async (pedido: Pedido) => {
    await dbQuery(`UPDATE pedido SET produto = ?, data = ?, quantidade = ? WHERE id = ?`, [pedido.produto, pedido.data, pedido.quantidade])
    return getPedido(pedido.id);
}

const listPedido = async () => {
    const retorno = await dbQuery(`SELECT * FROM pedido`);
    return retorno as Pedido[];
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