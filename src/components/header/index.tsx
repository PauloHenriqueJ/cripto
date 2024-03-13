import styles from './header.module.css'
import logo from '../../assets/Minha_logo.png'
import { Link } from 'react-router-dom'

export default function Header(){
    return(
       <header className={styles.container}>
        <div>
            <Link to="/">
            <img className={styles.logo} sizes={'15px'} src={logo} alt="logo" />
            </Link >
        </div>

       </header>
    )
}