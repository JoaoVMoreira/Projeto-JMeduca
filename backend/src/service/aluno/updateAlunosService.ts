import prismaClient from "../../prisma/config"

interface iupdateAlunosService{
    id: string,
    nome: string,
    idade: number
}


//Função para atualizar dados de alunos
class updateAlunosService{
    async execute({id, nome, idade}: iupdateAlunosService){
        const alunos = await prismaClient.aluno.update({
            where: {
                id: id
            },
            data: {
                nome: nome,
                idade: idade
            }
        })
        return {alunos}
    }
}

export { updateAlunosService }