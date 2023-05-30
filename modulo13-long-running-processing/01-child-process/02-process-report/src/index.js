import { fork } from 'child_process'
import { createReadStream } from 'fs'
import { pipeline } from 'stream/promises'
import csvtojson from 'csvtojson'
import { Writable } from 'stream'
import { join, resolve } from 'path'

const database = resolve(join('data/All_Pokemon.csv'))
const PROCESS_COUNT = 30
const replications = []

const backgroundTaskFile = resolve(join('src/backgroundTask.js'))
const processes = new Map()

for (let i = 0; i < PROCESS_COUNT; i++) {
    const child = fork(backgroundTaskFile, [database])
    child.on('exit', () => {
        console.log(`process ${child.pid} exited`)
        processes.delete(child.pid)
    })

    child.on('error', (error) => {
        console.log(`process ${child.pid} has an error`, error)
        processes.exit(1)
    })

    child.on('message', msg => {
        if (replications.includes(msg)) {
            return
        }
        console.log(`${msg} is replicated!`)
        replications.push(msg)
    })
    processes.set(child.pid, child)
}

function roundRoubin(array, index = 0) {
    return function() {
        if(index >= array.length) index = 0

        return array[index++]
    }
}

const getProcess = roundRoubin([...processes.values()])

console.log(`starting with ${processes.size} processes`)

await pipeline(
    createReadStream(database),
    csvtojson(),
    Writable({
        write(chunk, enc, cb) {
            const chosenProcess = getProcess()
            chosenProcess.send(JSON.parse(chunk))
            cb()
        }
    })

)