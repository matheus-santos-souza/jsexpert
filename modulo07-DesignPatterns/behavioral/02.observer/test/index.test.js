import { expect, describe, test, jest } from '@jest/globals'
import Payment from '../src/events/payment'
import Marketing from '../src/observers/marketing'
import Shipment from '../src/observers/shipment'
import PaymentSubject from '../src/subjects/paymentSubject'

describe('Test Suit for Observer Pattern', () => {
    test('#PaymentSubject notify observers', () => {
        const subject = new PaymentSubject()
        
        const observer = {
            update: jest.fn()
        }
        const data = 'hello world'
        const expected = data

        subject.subscribe(observer)
        subject.notify(data)
        expect(observer.update).toBeCalledWith(expected)
    })
    test('#PaymentSubject should not notify unsubscribe observers', () => {
        const subject = new PaymentSubject()
        
        const observer = {
            update: jest.fn()
        }
        const data = 'hello world'

        subject.subscribe(observer)
        subject.unsubscribe(observer)
        subject.notify(data)
        expect(observer.update).not.toHaveBeenCalled()
    })
    test('#Payment nshould notify subject after a credit card transaction', () => {
        const subject = new PaymentSubject()
        const payment = new Payment(subject)

        const paymentSubjectNotifierSpy = jest.spyOn(
            payment.paymentSubject,
            payment.paymentSubject.notify.name
        )

        const data = { userName: 'Matheus Santos', id: Date.now() }
        payment.creditCard(data)

        expect(paymentSubjectNotifierSpy).toBeCalledWith(data)
    })
    test('#All should notify subscribe after a credit card payment', () => {
        const subject = new PaymentSubject()
        const shipment = new Shipment()
        const marketing = new Marketing()

        const shipmentSpy = jest.spyOn(shipment, shipment.update.name)
        const marketingSpy = jest.spyOn(marketing, marketing.update.name)

        subject.subscribe(shipment)
        subject.subscribe(marketing)

        const payment = new Payment(subject)
        const data = { userName: 'Matheus Santos', id: Date.now() }
        payment.creditCard(data)
        
        expect(shipmentSpy).toBeCalledWith(data)
        expect(marketingSpy).toBeCalledWith(data)
    })
})