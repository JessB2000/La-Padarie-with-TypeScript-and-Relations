import { dbQuery, dbQueryFirst } from "../services/db"

export type Delivery = {
    id: number;
    codigo: number; 
}
const listDelivery = async () => {
    const retorno = await dbQuery(`SELECT delivery.*, delivery.id_cliente, cliente.nome, cliente.endereco, cliente.cpf FROM delivery INNER JOIN cliente ON cliente.id = delivery.id_cliente`);
    return retorno as Delivery[];
}
const insertDelivery = async (delivery: Delivery) => {
    await dbQuery(`INSERT INTO delivery (entrega) VALUES(?, ?, ?)`, [delivery.codigo])
    let retorno = await dbQuery(`SELECT seq AS Id FROM sqlite_sequence WHERE  entrega = 'delivery'`);
    return getDelivery(retorno[0].Id);
}

const updateDelivery = async (delivery: Delivery) => {
    await dbQuery(`UPDATE delivery SET entrega = ? WHERE id = ?`, [delivery.codigo, delivery.id])
    return getDelivery(delivery.id);
}

const getDelivery = async (id: number) => {
    const retorno = await dbQueryFirst(`SELECT delivery.*, delivery.id_cliente, cliente.nome, cliente.endereco, cliente.cpf FROM delivery INNER JOIN cliente ON cliente.id = delivery.id_cliente WHERE id = ?`, [id]);
    return retorno as Delivery | undefined;
}

const deleteDelivery = async (id: number) => {
    await dbQueryFirst(`DELETE FROM delivery WHERE id = ?`, [id]);
}

export const deliveryModel = {
    insertDelivery,
    listDelivery,
    getDelivery,
    deleteDelivery,
    updateDelivery
}