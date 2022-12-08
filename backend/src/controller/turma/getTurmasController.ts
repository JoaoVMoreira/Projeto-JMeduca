import {Request, Response} from 'express'
import { getTurmasService } from '../../service/turma/getTurmasService'

class getTurmasController{
    async handle(req: Request, res: Response){
        const GetTurmasService = new getTurmasService()
        const tarefas = await GetTurmasService.execute()
        return res.json(tarefas)
    }
}

export {getTurmasController}