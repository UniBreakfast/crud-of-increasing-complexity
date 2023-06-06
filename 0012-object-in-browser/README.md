<table>
  <tr>
    <td><a href="../0000-simplest-for-me/README.md">0000 simplest</a> <b>↴</b></td>
    <td>&nbsp; &nbsp; &nbsp;</td>
    <td></td>
  </tr>
  <tr>
    <td>&nbsp; &nbsp; <a href="../0011-simplest-object/README.md">0011 as an object</a> <b>↴</b></td>
    <td>&nbsp; &nbsp; &nbsp;</td>
    <td></td>
  </tr>
</table>

# [0012 Simple CRUD object implementation in the browser](https://github.com/UniBreakfast/crud-of-increasing-complexity/blob/master/0012-object-in-browser/README.md)

## What is this?

This is a simple CRUD implementation for JavaScript in a browser. It is based on the [simple implementation as an object](../0011-simplest-object/README.md) which was not platform-specific. It's in memory without any persistent storage between runs for the sake of simplicity. Here, I will list the operations, describe how they are supposed to be performed, and provide their implementations.

## What is CRUD?

CRUD is an acronym for Create, Read, Update and Delete. It's a set of operations that are usually performed on data. It's a common set of operations for databases, but it can be used for any kind of data. In this case I will use it for a simple object with string values. The minimum set of operations I have in mind for this particular simplest implementation includes:

- Create (one): add a new string property to the object
- Read (all): get all strings values from the object 
- Update (one): change a string value in the object property
- Delete (one): remove a propery with certain value from the object

I will not implement any other operations, like read individual items or delete all, because I want to keep this implementation as simple as it is acceptable for me.

## How to perform CRUD operations?

There's no UI in this simplest implementation, so we'll have to use a browser console. I personally prefer Chrome DevTools console, but I won't use anything Chrome specific here. So to perform CRUD operations we'll input JavaScript code to our console to evaluate it.

### Create (one)

To create a new string in the object, we'll assign a value using an incrementing key to access it.

```js
records[nextKey++] = 'record 1 text' // 'record 1 text'
records[nextKey++] = 'record 2 text' // 'record 2 text'
records[nextKey++] = 'record 3 text' // 'record 3 text'
records[nextKey++] = 'record 4 text' // 'record 4 text'
```

### Read (all)

To read all strings from the object properties, we can simply use `Object.values` static method.

```js
Object.values(records) // ['record 1 text', 'record 2 text', 'record 3 text', 'record 4 text']
```

### Update (one)

To update a string value in the object, we'll find its key first by iterating over key/value pairs with for/in loop. Then, if we find one, we'll reassign its value with the new one.

```js
for (key in records) {
  if (records[key] === 'record 3 text') {
    records[key] = 'record 3 text updated'
    break
  }
}
```

### Delete (one)

To delete a string from the object we'll, again, find it with the for/in loop and then simply delete it.

```js
for (key in records) {
  if (records[key] === 'record 3 text') {
    delete records[key]
    break
  }
}
```

## The implementation details

The implementation itself is the absolute bare minimum:

```js
var records = {}
var nextKey = 1
```

to operate on it we'll need to use the snippets like the ones above, of course.

## Testing

<details>
  <summary>To test these examples you can copy, paste into your REPL of choice and evaluate this code:</summary><br>

```js
console.log('// Implementation initialization')
console.log('records = {}')
records = {}
console.log('nextKey = 1')
nextKey = 1

console.log('// Create (one) examples')
console.log("records[nextKey++] = 'record 1 text'")
console.log(records[nextKey++] = 'record 1 text')
// 'record 1 text'
console.log("records[nextKey++] = 'record 2 text'")
console.log(records[nextKey++] = 'record 2 text')
// 'record 2 text'
console.log("records[nextKey++] = 'record 3 text'")
console.log(records[nextKey++] = 'record 3 text')
// 'record 3 text'
console.log("records[nextKey++] = 'record 4 text'")
console.log(records[nextKey++] = 'record 4 text')
// 'record 4 text'

console.log('// Read (all) example')
console.log('Object.values(records)')
console.log(Object.values(records))
// (4) ['record 1 text', 'record 2 text', 'record 3 text', 'record 4 text']

console.log('// Update (one) examples')
console.log("for (key in records) { if (records[key] === 'record 3 text') { records[key] = 'record 3 text updated'; break } }")
for (key in records) { if (records[key] === 'record 3 text') { records[key] = 'record 3 text updated'; break } }
console.log('Object.values(records)')
console.log(Object.values(records))
// (4) ['record 1 text', 'record 2 text', 'record 3 text updated', 'record 4 text']

console.log('// Delete (one) examples')
console.log("for (key in records) { if (records[key] === 'record 2 text') { delete records[key]; break } }")
for (key in records) { if (records[key] === 'record 2 text') { delete records[key]; break } }
console.log('Object.values(records)')
console.log(Object.values(records))
// (3) ['record 1 text', 'record 3 text updated', 'record 4 text']
```

And then you can compare the actual output with the expected output in the comments.
</details><br>

## Persistency of data

This implementation is in memory, so it's not persistent between runs. If you want to persist the data, you can copy the array to any kind of persistent storage and paste it back at any point in time or on the next run. You can use `JSON.stringify` to convert the array to one string and concatenate an initialization statement to make it really easy.

```js
`var records = ${JSON.stringify(records)}
var nextKey = ${nextKey}`
// "var records = {"1":"record 1 text","2":"record 3 text updated","3":"record 4 text"}\nvar nextKey = 5"
```

## What's next?

- add some CRUD functions
- settle with NodeJS REPL
- add CRUD methods
- add persistency
- add ids
- add validation
- make client-server
- add API
- add database
- store to files
  
... the possibilities are endless
