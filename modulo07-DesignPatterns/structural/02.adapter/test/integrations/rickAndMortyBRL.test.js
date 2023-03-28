import { describe, expect, test, jest, beforeEach } from '@jest/globals'
import fs from 'fs/promises'
import { resolve } from 'path'
import RickAndMortyBRL from '../../src/business/integrations/rickAndMortyBRL.js'
import Character from '../../src/entities/character.js'

describe('#RickAndMortyBRL', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })
    test('#getCharactersJSON should return a list of Charater Entity', async () => {
        const response = JSON.parse(await fs.readFile(resolve('./test/mocks/characters.json')))
        const expected = response.results.map(char => new Character(char))
        global.fetch = jest.fn().mockResolvedValue({ json() { return response } });
        const result = await RickAndMortyBRL.getCharactersFromJSON()
        expect(result).toStrictEqual(expected)
    })
    test('#getCharactersJSON should return an empty list if the API returns nothing', async () => {
        const response = JSON.parse(await fs.readFile(resolve('./test/mocks/characters-empty.json')))
        const expected = response.results
        global.fetch = jest.fn().mockResolvedValue({ json() { return response } });
        const result = await RickAndMortyBRL.getCharactersFromJSON()
        expect(result).toStrictEqual(expected)
    })
})