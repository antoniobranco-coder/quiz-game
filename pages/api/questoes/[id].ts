import questoes from "../bancoDeQuestoes"

export default function handler(req, res) {
    const idSelecionado = +req.query.id
    const unicaQuestaoOuNada = questoes.filter(questao => questao.id === idSelecionado)
    if (unicaQuestaoOuNada.length === 1) {
        res.status(200).json({ ...unicaQuestaoOuNada[0] })
    } else {
        res.status(204).send()
    }
}
