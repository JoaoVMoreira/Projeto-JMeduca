import Head from "next/head";
import Link from "next/link";
import {useEffect, useState } from "react";
import base from "../../components/axios/config";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import Modal from '../../components/Modal/modal'
import InfoModal from '../../components/Modal/modalInfos'
import styles from './alunos.module.scss'
import Header from "../../components/Header";


export default function Alunos(){
    const [alunos, setAlunos] = useState([])
    const [turmaNum, setTurmaNum] = useState('')
    const [alunosValidos, setAlunosValidos] = useState(0)
    const [showEditModal, setShowEditModal] = useState(false)
    const [showInfosModal, setShowInfosModal] = useState(false)
    const [detail, setDetail] = useState()
    const [materias, setMaterias] = useState([])
    const [materiasValidas, setMateriasValidas] = useState([])
    
    
    async function getDados(){
        setTurmaNum(localStorage.getItem('Turma logada'))
        const data = await base.get('/alunos')
        setAlunos(data.data.alunos)
        const sla = await localStorage.getItem('Alunos Validos')
        setAlunosValidos(parseInt(sla))
    }

    function handleAtualiza(item) {
        setShowEditModal(!showEditModal)
        setDetail(item)
    }

    async function handleInfos(item){
        
        let data = []
        const dados = await base.get('/materias')
        setMaterias(dados.data.materias)
        {
            materias.map(value => {
                if (value.aluno_id == item.id) {
                    data.push(value)
                }
            })
        }
        setMateriasValidas(data)
        setShowInfosModal(!showInfosModal)
        setDetail(item)
    }
  
    const totAlunos = []    

    useEffect(()=> {
        getDados()
    }, [])

    return(
        <>
            <Head>
                <title>Alunos</title>
            </Head>
            <Header/>
            <div className={styles.conteiner}>
            {alunosValidos === 0 ? 
                <div className={styles.semAluno}>
                    <p>Não constam alunos cadastrados</p>
                    <Link href={'/CadastraAluno'}>Cadastrar Aluno</Link>
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
                    <Modal
                    conteudo={detail}
                    close={handleAtualiza}/>
                )}
                {showInfosModal && (
                    <InfoModal
                    conteudo={detail}
                    close={handleInfos}
                    materias={materiasValidas} />
                )}
            </div>
            
        </>
    )
}
