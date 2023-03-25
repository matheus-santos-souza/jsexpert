import Http from 'http'

async function InjectionHttpInterceptor() {
    const oldEmit = Http.Server.prototype.emit

    Http.Server.prototype.emit = function (... args) {
        const [ type, req, response ] = args
        if (type === 'request') {
            response.setHeader('X-Instrumented-By', 'MatheusSantos')
        }

        return oldEmit.apply(this, args)
    }

}

export { InjectionHttpInterceptor }