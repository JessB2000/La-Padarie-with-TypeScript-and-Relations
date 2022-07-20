import { dbQuery } from "../services/db";

export type Endereço = {
    id: number; 
    endereço: string; 
}

const insertEndereço = async(endereço: Endereço) =>{
   await dbQuery('INSERT INTO endereço (endereço) VALUES (?)',[endereço.endereço])
   let retorno = await dbQuery(`SELECT seq AS Id FROM sqlite_sequence WHERE name = 'endereço'`)
   return retorno[0].Id as number | undefined; 
}