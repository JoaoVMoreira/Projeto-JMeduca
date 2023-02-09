import { Request, Response } from "express"
import { postMateriasService } from "../../service/materia/postMateriasService"

class postMateriasController{
    async handle(req: Request, res: Response){
        const { materia, aluno_id, n1, n2 } = req.body//Requisitando dados do front end
        const PostMateriasService = new postMateriasService()
        const materias = await PostMateriasService.execute({ materia, aluno_id, n1, n2 })
        return res.json(materias)
    }
}

export { postMateriasController }