'use strict';

const assert = require('assert')

//garantir semantica e segurança dos objetos

// ---- aply

const myObj = { 
    add (myValue) {
        return this.arg1 + this.arg2 + myValue
    }
}

assert.deepStrictEqual(myObj.add.apply({ arg1: 10, arg2: 20 }, [ 100 ]), 130)

// um problema que pode acontecer (raro)
// Function.prototype.apply = () => { throw new Error('Vixxx!')}

//esse aqui pode acontecer!
myObj.add.apply = function () { throw new TypeError('Vixxx!')}

assert.throws(
    () => myObj.add.apply({}, []),
    {
        name: 'TypeError',
        message: 'Vixxx!'
    }
)

// Usando Reflect
const result = Reflect.apply(myObj.add, { arg1: 10, arg2: 20 }, [200])
assert.deepStrictEqual(result, 230)
//---apply

// --- defineProperty

// questoes semanticas
function myDate() {}

//Feio pra kct, tudo é object, mas object adicionando prop para uma funcition?
Object.defineProperty(myDate, 'withObject', { value: () => 'Hey there' })

//Agora com reflect faz mais sentido
Reflect.defineProperty(myDate, 'withReflection', { value: () => 'Hey dude' })

assert.deepStrictEqual(myDate.withObject(), 'Hey there')
assert.deepStrictEqual(myDate.withReflection(), 'Hey dude')

// --- Delete Property
const withDelete = { user: 'Matheus' }

//evitar ao máximo (imperformático)
delete withDelete.user
assert.deepStrictEqual(withDelete.hasOwnProperty('user'), false)

// Deletar com reflection
const withReflection = { user: 'xuxa' }
Reflect.deleteProperty(withReflection, 'user')
assert.deepStrictEqual(withReflection.hasOwnProperty('user'), false)

//Deveriaos fazer um get somente de instancias de referencia
assert.deepStrictEqual(1['userName'], undefined)

//Com Reflection uma exceção é lançada!
assert.throws(() => Reflect.get(1, 'userName'), TypeError) 

// --- has
assert.ok('superman' in { superman: '' }, true)
assert.ok(Reflect.has({batman: ''}, 'batman'), true)

// --- ownKeys
const user = Symbol('user')
const database = { 
    id: 1,
    [Symbol.for('password')]: 123,
    [user]: 'Matheus Santos',
}

// com os metodos de object temo que fazer 2 requisições
const objKeys = [
    ...Object.getOwnPropertyNames(database),
    ...Object.getOwnPropertySymbols(database)
]

assert.deepStrictEqual(objKeys, ['id', Symbol.for('password'), user])

//com reflection, um medtodo só
assert.deepStrictEqual(Reflect.ownKeys(database), ['id', Symbol.for('password'), user])