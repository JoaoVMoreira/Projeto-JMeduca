import prismaClient from '../../prisma/config'

//Função para listar turmas
class getTurmasService{
    async execute(){
        const turma = await prismaClient.turmas.findMany({})
        return {turma}
    }
}

export { getTurmasService }