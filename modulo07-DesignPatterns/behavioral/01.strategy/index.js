import ContextExtrategy from "./src/base/contextStrategy.js"
import MongoDBExtrategy from "./src/strategies/mongoDBStrategy.js"
import PostgresExtrategy from "./src/strategies/postgresStrategy.js"

const postgresConnectString = "postgres://matheus:123456@localhost:5432/heroes"

const postgresContext = new ContextExtrategy(new PostgresExtrategy(postgresConnectString))
await postgresContext.connect()

const mongoDBConnectString = "mongodb://matheus:123456@localhost:27017/heroes"
const mongoDBContext = new ContextExtrategy(new MongoDBExtrategy(mongoDBConnectString))
await mongoDBContext.connect()


const data = [
    {
        name: 'matheussantos',
        type: 'transaction'
    },
    {
        name: 'mariasilva',
        type: 'activityLog'
    }
]

const contextTypes = {
    transaction: postgresContext,
    activityLog: mongoDBContext
}

for (const { type, name } of data) {
    const context = contextTypes[type]  
    await context.create({ name: name + Date.now() })
    console.log(type, context.dbStrategy.constructor.name)
    console.log(await context.read())
}