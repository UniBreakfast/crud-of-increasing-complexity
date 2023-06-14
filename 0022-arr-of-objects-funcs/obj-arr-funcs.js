var items = []

function createOne(obj) {
  items.push(obj)
}

function readAll() {
  return JSON.parse(JSON.stringify(items))
}

function updateOne(i, props) {
  if (items[i]) Object.assign(items[i], props)
}

function deleteOne(i) {
  if (i >= 0 && i < items.length) items.splice(i, 1)
}

function findOne(props) {
  return items.findIndex(item => {
    for (let key in props) {
      if (item[key] !== props[key]) return false
    }
    return true
  })
}
