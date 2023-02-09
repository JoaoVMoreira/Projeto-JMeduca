import prismaClient from "../../prisma/config"

//Função para listar materias
class getMateriasService{
    async execute(){
        const materias = await prismaClient.materias.findMany({})
        return{materias}
    }
}

export {getMateriasService}