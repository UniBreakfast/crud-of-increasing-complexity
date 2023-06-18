const { keys, values, entries, fromEntries } = Object
const { stringify, parse } = JSON
var groupDict = {}

function createOneGroup(name, pos) {
  if (groupDict[name] !== undefined) return

  groupDict[name] = []

  if (pos !== undefined) moveOneGroup(keys(groupDict).length - 1, pos)
}

function readAllGroups(withRecords, indexed) {
  if (!withRecords) {
    if (!indexed) return keys(groupDict)

    return fromEntries(entries(keys(groupDict)))
  }

  if (!indexed) return parse(stringify(groupDict))

  return fromEntries(entries(
    entries(groupDict).map(
      ([name, group]) => fromEntries(
        [[name, fromEntries(entries(group))]]
      )
    )
  ))
}

function updateOneGroup(name, newName) {
  if (groupDict[name] === undefined) return

  const groupNames = keys(groupDict)
  const groups = values(groupDict)
  const i = groupNames.indexOf(name)
  const restOfNames = groupNames.slice(i + 1)
  const restOfGroups = groups.slice(i + 1)

  delete groupDict[name]

  for (const key of restOfNames) delete groupDict[key]

  groupDict[newName] = groups[i]

  for (let j = 0; j < restOfNames.length; j++) {
    groupDict[restOfNames[j]] = restOfGroups[j]
  }
}

function deleteOneGroup(name) {
  delete groupDict[name]
}

function findOneGroup(name) {
  return keys(groupDict).indexOf(name)
}

function moveOneGroup(from, to) {
  const groupNames = keys(groupDict)
  
  if (from == to || groupNames[from] === undefined || groupNames[to] === undefined) return

  const groups = values(groupDict)
  const min = Math.min(from, to)
  
  groupNames.splice(to, 0, groupNames.splice(from, 1)[0])
  groups.splice(to, 0, groups.splice(from, 1)[0])

  const restOfNames = groupNames.slice(min)

  for (const name of restOfNames) delete groupDict[name]

  for (let i = 0; i < restOfNames.length; i++) {
    groupDict[groupNames[i + min]] = groups[i + min]
  }
}

function createOneRecord(groupName, str, pos) {
  if (groupDict[groupName] === undefined) {
    groupDict[groupName] = []
  }

  if (pos === undefined) groupDict[groupName].push(str)
  else groupDict[groupName].splice(pos, 0, str)
}

function readAllRecords(groupName, indexed) {
  if (groupName) {
    if (groupDict[groupName] === undefined) return null

    if (!indexed) return groupDict[groupName]

    return fromEntries(entries(groupDict[groupName]))
  }

  return Object.values(groupDict).flat()
}

function updateOneRecord(groupName, i, str) {
  const records = groupDict[groupName]

  if (records === undefined) return
  
  if (records[i] !== undefined) records[i] = str
}

function deleteOneRecord(groupName, i) {
  const records = groupDict[groupName]

  if (records === undefined) return

  if (records[i] !== undefined) records.splice(i, 1)
}

function findOneRecord(str, groupName) {
  if (groupName !== undefined) {
    const records = groupDict[groupName]

    if (records === undefined) return -1

    return records.indexOf(str)
  }

  for (const [groupName, records] of entries(groupDict)) {
    const i = records.indexOf(str)

    if (i !== -1) return [groupName, i]
  }

  return [, -1]
}

function moveOneRecord(groupName1, from, to, groupName2 = groupName1) {
  if (groupDict[groupName1] === undefined || groupDict[groupName2] === undefined || groupName1 == groupName2 && from == to || groupDict[groupName1][from] === undefined || groupDict[groupName2][to] === undefined) return

  groupDict[groupName2].splice(to, 0, groupDict[groupName1].splice(from, 1)[0])
}
