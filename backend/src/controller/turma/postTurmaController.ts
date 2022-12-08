import { Request, Response } from "express";
import { postTurmaService } from "../../service/turma/postTurmaService";

class postTurmaController{
    async handle(req: Request, res: Response){
        const {turma, serie} = req.body

        const PostTurmaService = new postTurmaService()
        const turmas = await PostTurmaService.execute({turma, serie})
        
        return res.json(turmas)
    }
}

export { postTurmaController }