import {Request, Response} from 'express'
import { putMateriasService } from '../../service/materia/putMateriasService'

class putMateriasController{
    async handle(req: Request, res: Response){
        const { id, materia, n1, n2 } = req.body//Requisitando dados do front end
        const PutMateriasService = new putMateriasService()
        const materias = await PutMateriasService.execute({ id, materia, n1, n2 })
        return res.json(materias)
    }
}

export { putMateriasController }