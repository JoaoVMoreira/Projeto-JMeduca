import prismaClient from "../../prisma/config"

interface iputMateriasService {
    id: string,
    materia: string,
    n1: number,
    n2: number
}

class putMateriasService{
    async execute({ id, materia, n1, n2 }: iputMateriasService){
        const materias = await prismaClient.materias.update({
            where: {
                id: id
            },
            data: {
                materia: materia,
                n1: n1,
                n2: n2
            }
        })
        return {materias}
    }
}

export { putMateriasService }