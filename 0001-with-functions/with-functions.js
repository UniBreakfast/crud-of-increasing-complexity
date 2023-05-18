var records = []

function createOneRecord(str) {
  records.push(str)
}

function readAllRecords() {
  return records
}

function updateOneRecord(oldStr, newStr) {
  const i = records.indexOf(oldStr)

  if (i !== -1) records[i] = newStr
}

function deleteOneRecord(str) {
  const i = records.indexOf(str)

  if (i !== -1) records.splice(i, 1)
}
