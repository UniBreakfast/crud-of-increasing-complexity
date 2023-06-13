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

# [0020 The simplest CRUD implementation with methods](https://github.com/UniBreakfast/crud-of-increasing-complexity/blob/master/0020-with-methods/README.md)

## What is this?

This is the simplest CRUD implementation (for me) with methods. It is based on the [simplest implementation with functions](../0001-with-functions/README.md) and it changes four functions to be records array methods instead. They are still perform CRUD operations.

## How to use these?

To use these methods, you need to call them with the appropriate arguments. You can use any JavaScript REPL to do that. It can be a browser console, Node.js REPL or any kind of JavaScript sandbox offline or online. I personally prefer Chrome DevTools console, but I won't use anything browser specific here. So to perform CRUD operations we'll input JavaScript code to our runtime of choice to evaluate it.

### Create (one)

To add a new string to our records, we need to call `records.createOneRecord()` method with the string we want to add as an argument. It will add a new element to the end of the array.

```js
records.createOneRecord('record 1 text')
records.createOneRecord('record 2 text')
records.createOneRecord('record 3 text')
records.createOneRecord('record 4 text')
```

### Read (all)

To read all records, we need to call `records.readAllRecords()` method. It will return the array of all records.

```js
records.readAllRecords() // ['record 1 text', 'record 2 text', 'record 3 text', 'record 4 text']
```

Check it again after updating and deleting some records with the next calls to see the changes.

### Update (one)

To update a record, we need to call `records.updateOneRecord()` method with the old string and the new string as arguments. It will replace the first record that matches the old string (if there is one) with the new string.

```js
records.updateOneRecord('record 2 text', 'record 2 text updated')
records.updateOneRecord('record 3 text', 'record 3 text updated')
records.updateOneRecord('record 5 text', 'record 5 text updated')
```

### Delete (one)

To delete a record, we need to call `records.deleteOneRecord()` method with the string we want to delete as an argument. It will remove the first record that matches the string (if there is one).

```js
records.deleteOneRecord('record 4 text')
records.deleteOneRecord('record 2 text updated')
records.deleteOneRecord('record 5 text')
```

## The implementation details

<details><summary>This implementation adds four methods to perform CRUD operations.</summary>

  ```js
  var records = Object.assign([], {
    createOneRecord(str) {
      this.push(str)
    },

    readAllRecords() {
      return [...this]
    },

    updateOneRecord(oldStr, newStr) {
      const i = this.indexOf(oldStr)

      if (i !== -1) this[i] = newStr
    },
    
    deleteOneRecord(str) {
      const i = this.indexOf(str)

      if (i !== -1) this.splice(i, 1)
    },
  })
  ```

</details><br>

## Testing

<details>
  <summary>To test these examples you can copy the implementation code above, paste into your REPL of choice and evaluate. And then add and run this code:</summary><br>
  
  ```js
  console.log("records.createOneRecord('record 1 text')")
  records.createOneRecord('record 1 text')
  console.log("records.createOneRecord('record 2 text')")
  records.createOneRecord('record 2 text')
  console.log("records.createOneRecord('record 3 text')")
  records.createOneRecord('record 3 text')
  console.log("records.createOneRecord('record 4 text')")
  records.createOneRecord('record 4 text')
  
  console.log('records.readAllRecords()')
  console.log(records.readAllRecords())
  // (4) ['record 1 text', 'record 2 text', 'record 3 text', 'record 4 text']
  
  console.log("records.updateOneRecord('record 2 text', 'record 2 text updated')")
  records.updateOneRecord('record 2 text', 'record 2 text updated')
  console.log("records.updateOneRecord('record 3 text', 'record 3 text updated')")
  records.updateOneRecord('record 3 text', 'record 3 text updated')
  console.log("records.updateOneRecord('record 5 text', 'record 5 text updated')")
  records.updateOneRecord('record 5 text', 'record 5 text updated')
  
  console.log('records.readAllRecords()')
  console.log(records.readAllRecords())
  // (4) ['record 1 text', 'record 2 text updated', 'record 3 text updated', 'record 4 text']
  
  console.log("records.deleteOneRecord('record 4 text')")
  records.deleteOneRecord('record 4 text')
  console.log("records.deleteOneRecord('record 2 text updated')")
  records.deleteOneRecord('record 2 text updated')
  console.log("records.deleteOneRecord('record 5 text')")
  records.deleteOneRecord('record 5 text')
  
  console.log('records.readAllRecords()')
  console.log(records.readAllRecords())
  // (2) ['record 1 text', 'record 3 text updated']
  ```
  
  And then you can compare the actual output with the expected output in the comments.
</details><br>

## What's next?

### Improve Functionality
- Add validation
- Remove direct access to records

### Enhance Interaction
- Add UI (think about which frameworks you might want to use)
- Add CLI
- Add feedback (consider different types of feedback, such as validation errors)

### Enhance Data Management
- Add persistency
- Add ids to records
- Store data to files
- Introduce a database

### Scale Up
- Scale up the system (consider different scaling strategies)
- Make it a client-server application
- Add an API for communication between client and server

... the possibilities are indeed endless!
