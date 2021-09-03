async function renderIncome() {
    let income = await request('/expanse', 'GET')
    income.map((inc) => {
        let tr = document.createElement('tr')

        let tableId = document.createElement('td')
        let purpose = document.createElement('td')
        let cost = document.createElement('td')
        let date = document.createElement('td')

        tableId.textContent = inc.id
        purpose.textContent = inc.purpose
        cost.textContent = inc.cost
        date.textContent = inc.date

        tr.append(tableId)
        tr.append(purpose)
        tr.append(cost)
        tr.append(date)

        table.append(tr)
    })
}

form.onsubmit = async function (e) {
    e.preventDefault()
    let obj = {
        purpose: purpose.value,
        cost: cost.value,
    }
    let response = await request('/expanse', 'POST', obj)
    let tr2 = document.createElement('tr')

    let tableId2 = document.createElement('td')
    let purpose2 = document.createElement('td')
    let cost2 = document.createElement('td')
    let date2 = document.createElement('td')

    tableId2.textContent = response.body.id
    purpose2.textContent = response.body.purpose
    cost2.textContent = response.body.cost
    date2.textContent = response.body.date

    tr2.append(tableId2)
    tr2.append(purpose2)
    tr2.append(cost2)
    tr2.append(date2)

    table.append(tr2)

    purpose.value = null
    cost.value = null
}
renderIncome()