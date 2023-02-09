import {Request, Response} from 'express'
import { deleteMateriasService } from '../../service/materia/deleteMateriasService'

class deleteMateriasController{
    async handle(req: Request, res: Response){
        const id = req.query.id as string //Requisitando id do query
        const DeleteMateriasService = new deleteMateriasService() 
        const materias = await DeleteMateriasService.execute({id})
        return res.json(materias)
    }
}

export { deleteMateriasController }