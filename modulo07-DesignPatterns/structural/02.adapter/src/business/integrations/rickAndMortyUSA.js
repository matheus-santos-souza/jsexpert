import Character from "../../entities/character.js"
import { parseStringPromise } from 'xml2js'
const URL = 'https://gist.githubusercontent.com/ErickWendel/927970b8fa7117182413be100417607d/raw/d78adae11f5bdbff086827bf45f1bc649c339766/rick-and-morty-characters.xml'

export default class RickAndMortyUSA {
    static async getCharactersFromXML() {
        const response = await fetch(URL).then(response => response.text())
        const options = {
            explicitRoot: false,
            explicitArray: false
        }
        const { results: { element: results = [] } } = await parseStringPromise(response, options)
        const defaultFormat = Array.isArray(results) ? results : [results] 
        return defaultFormat.map(data => new Character(data))
        
    }
}