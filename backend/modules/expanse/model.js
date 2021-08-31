const fs = require('fs')
const path = require('path')

const fetchAll = () => {
    try {
        let data = fs.readFileSync(path.join(process.cwd(), 'database', 'expanse.json'))
        return data
    } catch (error) {
        return error
    }
}

const insertExpanse = (expanse) => {
    try {
        const { purpose, cost } = expanse
        let data = fs.readFileSync(path.join(process.cwd(), 'database', 'expanse.json'), 'UTF-8')
        let newExpanse
        if (!data) {
            data = []
            newExpanse = {
                id: 1,
                purpose,
                cost,
                date: new Date()
            }
        } else {
            data = JSON.parse(data)
            newExpanse = {
                id: data[data.length - 1].id + 1,
                purpose,
                cost,
                date: new Date()
            }
        }
        data.push(newExpanse)
        fs.writeFileSync(path.join(process.cwd(), 'database', 'expanse.json'), JSON.stringify(data, null, 4))
        return newExpanse
    } catch(err) {
        throw err
    }

}

module.exports = { fetchAll, insertExpanse}

