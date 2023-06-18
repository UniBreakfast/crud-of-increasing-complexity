<table>
  <tr>
    <td><a href="../0000-simplest-for-me/README.md">0000 simplest strings</a> <b>↴</b></td>
    <td>&nbsp; &nbsp; &nbsp;</td>
    <td></td>
  </tr>
  <tr>
    <td>&nbsp; &nbsp; <a href="../0001-with-functions/README.md">0001 with 4 functions</a> <b>↴</b></td>
    <td>&nbsp; &nbsp; &nbsp;</td>
    <td></td>
  </tr>
</table>

# [0022 A simple CRUD array of objects implementation with functions](https://github.com/UniBreakfast/crud-of-increasing-complexity/blob/master/0022-arr-of-objects-funcs/README.md)

## What is this?

This is a simple CRUD implementation with functions. It is based on the [array of strings implementation](../0001-with-functions/README.md) but it moves to objects in the array instead of strings. And the functions are changed to work with these objects instead of strings.

## How to use these functions?

To use these functions, you need to call them with the appropriate arguments. You can use any JavaScript REPL to do that. It can be a browser console, Node.js REPL or any kind of JavaScript sandbox offline or online. I personally prefer Chrome DevTools console, but I won't use anything browser specific here. So to perform CRUD operations we'll input JavaScript code to our runtime of choice to evaluate it.

### Create (one)

To add a new object to our items, we need to call `createOne` function with the object we want to add as an argument. It will add a new element to the end of the array.

```js
createOne({name: 'Red Maple', age: 75, height: 24.4})
createOne({name: 'Coast Fir', age: 200, height: 85.34})
createOne({name: 'Giant Sequoia', age: 3200, height: 83.8})
createOne({name: 'English Oak', age: 800, height: 28.3})
```

### Read (all)

To read all items, we need to call `readAll` function. It will return a cloned array of objects equal to the ones we have in our array.

```js
readAll() // (4) [{…}, {…}, {…}, {…}]
```

Check it again after updating and deleting some records with the next calls to see the changes.

### Update (one)

To update an object, we need to call `updateOne` function with the index and a second argument being an object with updated properties. Those will add/replace the properties of the object at the specified index.

```js
updateOne(1, {age: 202, height: 85.35})
updateOne(3, {status: 'deceased'})
```

We can also use `findOne` function to find the index of the object we want to update and then use that index to update the object.

```js
updateOne(findOne({age: 3200}), {age: 3201})
``` 

### Delete (one)

To delete an object, we need to call `deleteOne` function with the index of the object we want to delete as an argument. It will remove the object at the specified index if it exists.

```js
deleteOne(3)
```

We can also use `findOne` function to find the index of the object we want to delete and then use that index to delete the object.

```js
deleteOne(findOne({name: 'Red Maple'}))
```

## The implementation details

<details><summary>This implementation updates four functions to perform CRUD operations with objects and adds a function to find an object by its properties.</summary><br>

  ```js
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
  ```

</details><br>

## Testing

<details>
  <summary>To test these examples you can copy the implementation code above, paste into your REPL of choice and evaluate. And then add and run this code:</summary><br>
  
  ```js
  console.log("createOne({name: 'Red Maple', age: 75, height: 24.4})")
  createOne({name: 'Red Maple', age: 75, height: 24.4})
  console.log("createOne({name: 'Coast Fir', age: 200, height: 85.34})")
  createOne({name: 'Coast Fir', age: 200, height: 85.34})
  console.log("createOne({name: 'Giant Sequoia', age: 3200, height: 83.8})")
  createOne({name: 'Giant Sequoia', age: 3200, height: 83.8})
  console.log("createOne({name: 'English Oak', age: 800, height: 28.3})")
  createOne({name: 'English Oak', age: 800, height: 28.3})

  console.log('readAll()')
  console.log(readAll())
  // (4) [{…}, {…}, {…}, {…}]

  console.log("updateOne(1, {age: 202, height: 85.35})")
  updateOne(1, {age: 202, height: 85.35})
  console.log("updateOne(3, {status: 'deceased'})")
  updateOne(3, {status: 'deceased'})
  console.log("updateOne(findOne({age: 3200}), {age: 3201})")
  updateOne(findOne({age: 3200}), {age: 3201})

  console.log('readAll()')
  console.log(readAll())
  // (4) [{…}, {name: 'Coast Fir', age: 202, height: 85.35}, {name: 'Giant Sequoia', age: 3201, height: 83.8}, {name: 'English Oak', age: 800, height: 28.3, status: 'deceased'}]

  console.log("deleteOne(0)")
  deleteOne(0)
  console.log("deleteOne(findOne({status: 'deceased'}))")
  deleteOne(findOne({status: 'deceased'}))
  console.log("deleteOne(findOne({name: 'Birch'}))")
  deleteOne(findOne({name: 'Birch'}))

  console.log('readAll()')
  console.log(readAll())
  // (2) [{…}, {…}]
  ```

  And then you can compare the actual output with the expected output in the comments.
</details><br>

## Persistency of data

This implementation is in memory, so it's not persistent between runs. If you want to persist the data, you can copy the array to any kind of persistent storage and paste it back at any point in time or on the next run. You can use `JSON.stringify` to convert the array to one string and concatenate an initialization statement to make it really easy.

```js
'var items = ' + JSON.stringify(items) // 'var items = [{"name":"Coast Fir","age":202,"height":85.35},{"name":"Giant Sequoia","age":3201,"height":83.8}]'
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
- Add persistency
- Add ids to records
- Store data to files
- Introduce a database

### Scale Up
- Scale up the system (consider different scaling strategies)
- Make it a client-server application
- Add an API for communication between client and server

... the possibilities are indeed endless!
