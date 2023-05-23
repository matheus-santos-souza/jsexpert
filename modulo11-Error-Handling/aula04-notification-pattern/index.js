import { createServer } from 'http'
import { statusCodes } from './src/util/httpStatusCodes.js'
import HeroEntity from './src/util/heroEntity.js'

async function handler(request, response) {
    for await(const data of request) {
        try {
            const parsedData = JSON.parse(data)

            //simulando um outro erro, por exemplo um de banco de dados:
            if (Reflect.has(parsedData, "connectionError")) {
                throw new Error('Error connection to DB!')
            }

            const hero = new HeroEntity(parsedData)
            if(!hero.isValid()) {
                response.writeHead(statusCodes.BAD_REQUEST)
                response.end(hero.notifications.join('\n'))
                continue;  
            }

            response.writeHead(statusCodes.OK)
            response.end()
        } catch (error) {
            response.writeHead(statusCodes.INTERNAL_SERVER_ERROR)
            response.end()
        }
    }
}

createServer(handler).listen(3000, () => console.log('Is running at port 3000'))

/* 
curl -i localhost:3000 -X POST --data '{ "name": "Vingador", "age": 80 }'
*/