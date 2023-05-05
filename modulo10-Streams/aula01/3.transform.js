import { Readable, Writable, Transform } from 'stream'
import { createWriteStream } from 'fs'

//Entrada de dados
const readable = Readable({
    read() {
        for (let index = 0; index < 1e5; index++) {
            const person = { id: Date.now() + index, name: `Matheus:${index}`}
            const data = JSON.stringify(person)
            this.push(data)
        }

        //informa que os dados acabaram
        this.push(null)
    }
})

// Processamento de dados
const mapFields = Transform({
    transform(chunk, encodding, cb) {
        const data = JSON.parse(chunk)
        const result = `${data.id}, ${data.name.toUpperCase()}\n`
        cb(null, result)
    }
})

const mapHeaders = Transform({
    transform(chunk, encodding, cb) {
        this.counter = this.counter ?? 0;
        if (this.counter) {
            return cb(null, chunk)
        }

        this.counter += 1;
        cb(null, "id,name\n".concat(chunk))
    }
})

//Saída de dados
//Writable é sempre a saída = imprimir, salvar, ignorar
readable
    .pipe(mapFields)
    .pipe(mapHeaders)
    .pipe(createWriteStream('./my.csv'))