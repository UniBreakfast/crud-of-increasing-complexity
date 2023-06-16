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
</table>

# [0023 A simple ordered list CRUD implementation with functions](https://github.com/UniBreakfast/crud-of-increasing-complexity/blob/master/0023-ordered-with-funcs/README.md)

## What is this?

This is a simple CRUD implementation with functions for an ordered list of strings. It is based on the [previous simplest one](../0001-with-functions/README.md) but this time the order is important. So we can specify the position of the record we add, update or delete. We can find the position of a record by its string. And we can move a record to a different position.

## How to use these?

To use these functions, you need to call them with the appropriate arguments. You can use any JavaScript REPL to do that. It can be a browser console, Node.js REPL or any kind of JavaScript sandbox offline or online. I personally prefer Chrome DevTools console, but I won't use anything browser specific here. So to perform CRUD operations we'll input JavaScript code to our runtime of choice to evaluate it.

### Create (one)

To add a new string to our records, we need to call `createOneRecord` function with the string we want to add. It will add a new element to the end of the array.

```js
createOneRecord('record 1 text')
createOneRecord('record 2 text')
```

But we can also specify the position of the new record. To do that we need to call `createOneRecord` function with the string we want to add and the position we want to add it to as arguments. It will add a new element to the specified position of the array.

```js
createOneRecord('record 3 text', 1) // this adds the third record between the first and the second
createOneRecord('record 4 text', 0) // this adds the fourth record before the previous three
```

### Read (all)

To read all records, we need to call `readAllRecords` function. It will return the array of all records.

```js
readAllRecords() // ['record 4 text', 'record 1 text', 'record 3 text', 'record 2 text']
```

But we can also pass `true` as an argument to get an object with keys clearly indicating positions and values as records.

```js
readAllRecords(true) // {0: 'record 4 text', 1: 'record 1 text', 2: 'record 3 text', 3: 'record 2 text'}
```

Check it again after updating and deleting some records with the next calls to see the changes.

### Update (one)

To update a record, we need to call `updateOneRecord` function with the position of the record we want to update and the new string as arguments. It will replace the record at the specified position with the new string.

```js
updateOneRecord(3, 'record 2 text updated')
updateOneRecord(5, 'record 5 text updated') // this will not update anything
```

We can find the position of a record by its string first. To do that we need to call `findOneRecord` function with the string we want to find. It will return the position of the first record that matches the string (if there is one).

```js
updateOneRecord(findOneRecord('record 3 text'), 'record 3 text updated')
```

If we need to update position of a record, we need to call `moveOneRecord` function with the current position of the record and the new position as arguments. It will move the record from the current position to the new position.

```js
moveOneRecord(3, 1)
moveOneRecord(5, 0) // this will not move anything
```

### Delete (one)

To delete a record, we need to call `deleteOneRecord` function with the position of the record we want to delete as an argument. It will remove the record at the specified position.

```js
deleteOneRecord(4)
deleteOneRecord(5) // this will not delete anything
```

We can find the position of a record by its string first. To do that we need to call `findOneRecord` function with the string we want to find. It will return the position of the first record that matches the string (if there is one).

```js
deleteOneRecord(findOneRecord('record 2 text updated'))
```

## The implementation details

<details><summary>Previous implementation was changed to be centered around indices this time as the order is really important now.</summary><br>

  ```js
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
  ```

</details><br>

## Testing

<details>
  <summary>To test these examples you can copy the implementation code above, paste into your REPL of choice and evaluate. And then add and run this code:</summary><br>
  
  ```js
  console.log("createOneRecord('record 1 text')")
  createOneRecord('record 1 text')
  console.log("createOneRecord('record 2 text')")
  createOneRecord('record 2 text')
  console.log("createOneRecord('record 3 text', 1)")
  createOneRecord('record 3 text', 1)
  console.log("createOneRecord('record 4 text', 0)")
  createOneRecord('record 4 text', 0)

  console.log('readAllRecords()')
  console.log(readAllRecords())
  // (4) ['record 4 text', 'record 1 text', 'record 3 text', 'record 2 text']

  console.log('readAllRecords(true)')
  console.log(readAllRecords(true))
  // {0: 'record 4 text', 1: 'record 1 text', 2: 'record 3 text', 3: 'record 2 text'}

  console.log("updateOneRecord(3, 'record 2 text updated')")
  updateOneRecord(3, 'record 2 text updated')
  console.log("updateOneRecord(5, 'record 5 text updated')")
  updateOneRecord(5, 'record 5 text updated')
  console.log("updateOneRecord(findOneRecord('record 3 text'), 'record 3 text updated')")
  updateOneRecord(findOneRecord('record 3 text'), 'record 3 text updated')

  console.log('readAllRecords()')
  console.log(readAllRecords())
  // (4) ['record 4 text', 'record 1 text', 'record 3 text updated', 'record 2 text updated']

  console.log("moveOneRecord(3, 1)")
  moveOneRecord(3, 1)
  console.log("moveOneRecord(5, 0)")
  moveOneRecord(5, 0)

  console.log('readAllRecords()')
  console.log(readAllRecords())
  // (4) ['record 4 text', 'record 2 text updated', 'record 1 text', 'record 3 text updated']

  console.log("deleteOneRecord(4)")
  deleteOneRecord(4)
  console.log("deleteOneRecord(5)")
  deleteOneRecord(5)
  console.log("deleteOneRecord(findOneRecord('record 2 text updated'))")
  deleteOneRecord(findOneRecord('record 2 text updated'))

  console.log('readAllRecords(true)')
  console.log(readAllRecords(true))
  // {0: 'record 4 text', 1: 'record 1 text', 2: 'record 3 text updated'}
  ```

  And then you can compare the actual output with the expected output in the comments.
</details><br>

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
