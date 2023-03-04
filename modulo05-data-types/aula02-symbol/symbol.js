const { deepStrictEqual, throws } = require('assert')

//--- Keys
const uniqueKey = Symbol('userName')
const user = {}

user['userName'] = 'value for normal Object'
user[uniqueKey] = 'value for symbol'

/* console.log(user.userName)
//sempre unico em nivel de endereço de memoria
console.log(user[Symbol('userName')])
console.log(user[uniqueKey]) */

deepStrictEqual(user.userName, 'value for normal Object')
//sempre unico em nivel de endereço de memoria
deepStrictEqual(user[Symbol('userName')], undefined)
deepStrictEqual(user[uniqueKey], 'value for symbol')

// é dificil de pegar, mas nao é secreto!
deepStrictEqual(Object.getOwnPropertySymbols(user)[0], uniqueKey)

//byPass - má prática (nem tem no codebase do node)
user[Symbol.for('password')] = 123
deepStrictEqual(user[Symbol.for('password')], 123)
// --keys

// Wll Known Symbols

const obj = {
    [Symbol.iterator]: () => ({
        items: ['c', 'b', 'a'],
        next() {
            return {
                done: this.items.length === 0,
                //remove o ultimo e retorna
                value: this.items.pop()
            }
        }
    })
}

/* for (const item of obj) {
    console.log(item)
} */

deepStrictEqual([...obj], ['a', 'b', 'c'])

const kItems = Symbol('kItems')
class MyDate {
    constructor(...args) {
        this[kItems] = args.map(arg => new Date(...arg))
    }

    [Symbol.toPrimitive](coercionType) {
        if (coercionType !== 'string') {
            throw new TypeError()
        }

        const itens = this[kItems].map(item => {
            return new Intl.DateTimeFormat('pt-BR', {
                day: '2-digit', 
                month: 'long', 
                year: 'numeric'
            }).format(item)
        })

        return new Intl.ListFormat('pt-BR', { 
            style: 'long', 
            type: 'conjunction'
        }).format(itens) 
    }

    *[Symbol.iterator]() {
        for (const iterator of this[kItems]) {
            yield iterator
        }
    }

    async *[Symbol.asyncIterator]() {
        const timeout = ms => new Promise(r => setTimeout(r, ms))
        for (const iterator of this[kItems]) {
            await timeout(100)
            yield iterator.toISOString()
        }
    }
}

const myDate = new MyDate(
    [2020, 03, 01],
    [2018, 02, 02]
)

const expectedDates = [
    new Date(2020, 03, 01),
    new Date(2018, 02, 02)
]

throws(() => myDate + 1, TypeError)

//coercao explicita para chamar o toPrimitive
deepStrictEqual(String(myDate), '01 de abril de 2020 e 02 de março de 2018')

deepStrictEqual([...myDate], expectedDates)

/* ;(async () => {
    for await (const item of myDate) {
        console.log(item)
    }
})() */

;(async () => {
    const dates = await Promise.all([...myDate])
    deepStrictEqual(dates, expectedDates)
})()