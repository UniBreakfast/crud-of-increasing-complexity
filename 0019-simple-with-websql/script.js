const db = openDatabase('crud0019', '1.0', 'CRUD 0019', 2 * 1024 * 1024)

let id

db.transaction(t => t.executeSql('CREATE TABLE IF NOT EXISTS records (id INTEGER PRIMARY KEY AUTOINCREMENT, data TEXT)'))

render()

addForm.onsubmit = () => {
  const value = addInput.value.trim()

  if (!value) return

  db.transaction(t => t.executeSql(`INSERT INTO records (data) VALUES ("${value}")`, [], render))

  addForm.reset()
}

editForm.onsubmit = () => {
  const value = editInput.value.trim()

  if (!value) return

  db.transaction(t => t.executeSql(`UPDATE records SET data = "${value}" WHERE id = ${id}`, [], switchForms))

  editForm.reset()
}

cancelBtn.onclick = switchForms

removeBtn.onclick = () => {
  db.transaction(t => t.executeSql(`DELETE FROM records WHERE id = ${id}`, [], switchForms))

  editForm.reset()
}

main.onclick = async e => {
  const btn = e.target.closest('button')

  if (!btn) {
    if (addForm.hidden) await switchForms()
    return
  }

  id = +btn.dataset.id

  if (editForm.hidden) await switchForms()
  else main.querySelector(':disabled').disabled = false

  editInput.value = btn.textContent
  main.querySelector(`[data-id="${id}"]`).disabled = true
}

onkeydown = e => {
  if (e.key === 'Escape' && addForm.hidden) switchForms()
}

async function switchForms() {
  addForm.hidden = !addForm.hidden
  editForm.hidden = !editForm.hidden
  document.querySelector('form:not([hidden]) input').focus()
  
  await render()
}

function render() {
  return new Promise(resolve => {
    db.transaction(t => t.executeSql(
      'SELECT * FROM records', [],
      (_, { rows }) => {
        main.innerHTML = [...rows].map(
          ({ id, data }) =>
            `<button data-id="${id}">${data}</button>`
        ).reverse().join('')
        resolve()
      }
    ))
  })
}
