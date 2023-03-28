import Character from "../../entities/character.js"
const URL = 'https://gist.githubusercontent.com/ErickWendel/927970b8fa7117182413be100417607d/raw/d78adae11f5bdbff086827bf45f1bc649c339766/rick-and-morty-characters.json'

export default class RickAndMortyBRL {
    static async getCharactersFromJSON() {
        const response = await fetch(URL).then(response => response.json())
        const { results = [] } = response
        return results.map(data => new Character(data))
    }
}