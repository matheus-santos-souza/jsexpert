InjectionHttpInterceptor()

import Http from 'http'
import { InjectionHttpInterceptor } from './../index.js'

function handleRequest(request, response) {
    //response.setHeader('X-Instrumented-By', 'MatheusSantos')
    response.end('hello world!')
}

const server = Http.createServer(handleRequest)

const PORT = 3000
server.listen(PORT, () => console.log('Server running at', server.address().port))