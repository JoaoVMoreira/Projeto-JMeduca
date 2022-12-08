import { Request, Response } from "express"
import { getAlunosService } from "../../service/aluno/getAlunosService"

class getAlunosController{
    async handle(req: Request, res: Response){
        const GetAlunosService = new getAlunosService()
        const alunos = await GetAlunosService.execute()

        return res.json(alunos)
    }
}

export { getAlunosController }