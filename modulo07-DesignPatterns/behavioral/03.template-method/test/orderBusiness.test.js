import { expect, describe, test, jest, beforeEach } from '@jest/globals'
import OrderBusiness from '../src/business/orderBusiness.js'
import Order from '../src/entities/order.js'

describe('Test suite for Template Method design pattern', () => {
    beforeEach(() => {
        jest.restoreAllMocks()
    })

    describe('#OrderBusiness', () => {
        test('execute Order Business whitout Template Method', () => {
            const order = new Order({
                customerId: 1,
                amount: 100.000,
                products: [{ description: 'ferrari' }]
            })

            const orderBusiness = new OrderBusiness()
            //Todos os devs devem lembrar obrigatoriamente de seguir a risca esse fluxo de execução
            //se algum esquecer de chamar a função de validação, pode quebrar todo o sistema.
            const isValid = orderBusiness._validateRequireFields(order)
            expect(isValid).toBeTruthy()

            const result = orderBusiness._create(order)
            expect(result).toBeTruthy()
        })
        test('execute Order Business whit Template Method', () => {
            const order = new Order({
                customerId: 1,
                amount: 100.000,
                products: [{ description: 'ferrari' }]
            })

            const orderBusiness = new OrderBusiness()
            const calledValidattionFn = jest.spyOn(
                orderBusiness,
                orderBusiness._validateRequireFields.name
            )
            const calledCreateFn = jest.spyOn(
                orderBusiness,
                orderBusiness._create.name
            )
            //com o Template Method, a sequencia de passos é sempre executada
            // evita replicação de lógica
            const result = orderBusiness.create(order)
            expect(result).toBeTruthy()
            expect(calledValidattionFn).toHaveBeenCalled()
            expect(calledCreateFn).toHaveBeenCalled()
        })
    })
})