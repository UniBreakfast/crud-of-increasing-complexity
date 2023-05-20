# The simple CRUD implementation with more functions

## What is this?

This is a simple CRUD implementation with more functions. It's a continuation of the [previous example](../0001-with-functions/README.md). It adds 8 more functions to perform CRUD operations to the 4 functions from the previous implementation. It is still in memory, so it's not persistent unless you save it manually by copying/pasting.

## How to use new functions?

To use these functions, you need to call them with the appropriate arguments. You can use any JavaScript REPL to do that. It can be a browser console, Node.js REPL or any kind of JavaScript sandbox offline or online. I personally prefer Chrome DevTools console, but I won't use anything browser specific here. So to perform CRUD operations we'll input JavaScript code to our runtime of choice to evaluate it.

### Create many

To add many new strings to our records, we need to call `createManyRecords` function with all the strings we want to add as arguments. It will add new elements to the end of the array.

```js
createManyRecords('record 1 text', 'record 2 text', 'record 3 text')
```

### Create all (as many as required that is)

To add as many new strings to our records as we need, we can to call `createAllRecords` with two arguments: a function that returns a string (it can generate it or get somewhere) and a count - how many strings should it make using that function. The index of the created string will be passed to the function as an argument, so it can use it to generate the string or ignore it.

```js
createAllRecords(i => `record ${i} text`, 5)
```

### Read one

To read one record, we need to call `readOneRecord` function with the index (offset) of the record we want to read as an argument. It will return the string at that index.

```js
readOneRecord(3) // 'record 4 text'
```

### Read many

To read many records, we need to call `readManyRecords` function with the index (offset) of the first record we want to read and the count of records we want to read as arguments. It will return an array of strings starting from the index and containing the count of records. If the count is more than the number of records, it will return all the records starting from the index. Useful for pagination.

```js
readManyRecords(3, 3) // ['record 4 text', 'record 5 text', 'record 6 text']
readManyRecords(6, 10) // ['record 7 text', 'record 8 text']
```

### Update many

To update many records, we need to call `updateManyRecords` function and pass it as many string pairs as we want to update. The first string in the pair is the old string and the second string is the new string. It will replace the first record that matches the old string (if there is one) with the new string, for each pair. It will not update the same record twice, neither if there were two records with the same string, nor if the record was updated in the previous pair and its updated value equals the old string in the next pair. It will simply ignore the pair if the old string is not found.

```js
updateManyRecords(
  ['record 4 text', 'record 4 text updated'],
  ['record 5 text', 'record 5 text updated'],
  ['record 6 text', 'record 6 text updated'],
  ['record 7 text', 'record 7 text updated'],
  ['record 8 text', 'record 8 text updated'],
  ['record 9 text', 'record 9 text updated'],
  ['record 10 text', 'record 10 text updated'],
)
```

### Update all (with new or old strings)

To update all or some records, we need to call `updateAllRecords` function and pass it another function that takes old record string and returns new record string, or nothing if it decides that the record should not be updated. 

```js
updateAllRecords(str => {
  if (!str.includes('updated')) return `updated ${str}`
})
```

### Delete many

To delete many records, we need to call `deleteManyRecords` function and pass it as many strings as we want to delete. It will delete the first record that matches the string (if there is one), for each string. It will not delete the same record twice, unless it is passed as an argument twice. It will simply ignore the string if it is not found.

```js
deleteManyRecords(
  'record 4 text updated',
  'record 5 text updated',
  'record 6 text updated',
  'record 7 text updated',
  'record 8 text updated',
  'record 9 text updated',
  'record 10 text updated',
)
```

### Delete all

To delete all records, we need to call `deleteAllRecords` function. It will delete all records. No questions asked.

```js
deleteAllRecords()
```

## The implementation details

<details>
  <summary>Base implementations was like this:</summary>

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

<details>
  <summary>On top of previous implementation, this one adds eight functions to perform rest of CRUD operations I can immediately think of:</summary>

  ```js
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
  ```

</details><br>

## Testing
