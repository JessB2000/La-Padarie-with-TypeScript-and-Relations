import { dbQuery, dbQueryFirst } from "../services/db"

export type Cliente = {
    id: number;
    nome: string; 
    endereco: string; 
    cpf: string;
}

const listCliente = async () => {
    const retorno = await dbQuery(`SELECT * FROM cliente`);
    return retorno as Cliente[];
}
const insertCliente = async (cliente: Cliente) => {
    await dbQuery(`INSERT INTO cliente (nome,endereco, cpf) VALUES(?)`, [cliente.nome, cliente.endereco, cliente.cpf])
    let retorno = await dbQuery(`SELECT seq AS Id FROM sqlite_sequence WHERE  nome = 'cliente', endereco = 'cliente', cpf = 'cliente'`);
    return getCliente(retorno[0].Id);
}

const updateCliente = async (cliente: Cliente) => {
    await dbQuery(`UPDATE cliente SET nome = ?, endereco = ?, cpf = ? WHERE id = ?`, [cliente.nome, cliente.endereco, cliente.cpf, cliente.id])
    return getCliente(cliente.id);
}


const getCliente = async (id: number) => {
    const retorno = await dbQueryFirst(`SELECT * FROM cliente WHERE id = ?`, [id]);
    return retorno as Cliente | undefined;
}

const deleteCliente = async (id: number) => {
    await dbQueryFirst(`DELETE FROM cliente WHERE id = ?`, [id]);
}

export const clienteModel = {
    insertCliente,
    listCliente,
    getCliente,
    deleteCliente,
    updateCliente
}