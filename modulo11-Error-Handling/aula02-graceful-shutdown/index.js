import { MongoClient } from "mongodb";
import { createServer } from 'http'
import { promisify } from "util";

async function dbConnect() {
    const client = new MongoClient("mongodb://localhost:27017")
    await client.connect()
    console.log('mongodb is connected!')

    const db = client.db('comics')
    return {
        collections: { heroes: db.collection('heroes') },
        client
    }
}

const { collections, client } = await dbConnect()

async function handler(request, response) {

    for await (const data of request) {
        try {
            await collections.heroes.insertOne({
                ...data,
                updatedAt: new Date().toISOString()
            })
            const heroes = await collections.heroes.find().toArray()

            response.writeHead(200)
            response.write(JSON.stringify(heroes))
        } catch (error) {
            console.log('ERROR', error)
            response.writeHead(500)
            response.write(JSON.stringify({ message: 'server internal error' }))
        } finally {
            response.end()
        }
    }
}

const server = createServer(handler).listen(3000, () => console.log('Running at port 3000', process.pid))

// curl -i localhost:3000 -X POST --data '{"name": "batman": "age": "80"}'

const onStop = async (signal) => {
    console.info(`SIGNAL RECEIVED! ${signal}`)

    console.log('Closing http server')
    await promisify(server.close.bind(server))()
    console.log('http server has closed!')

    await client.close()
    console.log('MongoDB closed!')
    //zero é tudo certo, 1 é erro!
    process.exit(0)
}

// SIGINT -> CTRL + C
// SIGTERM -> KILL
["SIGINT", "SIGTERM"].forEach(event => {
    process.on(event, onStop)

    
});