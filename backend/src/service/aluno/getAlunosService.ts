import prismaClient from "../../prisma/config"

//Função para listar alunos
class getAlunosService{
    async execute(){
        const alunos = await prismaClient.aluno.findMany({})
        return {alunos}
    }
}

export { getAlunosService }