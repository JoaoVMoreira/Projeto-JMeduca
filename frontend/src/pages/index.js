import Head from "next/head";
import Link from "next/link";
import Router from "next/router";
import {useContext, useEffect, useState } from "react";
import { GrAddCircle } from "react-icons/gr"; 
import base from '../axios/config'


export default function Home({ turm }) {
  const [turmas, setTurmas] = useState(turm || [])
  const [alunos, setAlunos] = useState([])


  const getDados = async()=>{
    try{
      const dataTurmas = await base.get('/turmas')
      const dataAlunos = await base.get('/alunos')
      setTurmas(dataTurmas.data.turma)
      setAlunos(dataAlunos.data.alunos)
    }catch(error){
      console.log(error)
    }
  }

  useEffect(()=>{
    getDados()
  }, [])

  return (
    <>
      <Head>
        <title>Selecione uma turma</title>
      </Head>
      <div>
        <h1>Selecione uma turma</h1>
      </div>
      <div className="listaTurmas">
        <table>
          <tbody>
            <tr>
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
                Router.push('/alunos')
              }
              return (
                <td key={value.id}>
                  <button onClick={handleSelectTurma}>Turma {value.turma}</button>
                </td>
              )
            })}
            </tr>
          </tbody>
        </table>
        <Link href="/cadastraTurma"><GrAddCircle/></Link>
      </div>

    </>
  )
}
