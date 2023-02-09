import prismaClient from "../../prisma/config"

interface ideleteAlunosService{
    id: string
}
//Função para deletar alunos
class deleteAlunosService{
    async execute({ id }: ideleteAlunosService){
        const tarefa = await prismaClient.aluno.delete({
            where: {
                id: id
            }
        })
        return{tarefa}
    }
}

export { deleteAlunosService }