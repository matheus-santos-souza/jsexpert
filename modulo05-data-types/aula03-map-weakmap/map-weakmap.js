const assert = require('assert')

const myMap = new Map()

//podem ter qualquer coisa na chave
myMap
    .set(1, 'one')
    .set('Matheus', { name: 'Matheus Santos'})
    .set(true, () => 'function map')


//usando o construtor
const myMapWithContructor = new Map([
    ['1', 'str1'],
    [1, 'num1'],
    [true, 'boolean']
])

assert.deepStrictEqual(myMap.get(1), 'one')
assert.deepStrictEqual(myMap.get('Matheus'), { name: 'Matheus Santos' })
assert.deepStrictEqual(myMap.get(true)(), 'function map')

const onlyReferencesWorks = { id: 1 }
myMap.set(onlyReferencesWorks, { name: 'Matheus Santos de Souza' })

assert.deepStrictEqual(myMap.get({ id: 1 }), undefined)
assert.deepStrictEqual(myMap.get(onlyReferencesWorks), { name: 'Matheus Santos de Souza' })

//utilitarios
// - No Object seria Object.keys({a: 1}).length
assert.deepStrictEqual(myMap.size, 4)

//Para verificar se um item existe no Objeto
// = item .key = se não existe = undefined
// if () = coerção implicita para boolean e retorna false
//O jeito certo em Object
assert.ok(myMap.has(1), true)

//remver item do Object
// delete item.id //imperfomático para o js
assert.ok(myMap.delete(1), true)

// Nao da pra iterar em Objects diretamente
assert.deepStrictEqual(JSON.stringify([...myMap]), JSON.stringify([["Matheus",{"name":"Matheus Santos"}],[true, () => {}],[{"id":1},{"name":"Matheus Santos de Souza"}]]))

/* for (const [key, value] of myMap) {
    console.log({ key, value })
} */

//Object é inseguro, pois dependendo do nome da chave, pode substituir algum comportamento padrão
// ({ }).toString() === '[object Object]'
// ({ toString: () => 'hey' }).toString() === 'hey'

//Qualquer chave pode colidir, com as propriedades herdadas do objeto, como
// constructor, toString, valueOf etc...

const actor = {
    name: 'Xuxa da Silva',
    toString: 'Queen: Xuxa da Silva'
}

// nao tem restriçao de nome de chave
myMap.set(actor)

assert.ok(myMap.has(actor))
assert.throws(() => myMap.get(actor).toString, TypeError)

//Nao da pra assinar um Object sem reassina-lo
myMap.clear()
assert.deepStrictEqual([...myMap.keys()], [])

// ------ weakMap

//Pode ser coletado após perder as referencias
//usados em casos beeem especificos

//tem a maioria dos beneficios do Map
//MAS nao é iteravel
// só chaves de referencia e que vc já conheça
// mais leve e preve leak da memoria, pq depois que as instancias saem da memoria, tudo é limpo

const weakMap = new WeakMap()
const hero = { name: 'Flash' }

/* weakMap.set(hero)
weakMap.get(hero)
weakMap.has(hero)
weakMap.delete(hero) */

