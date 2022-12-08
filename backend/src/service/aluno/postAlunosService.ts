import prismaClient from "../../prisma/config"

interface ipostAlunosService{
    nome: string,
    idade: number,
    aluno_turma: number, 
    aluno_serie: string, 
}

class postAlunosService{
    async execute({ nome, idade, aluno_turma, aluno_serie}: ipostAlunosService){

        const existe = await prismaClient.aluno.findFirst({
            where:{
                nome: nome
            }
        })

        if(existe){
            throw new Error('Aluno já cadastrado!')
        }
        const alunos = await prismaClient.aluno.create({
            data: {
                nome: nome,
                idade: idade,
                aluno_turma: aluno_turma,
                aluno_serie: aluno_serie
            }
        })
        return { alunos }
    }

}

export {postAlunosService}