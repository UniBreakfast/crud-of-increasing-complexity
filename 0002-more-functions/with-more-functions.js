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

function createManyRecords(...strings) {
  records.push(...strings)
}

function createAllRecords(fn, limit = 1) {
  limit += records.length

  for (let i = records.length; i < limit; i++) {
    records.push(fn(i))
  }
}

function readOneRecord(offset = 0) {
  return records[offset]
}

function readManyRecords(offset = 0, limit = records.length) {
  return records.slice(offset, offset + limit)
}

function updateManyRecords(...strPairs) {
  const updatedIndices = []

  for (const [oldStr, newStr] of strPairs) {
    const i = records.indexOf(oldStr)

    if (i !== -1 && !updatedIndices.includes(i)) {
      records[i] = newStr
      updatedIndices.push(i)
    }
  }
}

function updateAllRecords(fn) {
  records = records.map(str => fn(str) ?? str)
}

function deleteManyRecords(...strings) {
  records = records.filter(str => !strings.includes(str))
}

function deleteAllRecords() {
  records = []
}
