import { useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import base from "../../axios/config";
import styles from './index.module.scss'


export default function AddModal({conteudo, close}){
    const [materia, setMateria] = useState('')
    const [n1, setn1] = useState('')
    const [n2, setn2] = useState('')

    async function CadastraMateria(){
        const res = base.post('/materias', {
                materia: materia,
                aluno_id: conteudo.id,
                n1: parseFloat(n1),
                n2: parseFloat(n2)
        })
        alert('Materia cadastrada com sucesso!')
        close()
    }

    return(
        <div className={styles.modal}>
            <div className={styles.conteiner}>
                <div className={styles.header}>
                    <div className={styles.titleHeader}>
                        <h1>{conteudo.nome}</h1>
                    </div>
                    <button onClick={close}><IoMdArrowRoundBack/></button>
                </div>
                <div className={styles.content}>
                    <input placeholder="Materia" value={materia} onChange={(e)=> setMateria(e.target.value)}/>
                    <input placeholder="Nota 1" value={n1} onChange={(e) => setn1(e.target.value)} />
                    <input placeholder="Nota 2" value={n2} onChange={(e) => setn2(e.target.value)} />
                </div>
                <div className={styles.handleButton}>
                    <button onClick={CadastraMateria}>Cadastrar Materia</button>
                </div>
            </div>
        </div>
    )
}