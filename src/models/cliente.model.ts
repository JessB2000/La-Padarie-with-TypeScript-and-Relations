import { dbQuery, dbQueryFirst } from "../services/db"

export type Cliente = {
    id: number;
    nome: string;
}

const insertCliente = async (cliente: Cliente) => {
    await dbQuery(`INSERT INTO cliente (nome) VALUES(?)`, [cliente.nome])
    let retorno = await dbQuery(`SELECT seq AS Id FROM sqlite_sequence WHERE nome = 'cliente'`);
    return getCliente(retorno[0].Id);
}

const updateCliente = async (cliente: Cliente) => {
    await dbQuery(`UPDATE cliente SET nome = ? WHERE id = ?`, [cliente.nome, cliente.id])
    return getCliente(cliente.id);
}

const listCliente = async () => {
    const retorno = await dbQuery(`SELECT * FROM cliente`);
    return retorno as Cliente[];
}

const getCliente = async (id: number) => {
    const retorno = await dbQueryFirst(`SELECT * FROM cliente WHERE id = ?`, [id]);
    return retorno as Cliente | undefined;
}

const deleteCliente = async (id: number) => {
    await dbQueryFirst(`DELETE FROM product WHERE id = ?`, [id]);
}

export const clienteModel = {
    insertCliente,
    listCliente,
    getCliente,
    deleteCliente,
    updateCliente
}