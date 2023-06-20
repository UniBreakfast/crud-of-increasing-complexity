<table>
  <tr>
    <td><a href="../0000-simplest-for-me/README.md">0000 simplest</a> <b>↴</b></td>
    <td>&nbsp; &nbsp; &nbsp;</td>
    <td></td>
  </tr>
  <tr>
    <td>&nbsp; &nbsp; <a href="../0001-with-functions/README.md">0001 with 4 functions</a> <b>↴</b></td>
    <td>&nbsp; &nbsp; &nbsp;</td>
    <td></td>
  </tr>
  <tr>
    <td>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <a href="../0023-ordered-with-funcs/README.md">0023 ordered array</a> <b>↴</b></td>
    <td>&nbsp; &nbsp; &nbsp;</td>
    <td></td>
  </tr>
  <tr>
    <td><a href="../0024-ordered-groups/README.md">0024 ordered groups of arrays</a> <b>↴</b></td>
    <td>&nbsp; &nbsp; &nbsp;</td>
    <td></td>
  </tr>
</table>

# [0025 An ordered list of groups of ordered records CRUD implementation with functions in browser](https://github.com/UniBreakfast/crud-of-increasing-complexity/blob/master/0025-ord-groups-in-browser/README.md)

## What is this?

This is a CRUD implementation with functions for an ordered list of groups of ordered strings. It's basically a two-level ordered list. It is based on the previous [non-platform-specific implementation](../0024-ordered-groups/README.md) but this one is for a browser. Still we can specify the group we want our record to be in and the position of the record we add, update or delete. We can find the position of a group by it's name or a record by its string. And we can move a group or a record to a different position. It's only that now we can use the browser console to perform CRUD operations with our twelve special functions.

## How to use these functions?

There's no UI in this implementation, so we'll have to use a browser console. I personally prefer Chrome DevTools console, but I won't use anything Chrome specific here. So to perform CRUD operations we'll input JavaScript code to our console to evaluate it.

### Groups

#### Create one group

To add a new group for our records, we need to call `createOneGroup` function with the name of the group we want to add. It will add a new property with an array to the group dictionary.

```js
createOneGroup('group 1')
createOneGroup('group 2')
```

We can also specify the position of the new group. To do that we need to call `createOneGroup` function with the name of the group we want to add and the position we want to add it to as arguments. It will add a new property with an array to the group dictionary at the specified position.

```js
createOneGroup('group 3', 1) // this adds the third group between the first and the second
```

#### Read all groups

To read all groups, we need to call `readAllGroups` function. It will return all the group names in an array.

```js
readAllGroups() // (3) ['group 1', 'group 3', 'group 2']
```

But we can also pass `true` as an argument to get a copy of the group dictionary with the records in it (imagine we have some records in there already).

```js
readAllGroups(true) // {'group 1': ['record 4'], 'group 3': ['record 1', 'record 3'], 'group 2': ['record 2']}
```

If we want to get clearly numbered list of group names, we can pass `false` as the first and `true` as the second argument to get an object with keys clearly indicating positions of the groups.

```js
readAllGroups(false, true) // {0: 'group 1', 1: 'group 3', 2: 'group 2'}
```

Finally, we can pass `true` as the first and `true` as the second argument to get an object with keys clearly indicating positions of the groups and records both.

```js
readAllGroups(true, true) // { 0: { 'group 1': { 0: 'record 4' } }, 1: { 'group 3': { 0: 'record 1', 1: 'record 3' } }, 2: { 'group 2': { 0: 'record 2' } } }
```

#### Update one group

To update a group, we need to call `updateOneGroup` function with the old name of the group we want to update and the new name as arguments. It will replace the group name with the new one.

```js
updateOneGroup('group 3', 'group 3 updated')
updateOneGroup('group 5', 'group 5 updated') // this will not update anything
```

We can also update group position. To do that we need to call `moveOneGroup` function with the current position of the group and the new position as arguments. It will move the group from the current position to the new position.

```js
moveOneGroup(2, 1)
moveOneGroup(5, 0) // this will not move anything
```

And if we don't know the position of the group we want to move but we know the name, we can use `findOneGroup` function to find the position of the group first. It will return the position of the first group that matches the name (if there is one).

```js
moveOneGroup(findOneGroup('group 3 updated'), 0)
```

#### Delete one group

To delete a group, we need to call `deleteOneGroup` function with the name of the group we want to delete as an argument. It will remove the group from the group dictionary.

```js
deleteOneGroup('group 3 updated')
deleteOneGroup('group 5 updated') // this will not delete anything
```

### Records

#### Create one record

To add a new string to our records, we need to call `createOneRecord` function with the name of the group we want to add the record to and the string we want to add. It will add a new element to the end of the array.

```js
createOneRecord('group 3', 'record 1')
createOneRecord('group 2', 'record 2')
```

But we can also specify the position of the new record. To do that we need to call `createOneRecord` function with the name of the group we want to add the record to, the string we want to add and the position we want to add it to as arguments. It will add a new element to the specified position of the array.

