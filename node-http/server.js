const { createServer } = require('http')

function handler(request, response) {
    response.end('Hello world!')
}

createServer(handler).listen(3000, () => console.log('Running listening PORT 3000'))