import http from 'http'

async function handler(req, res) {
    try {
        //await Promise.reject('error dentro do handler!')

        for await (const data of req) {
            await Promise.reject('error dentro do for!')
           // res.end()
        } 
    } catch (error) {
        console.log('Error server')
        res.writeHead(500)
        res.write(JSON.stringify({ message: 'internal server error' }))
        //res.end()
    } finally {
        res.end()
    }
}

http.createServer(handler).listen(3000, () => console.log('Running port 3000'))