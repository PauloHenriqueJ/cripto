import { Link } from 'react-router-dom'
import styles from './notfound.module.css'

export default function Notfound(){
    return(
        <div className={styles.container}>
            <h1>Pgina 404 nao existe</h1>
            <Link to="/">
                Acessar cripto moedas
            </Link>
        </div>
    )
}