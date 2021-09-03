const http = require('http')
const {host, PORT} = require('./config')
const Express = require('./lib/express')
//load modules
const expanseController = require('./modules/expanse/controller')
const incomeController = require('./modules/income/controller')
const balanceController = require('./modules/balance/controller')

const server = http.createServer((req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    const app = new Express(req, res)

    if (req.method === 'OPTIONS') return res.end('200')


    app.get('/expanse', expanseController.GET)
    app.post('/expanse', expanseController.POST)

    app.get('/income', incomeController.GET)
    app.post('/income', incomeController.POST)
   
    app.get('/balance', balanceController.GET)



})
server.listen(PORT, () => {
    console.log(`Server is running on http://${host}:${PORT}`);
})