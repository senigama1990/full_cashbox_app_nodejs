const http = require('http')
const fs = require('fs')
const path = require('path')
const {host, PORT} = require('./config')
const Express = require('./lib/express')
//load modules
const expanseController = require('./modules/expanse/controller')
const incomeController = require('./modules/income/controller')
const balanceController = require('./modules/balance/controller')

const server = http.createServer((req, res) => {
    const app = new Express(req, res)
    app.get('/expanse', expanseController.GET)
    app.post('/expanse', expanseController.POST)

    app.get('/income', incomeController.GET)
    app.post('/income', incomeController.POST)
   
    app.get('/balance', balanceController.GET)



})
server.listen(PORT, () => {
    console.log(`Server is running on http://${host}:${PORT}`);
})