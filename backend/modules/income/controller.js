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

const DELETE = (req, res) => {
    try {
        let buffer = ''
        req.on('data', (data) => {
            buffer += data
        })
        req.on('end', () => {
            let deleted = incomeModel.del(JSON.parse(buffer))
            if (deleted) {
                res.writeHead(200, { 'Content-Type': 'application/json' })
                return res.end(JSON.stringify({ message: 'The data has been deleted', body: deleted }))
            } else {
                res.writeHead(200, { 'Content-Type': 'application/json' })
                return res.end(JSON.stringify({ message: 'an error', body: null }))
            }
        })
    } catch (err) {
        res.statusCode = 400
        return res.end(err.message)
    }
}

module.exports = { GET, POST, DELETE }
