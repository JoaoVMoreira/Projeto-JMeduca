import {useState} from 'react'
import base from '../../axios/config'

export default function Modal({conteudo, close}){
    const [nome, setNome] = useState('')
    const [idade, setIdade] = useState('')

    async function handleAtualiza(){
        try{

            const res = await base.put("/alunos/update", {
                where:{
                    id: conteudo.id
                },
                id: conteuxdo.id,
                nome: nome,
                idade: parseInt(idade)
            })
            setNome('')
            setIdade('')
        }catch(error){
            alert(error)
        }

        
    }
    return(
        <div>
            <span>{conteudo.nome}{conteudo.idade}</span>    
            <input placeholder="nome" value={nome} onChange={(e)=> setNome(e.target.value)}/>
            <input placeholder="idade" value={idade} onChange={(e) => setIdade(e.target.value)} />
            <button onClick={handleAtualiza}>Atualizar Aluno</button>
        </div>
    )
}