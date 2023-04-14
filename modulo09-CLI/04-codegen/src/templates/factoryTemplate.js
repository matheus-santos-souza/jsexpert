import Util from "../util"

const componentNameAnchor = '$$componentName'
const repositoryNameAnchor = '$$repositoryName'
const serviceNameAnchor = '$$serviceName'
const repositoryNameDepAnchor = '$$repositoryNameDep'
const serviceNameDepAnchor = '$$serviceNameDep'

const template = `import $$serviceName from '../service/$$serviceNameDep.js'
import $$repositoryName from '../service/$$repositoryNameDep.js'

class $$componentNameFactory {
    static getInstance() {
        const repository = new $$repositoryName()
        const service = new $$serviceName({ repository })
        return service
    }
}`

export function factoryTemplate(componentName, repositoryName, serviceName) {
    const txtFile = template
            .replaceAll(componentNameAnchor, Util.upperCaseFirstLetter(componentName))
            .replaceAll(serviceNameDepAnchor, Util.lowerCaseFirstLetter(serviceName))
            .replaceAll(repositoryNameDepAnchor, Util.lowerCaseFirstLetter(repositoryName))
            .replaceAll(serviceNameAnchor, Util.upperCaseFirstLetter(serviceName))
            .replaceAll(repositoryNameAnchor, Util.upperCaseFirstLetter(repositoryName))

            
    return {
        fileName: `${componentName}Factory`,
        template: txtFile
    }
}