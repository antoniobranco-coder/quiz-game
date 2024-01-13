import Estatistica from "@/componentes/Estatistica"
import { useRouter } from "next/router"

const Resultados = () => {
    const router = useRouter()

    const total = Number(router.query.total)
    const certas = Number(router.query.certas)
    const percentual = Math.round((certas / total) * 100)

    return (
        <>
            <Estatistica valor={total} texto='Perguntas' />
            <Estatistica valor={certas} texto='Respostas Certas' corFundo='#9cd2a4' />
            <Estatistica valor={`${percentual}%`} texto='Percentagem' corFundo='#de6a33' />
        </>
    )

}

export default Resultados