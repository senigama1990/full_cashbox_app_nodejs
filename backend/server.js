const http = require('http')
const {host, PORT} = require('./config')
const Express = require('./lib/express')
//load modules
const expanseController = require('./modules/expanse/controller')
const incomeController = require('./modules/income/controller')
const balanceController = require('./modules/balance/controller')
const authController = require('./modules/auth/controller')

const server = http.createServer((req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    res.setHeader("Access-Control-Allow-Methods", "*");
    const app = new Express(req, res)

    if (req.method === 'OPTIONS') return res.end('200')


    app.get('/expanse', expanseController.GET)
    app.post('/expanse', expanseController.POST)
    app.delete('/expanse', expanseController.DELETE)

    app.get('/income', incomeController.GET)
    app.post('/income', incomeController.POST)
    app.delete('/income', incomeController.DELETE)
    
    app.get('/balance', balanceController.GET)
    
    app.post('/register', authController.REGISTER)
    app.post('/login', authController.LOGIN)


})
server.listen(PORT, () => {
    console.log(`Server is running on http://${host}:${PORT}`);
})