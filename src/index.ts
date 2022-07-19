import express, {Request, Response} from "express"

const PORT = 3000; 

const app = express(); 

app.listen(PORT, () => console.log("Servidor Conectado"))