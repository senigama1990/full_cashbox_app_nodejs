const fs = require('fs')
const path = require('path')

const fetchAll = () => {
    try {
        let data = fs.readFileSync(path.join(process.cwd(), 'database', 'income.json'))
        return data
    } catch (error) {
        return error
    }
}

module.exports = { fetchAll }

