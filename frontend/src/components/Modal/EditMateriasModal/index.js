import Router from "next/router";
import { useContext, useState } from "react"
import { IoMdArrowRoundBack } from "react-icons/io";
import { ContextsAPI } from "../../../contexts/contexts";
import base from "../../axios/config"
import styles from './index.module.scss'

export default function AtualizaMateria({isOpen, conteudo, close}){

    const [nota1, setNota1] = useState('')
    const [nota2, setNota2] = useState('')


    async function handleAtualiza(){
        if (nota1 === '' || nota2 === ''){
            alert('Favor informar nota 1 e nota 2!')
            return
        }
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
            Router.push('/Alunos')
        }catch(error){
            console.log(error)
        }
    }
    return(
        <div className={styles.modal}>
            <div className={styles.conteiner}>
                <div className={styles.header}>
                    <button onClick={close}><IoMdArrowRoundBack/></button>
                </div>
                <div className={styles.content}>
                    <p>{conteudo.materia}</p>
                    <input placeholder="NOTA 1" value={nota1} onChange={(e) => { setNota1(e.target.value)}}/>
                    <input placeholder="NOTA 2" value={nota2} onChange={(e) => { setNota2(e.target.value) }} />
                </div>
                <div className={styles.handleButton}>
                    <button onClick={handleAtualiza}>Atulizar Materia</button>
                </div>
            </div>
        </div>
    )
}