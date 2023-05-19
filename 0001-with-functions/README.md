# The simplest CRUD implementation with functions

## What is this?

This is the simplest CRUD implementation (for me) with functions. It is based on the [simplest implementation](../0000-simplest-for-me) and it adds four obvious functions to perform CRUD operations. If unsure what to make of it start [there](../0000-simplest-for-me).

## How to use these?

To use these functions, you need to call them with the appropriate arguments. You can use any JavaScript REPL to do that. It can be a browser console, Node.js REPL or any kind of JavaScript sandbox offline or online. I personally prefer Chrome DevTools console, but I won't use anything browser specific here. So to perform CRUD operations we'll input JavaScript code to our runtime of choice to evaluate it.

### Create (one)

To add a new string to our records, we need to call `createOneRecord` function with the string we want to add as an argument. It will add a new element to the end of the array.

```js
createOneRecord('record 1 text')
createOneRecord('record 2 text')
createOneRecord('record 3 text')
createOneRecord('record 4 text')
```

### Read (all)

To read all records, we need to call `readAllRecords` function. It will return the array of all records.

```js
readAllRecords() // ['record 1 text', 'record 2 text', 'record 3 text', 'record 4 text']
```

Check it again after updating and deleting some records with the next calls to see the changes.

### Update (one)

To update a record, we need to call `updateOneRecord` function with the old string and the new string as arguments. It will replace the first record that matches the old string (if there is one) with the new string.

```js
updateOneRecord('record 2 text', 'record 2 text updated')
updateOneRecord('record 3 text', 'record 3 text updated')
updateOneRecord('record 5 text', 'record 5 text updated')
```

### Delete (one)

To delete a record, we need to call `deleteOneRecord` function with the string we want to delete as an argument. It will remove the first record that matches the string (if there is one).

```js
deleteOneRecord('record 4 text')
deleteOneRecord('record 2 text updated')
deleteOneRecord('record 5 text')
```

## The implementation details

On top of [previous implementation](../0000-simplest-for-me), 
<details><summary>this one adds four functions to perform CRUD operations.</summary>

```js
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
```

</details><br>

## Testing

<details>
  <summary>To test these examples you can copy the implementation code above, paste into your REPL of choice and evaluate. And then add and run this code:</summary>
  
  ```js
  console.log("createOneRecord('record 1 text')")
  createOneRecord('record 1 text')
  console.log("createOneRecord('record 2 text')")
  createOneRecord('record 2 text')
  console.log("createOneRecord('record 3 text')")
  createOneRecord('record 3 text')
  console.log("createOneRecord('record 4 text')")
  createOneRecord('record 4 text')
  
  console.log('readAllRecords()')
  console.log(readAllRecords())
  // (4) ['record 1 text', 'record 2 text', 'record 3 text', 'record 4 text']
  
  console.log("updateOneRecord('record 2 text', 'record 2 text updated')")
  updateOneRecord('record 2 text', 'record 2 text updated')
  console.log("updateOneRecord('record 3 text', 'record 3 text updated')")
  updateOneRecord('record 3 text', 'record 3 text updated')
  console.log("updateOneRecord('record 5 text', 'record 5 text updated')")
  updateOneRecord('record 5 text', 'record 5 text updated')
  
  console.log('readAllRecords()')
  console.log(readAllRecords())
  // (4) ['record 1 text', 'record 2 text updated', 'record 3 text updated', 'record 4 text']
  
  console.log("deleteOneRecord('record 4 text')")
  deleteOneRecord('record 4 text')
  console.log("deleteOneRecord('record 2 text updated')")
  deleteOneRecord('record 2 text updated')
  console.log("deleteOneRecord('record 5 text')")
  deleteOneRecord('record 5 text')
  
  console.log('readAllRecords()')
  console.log(readAllRecords())
  // (2) ['record 1 text', 'record 3 text updated']
  ```
  
  And then you can compare the actual output with the expected output in the comments.
</details><br>

## What's next?

- [add more CRUD functions](../0002-more-functions)
- add CRUD methods
- add persistency
- add UI
- add CLI
- scale up
- add ids
- add validation
- add feedback
- make client-server
- add API
- add database
- store to files
- remove direct access to records
  
... the possibilities are endless