```js
createOneRecord('group 3', 'record 3', 1)
createOneRecord('group 1', 'record 4', 0)
```

And we can add a record to a group that doesn't exist yet. To do that we need to call `createOneRecord` function with the name of the group we want to add the record to and the string we want to add. It will add a new group with the record to the group dictionary.

```js
createOneRecord('group 4', 'record 5')
```

#### Read all records

To read all records, we need to call `readAllRecords` function. It will return all the records from all the groups in an array.

```js
readAllRecords() // (5) ['record 4', 'record 1', 'record 3', 'record 2', 'record 5']
```

But we can also pass the name of the group we want to read records from as an argument to get only the records from that group.

```js
readAllRecords('group 3') // (2) ['record 1', 'record 3']
```

We can also pass `true` as the second argument to get a clearly numbered list of records.

```js
readAllRecords('group 3', true) // {0: 'record 1', 1: 'record 3'}
```

#### Update one record

To update a record, we need to call `updateOneRecord` function with the name of the group we want to update the record in, the position of the record we want to update and the new string as arguments. It will replace the record with the new string.

```js
updateOneRecord('group 3', 1, 'record 3 updated')
updateOneRecord('group 3', 5, 'record 5 updated') // this will not update anything
```

We can also update record position. To do that we need to call `moveOneRecord` function with the name of the group we want to move the record in, the current position of the record and the new position as arguments. It will move the record from the current position to the new position.

```js
moveOneRecord('group 3', 1, 0)
moveOneRecord('group 3', 5, 0) // this will not move anything
```

And if we don't know the position of the record we want to change or move but we know the string itself, we can use `findOneRecord` function to find the position of the record first. It will return the position of the first record that matches the string (if there is one).

```js
const record3Pos = findOneRecord('record 3 updated', 'group 3')
updateOneRecord('group 3', record3Pos, 'record 3')
moveOneRecord('group 3', record3Pos, 1)
```

We can find the group name by the record string as well. To do that we need to call `findOneRecord` function with the string we want to find and omit the group name. It will return the name of the first group that contains the record (if there is one) and the position of the record in that group both.

```js
const [groupName, recordPos] = findOneRecord('record 5')
```

... and we can move a record from one group to another. To do that we need to call `moveOneRecord` function with the name of the group we want to move the record from, the position of the record we want to move, the position we want to move it to and the name of the group we want to move the record to as arguments. It will move the record from the current group and position to the new group and position.

```js
moveOneRecord(groupName, recordPos, 0, 'group 1')
```

#### Delete one record

To delete a record, we need to call `deleteOneRecord` function with the name of the group we want to delete the record from and the position of the record we want to delete as arguments. It will remove the record from the group.

```js
deleteOneRecord('group 3', 1)
deleteOneRecord('group 3', 5) // this will not delete anything
```

## The implementation details

<details><summary>It's basically the same implementations that was previously. Only an html page was added to use it in a browser console. There's nothing on that page but the guide on how to open the console and input functions calls.</summary><br>

  ### JS

  ```js
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
      return fromEntries(keys(groupDict))
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
      groupDict[groupNames[i]] = groups[i]
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
  ```

</details><br>

## Testing

