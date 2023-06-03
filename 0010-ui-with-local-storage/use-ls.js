const key = '0010_crud_implementation_records'

try {
  records.push(...JSON.parse(localStorage[key]))
  render()
} catch {}

addEventListener('submit', save)

removeBtn.addEventListener('click', save)

function save() {
  localStorage[key] = JSON.stringify(records)
}
