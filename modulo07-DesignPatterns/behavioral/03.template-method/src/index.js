import OrderBusiness from "./business/orderBusiness.js";
import Order from "./entities/order.js";

const order = new Order({
    customerId: '124',
    amount: 222.000,
    products: [{ description: 'shampoo' }]
})

const orderBusiness = new OrderBusiness()
console.info('order', orderBusiness.create(order))