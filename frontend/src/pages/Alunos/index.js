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
    
    const { getAlunos, alunos,  } = useContext(ContextsAPI)
    
    
    async function getDados(){
        setTurmaNum(localStorage.getItem('Turma logada'))
        getAlunos()
        const numeroAlunosValidos = await localStorage.getItem('Alunos Validos')
        setAlunosValidos(parseInt(numeroAlunosValidos))
        
    }

    function handleAtualiza(item) {
        setShowEditModal(!showEditModal)
        setDetail(item)
    }


    async function handleInfos(item){
        
        let data = []
        const dados = await base.get('/materias')
        await setMaterias(dados.data.materias)
        {
            materias.map(value => {
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
        getDados()
        setLoading(false)
    }, [])

    return(
        <>
            <Head>
                <title>Alunos</title>
            </Head>
            <Header/>
            <div className={styles.conteiner}>
            {loading && (<div className={styles.loading}>Carregando</div>)}
            {alunosValidos === 0 ? 
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
                {showEditModal && (
                    <ModalEdit
                    conteudo={detail}
                    close={handleAtualiza}
                    isOpen={showEditModal}/>
                )}
                {showInfosModal && (
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
