import {Request, Response} from 'express'
import { postAlunosService } from '../../service/aluno/postAlunosService'

class postAlunosController{
    async handle(req: Request, res: Response){
        const { nome, idade, aluno_turma, aluno_serie} = req.body //Requisitando os dados do body (front-end)
        const PostAlunosService = new postAlunosService()
        const alunos = await PostAlunosService.execute({
            nome, idade, aluno_turma, aluno_serie
        })
        return res.json(alunos)
    }
}

export { postAlunosController }