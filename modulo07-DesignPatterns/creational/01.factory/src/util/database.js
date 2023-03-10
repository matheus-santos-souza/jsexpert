class Database {
    constructor({ connectionsString }) {
        this.connectionsString = connectionsString
    }

    async sleep(ms) {
        return new Promise(resolve => {
            setTimeout(resolve, ms)
        })
    }

    async connect() {
        await this.sleep(100)
        return this
    }

    async find(query) {
        await this.sleep(100)
        return [{ name: 'MatheusSantos' }]
    }
}

module.exports = Database