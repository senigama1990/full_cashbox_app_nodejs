const authModel = require('./model')
const { instance } = require('../../lib/crypt')

const REGISTER = (req, res) => {
    try {
        let buffer = ''
        req.on('data', (data) => {
            buffer += data
        })
        req.on('end', () => {
            let newUser = authModel.insertUser(JSON.parse(buffer.toString()))
            if (newUser) {
                res.writeHead(201, {'Content-Type': 'application/json'})
                return res.end(JSON.stringify({
                    message: 'The new user has been added',
                    username: newUser.username,
                    userId: newUser.id,
                    token: instance.crypt(JSON.stringify({userId: newUser.id, username: newUser.username}))
                }))
            } else {
                res.writeHead(400, { 'Content-Type': 'application/json' })
                return res.end(JSON.stringify({
                    message: 'The user already exists',
                    username: null,
                    userId: null,
                    token: null
                }))
            }
        })
    } catch (err) {
        res.statusCode = 400
        return res.end('An error occured')
    }
}

const LOGIN = (req, res) => {
    try {
        let buffer = ''
        req.on('data', (data) => {
            buffer += data
        })
        req.on('end', () => {
            let user = authModel.login(JSON.parse(buffer.toString()))
            if (user) {
                res.writeHead(201, { 'Content-Type': 'application/json' })
                return res.end(JSON.stringify({
                    message: 'The user logged in',
                    username: user.username,
                    userId: user.id,
                    token: instance.crypt(JSON.stringify({ userId: user.id, username: user.username }))
                }))
            } else {
                res.writeHead(400, { 'Content-Type': 'application/json' })
                return res.end(JSON.stringify({
                    message: 'Wrong username or password!',
                    username: null,
                    userId: null,
                    token: null
                }))
            }
        })
    } catch (err) {
        res.statusCode = 400
        return res.end('An error occured')
    }
}

module.exports = { REGISTER, LOGIN }
