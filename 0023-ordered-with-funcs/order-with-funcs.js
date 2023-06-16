var records = []

function createOneRecord(str, pos) {
  if (pos === undefined) records.push(str)
  else records.splice(pos, 0, str)
}

function readAllRecords(indexed) {
  if (!indexed) return [...records]
  
  return Object.fromEntries(Object.entries(records))
}

function updateOneRecord(i, str) {
  if (records[i] !== undefined) records[i] = str
}

function deleteOneRecord(i) {
  if (records[i] !== undefined) records.splice(i, 1)
}

function findOneRecord(str) {
  return records.indexOf(str)
}

function moveOneRecord(from, to) {
  if (records[from] !== undefined && records[to] !== undefined) {
    records.splice(to, 0, records.splice(from, 1)[0])
  }
}
