import fsPromises from 'fs/promises'
import fs from 'fs'

export async function createLayersIfNotExists({ mainPath, defaultMainFolder, layers }) {
    const defaultPath = `${mainPath}/${defaultMainFolder}`
    const foldersToCreate = layers.filter(layer => !fs.existsSync(layer))
    const result = foldersToCreate.map(folder => fsPromises.mkdir(`${defaultPath}/${folder}`, { rescursive: true }))
    return Promise.all(result)
}