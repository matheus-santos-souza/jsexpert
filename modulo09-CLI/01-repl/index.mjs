// curl "localhost:3000?salary=3000&discount=15"

import http from 'http'


function netSalry({ discount, salary }) {
    const percent = (discount / 100)
    const cost = salary * percent
    const result = salary - cost
    return result
}

http.createServer((req, res) => {
    const url = req.url.replace('/', '')
    const params = new URLSearchParams(url)
    const data = Object.fromEntries(params)
    const result = netSalry(data)
    // debugger
    res.end(`O seu salario final é ${result}`)
}).listen(3000, () => console.log('app running port 3000'))