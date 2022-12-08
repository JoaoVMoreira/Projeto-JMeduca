import prismaClient from '../../prisma/config'

class getTurmasService{
    async execute(){
        const turma = await prismaClient.turmas.findMany({})
        return {turma}
    }
}

export { getTurmasService }