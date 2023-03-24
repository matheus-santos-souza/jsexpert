class NotImplementedException extends Error {
    constructor(message) {
        super(`${message} as called without an implemetations`)
        this.name = 'NotImplementedException'
    }
}

export { NotImplementedException }