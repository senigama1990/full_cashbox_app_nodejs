const http = require('http')
const fs = require('fs')
const path = require('path')
const {host, PORT} = require('./config')
const Express = require('./lib/express')

const server = http.createServer((req, res) => {
    const app = new Express(req, res)
    app.get('/expanse', (req, res) => {
        fs.readFile(path.join('database', 'expanse.json'), 'UTF-8', (err, data) => {
            res.writeHead(200, { 'Content-Type': 'application/json' })
            return res.end(data)
        })
    })

    app.get('/income', (req, res) => {
        fs.readFile(path.join('database', 'income.json'), 'UTF-8', (err, data) => {
            res.writeHead(200, { 'Content-Type': 'application/json' })
            return res.end(data)
        })
    })

})
server.listen(PORT, () => {
    console.log(`Server is running on http://${host}:${PORT}`);
})