import styles from '../styles/Questionario.module.css'
import { QuestaoType } from "@/Types"
import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import Enunciado from "@/componentes/Enunciado"
import Respostas from "@/componentes/Respostas"
import Botao from '@/componentes/Botao'
import Temporizador from '@/componentes/Temporizador'


export default function Home() {
  const router = useRouter()

  const [idsQuestoes, setIdsQuestoes] = useState<number[]>([])
  const [indexQuestaoCorrente, setIndexQuestaoCorrente] = useState<number>(0)
  const [questaoCorrente, setQuestaoCorrente] = useState<QuestaoType>()
  const [numeroQuestoesCertas, setNumeroQuestoesCertas] = useState<number>(0)
  const [currentHost, setCurrentHost] = useState<string>('')
  const [currentPort, setCurrentPort] = useState<string>('')


  console.log(currentHost, currentPort)

  const embaralhar = (elementos: any[]): any[] => {
    return elementos
      .map(elemento => {
        return { elemento, aleatorio: Math.random() }
      })
      .sort((a, b) => a.aleatorio - b.aleatorio)
      .map(valor => valor.elemento)
  }

  const handleProximaQuestao = () => {
    if (idsQuestoes[indexQuestaoCorrente] || indexQuestaoCorrente < idsQuestoes.length) {
      setIndexQuestaoCorrente(indexQuestaoCorrente + 1)
    }
    if (indexQuestaoCorrente === idsQuestoes.length - 1) {
      router.push({
        pathname: `http://${currentHost}:${currentPort}/resultados`,
        query: { certas: numeroQuestoesCertas, total: idsQuestoes.length }
      })
    }
  }

  const handleResposta = (e?: React.MouseEvent<HTMLButtonElement>) => {
    const questaoCorrenteLocal = questaoCorrente && { ...questaoCorrente, respondida: true }
    setQuestaoCorrente(questaoCorrenteLocal)
    if (e && e.currentTarget.value === 'certa-true') {
      setNumeroQuestoesCertas(numeroQuestoesCertas + 1)
    }
  }

  useEffect(() => {
    setCurrentHost(window.location.hostname)
    setCurrentPort(window.location.port)
  }, [])


  useEffect(() => {
    if (currentHost !== '' && currentPort !== '') {
      fetch(`http://${currentHost}:${currentPort}/api/questionario`)
        .then(resp => resp.json())
        .then(data => {
          setIdsQuestoes(embaralhar(data))
        })
    }
  }, [currentHost, currentPort])

  useEffect(() => {
    if (idsQuestoes.length > 0 && indexQuestaoCorrente < idsQuestoes.length) {
      fetch(`http://${currentHost}:${currentPort}/api/questoes/${idsQuestoes[indexQuestaoCorrente]}`)
        .then(resp => resp.json())
        .then(data => {
          const opcoesRespostasEmbaralhadas = embaralhar(data.opcoesRespostas)
          setQuestaoCorrente(
            {
              ...data,
              respondida: false,
              opcoesRespostas: opcoesRespostasEmbaralhadas,
            })
        })
    }
  }, [idsQuestoes, indexQuestaoCorrente])


  const runningTemporizador = !questaoCorrente?.respondida

  return (
    <div className={styles.questionario}>
      {questaoCorrente &&
        <div className={styles.questao}>
          <Enunciado questao={questaoCorrente?.questao} />
          <Temporizador
            key={questaoCorrente?.id}
            duration={10}
            handleTemporizador={handleResposta}
            runningTemporizador={runningTemporizador}
          />

          <Respostas
            questaoCorrente={questaoCorrente}
            handleResposta={handleResposta}
          />
          <Botao
            onClickFunction={handleProximaQuestao}
          >
            {indexQuestaoCorrente < idsQuestoes.length - 1 ?
              'Próxima Questão' : 'Finalizar'}
          </Botao>
        </div>
      }
      <div>Questoes Certas {numeroQuestoesCertas}</div>
    </div>

  )
}
