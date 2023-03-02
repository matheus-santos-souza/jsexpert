import database from './../database.json' assert {type: 'json'};
import Person from './person.js';
import TerminalController from './terminalController.js';

const terminalController = new TerminalController()
terminalController.initializeTerminal(database, 'pt-BR')

const STOP_TERMINAL = ':q'

async function mainLoop() {
    try {
        const answer = await terminalController.question('what?')
        if (answer === STOP_TERMINAL) {
            terminalController.closeTerminal()
            console.log('Process finished!')
            return;
        }

        const person = Person.generateInstanceFromString(answer)
        console.log(person)
        return mainLoop()
    } catch(error) {
        console.error(error)
        return mainLoop()
    }
}

await mainLoop()