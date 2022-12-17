import Head from "next/head"
import Link from "next/link"
import { useState } from "react"
import Image from "next/image"
import base from "../../components/axios/config"
import style from './turma.module.scss'
import logoImg from '../../medias/logo-branco.png'

export default function CadastraTurma(){
    const [turma, setTurma] = useState('')
    const [serie, setSerie] = useState('')

    async function handleCadastraTurma(){
        if(!turma || !serie){
            alert('Favor informar Turma e Serie para seguir com o cadastro.')
        }
        try{
            const res = await base.post('/turmas', {
                turma: parseInt(turma),
                serie: serie
            })
            alert('Turma cadastrada com sucesso!!')
            setTurma('')
            setSerie('')
        }catch(error){
            console.log(error)
        }
        
    }

    return(
        <>
            <Head>
                <title>Cadastro de turmas</title>
            </Head>
            <div className={style.conteiner}>
                <Image src={logoImg} />
                <h1>Cadastre uma turma:</h1>

                <input placeholder="Numero da turma" value={turma} onChange={(e)=> setTurma(e.target.value)}/>
                <input placeholder="Serie" value={serie} onChange={(e) => setSerie(e.target.value)} />

                <button onClick={handleCadastraTurma}>Cadastrar Turma</button>
                <Link href={'/'}>Voltar</Link>
            </div>
        </>
    )
}