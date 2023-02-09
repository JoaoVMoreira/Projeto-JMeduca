import { useContext, useEffect, useState } from "react"
import { ContextsAPI } from '../../contexts/contexts'
import base from "../../components/axios/config"
import styles from './cadastro.module.scss'
import Head from "next/head"
import Header from '../../components/Header'
import Router from "next/router"

export default function CadastraAluno(){
    const [nome, setNome] = useState('')
    const [idade, setIdade] = useState('')
    const [turma, setTurma] = useState('')
    const [serie, setSerie] = useState('')
    
    const { getTurmas, turmas, getAlunos } = useContext(ContextsAPI) //Captirando dados do useContext
    const serieSelecionada = []
    async function AddAluno(turmas){

        if(nome === '' || idade === '' || turma === ''){ //Verificando se todos os dados foram preenchidos
            alert('Favor preencher todos os campos ')
            return
        }
        turmas.map(value=> { //Verificando qual a serie vinculada a turma selecionada
            if (turma == value.turma){
                serieSelecionada.push(value.serie)
                
            }
        })
        await base.post('alunos', { //Função para atualizar dados
                nome: nome,
                idade: parseInt(idade),
                aluno_turma: parseInt(turma),
            aluno_serie: serieSelecionada[0]
        })
        alert('Aluno cadastrado com sucesso!')
        getAlunos() //Rodando função para solicitar dados dos alunos e atualizar na pagina Alunos
        Router.push('/Alunos') //Direcionando para a pagina alunos em caso de sucesso
    }   
    

    useEffect(()=>{
        getTurmas() //Coletando dados da pagina Turmas
    }, [])
    return(
        <>
            <Head>
                <title>Cadastro de alunos</title>
            </Head>
            <Header/>
            <div className={styles.conteiner}>
                
                <h1>Cadastro de alunos:</h1>
                <input placeholder="Nome" value={nome} onChange={(e)=> setNome(e.target.value)}/>
                <input placeholder="Idade" value={idade} onChange={(e) => setIdade(e.target.value)} />
                <select value={[turma]} onChange={(e) => { setTurma(e.target.value)}}>
                    <option >Turma // Serie</option>
                    {turmas.map( item => {
                        
                        return(
                            // eslint-disable-next-line react/jsx-no-comment-textnodes
                            <option key={item.id} value={item.turma}>{item.turma} // {item.serie}</option>
                        )
                    })}
                    
                </select>
                <button onClick={()=>{AddAluno(turmas)}}>Cadastrar aluno</button>
            </div>
        </>
    )
}