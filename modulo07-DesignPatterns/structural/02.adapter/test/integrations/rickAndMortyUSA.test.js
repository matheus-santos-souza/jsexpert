import { describe, expect, test, jest, beforeEach } from '@jest/globals'
import fs from 'fs/promises'
import { resolve } from 'path'
import RickAndMortyUSA from '../../src/business/integrations/rickAndMortyUSA.js'
import Character from '../../src/entities/character.js'

describe('#RickAndMortyBRL', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })
    test('#getCharactersJSON should return a list of Charater Entity', async () => {
        const response = await fs.readFile(resolve('./test/mocks/characters.xml'))
        const expected = [{"gender": "Male", "id": 10, "location": "Worldender's lair", "name": "Alan Rails", "origin": "unknown", "species": "Human", "status": "Dead", "type": "Superhuman (Ghost trains summoner)"}]
        global.fetch = jest.fn().mockResolvedValue({ text() { return response } });
        const result = await RickAndMortyUSA.getCharactersFromXML()
        expect(result).toMatchObject(expected)
    })
    test('#getCharactersJSON should return an empty list if the API returns nothing', async () => {
        const response = await fs.readFile(resolve('./test/mocks/characters-empty.xml'))
        const expected = []
        global.fetch = jest.fn().mockResolvedValue({ text() { return response } });
        const result = await RickAndMortyUSA.getCharactersFromXML()
        expect(result).toMatchObject(expected)
    })
})