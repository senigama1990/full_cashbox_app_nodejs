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

const POST = (req, res) => {
    try {
        let buffer = ''
        req.on('data', (data) => {
            buffer += data
        })
        req.on('end', () => {
            let newIncome = incomeModel.insertIncome(JSON.parse(buffer.toString()))
            res.writeHead(201, { 'Content-Type': 'application/json' })
            return res.end(JSON.stringify({ message: 'The data has been added', body: newIncome }))
        })
    } catch (err) {
        res.statusCode = 400
        return res.end('An error occured')
    }
}

module.exports = { GET, POST }
