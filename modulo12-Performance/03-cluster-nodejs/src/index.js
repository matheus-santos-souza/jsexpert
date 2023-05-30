import os from 'os'
import cluster from 'cluster'
import { initializeServer } from './server.js';

;(() => {
    // se não for o processo main, o orquestrador pode criar novas cópias
    if (!cluster.isPrimary) {
        initializeServer()
        return;
    }

    const cpusNumbers = os.cpus().length
    console.log(`Primary ${process.pid} is running \n`)
    console.log(`Forking server for ${cpusNumbers} CPU \n`)

    for (let i = 0; i < cpusNumbers; i++) {
        cluster.fork()
    }

    cluster.on('exit', (worker, code, signal) => {
        if (code !== 0 && !worker.exitedAfterDisconnect) {
            console.log(`Worker ${worker.process.pid} died`)
            cluster.fork()
        }
    })
})()