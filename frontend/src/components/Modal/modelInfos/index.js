import { BiEdit } from "react-icons/bi";
import { useContext, useEffect, useState } from "react";
import AtualizaMateria from '../EditMateriasModal'
import { IoMdArrowRoundBack } from "react-icons/io";
import base from "../../axios/config";
import { GrAddCircle } from "react-icons/gr"; 
import AddModal from '../AddModal/index'
import styles from './index.module.scss'
import Modal from 'react-modal'

export default function ModalInfos({ isOpen, conteudo, close, materias }){

    const [showModal, setShowModal] = useState(false)
    const [detail, setDetail] = useState([])
    const [addModal, setAddModal] = useState(false)

    async function handleModal(value){ //Modal de edição de dados
        setShowModal(!showModal)
        setDetail(value)
    }

    async function deleteAluno(){ //Função de deletar aluno acionada apos a verificacao
            const deleteAluno = await base.delete('/alunos/remove', {
                params: {
                    id: conteudo.id
                }
            })
        conteudo()
        alert('Aluno deletado')
    }

    async function handleDelete(item){ 
        if (item.length > 0){ //Capturando o id do aluno a ser deletado
            {item.map(async (value) => {
                const res = await base.delete('/materias/remove', {
                    params: {
                        id: value.id
                    }
                })
            })}
        }
        deleteAluno() //Acionando a função de deleção do aluno
    }

    async function handleAdd(item){ //Modal de adicionar aluno
        setAddModal(!addModal)
        setDetail(item)
    }

    return(
        <Modal
            isOpen={isOpen} //Informando se o modal ta aberto
            onRequestClose={close} 
            overlayClassName={styles.overlay} //Estilos do overlay
            className={styles.modal} //Estilos do modal 
            >
            <div className={styles.conteinerModal}>
                {materias.length == 0 ? /*Verificando se há materia cadastrada*/
                <div className={styles.semMateria}>
                    <p>Não há materias cadastradas...</p>
                        <button onClick={() => { handleAdd(conteudo) }}>Cadastrar materias</button>
                            {addModal && (
                                <AddModal
                                    conteudo={detail}
                                    close={handleAdd}
                                    isOpen={showModal}/>
                            )}
                </div> : 

                <div> {/*Caso hajam materias cadastradas*/}
                    <div >
                        <div className={styles.header}>
                            <div className={styles.title}>
                                <h1>Aluno: {conteudo.nome}</h1>
                            </div>
                            <div className={styles.closeButton}>
                                <button onClick={close}  ><IoMdArrowRoundBack /></button>
                            </div>
                        </div>
                        <div className={styles.tabela}>
                            {materias.map(value => {
                                const media = (value.n1 + value.n2) / 2
                                let situacao = ''
                                if (media >= 6) {
                                    situacao = 'Aprovado'
                                } else {
                                    situacao = 'Reprovado'
                                }
                                return (
                                    <table key={value.id}>
                                        <tbody>
                                            <tr >
                                                <td>{value.materia}</td>
                                                <td>{value.n1}</td>
                                                <td>{value.n2}</td>
                                                <td>{media}</td>
                                                <td>{situacao}</td>
                                                <td><button onClick={() => { handleModal(value) }}><BiEdit /></button></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                )
                            })}

                            <div className={styles.buttons}>
                                <button className={styles.addbtn} onClick={()=> {handleAdd(conteudo)}}><GrAddCircle/></button>
                                <div className={styles.delete}>
                                    <button  onClick={() => { handleDelete(materias) }}>Apagar aluno</button>
                                </div>
                            </div>

                            {showModal && (
                                <AtualizaMateria
                                    conteudo={detail}
                                    close={handleModal} />
                            )}

                            {addModal && (
                                <AddModal
                                conteudo={detail}
                                close={handleAdd}
                                isOpen={showModal}
                                closeAll={close}/>
                            )}

                        </div>
                    </div>
                </div>
                }
                
            </div>
        </Modal>
    )
}