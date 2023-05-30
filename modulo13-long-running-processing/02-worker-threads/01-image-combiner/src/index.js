import { createServer } from 'http'
import { parse, fileURLToPath } from 'url'
import { Worker } from 'worker_threads'
import { dirname } from 'path'
import sharp from 'sharp'

const currentFolder = dirname(fileURLToPath(import.meta.url))
const workerFileName = 'worker.js'

async function joinImages(images) {
    return new Promise((resolve, reject) => {
        const worker = new Worker(`${currentFolder}/${workerFileName}`)
        worker.postMessage(images)
        worker.once('message', resolve)
        worker.once('error', reject)
        worker.once('exit', code => {
            if (code !== 0) {
                return reject(new Error(`Thred ${worker.threadId} sttoped in code: ${code}`))
            }

            console.log(`th thread ${worker.threadId} exited!!`)
        })
    })
}

async function handler(request, response) {
    if (request.url.includes('joinImages')) {
        const { query: { background, img } } = parse(request.url, true)
        const imageBase64 = await joinImages({ image: img, background })

        response.writeHead(200, {
            'Content-Type': 'text/html'
        })

        response.end(`<img style="width:100%;height:100%" src="data:image/jpeg;jpg;png;base64,${imageBase64}" />`)
        return;
    }

    return response.end()
}

createServer(handler)
    .listen(3000, () => console.log('Running at port 3000'))


//localhost:3000/joinImages?img=https://vaidaruim.com.br/fortnite/images/cosmetics/br/cid_991_athena_commando_m_nightmare_nm1c8/icon.png&background=https://images8.alphacoders.com/507/507275.jpg

// https://img2.storyblok.com/fit-in/1536x1536/filters:format(png)/f/115795/1342x2061/e0a273dbff/predator.png
// https://vaidaruim.com.br/fortnite/images/cosmetics/br/cid_991_athena_commando_m_nightmare_nm1c8/icon.png

//Backgrounds
// https://images8.alphacoders.com/507/507275.jpg
// https://wallpaperaccess.com/full/2621614.jpg