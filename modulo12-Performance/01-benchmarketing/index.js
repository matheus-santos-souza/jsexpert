import database from './database.js'
import Cart from './src/entities/cart.js'

const cart = new Cart(database)

console.log(cart)
