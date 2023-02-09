import prismaClient from "../../prisma/config"


interface iDeleteMateriasService{
    id: string
}


//Função para deletar materias
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