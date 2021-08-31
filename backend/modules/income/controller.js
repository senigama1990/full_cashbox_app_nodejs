const incomeModel =  require('./model')
const GET = (req, res) => {
    try {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        return res.end(incomeModel.fetchAll())
    } catch (err) {
        res.statusCode = 400
        return res.end('An error occured')
    }
}

module.exports = { GET }
