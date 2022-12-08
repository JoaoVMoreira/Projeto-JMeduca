import {Request, Response} from 'express'
import { updateAlunosService } from '../../service/aluno/updateAlunosService'

class updateAlunosController{
    async handle(req: Request, res: Response){
        const {id, nome, idade} = req.body
        const UpdateAlunosService = new updateAlunosService()
        const alunos = await UpdateAlunosService.execute({ id, nome, idade })
        return res.json(alunos)
    }
}

export {updateAlunosController}