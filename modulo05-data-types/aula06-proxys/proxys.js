'use strict';

const assert = require('assert')
const Event = require('events')

const eventName = 'counter'
const event = new Event()

event.on(eventName, msg => console.log('counter update', msg))

const myCounter = {
    counter: 0
}

const proxy = new Proxy(myCounter, {
    set: (target, propertyKey, newValue) => {
        event.emit(eventName, { newValue, key: target[propertyKey] })
        target[propertyKey] = newValue
        return true
    },

    get: (object, prop) => {
        //console.log('chamou!', { object, prop })
        return object[prop]
    }
})

setInterval(function () {
    proxy.counter += 1
    console.log('[3]: interval')
    if (proxy.counter === 10) {
        clearInterval(this)
    }
}, 200)

setTimeout(() => {
    proxy.counter = 4
    console.log('[2]: timeout')
}, 100)

//se quer que executa agora
setImmediate(() => {
    console.log('[1]: setImediate', proxy.counter)
})

// executa agora, agorinha, mas acaba com o ciclo de vida do node
process.nextTick(() => {
    proxy.counter = 2
    console.log('[0]: nextTick')
})
