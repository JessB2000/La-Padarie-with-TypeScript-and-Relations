import { dbQuery } from "../services/db";

export type Pedido = {
    id: number; 
    produtos: string; 
    data: number; 
    preço: number; 
    quantidade: number; 
}
const insertPedido = async(pedido: Pedido) =>{
   await dbQuery('INSERT INTO pedido (produtos, data, preço, quantidade) VALUES (?, ?, ?, ?)',[pedido.produtos, pedido.data, pedido.preço, pedido.quantidade])
   let retorno = await dbQuery(`SELECT seq AS Id FROM sqlite_sequence WHERE name = 'pedido'`)
   return retorno[0].seq; 
}