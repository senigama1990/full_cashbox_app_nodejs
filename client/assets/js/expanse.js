async function renderIncome() {
    let income = await request('/expanse', 'GET')
    table.innerHTML = null
    let header = `
	<tr class="table-header">
			<th>N</th>
			<th>Maqsad</th>
			<th>Summa</th>
			<th>Vaqt</th>
	</tr>`
    table.innerHTML = header
    let i = 1
    for (let inc of income) {
        let tr = document.createElement('tr')
        let n = document.createElement('td')
        let purpose = document.createElement('td')
        let cost = document.createElement('td')
        let date = document.createElement('td')
        let btnWrapper = document.createElement('td')
        let btn = document.createElement('button')

        tr.setAttribute('data-id', inc.id)

        n.textContent = i++
        purpose.textContent = inc.purpose
        cost.textContent = '$' + inc.cost
        date.textContent = inc.date
        btn.textContent = 'x'

        tr.append(n)
        tr.append(purpose)
        tr.append(cost)
        tr.append(date)
        btnWrapper.append(btn)
        tr.append(btnWrapper)

        table.append(tr)

        btn.onclick = async () => {
            let deleted = await request('/expanse', 'delete', { id: inc.id })
            console.log(deleted);
            tr.remove()
        }
    }
}


form.onsubmit = async (event) => {
    event.preventDefault()
    let obj = {
        purpose: purpose.value,
        cost: cost.value,
    }

    let response = await request('/expanse', 'POST', obj)
    if (response) {
        renderIncome()
    }
    purpose.value = null
    cost.value = null
}

renderIncome()