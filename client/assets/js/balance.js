async function renderIncome() {
    let balance = await request('/balance', 'GET')

    let tr = document.createElement('tr')
    let tableId = document.createElement('td')
    let income = document.createElement('td')
    let expanse = document.createElement('td')
    let total = document.createElement('td')

    tableId.textContent = 1
    income.textContent = balance.totalIncome
    expanse.textContent = balance.totalExpanse
    total.textContent = balance.totalMoney

    tr.append(tableId)
    tr.append(income)
    tr.append(expanse)
    tr.append(total)

    table.append(tr)
}
renderIncome()