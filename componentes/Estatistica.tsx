import styles from '../styles/Estatistica.module.css'

interface EstatisticaProps {
    valor: any
    texto: string
    corFundo?: string
    corFonte?: string
}

const Estatistica = ({
    valor,
    texto,
    corFundo,
    corFonte
}: EstatisticaProps) => {
    return (
        <div className={styles.estatistica}>
            <div
                className={styles.valor}
                style={{
                    backgroundColor: corFundo ?? '#FDD60F',
                    color: corFonte ?? '#333'
                }}
            >{valor}</div>
            <div className={styles.texto}>{texto}</div>
        </div>
    )
}

export default Estatistica