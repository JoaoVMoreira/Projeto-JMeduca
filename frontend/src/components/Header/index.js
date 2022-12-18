import Image from 'next/image'
import logoImg from '../../medias/logo-branco.png'
import styles from './header.module.scss'
import { IoMdArrowRoundBack } from "react-icons/io";
import Router from 'next/router';

export default function Header(){
    function handleBack(){
        Router.push('/')
    }
    const turma = localStorage.getItem('Turma logada')
    return(
        <div className={styles.conteiner}>
            <Image src={logoImg}/>
            <div className={styles.title}>
                <h1> Turma {turma}</h1>
            </div>
            <div className={styles.backButton}>
                <button onClick={handleBack}><IoMdArrowRoundBack/></button>
            </div>
            
        </div>
    )
}