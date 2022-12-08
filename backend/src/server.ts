import cors from "cors"
import express from "express"
import { rota } from "./rotas"

const app = express()
app.use(cors())
app.use(express.json())
app.use(rota)

const port = 8000
app.listen(port, ()=> console.log(`Rodando na porta ${port}`))