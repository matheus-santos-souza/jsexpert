import timers from 'timers/promises'

const timeoutAsync = timers.setTimeout;

/* const results = ['1', '2'].map(async (item) => {
    console.log('starting process!!')
    await timeoutAsync(100)
    console.log(item)
    console.log(await Promise.resolve('timeout order!'))
    await timeoutAsync(100)
    console.log('debug')

    return parseInt(item) *2
})
console.log(await Promise.all(results)) */

const throwNewError = (msg) => { throw new Error(msg) }

try {
    console.log('Hello word!')
    throwNewError('Ativei um erro!')
} catch (error) {
    console.log('Capturei um erro!', error.message)
} finally {
    console.log('executa depois de todo mundo!')
}

setTimeout(async () => {
    console.log('starting process!!')
    await timeoutAsync(100)
    console.count('debug')
    console.log(await Promise.resolve('timeout order!'))
    await timeoutAsync(100)
    console.count('debug')

    await Promise.reject('promise rejected on timeout')
}, 1000);

process.on('unhandledRejection', (e) => {
    console.log('unhandledRejection', e.message || e)
})

process.on('uncaughtException', (e) => {
    console.log('uncaughtException', e.message || e)
})

Promise.reject('promised rejected!')

// se o Promise.reject estiver em outro contexto ele cai no unhandledRejection
setTimeout(async () => {
    await Promise.reject('AWAIT promised rejected!')
})

//Mas se ele estiver no contexto global, ele cai no uncaughtException
// uncaughtException
setTimeout(() => {
    throwNewError('Ativei outro erro!')
})
