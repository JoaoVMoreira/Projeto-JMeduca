import {Request, Response} from 'express'
import { deleteAlunosService } from '../../service/aluno/deleteAlunosService'

class deleteAlunosController{
    async handle(req: Request, res: Response){
        const id = req.query.id as string  //Requisitando o id da query
        const DeleteAlunosService = new deleteAlunosService()
        const tarefa = await DeleteAlunosService.execute({id})
        return res.json(tarefa)
    }
}

export {deleteAlunosController}