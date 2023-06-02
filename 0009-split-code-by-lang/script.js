const records = []
let i

addForm.onsubmit = () => {
  const value = addInput.value.trim()
  if (!value) return
  records.push(value)
  addForm.reset()
  render()
}

editForm.onsubmit = () => {
  const value = editInput.value.trim()
  if (!value) return
  records[i] = value
  switchForms()
}

cancelBtn.onclick = switchForms

removeBtn.onclick = () => {
  records.splice(i, 1)
  switchForms()
}

main.onclick = e => {
  const btn = e.target.closest('button')
  if (!btn) {
    if (addForm.hidden) switchForms()
    return
  }
  i = records.length - 1 - [].indexOf.call(main.children, btn)
  if (editForm.hidden) switchForms()
  else main.querySelector(':disabled').disabled = false
  editInput.value = records[i]
  main.children[records.length - 1 - i].disabled = true
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
  main.innerHTML = records.map(str => `<button>${str}</button>`).reverse().join('')
}
