import { dbQuery } from "../services/db";

export type Item = {
    id: number; 
    nomeItem: string; 
    area: string; 
}
const insertItem = async(item: Item) =>{
  await  dbQuery('INSERT INTO item (nomeItem,area) VALUES (?,?)',[item.nomeItem, item.area])
  let retorno = await dbQuery(`SELECT seq AS Id FROM sqlite_sequence WHERE name = 'item'`)
  return retorno[0].Id as number | undefined; 
}