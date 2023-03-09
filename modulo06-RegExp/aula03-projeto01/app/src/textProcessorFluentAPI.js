'use strict'
const { evalueteRegex } = require('./../src/util')
// O objetivo do FLUENT API é executar tarefas como um pipeline
// step by step e no fim, chama o build. Muito similar ao padrao BUILDER
// a diferneça aqui é sobre processos, o Builder sobre construção de objetos
class TextProcessorFluentAPI {
    //Propriedade privada
    #content
    constructor(content) {
        this.#content = content
    }

    extractPeopleData() {
        //Explicando regex
        // ?<= fala que vai extrair os dados que virao depois desse grupo
        // [contratante|contatada] ou um ou outro , (e tem a flag no fim da expressao pra pegar maiusculo e minusculo)
        // :\s{1} vai procurar o carater literal do dois pontos seguindo de um espaço
        // tudo acima fica dentro de um parenteses para falar "vamos pegar daí para frente"

        // (?!\s) negative look around, vai ignorar os contratantes do fim do documento. (que tem só espaço na frente deles)
        // .*\n pega qualquer coisa até a primeira quebra de linha \n
        // .*? non greety, esse ? faz com que ele pare na primeira ocorrencia, evitando ele ficar em loop
        // $ informar que acaba a pesquisa no final da linha

        // g -> global
        // m -> multiline
        // i -> insensitive

        const mathPerson = evalueteRegex(/(?<=[contratante|contratada]:\s{1})(?!\s)(.*\n.*?)$/gmi)
        const onlyPerson = this.#content.match(mathPerson)
        this.#content = onlyPerson
        return this
    }

    divideTextInColumns() {
        const splitRegex = evalueteRegex(/,/)
        this.#content = this.#content.map(line => line.split(splitRegex))
        return this
    }

    removeEmptyCharacteres() {
        const trimSpaces = evalueteRegex(/^\s+|\s+$|\n/g)
        this.#content = this.#content.map(line => line.map(item => item.replace(trimSpaces, "")))
        return this
    }

    build() {
        return this.#content
    }
}

module.exports = TextProcessorFluentAPI