<details>
  <summary>You can test it manually by opening <a href="https://unibreakfast.github.io/crud-of-increasing-complexity/0025-ord-groups-in-browser">the page</a> and then you can copy the code below, paste into your browser Developer Tools console and evaluate this code:</summary><br>
  
  ```js
  console.log("createOneGroup('group 1')")
  createOneGroup('group 1')
  console.log("createOneGroup('group 2')")
  createOneGroup('group 2')
  console.log("createOneGroup('group 3', 1)")
  createOneGroup('group 3', 1)
  console.log("createOneGroup('group 4', 3)")
  createOneGroup('group 4', 3)

  console.log("readAllGroups()")
  console.log(readAllGroups())
  // (3) ["group 1", "group 3", "group 2", "group 4"]

  console.log("readAllGroups(true)")
  console.log(readAllGroups(true))
  // {group 1: Array(0), group 3: Array(0), group 2: Array(0), group 4: Array(0)}

  console.log("readAllGroups(false, true)")
  console.log(readAllGroups(false, true))
  // {group 1: [], group 3: [], group 2: [], group 4: []}

  console.log("updateOneGroup('group 2', 'Group2')")
  updateOneGroup('group 2', 'Group2')
  console.log("updateOneGroup('group 5', 'group 5 updated')")
  updateOneGroup('group 5', 'group 5 updated')

  console.log("readAllGroups()")
  console.log(readAllGroups())
  // (3) ["group 1", "group 3", "Group2", "group 4"]

  console.log("moveOneGroup(2, 1)")
  moveOneGroup(2, 1)
  console.log("moveOneGroup(5, 0)")
  moveOneGroup(5, 0)

  console.log("readAllGroups()")
  console.log(readAllGroups())
  // (3) ["group 1", "Group2", "group 3", "group 4"]

  console.log("moveOneGroup(findOneGroup('Group2'), 2)")
  moveOneGroup(findOneGroup('Group2'), 2)

  console.log("readAllGroups()")
  console.log(readAllGroups())
  // (3) ["group 1", "group 3", "Group2", "group 4"]

  console.log("deleteOneGroup('group 4')")
  deleteOneGroup('group 4')
  console.log("deleteOneGroup('group 5')")
  deleteOneGroup('group 5')

  console.log("readAllGroups()")
  console.log(readAllGroups())
  // (3) ["group 1", "group 3", "Group2"]

  console.log("createOneRecord('group 3', 'record 1')")
  createOneRecord('group 3', 'record 1')
  console.log("createOneRecord('Group2', 'record 2')")
  createOneRecord('Group2', 'record 2')
  console.log("createOneRecord('group 3', 'record 3', 1)")
  createOneRecord('group 3', 'record 3', 1)
  console.log("createOneRecord('group 1', 'record 4', 0)")
  createOneRecord('group 1', 'record 4', 0)
  console.log("createOneRecord('group 4', 'record 5', 0)")
  createOneRecord('group 4', 'record 5', 0)

  console.log("readAllGroups(true)")
  console.log(readAllGroups(true))
  // {group 1: ["record 4"], group 3: ["record 1", "record 3"], Group2: ["record 2"], group 4: ["record 5"]}

  console.log("readAllRecords()")
  console.log(readAllRecords())
  // (5) ["record 4", "record 1", "record 3", "record 2", "record 5"]

  console.log("readAllRecords('group 3')")
  console.log(readAllRecords('group 3'))
  // (2) ["record 1", "record 3"]

  console.log("readAllRecords('group 3', true)")
  console.log(readAllRecords('group 3', true))
  // {0: "record 1", 1: "record 3"}

  console.log("updateOneRecord('group 3', 1, 'record 3 updated')")
  updateOneRecord('group 3', 1, 'record 3 updated')
  console.log("updateOneRecord('group 3', 5, 'record 5 updated')")
  updateOneRecord('group 3', 5, 'record 5 updated')

  console.log("readAllRecords('group 3')")
  console.log(readAllRecords('group 3'))
  // (2) ["record 1", "record 3 updated"]

  console.log("moveOneRecord('group 3', 1, 0)")
  moveOneRecord('group 3', 1, 0)
  console.log("moveOneRecord('group 3', 5, 0)")
  moveOneRecord('group 3', 5, 0)

  console.log("readAllRecords('group 3')")
  console.log(readAllRecords('group 3'))
  // (2) ["record 3 updated", "record 1"]

  console.log("const record3Pos = findOneRecord('record 3 updated', 'group 3')")
  const record3Pos = findOneRecord('record 3 updated', 'group 3')
  console.log("updateOneRecord('group 3', record3Pos, 'record 3')")
  updateOneRecord('group 3', record3Pos, 'record 3')
  console.log("moveOneRecord('group 3', record3Pos, 1)")
  moveOneRecord('group 3', record3Pos, 1)

  console.log("readAllRecords('group 3')")
  console.log(readAllRecords('group 3'))
  // (2) ["record 1", "record 3"]

  console.log("const [groupName, recordPos] = findOneRecord('record 5')")
  const [groupName, recordPos] = findOneRecord('record 5')
  console.log("moveOneRecord(groupName, recordPos, 0, 'group 1')")
  moveOneRecord(groupName, recordPos, 0, 'group 1')

  console.log("readAllRecords('group 1')")
  console.log(readAllRecords('group 1'))
  // (2) ["record 5", "record 4"]

  console.log("deleteOneRecord('group 3', 1)")
  deleteOneRecord('group 3', 1)
  console.log("deleteOneRecord('group 3', 5)")
  deleteOneRecord('group 3', 5)

  console.log("readAllRecords('group 3')")
  console.log(readAllRecords('group 3'))
  // (2) ["record 1"]
  ```

  And then you can compare the actual output with the expected output in the comments.
</details><br>

## Persistency of data

This implementation is in memory, so it's not persistent between runs. If you want to persist the data, you can copy the array to any kind of persistent storage and paste it back at any point in time or on the next run. You can use `JSON.stringify` to convert the array to one string and concatenate an initialization statement to make it really easy.

```js
'var groupDict = ' + JSON.stringify(groupDict) // 'var groupDict = {"group 1":["record 5","record 4"],"group 3":["record 1"],"Group2":["record 2"],"group 4":[]}'
```

## What's next?

### Improve Functionality
- Add more CRUD functions
- Add CRUD methods
- Add validation
- Remove direct access to records

### Enhance Interaction
- Add UI (think about which frameworks you might want to use)
- Add CLI
- Add feedback (consider different types of feedback, such as validation errors)

### Enhance Data Management
- Switch to array of objects
- Add persistency
- Add ids to records
- Store data to files
- Introduce a database

### Scale Up
- Scale up the system (consider different scaling strategies)
- Make it a client-server application
- Add an API for communication between client and server

... the possibilities are indeed endless!
