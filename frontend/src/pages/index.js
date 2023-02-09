import Head from "next/head";
import Link from "next/link";
import Router from "next/router";
import { useEffect, useState } from "react";
import { GrAddCircle } from "react-icons/gr"; 
import base from '../components/axios/config'
import style from '../styles/home.module.scss'
import Image from "next/image";
import logoImg from '../medias/logo-branco.png'

//Pagina inicial 
export default function Home({ turm }) {
  const [turmas, setTurmas] = useState(turm || [])
  const [alunos, setAlunos] = useState([])
  const [loading, setLoading] = useState(true)

  const getDados = async()=>{
    try{
      const dataTurmas = await base.get('/turmas') //Capturando dados da turma 
      const dataAlunos = await base.get('/alunos') //Capturando dados dos alunos 
      setTurmas(dataTurmas.data.turma) //Setando os dados da turma na useState
      setAlunos(dataAlunos.data.alunos) //Setando os dados dos alunos na useState
      
    }catch(error){ //Tratando erro
      console.log(error)
    }
    setLoading(false) //Setando a tela de Loading como false quando o componente termina de carregar 
  }

  useEffect(()=>{
    getDados()  //UseEffect para salvar os dados 
  }, [])

  return (
    <>
      <Head> {/*Definindo titulo*/}
        <title>Selecione uma turma</title>
      </Head>
      <div className={style.conteiner}>
        <Image src={logoImg}/>
        
        <h1 >Selecione uma turma:</h1>
      
        <div >
              {turmas.map((value) => {  //Listando todas as turmas cadastradas
                async function handleSelectTurma() {
                  const setLocalTurma = localStorage.setItem('Turma logada', JSON.stringify(value.turma))
                  const localTurma = localStorage.getItem('Turma logada')
                  let cont = 0
                  {alunos.map(item => {  //Verificando os alunos pertencentes a turma selecionada
                    if(parseInt(localTurma) === item.aluno_turma){
                      cont += 1
                    }
                  })}
                  const alunosValidos = localStorage.setItem('Alunos Validos', JSON.stringify(cont)) /*Salvando os alunos vinculados a turma selecionada em localStorage  */
                  Router.push('/Alunos')
                }
                return (
                  <div className="buttonTurma" key={value.id}>
                    <button  onClick={handleSelectTurma}>Turma {value.turma}</button> {/*Botão para selecionar turmas*/}
                  </div>
                )
              })}
          {loading && (<div className={style.loading}>Carregando...</div>)} {/*Renderização caso o componente Loading seja true*/}
          <Link className={style.listaTurmas} href="/CadastraTurma"><GrAddCircle/></Link>
        </div>
      </div>      
    </>
  )
}
