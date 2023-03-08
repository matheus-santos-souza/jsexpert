const assert = require('assert')

// Usado na maioria das vezes para listas de itens únicos


const arr1 = ['0', '1', '2']
const arr2 = ['2', '0', '3']
const arr3 = arr1.concat(arr2)

assert.deepStrictEqual(arr3.sort(), [ '0', '0', '1', '2', '2', '3' ])

const set = new Set()
arr1.map(item => set.add(item))
arr2.map(item => set.add(item)) 

assert.deepStrictEqual(Array.from(set), ['0', '1', '2', '3'] )

assert.deepStrictEqual(Array.from(new Set([...arr1, ...arr2])), ['0', '1', '2', '3'] )

/* console.log(set.keys())
console.log(set.values()) */

//No array comum, para saber se um item existe: 
// [].indexOf('1') !== -1 ou [0].includes(0)
assert.ok(set.has('3'))

// Mesma teoria do MAP, mas vc sempre trabalha  com a lista toda
// nao tem get, então vc pode saber se o item está ou nao no array e é isso.
// na documentação tem exemplos sobre como fazer uma interceção, saber o que tem em uma lista e nao tem na outra e assim por diante...

//tem nos dois arrays
const users01 = new Set([
    'erick',
    'matheus',
    'joao'
])

const users02 = new Set([
    'jhony',
    'matheus',
    'maycon'
])

const intersecao = new Set([...users01].filter(user => users02.has(user)))

assert.deepStrictEqual(Array.from(intersecao), ['matheus'])

const diference = new Set([...users01].filter(user => !users02.has(user)))

assert.deepStrictEqual(Array.from(diference), [ 'erick', 'joao' ])

//WeakSet

//mesma ideia do WeakMap
//nao é enumeravel (iteravel)
//só trabalha com chaves como referencia
// só tem metodos simples

const user = { id: 123 }
const user2 = { id: 321 }

const weakSet = new WeakSet([ user ])
weakSet.add(user2)
weakSet.delete(user)
weakSet.has(user)

