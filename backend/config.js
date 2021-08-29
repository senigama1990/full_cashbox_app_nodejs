const host = require('./lib/getIp')()
const PORT = process.env.PORT || 5000

module.exports = {host, PORT}