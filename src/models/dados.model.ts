import { dbQuery, dbQueryFirst } from "../services/db"

export type Dados = {
    id: number;
    endereco: string;
    cpf: string; 
}

const insertDados = async (dados: Dados) => {
    await dbQuery(`INSERT INTO dados (endereco, cpf) VALUES(?)`, [dados.endereco, dados.cpf])
    let retorno = await dbQuery(`SELECT seq AS Id FROM sqlite_sequence WHERE endereco = 'dados', cpf = 'dados'`);
    return getDados(retorno[0].Id);
}

const updateDados = async (dados: Dados) => {
    await dbQuery(`UPDATE dados SET endereco = ?, cpf = ? WHERE id = ?`, [dados.endereco, dados.cpf, dados.id])
    return getDados(dados.id);
}

const listDados = async () => {
    const retorno = await dbQuery(`SELECT * FROM dados`);
    return retorno as Dados[];
}

const getDados = async (id: number) => {
    const retorno = await dbQueryFirst(`SELECT * FROM dados WHERE id = ?`, [id]);
    return retorno as Dados | undefined;
}

const deleteDados = async (id: number) => {
    await dbQueryFirst(`DELETE FROM dados WHERE id = ?`, [id]);
}

export const dadosModel = {
    insertDados,
    listDados,
    getDados,
    deleteDados,
    updateDados
}