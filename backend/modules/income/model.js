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

module.exports = { fetchAll, insertIncome }

