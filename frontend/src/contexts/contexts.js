import { createContext, useState } from "react";
import base from "../components/axios/config";


export const ContextsAPI = createContext({}) //Criando context

export const ContextProvider = ({ children }) => { //Acionando context
    const [alunos, setAlunos] = useState([])
    const [materias, setMaterias] = useState([])
    const [alunosValidos, setAlunosValidos] = useState([])
    const [materiasValidas, setMateriasValidas] = useState([])
    const [turmas, setTurmas] = useState([])
    

    async function getAlunos(){ //Capturando dados dos alunos
        const alunos = await base.get('/alunos')
        setAlunos(alunos.data.alunos)
    }

    async function getMaterias(){ //Capturando dados das materias
        const materias = await base.get('/materias')
        setMaterias(materias.data.materias)
    }

    async function ValidaAlunos(){ //Validando os alunos
        const alunosValidos = []
        const turmaAtual = await localStorage.getItem('Turma logada')
        {alunos.map(item => {
            if (item.aluno_turma == turmaAtual){
                alunosValidos.push(item)
            }
        })}
        setAlunosValidos(alunosValidos)
    }

    async function ValidaMaterias(alunoId, materiasTot){ //Validando as materias
        const ValidaMateria = []
        {
            materiasTot.map(value => {
                if (value.aluno_id == alunoId) {
                    ValidaMateria.push(value)
                }
            })}
        setMateriasValidas(materiasValidas)
    }

    async function getTurmas(){ //Capturando dados das turmas
        const turmass = await base.get('/turmas')
        setTurmas(turmass.data.turma)
    }

    


    return (
        <ContextsAPI.Provider value={{ 
            getAlunos, alunos, 
            getMaterias, materias, 
            ValidaAlunos, alunosValidos, 
            ValidaMaterias, materiasValidas, setMateriasValidas,
            getTurmas, turmas }}>{children}</ContextsAPI.Provider> //Informando funções e dados para ficarem salvos no useContext
    )
}

