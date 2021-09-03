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
            let id = data.length ? data[data.length - 1].id + 1 : 1
            newExpanse = {
                id: id,
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


function del(obj) {
    try {
        let { id } = obj
        let data = fs.readFileSync(path.join(process.cwd(), 'database', 'expanse.json'), 'UTF-8')
        if (data) {
            data = JSON.parse(data)
            let filtered = data.filter((el) => el.id != id)
            if (filtered.length < data.length ) {
                fs.writeFileSync(path.join(process.cwd(), 'database', 'expanse.json'), filtered == 0 ? '' : JSON.stringify(filtered, null, 4))
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

module.exports = { fetchAll, insertExpanse, del }