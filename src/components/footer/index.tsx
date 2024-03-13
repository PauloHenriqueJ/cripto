import styles from './footer.module.css'
import { Link } from "react-router-dom"
import logo from "../../assets/Minha_logo.png"
import { FaGithub } from "react-icons/fa6";
import { CiLinkedin } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa";

export default function Footer(){
    return(
       <div className={styles.container}>
        <hr />
        
        <section className={styles.content}>
        <Link to="/">
        <img className={styles.logo} src={logo} alt="logo" />
        </Link >
        <span>Todos os direitos reservados &copy;</span>
        
        <Link to="https://github.com/PauloHenriqueJ" target='_blank' ><span><FaGithub size={35}/></span></Link>
        <Link to="https://www.linkedin.com/in/paulo-henrique-developer-68b541260/" target='_blank' ><span><CiLinkedin size={35}/></span></Link>
        <Link to="https://devph.com.br/" target='_blank' ><span><FaRegUser size={30}/></span></Link>

        </section>
        
       </div>
       
    )
}