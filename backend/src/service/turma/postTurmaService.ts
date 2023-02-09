import prismaClient from '../../prisma/config'

interface ipostTurmaService{
    turma: number,
    serie: string
}
//Função para cadastrar turmas
class postTurmaService{
    async execute({turma, serie}: ipostTurmaService){
        const existe = await prismaClient.turmas.findFirst({
            where: {
                turma: turma
            }
        })
        if(existe){
            throw new Error('Turma ocupada!')
        }

        if(!turma || !serie){    
            throw new Error('É necessário preencher todos os dados!')
        }
        const turmas = await prismaClient.turmas.create({
            data: {
                turma: turma,
                serie: serie
            }
        })
        return {turmas}
    }
}

export { postTurmaService }