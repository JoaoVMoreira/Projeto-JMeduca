import Head from "next/head";
import Link from "next/link";
import {useContext, useEffect, useState } from "react";
import base from "../../components/axios/config";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import InfoModal from '../../components/Modal/modelInfos'
import styles from './alunos.module.scss'
import Header from "../../components/Header";
import ModalEdit from "../../components/Modal/modal";
import {ContextsAPI} from '../../contexts/contexts.js'


export default function Alunos(){
    const [turmaNum, setTurmaNum] = useState('')
    const [alunosValidos, setAlunosValidos] = useState(0)
    const [showEditModal, setShowEditModal] = useState(false)
    const [showInfosModal, setShowInfosModal] = useState(false)
    const [detail, setDetail] = useState()
    const [materias, setMaterias] = useState([])
    const [materiasValidas, setMateriasValidas] = useState([])
    const [loading, setLoading] = useState(true)
    
    const { getAlunos, alunos,  } = useContext(ContextsAPI) //Acionando dados do useContext
    
    
    async function getDados(){ //Função para capturar dados 
        setTurmaNum(localStorage.getItem('Turma logada')) //Vinculando a turma selecionada no localStorage
        getAlunos()
        const numeroAlunosValidos = await localStorage.getItem('Alunos Validos') 
        setAlunosValidos(parseInt(numeroAlunosValidos)) //Contando quantos alunos temos na turma selecionada
        
    }

    function handleAtualiza(item) { //Chamando modal de atualizar dados
        setShowEditModal(!showEditModal)
        setDetail(item)
    }


    async function handleInfos(item) {//Chamando modal de informações
        
        let data = []
        const dados = await base.get('/materias')
        await setMaterias(dados.data.materias)
        {
            materias.map(value => { //Setando materias
                if (value.aluno_id == item.id) {
                    data.push(value)
                }
            })
        }
        await setMateriasValidas(data)
        setShowInfosModal(!showInfosModal)
        setDetail(item)
    }
  
    const totAlunos = []    

    useEffect(()=> {
        getDados() //Atualizando dados
        setLoading(false)
    }, [])

    return(
        <>
            <Head>
                <title>Alunos</title>
            </Head>
            <Header/>
            <div className={styles.conteiner}>
            {loading && (<div className={styles.loading}>Carregando</div>)} {/*Renderização quando o Loanding for True*/}
            {alunosValidos === 0 ?   /*Renderização caso não tenha alunos na turma*/
                <div className={styles.semAluno}>
                    <p>Não constam alunos cadastrados...</p>
                </div>
             : 
                <div>
                    {alunos.map((value) => {
                        if (turmaNum == value.aluno_turma) {
                                totAlunos.push(value.id)
                            return (
                                <div key={value.id}>
                                    <table >
                                        <tbody>
                                            <tr >
                                                <td >
                                                    {value.nome}                                               
                                                </td>
                                                <td>
                                                    {value.idade}
                                                </td>
                                                <td>
                                                    {value.aluno_serie}
                                                </td>
                                                <td>
                                                    <button onClick={() => {handleInfos(value)}}><AiOutlineInfoCircle /></button>
                                                </td>
                                                <td>
                                                    <button onClick={() => { handleAtualiza(value)}}><BiEdit /></button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            )
                        }
                    })}
                    
                
                </div>
            }
                <Link href={"/CadastraAluno"}>Cadastrar Aluno</Link>
                {showEditModal && ( //Modal Edição
                    <ModalEdit
                    conteudo={detail} //Dados enviados ao modal
                    close={handleAtualiza} //Função que fecha o modal
                    isOpen={showEditModal} //Informando se o modal está aberto
                    />
                )}
                {showInfosModal && ( //Modal informações 
                    <InfoModal
                    isOpen={showInfosModal}
                    conteudo={detail}
                    close={handleInfos}
                    materias={materiasValidas} />
                )}
            </div>
            
        </>
    )
}
