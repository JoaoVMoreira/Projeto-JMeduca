import prismaClient from "../../prisma/config"

interface ipostMateriasService {
    materia: string,
    aluno_id: string,
    n1: number,
    n2: number
}

class postMateriasService{
    async execute({materia, aluno_id, n1, n2}: ipostMateriasService){

        const existeMateria = await prismaClient.materias.findFirst({
            where:{
                materia: materia
            }
        })

        const existeAluno = await prismaClient.materias.findFirst({
            where: {
                aluno_id: aluno_id
            }
        })

        if(existeMateria && existeAluno){
            throw new Error('Materia já vinculada ao aluno informado!')
        }

        if(!materia || !aluno_id || !n1 || !n2){
            throw new Error('Favor informar todos os dados!')
        }
        const materias = await prismaClient.materias.create({
            data: {
                materia: materia,
                aluno_id: aluno_id,
                n1: n1,
                n2: n2
            }
        })

        return materias
    }
}

export { postMateriasService }