import { writeFile } from 'fs/promises'
import { resolve } from 'path';
import database from './../database.json' assert { type: 'json' };

export const save = async (data) => {
    database.push(data)
    const urlDatabase = resolve('./database.json')
    
    await writeFile(urlDatabase, JSON.stringify(database))
}
