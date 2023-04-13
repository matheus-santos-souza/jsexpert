$.verbose = false

import { setTimeout } from 'timers/promises'
import isSafe from 'safe-regex'

await $`docker run -p "8080:80" -d nginx`
await setTimeout(500) 

const req = await $`curl --silent localhost:8080`

console.log(`req`, req.stdout)

const containers = await $`docker ps`

//Unsafe!
//const exp = /(?<containerId>\w+)\W+(?=nginx)(x+x+)+y/

const exp = /(?<containerId>\w+)\W+(?=nginx)/

if (!isSafe(exp)) {
    throw new Error('Unsafe Regex')
}

const { groups : { containerId } } = containers.toString().match(exp)

const logs = await $`docker logs ${containerId}`
console.log('logs', logs.stdout)

const rm = await $`docker rm -f ${containerId}`
console.log('rm -f', rm.stdout)

//npm.pkg.github.com/:_authToken=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
//registry=https://registry.npmjs.org/