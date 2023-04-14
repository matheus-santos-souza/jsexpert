import {
    expect,
    describe,
    test,
    jest,
    beforeEach
} from '@jest/globals'

import Util from './../../src/util.js'

describe('#Util Strings', () => {
    beforeEach(() => {
        jest.restoreAllMocks()
        jest.clearAllMocks()
    })

    test('#upperCaseFirtsLetter to transform the first letter in upperCase', () => {
        const data = 'hello'
        const expected = 'Hello'
        const result = Util.upperCaseFirstLetter(data)
        expect(result).toStrictEqual(expected)
    })
    test('#lowerCaseFirtsLetter to transform the first letter in lowerCase', () => {
        const data = 'Hello'
        const expected = 'hello'
        const result = Util.lowerCaseFirstLetter(data)
        expect(result).toStrictEqual(expected)
    })
    test('#lowerCaseFirtsLetter given an empty string it should return empty', () => {
        const data = ''
        const expected = ''
        const result = Util.lowerCaseFirstLetter(data)
        expect(result).toStrictEqual(expected)
    })
    test('upperCaseFirtsLetter given an empty string it should return empty', () => {
        const data = ''
        const expected = ''
        const result = Util.upperCaseFirstLetter(data)
        expect(result).toStrictEqual(expected)
    })
})