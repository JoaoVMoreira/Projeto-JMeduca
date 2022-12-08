import prismaClient from "../../prisma/config"


class getAlunosService{
    async execute(){
        const alunos = await prismaClient.aluno.findMany({})
        return {alunos}
    }
}

export { getAlunosService }