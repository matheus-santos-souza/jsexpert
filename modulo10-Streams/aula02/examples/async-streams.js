import { pipeline } from 'stream/promises'
import { setTimeout } from 'timers/promises'

async function * myCustomReadable() {
    yield Buffer.from('this is my')
    await setTimeout(200)
    yield Buffer.from('custom readable')
}

async function * myCustomTransform(streams) {
    for await (const chunk of streams) {
       yield chunk.toString().replace(/\s/gm, '_')
    }
}

async function * myCustomDuplex(streams) {
    let bytesRead = 0
    const wholeString = []
    for await (const chunk of streams) {
       console.log('[duplex witable]', chunk)
       bytesRead += chunk.length
       wholeString.push(chunk)
    }

    yield `wholeString ${wholeString.join()}`
    yield `bytesRead ${bytesRead}`
}

async function * myCustomWritable(streams) {
    for await (const chunk of streams) {
        console.log('[Writable]', chunk)
    }
}

try {
    const controller = new AbortController()
    //caso precise cancelar um fluxo
    setImmediate(() => controller.abort())
    await pipeline(
        myCustomReadable,
        myCustomTransform,
        myCustomDuplex,
        myCustomWritable,
        { signal: controller.signal }
    )
    
    console.log('finished process')  
} catch (error) {
    console.error('\nabort', error.message)
}