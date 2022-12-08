import { Request, Response } from "express"
import { getMateriasService } from "../../service/materia/getMateriasService"

class getMateriasController{
    async handle(req: Request, res: Response){
        const GetMateriasService = new getMateriasService()
        const materias = await GetMateriasService.execute()

        return res.json(materias)
    }
}

export { getMateriasController }