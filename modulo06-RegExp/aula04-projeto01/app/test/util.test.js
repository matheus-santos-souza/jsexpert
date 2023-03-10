const { describe, it } = require('mocha')
const { expect } = require('chai')
const { InvalidRegexError, evalueteRegex } = require('./../src/util')

describe('Util', () => {
    it('#evalueateRegex should throw an error using an unsafe regex', () => {
        const unsafeRegex = /^([a-z|A-Z|0-9]+\s?)+$/gmi
        
        expect(() => evalueteRegex(unsafeRegex)).to.throw(InvalidRegexError, `This ${unsafeRegex} is unsafe dude!`)
    })

    it('#evalueateRegex should not throw an error using an safe regex', () => {
        const safeRegex = /^([a-z])$/

        expect(() => evalueteRegex(safeRegex)).to.not.throws()
        expect(evalueteRegex(safeRegex)).to.be.ok
    })
})