import styles from '../styles/Enunciado.module.css'

interface EnunciadoProps {
    questao: string
}

const Enunciado = ({ questao }: EnunciadoProps) => {

    return (
        <div className={styles.enunciado}>
            <span className={styles.texto}>{questao}</span>
        </div>
    )
}

export default Enunciado