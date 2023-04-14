import Util from "../util.js"

const componentNameAnchor = '$$componentName'

const template = `export default class $$componentNameRepository {
    constructor() {}

    create(data) {
        return Promise.reject('method not implement')
    }

    read(query) {
        return Promise.reject('method not implement')
    }

    update(id, data) {
        return Promise.reject('method not implement') 
    }

    delete(id) {
        return Promise.reject('method not implement')        
    }
}`

export function repositoryTemplate(componentName) {
    return {
        fileName: `${componentName}Repository`,
        template: template.replaceAll(componentNameAnchor, Util.upperCaseFirstLetter(componentName))
    }
}