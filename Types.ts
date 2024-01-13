interface OpcaoRespostaType {
    resposta: string
    certa: boolean
}

export interface QuestaoType {
    id: number
    questao: string
    opcoesRespostas: OpcaoRespostaType[]
    respondida?: boolean
}

