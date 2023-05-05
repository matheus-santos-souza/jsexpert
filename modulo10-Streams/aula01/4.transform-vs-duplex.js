import { Duplex, Transform } from 'stream'

let count = 0;
const server = Duplex({
    objectMode: true,
    encoding: 'utf-8',
    read() {
        const everySecond = (intervalContext) => {
            if (count++ <= 5) {
                this.push(`My name is Matheus[${count}]\n`)
                return;
            }

            clearInterval(intervalContext)
            this.push(null)
        }

        setInterval(function () {everySecond(this)})
    },
    write(chunk, encoding, cb) {
        console.log(`write`, chunk)
        cb()
    }
})

//write aciona o writable da Duplex
server.write('[duplex] hey this is a writable\n')

// on data = loga oque rolou no .push do reable
//server.on('data', msg => console.log(msg))

//push deixa vc enviar mais dados
server.push(`[duplex] hey is also a readable\n`)

/* server.pipe(process.stdout) */

const transform = Transform({
    objectMode: true,
    transform(chunk, encoding, cb) {
        cb(null, chunk.toUpperCase())
    }
})

//transform também é um Duplex mas não possui comunicação independente
transform.write('[trasnform] write\n')
transform.push('[trasnform] push\n')

server
    .pipe(transform)
    .pipe(server)