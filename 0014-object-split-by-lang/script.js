const records = {}
let nextKey = 1
let key

addForm.onsubmit = () => {
  const value = addInput.value.trim()
  if (!value) return
  records[nextKey++] = value
  addForm.reset()
  render()
}

editForm.onsubmit = () => {
  const value = editInput.value.trim()
  if (!value) return
  records[key] = value
  switchForms()
}

cancelBtn.onclick = switchForms

removeBtn.onclick = () => {
  delete records[key]
  switchForms()
}

main.onclick = e => {
  const btn = e.target.closest('button')
  if (!btn) {
    if (addForm.hidden) switchForms()
    return
  }
  key = btn.dataset.key
  if (editForm.hidden) switchForms()
  else main.querySelector(':disabled').disabled = false
  editInput.value = records[key]
  main.querySelector(`[data-key="${key}"]`).disabled = true
}

onkeydown = e => {
  if (e.key === 'Escape' && addForm.hidden) switchForms()
}

function switchForms() {
  addForm.hidden = !addForm.hidden
  editForm.hidden = !editForm.hidden
  document.querySelector('form:not([hidden]) input').focus()
  render()
}

function render() {
  main.innerHTML = Object.entries(records).map(([key, value]) => `<button data-key="${key}">${value}</button>`).reverse().join('')
}
