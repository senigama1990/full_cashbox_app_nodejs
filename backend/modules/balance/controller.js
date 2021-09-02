const balanceModel = require('./model')

const GET = (req, res) => {
    try {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        return res.end(JSON.stringify(balanceModel.balance()))
    } catch (err) {
        res.statusCode = 400
        return res.end('An error occured')
    }
}



module.exports = { GET }
