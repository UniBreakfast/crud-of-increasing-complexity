# The simples CRUD implementation for me

## What is this?

This is the simplest CRUD implementation details for me. It's not supposed to be the simplest one for anyone else necessarily. I'm most used to think in JavaScript and array methods, so I'm going to use them. It's in memory without any persistant storage between runs for the sake of simplicity. Here, I will list the operations, describe how they are supposed to be performed, and provide their implementations.

## What is CRUD?

CRUD is an acronym for Create, Read, Update and Delete. It's a set of operations that are usually performed on data. It's a common set of operations for databases, but it can be used for any kind of data. In this case I will use it for a simple array of strings. The minimum set of operations I have in mind for this particular simplest implementation includes:

- Create (one): add a new string to the array
- Read (all): get all strings from the array
- Update (one): change a string in the array
- Delete (one): remove a string from the array

I will not implement any other operations, like read individual items or delete all, because I want to keep this implementation as simple as it is acceptable for me.

## What is the simplest implementation for me?

The simplest implementation for me is the one that is easy to understand and easy to use. It's not necessarily the one that is the fastest, safest or the most efficient. It's the one that is the most straightforward and easy to use for me. It's the one that I can easily remember and use without having to look up the documentation. It's the one that I can easily explain to someone else. It's the one that I can easily modify to add new features.

```js
records = []
```

Yep, that's it. That's the simplest implementation for me. It's an empty array. It's easy to understand, easy to use, easy to remember, easy to explain and easy to modify. I omit the `const`, `let` or `var` keywords here for simplicity. I don't need them here, because I'm not going to use this code in any real application so I don't care about it being global. If your REPL of choice is in strict mode by default, add any of these keywords to the beginning of the line.

```js
const records = []
// or
let records = []
// or
var records = []
```

## How to perform CRUD operations?

There's no UI in this simplest implementation, so we'll have to use some kind of JavaScript REPL here. It can be a browser console, Node.js REPL or any kind of JavaScript sandbox offline or online. I personally prefer Chrome DevTools console, but I won't use anything browser specific here. So to perform CRUD operations we'll input JavaScript code for our runtime of choice to evaluate it.

### Create (one)

To create a new string in the array, I need to add it to the end of the array. I would use `Array.prototype.push` method for that. It will add a new element to the end of the array and return the new length of the array. I don't need the length, so I can just ignore it.

```js
records.push('record 1 text') // 1
records.push('record 2 text') // 2
```

### Read (all)

To read all strings from the array, I can simply ask for the array itself. I can use `console.log` to print it to the console. But I'm already in the console, so I can just type the name of the array and press Enter to see its contents.

```js
records // ['record 1 text', 'record 2 text']
```

### Update (one)

To update a string in the array, I need to assign a new value to the element at the index of the string I want to update. I can use `Array.prototype.indexOf` method to get the index of the string I want to update. I can use bracket notation to assign a new value to the element at the index.

```js
index = records.indexOf('record 2 text') // 1
records[index] = 'record 2 text updated' // 'record 2 text updated'
```

or I can do it in one line

```js
records[records.indexOf('record 1 text')] = 'record 1 text updated' // 'record 2 text updated'
```

### Delete (one)

To delete a string from the array, I need to remove the element at the index of the string I want to delete. I can use `Array.prototype.splice` method to remove the element at the index. I can use `Array.prototype.indexOf` method to get the index of the string I want to delete.

```js
index = records.indexOf('record 2 text updated') // 1
records.splice(index, 1) // ['record 2 text updated']
```

or again I can do it in one line

```js
records.splice(records.indexOf('record 1 text updated'), 1) // ['record 1 text updated']
```

## Testing

To test these examples you can copy, paste into your REPL of choice and evaluate this code:

```js
console.log('// Implementation initialization')
console.log('records = []')
records = []

console.log('// Create (one) examples')
console.log("records.push('record 1 text')")
console.log(records.push('record 1 text'))
console.log("records.push('record 2 text')")
console.log(records.push('record 2 text'))

console.log('// Read (all) example')
console.log('records')
console.log(records)

console.log('// Update (one) examples')
console.log("index = records.indexOf('record 2 text')")
console.log(index = records.indexOf('record 2 text'))
console.log("records[index] = 'record 2 text updated'")
console.log(records[index] = 'record 2 text updated')
console.log("records[records.indexOf('record 1 text')] = 'record 1 text updated'")
console.log(records[records.indexOf('record 1 text')] = 'record 1 text updated')
console.log('records')
console.log(records)

console.log('// Delete (one) examples')
console.log("index = records.indexOf('record 2 text updated')")
console.log(index = records.indexOf('record 2 text updated'))
console.log('records.splice(index, 1)')
console.log(records.splice(index, 1))
console.log("records.splice(records.indexOf('record 1 text updated'), 1)")
console.log(records.splice(records.indexOf('record 1 text updated'), 1))
console.log('records')
console.log(records)
```