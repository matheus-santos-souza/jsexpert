const TextProcessorFluentAPI = require('./textProcessorFluentAPI.js')

class TextProcessorFacade {
    #textProcessorFluentAPI
    
    constructor(text) {
        this.#textProcessorFluentAPI = new TextProcessorFluentAPI(text)
    }

    getPeopleFromPDF() {
        return this.#textProcessorFluentAPI
                .extractPeopleData()
                .divideTextInColumns()
                .removeEmptyCharacteres()
                .mapPerson()
                .build()
    }
}

module.exports = TextProcessorFacade