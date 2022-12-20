import Head from "next/head";
import Link from "next/link";
import Router from "next/router";
import { useEffect, useState } from "react";
import { GrAddCircle } from "react-icons/gr"; 
import base from '../components/axios/config'
import style from '../styles/home.module.scss'
import Image from "next/image";
import logoImg from '../medias/logo-branco.png'


export default function Home({ turm }) {
  const [turmas, setTurmas] = useState(turm || [])
  const [alunos, setAlunos] = useState([])
  const [loading, setLoading] = useState(true)


  const getDados = async()=>{
    try{
      const dataTurmas = await base.get('/turmas')
      const dataAlunos = await base.get('/alunos')
      setTurmas(dataTurmas.data.turma)
      setAlunos(dataAlunos.data.alunos)
      
    }catch(error){
      console.log(error)
    }
    setLoading(false)
  }

  useEffect(()=>{
    getDados()
  }, [])

  return (
    <>
      <Head>
        <title>Selecione uma turma</title>
      </Head>
      <div className={style.conteiner}>
        <Image src={logoImg}/>
        
        <h1 >Selecione uma turma:</h1>
      
        <div >
              {turmas.map((value) => {
                async function handleSelectTurma() {
                  const setLocalTurma = localStorage.setItem('Turma logada', JSON.stringify(value.turma))
                  const localTurma = localStorage.getItem('Turma logada')
                  let cont = 0
                  {alunos.map(item => {
                    if(parseInt(localTurma) === item.aluno_turma){
                      cont += 1
                    }
                  })}
                  const alunosValidos = localStorage.setItem('Alunos Validos', JSON.stringify(cont))
                  Router.push('/Alunos')
                }
                return (
                  <div className="buttonTurma" key={value.id}>
                    <button  onClick={handleSelectTurma}>Turma {value.turma}</button>
                  </div>
                )
              })}
          {loading && (<div className={style.loading}>Carregando...</div>)}
          <Link className={style.listaTurmas} href="/CadastraTurma"><GrAddCircle/></Link>
        </div>
      </div>      
    </>
  )
}
