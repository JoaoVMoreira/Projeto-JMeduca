import { BiEdit } from "react-icons/bi";
import { useState } from "react";
import AtualizaMateria from './EditMateriaModal'
import { IoMdArrowRoundBack } from "react-icons/io";
import base from "../../axios/config";
import { GrAddCircle } from "react-icons/gr"; 
import AddModal from './AddModal'

export default function ModalInfos({ conteudo, close, materias }){

    const [showModal, setShowModal] = useState(false)
    const [detail, setDetail] = useState([])
    const [addModal, setAddModal] = useState(false)

    

    async function handleModal(value){
        setShowModal(!showModal)
        setDetail(value)
    }

    async function deleteAluno(){
            const deleteAluno = await base.delete('/alunos/remove', {
                params: {
                    id: conteudo.id
                }
            })
        alert('Aluno deletado')
    }

    async function handleDelete(item){
        if (item.length > 0){
            {item.map(async (value) => {
                const res = await base.delete('/materias/remove', {
                    params: {
                        id: value.id
                    }
                })
            })}
        }
        deleteAluno()
    }

    async function handleAdd(item){
        setAddModal(!addModal)
        setDetail(item)
    }
    
    return(
        <div>
            {materias.length == 0 ? 
            <div>
                <p>Não há materias cadastradas</p>
                <button>Cadastrar materias</button>
            </div> : 

            <div>
                    <button onClick={close}><IoMdArrowRoundBack /></button>
                    <h1>{conteudo.nome}</h1>

                    <div>
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
                        <button onClick={() => { handleDelete(materias) }}>Apagar aluno</button>
                        <button onClick={()=> {handleAdd(conteudo)}}><GrAddCircle/></button>

                        {showModal && (
                            <AtualizaMateria
                                conteudo={detail}
                                close={handleModal} />
                        )}

                        {addModal && (
                            <AddModal
                            conteudo={detail}
                            close={handleAdd}/>
                        )}

                    </div>
            </div>
            }
            
        </div>
    )
}