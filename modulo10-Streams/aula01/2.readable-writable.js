import { Readable, Writable } from 'stream'

//Entrada de dados
const readable = Readable({
    read() {
        this.push(console.log('Hello World 1'))
        this.push(console.log('Hello World 2'))
        this.push(console.log('Hello World 3'))

        //informa que os dados acabaram
        this.push(null)
    }
})


//Saída de dados
//Writable é sempre a saída = imprimir, salvar, ignorar
const writable = Writable({
    write(chunk) {
        console.log('msg', chunk.toString())

    }
})

readable.pipe(writable)