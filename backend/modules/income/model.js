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

const insertIncome = (income) => {
    try {
        const { purpose, cost } = income
        let data = fs.readFileSync(path.join(process.cwd(), 'database', 'income.json'), 'UTF-8')
        let newIncome
        if (!data) {
            data = []
            newIncome = {
                id: 1,
                purpose,
                cost,
                date: new Date()
            }
        } else {
            data = JSON.parse(data)
            newIncome = {
                id: data[data.length - 1].id + 1,
                purpose,
                cost,
                date: new Date()
            }
        }
        data.push(newIncome)
        fs.writeFileSync(path.join(process.cwd(), 'database', 'income.json'), JSON.stringify(data, null, 4))
        return newIncome
    } catch (err) {
        throw err
    }

}

function del(obj) {
    try {
        let { id } = obj
        let data = fs.readFileSync(path.join(process.cwd(), 'database', 'income.json'), 'UTF-8')
        if (data) {
            data = JSON.parse(data)
            let filtered = data.filter((el) => el.id != id)
            if (filtered.length < data.length) {
                fs.writeFileSync(path.join(process.cwd(), 'database', 'income.json'), filtered == 0 ? '' : JSON.stringify(filtered, null, 4))
                return filtered
            } else {
                throw 'An error'
            }

        } else {
            throw 'Database is empty'
        }

    } catch (err) {
        return null
    }
}

module.exports = { fetchAll, insertIncome, del }

