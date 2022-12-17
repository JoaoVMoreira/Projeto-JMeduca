import { useContext, useEffect, useState } from "react"
import { ContextsAPI } from '../../contexts/contexts'
import base from "../../components/axios/config"

export default function CadastraAluno(){
    const [nome, setNome] = useState('')
    const [idade, setIdade] = useState('')
    const [turma, setTurma] = useState('')
    const [serie, setSerie] = useState('')
    
    const { getTurmas, turmas } = useContext(ContextsAPI)
    const teste = []
    async function AddAluno(turmas){
        turmas.map(value=> {
            if (turma == value.turma){
                teste.push(value.serie)
                
            }
        })
        await base.post('alunos', {
                nome: nome,
                idade: parseInt(idade),
                aluno_turma: parseInt(turma),
                aluno_serie: teste[0]
        })
        alert('Aluno cadastrado com sucesso!')
    }   
    

    useEffect(()=>{
        getTurmas()
    }, [])
    return(
        <div>
            <h1>Cadastro de alunos</h1>
            <input placeholder="Nome" value={nome} onChange={(e)=> setNome(e.target.value)}/>
            <input placeholder="Idade" value={idade} onChange={(e) => setIdade(e.target.value)} />
            <select value={[turma]} onChange={(e) => { setTurma(e.target.value)}}>
                <option >Turma // Serie</option>
                {turmas.map( item => {
                    
                    return(
                        // eslint-disable-next-line react/jsx-no-comment-textnodes
                        <option key={item.id} value={item.turma}>{item.turma} // {item.serie}</option>
                    )
                })}
                
            </select>
            <button onClick={()=>{AddAluno(turmas)}}>Cadastrar aluno</button>
        </div>
    )
}