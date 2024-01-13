import { QuestaoType } from "@/Types"
import styles from '../styles/Resposta.module.css'
import Botao from "./Botao";


interface QuestaoProps {
    questaoCorrente: QuestaoType | undefined
    handleResposta: (e?: React.MouseEvent<HTMLButtonElement>) => void
}

const Questao = ({
    questaoCorrente,
    handleResposta
}: QuestaoProps) => {

    const letras = [
        { valor: 'A', cor: '#f2c866' },
        { valor: 'B', cor: '#f266ba' },
        { valor: 'C', cor: '#85d4f2' },
        { valor: 'D', cor: '#bce596' },
    ]

    return (
        <div className={styles.resposta}>
            {questaoCorrente?.opcoesRespostas.map((questao, i) => {
                return (
                    <div
                        className={styles.conteudoResposta}
                        key={questao.resposta}>
                        <div className={styles.frente}>
                            <div
                                className={styles.letra}
                                style={{ backgroundColor: letras[i].cor }}
                            >
                                {letras[i].valor}
                            </div>
                            <Botao
                                key={questao.resposta}
                                value={`certa-${questao.certa}`}
                                onClickFunction={handleResposta}
                                disabled={questaoCorrente.respondida}
                            >
                                {questaoCorrente.respondida ?
                                    questao.certa ?
                                        <div>Acertou</div>
                                        :
                                        <div>Errou</div>
                                    :
                                    <div className={styles.valor}>{questao.resposta}</div>
                                }
                            </Botao>
                        </div>
                    </div>
                )
            })}
        </div>
    )



}

export default Questao