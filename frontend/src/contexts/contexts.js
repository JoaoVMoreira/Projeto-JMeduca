import { createContext, useState } from "react";
import base from "../components/axios/config";


export const ContextsAPI = createContext({})

export const ContextProvider = ({ children }) => {
    const [alunos, setAlunos] = useState([])
    const [materias, setMaterias] = useState([])
    const [alunosValidos, setAlunosValidos] = useState([])
    const [materiasValidas, setMateriasValidas] = useState([])
    const [turmas, setTurmas] = useState([])
    

    async function getAlunos(){
        const alunos = await base.get('/alunos')
        setAlunos(alunos.data.alunos)
    }

    async function getMaterias(){
        const materias = await base.get('/materias')
        setMaterias(materias.data.materias)
    }

    async function ValidaAlunos(){
        const alunosValidos = []
        const turmaAtual = await localStorage.getItem('Turma logada')
        {alunos.map(item => {
            if (item.aluno_turma == turmaAtual){
                alunosValidos.push(item)
            }
        })}
        setAlunosValidos(alunosValidos)
    }

    async function ValidaMaterias(alunoId, materiasTot){
        const ValidaMateria = []
        {
            materiasTot.map(value => {
                if (value.aluno_id == alunoId) {
                    ValidaMateria.push(value)
                }
            })}
        setMateriasValidas(materiasValidas)
    }

    async function getTurmas(){
        const turmass = await base.get('/turmas')
        setTurmas(turmass.data.turma)
    }

    


    return (
        <ContextsAPI.Provider value={{ 
            getAlunos, alunos, 
            getMaterias, materias, 
            ValidaAlunos, alunosValidos, 
            ValidaMaterias, materiasValidas, setMateriasValidas,
            getTurmas, turmas }}>{children}</ContextsAPI.Provider>
    )
}

