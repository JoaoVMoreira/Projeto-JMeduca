import { useState } from "react"
import { IoMdArrowRoundBack } from "react-icons/io";
import base from "../../axios/config"

export default function AtualizaMateria({conteudo, close}){

    const [nota1, setNota1] = useState('')
    const [nota2, setNota2] = useState('')

    async function handleAtualiza(){
        try{
            const res = await base.put('/materias/update', {
                where: {
                    id: conteudo.id
                },
                id: conteudo.id,
                materia: conteudo.materia,
                n1: parseInt(nota1),
                n2: parseInt(nota2)
            })
            alert('Atualizado com sucesso')
            close()
        }catch(error){
            console.log(error)
        }
    }
    return(
        <div>
            <button onClick={close}><IoMdArrowRoundBack/></button>
            <p>{conteudo.materia}</p>
            <input placeholder="NOTA 1" value={nota1} onChange={(e) => { setNota1(e.target.value)}}/>
            <input placeholder="NOTA 2" value={nota2} onChange={(e) => { setNota2(e.target.value) }} />
            <button onClick={handleAtualiza}>Atulizar Materia</button>
        </div>
    )
}