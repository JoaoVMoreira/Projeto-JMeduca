import prismaClient from "../../prisma/config"


interface iDeleteMateriasService{
    id: string
}

class deleteMateriasService{
    async execute({ id }: iDeleteMateriasService){
        const materia = await prismaClient.materias.delete({
            where: {
                id: id
            }
        })
        return{materia}
    }
}

export { deleteMateriasService }