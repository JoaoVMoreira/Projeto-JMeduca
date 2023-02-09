import express, { NextFunction, Request, Response } from "express"
import 'express-async-errors'
import { rota } from "./rotas"
import cors from "cors"

const app = express() //Defininfo a variavel app com a função express
app.use(express.json()) //Definindo modelo Json
app.use(cors()) //Ativando Cors para requisições HTTP
app.use(rota) //Definindo rota


//Informando erros sem quebrar a aplicação
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if(err instanceof Error){
    //Se for uma instancia do tipo error
    return res.status(400).json({
      error: err.message
    })
  }

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error.'
  })

})


//Definindo a porta 8000
const port = 8000
app.listen(port, ()=> console.log(`Rodando na porta ${port}`))