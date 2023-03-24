import { expect, describe, test, jest, beforeEach } from '@jest/globals'
import BaseBusiness from '../src/business/base/baseBusiness.js'
import { NotImplementedException } from '../src/util/exceptions'

describe('#BaseBusiness', () => {
    beforeEach(() => {
        jest.restoreAllMocks()
    })

    test('should throw error an when child class doesnt implement _validateRequiredFields function', () => {
        class ConcreteClass extends BaseBusiness {}
        const concreteClass = new ConcreteClass()
        const validationError = new NotImplementedException(
            concreteClass._validateRequireFields.name
        )
        expect(() => concreteClass.create({})).toThrow(validationError)
    })
    test('should throw error an when  _validateRequiredFields return false', () => {
        const VALIDATION_DOESNT_SUCCEDED = false
        class ConcreteClass extends BaseBusiness {
            _validateRequireFields = jest.fn().mockReturnValue(VALIDATION_DOESNT_SUCCEDED)
        }
        const concreteClass = new ConcreteClass()
        const validationError = new Error('invalid Data!')
        expect(() => concreteClass.create({})).toThrow(validationError)
    })
    test('should throw error an when child class doesnt implement _create function', () => {
        const VALIDATION_SUCCEDED = true
        class ConcreteClass extends BaseBusiness {
            _validateRequireFields = jest.fn().mockReturnValue(VALIDATION_SUCCEDED)
        }
        const concreteClass = new ConcreteClass()
        const validationError = new NotImplementedException(
            concreteClass._create.name
        )
        expect(() => concreteClass.create({})).toThrow(validationError)
    })
    test('should call _create and _validateRequiredFields on create', () => {
        const VALIDATION_SUCCEDED = true
        const CREATE_SUCCEDED = true
        class ConcreteClass extends BaseBusiness {
            _validateRequireFields = jest.fn().mockReturnValue(VALIDATION_SUCCEDED)
            _create = jest.fn().mockReturnValue(CREATE_SUCCEDED)
        }
        const concreteClass = new ConcreteClass()
        const baseClassFn = jest.spyOn(
            BaseBusiness.prototype,
            BaseBusiness.prototype.create.name
        )
        
        const result = concreteClass.create({})
        expect(result).toBeTruthy()
        expect(baseClassFn).toHaveBeenCalled()
        expect(concreteClass._create).toHaveBeenCalled()
        expect(concreteClass._validateRequireFields).toHaveBeenCalled()
    })
})