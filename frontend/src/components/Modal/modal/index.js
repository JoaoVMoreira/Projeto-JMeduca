import {useState} from 'react'
import base from '../../axios/config'
import Modal from 'react-modal'
import styles from './index.module.scss'

export default function ModalEdit({isOpen, conteudo, close}){
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
        <Modal
        isOpen={isOpen}
        onRequestClose={close}
        overlayClassName={styles.overlay}
        className={styles.modal}
        >
            <div className={styles.conteiner}>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <span>{conteudo.nome}</span>  
                            </td>
                            <td>
                                <span>{conteudo.idade}</span> 
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input placeholder="Insira o nome" value={nome} onChange={(e) => setNome(e.target.value)} />
                            </td>
                            <td>
                                <input placeholder="Insira a idade" value={idade} onChange={(e) => setIdade(e.target.value)} />
                            </td>
                        </tr>
                    </tbody>
                </table>
 

                <div className={styles.handleButton}>
                    <button onClick={handleAtualiza}>Atualizar Aluno</button>
                </div>
            </div>
        </Modal>
    )
}