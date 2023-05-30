import { parentPort, threadId } from 'worker_threads'
import sharp from 'sharp'
import axios from 'axios'

async function downloadFile(url) {
    const response = await axios.get(url, {
        responseType: 'arraybuffer'
    })

    return response.data
}

async function onMessage({ image, background }) {
    const firstLatter = await sharp(await downloadFile(image)).toBuffer()
    const seccondLatter = await sharp(await downloadFile(background))
    .composite(
        [
            { input: firstLatter, gravity: sharp.gravity.south }
        ]
    )
    .toBuffer()
    parentPort.postMessage(seccondLatter.toString('base64'))
}

parentPort.on('message', onMessage)