const expanseModel = require('./model')
const fs = require('fs')
const GET = (req, res) => {
    try {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        return res.end(expanseModel.fetchAll())
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
            let newExpanse = expanseModel.insertExpanse(JSON.parse(buffer.toString()))
            res.writeHead(201, {'Content-Type': 'application/json'})
            return res.end(JSON.stringify({message: 'The data has been added', body: newExpanse}))            
        })
    } catch (err) {
        res.statusCode = 400
        return res.end('An error occured')
    }
}

module.exports = { GET, POST }
