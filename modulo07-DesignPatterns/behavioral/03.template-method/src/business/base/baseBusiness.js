import { NotImplementedException } from "../../util/exceptions.js";

export default class BaseBusiness {
    _validateRequireFields(data) {
        throw new NotImplementedException(
            this._validateRequireFields.name
        )
    }

    _create(data) {
        throw new NotImplementedException(
            this._create.name
        )
    }

    /*
    Padrao do Martin Fowler
    a proposta do padrao é garantir um fluxo de métodos, definindo uma sequencia a ser executada

    esse create é a implementação efetiva do Template Method
    */
    create(data) {
        const isValid = this._validateRequireFields(data)
        if (!isValid) {
            throw new Error('invalid Data!')
        }

        return this._create(data)
    }
}