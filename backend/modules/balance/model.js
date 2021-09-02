const fs = require('fs')
const path = require('path')

const balance = () => {
    try {
        let expanse = fs.readFileSync(path.join(process.cwd(), 'database', 'expanse.json'), 'UTF-8')
        let income = fs.readFileSync(path.join(process.cwd(), 'database', 'income.json'), 'UTF-8')

        expanse = expanse ? JSON.parse(expanse) : []
        income = income ? JSON.parse(income) : []


        let totalExpanse = expanse.reduce((acc, ex) => acc + parseInt(ex.cost), 0)
        let totalIncome = income.reduce((acc, ex) => acc + parseInt(ex.cost), 0)

        let totalMoney = totalIncome - totalExpanse
        return { totalIncome, totalExpanse, totalMoney }
    } catch (err) {
        throw err
    }

}

module.exports = { balance }

