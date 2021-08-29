const http = require('http')
const path = require('path')
const fs = require('fs')
const PORT = process.env.PORT || 3000
const host = 'localhost'

const server = http.createServer((req, res) => {
    if (req.url === '/' && req.method === 'GET') {
        fs.readFile(path.join('assets', 'index.html'), 'UTF-8', (err, data) => {
            res.writeHead(200, { 'Content-Type': 'text/html' })
            return res.end(data)
        })
    } else {
        let filePath = req.url
        let reqMimeType = path.extname(filePath)
        if(!reqMimeType) return
        let mimeType = {
            '.css': 'text/css',
            '.js': 'text/javascript',
            '.html': 'text/html'
        }

        const contentType = mimeType[reqMimeType] || 'application/octet-stream'

        fs.readFile(path.join('assets', filePath), (err, data) => {
            res.writeHead(200, {'Content-Type': contentType})
            return res.end(data)
        })
    }
})
server.listen(PORT, () => {
    console.log(`Server is running on http://${host}:${PORT}`);
})