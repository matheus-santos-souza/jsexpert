const { evalueteRegex } = require('./util')

class Person {
    constructor([
        nome,
        nacionalidade,
        estadoCivil,
        documento,
        rua,
        numero,
        bairro,
        estado,
    ]) {
        // ^ -> começo da string
        // + -> uma ou mais ocorrencias
        // (\w{1}) -> pega só a primeira letra e deixa em um grupo
        // ([a-zA-Z]) -> encontra letras maiusculas ou minusculas adicionamos o + para pegas todas até o caracter especial
        // g -> todas as ocorrencias que encontrar
        const firstLetterExp = evalueteRegex(/^(\w{1})([a-zA-Z]+$)/gm)
        const formatFirstLetter = (prop) => {
            return prop.replace(firstLetterExp, (fullMatch, group1, group2, index) => {
                return `${group1.toUpperCase()}${group2.toLowerCase()}`
            })
        }

        this.nome = nome
        this.nacionalidade = formatFirstLetter(nacionalidade)
        this.estadoCivil = formatFirstLetter(estadoCivil)
        this.documento = documento.replace(evalueteRegex(/\D/g), "")
        // (?<= faz com que ignore tudo que tiver antes desse match)
        // conhecido como positive lookBehind
        this.rua = rua.match(evalueteRegex(/(?<=\sa\s).*$/), "").join()
        this.numero = numero
        // começa buscar depois do espaço, pega qualquer letra ou digito até o fimda linha (poderia ser o .* tbm)
        this.bairro = bairro.match(evalueteRegex(/(?<=\s).*$/)).join()
        this.estado = estado.replace(evalueteRegex(/\./), "")
    }
}

module.exports = Person