<table>
  <tr>
    <td><a href="../0000-simplest-for-me/README.md">0000 simplest</a> <b>↴</b></td>
    <td>&nbsp; &nbsp; &nbsp;</td>
    <td></td>
  </tr>
  <tr>
    <td>&nbsp; &nbsp; <a href="../0003-simplest-nodejs-repl/README.md">0003 NodeJS REPL</a> <b>↴</b></td>
    <td>&nbsp; &nbsp; &nbsp;</td>
    <td></td>
  </tr>
</table>

# [0007 Simple CRUD implementation in NodeJS CLI](https://github.com/UniBreakfast/crud-of-increasing-complexity/blob/master/0007-simple-nodejs/README.md)

## What is this?

This is the CRUD implementation with NodeJS CLI via readline. It is based on the [simplest NodeJS REPL implementation](../0003-simplest-nodejs-repl/README.md) which required JavaScript input to do actions required. Now it is supposed to be more straightforward due to prompts and explicit answers from the app. It's not supposed to be the simplest one for anyone else necessarily. I'm most used to think in JavaScript and array methods, so I'm going to use them. It's in memory without any persistant storage between runs for the sake of simplicity. Here, I will list the operations, describe how they are supposed to be performed, and provide their implementations.

## What is CRUD?

CRUD is an acronym for Create, Read, Update and Delete. It's a set of operations that are usually performed on data. It's a common set of operations for databases, but it can be used for any kind of data. In this case I will use it for a simple array of strings. The minimum set of operations I have in mind for this particular simplest implementation includes:

- Create (one): add a new string to the array
- Read (one, many or all): get any strings from the array
- Update (one, many or all): change any strings in the array
- Delete (one, many or all): remove any strings from the array

## How to perform CRUD operations?

Run it in terminal with `node cli` or `npm start`. Make sure you are in implementation folder. All commands are case insensitive. If you are mistaken CLI will show you a little guide to help.

### Create (one)

To create a new record in the array, I can use command 'create' or its shorthand 'c':

```
▷  create Myst III Exile
◁  1 record created and stored:
  1. Myst III Exile

▷  create Beyond the Good & Evil
◁  1 record created and added, now there are 2.
  2. Beyond the Good & Evil

▷  c The Witness
◁  1 record created and added to 2 existing ones, now there are 3.
  3. The Witness

▷  c TES III Morrowind
◁  1 record created and added to 3 existing ones, now there are 4.
  4. TES III Morrowind
```

### Read (one, many or all)

To read some records from the array I can use command 'read' or its shorhand 'r' with 1-based indices or 'all' to read all:

```
▷  read 1
◁  1 record out of 4 stored was read:
  1. Myst III Exile

▷  read 2-4
◁  3 records out of 4 stored were read:
  2. Beyond the Good & Evil
  3. The Witness
  4. TES III Morrowind

▷  r 1,3,4
◁  3 records out of 4 stored were read:
  1. Myst III Exile
  3. The Witness
  4. TES III Morrowind

▷  r 1, 3-4
◁  3 records out of 4 stored were read:
  1. Myst III Exilea
  3. The Witness
  4. TES III Morrowind

▷  read all
◁  All 4 records are:
  1. Myst III Exile
  2. Beyond the Good & Evil
  3. The Witness
  4. TES III Morrowind
```

### Update (one, many or all)

To update a string in the array, I can use command 'update' or 'u' with 1-based indices or 'all' to update all and then the new value to replace the old one(s) with it:

```
▷  update 1 Myst II Riven
◁  1 record out of 4 stored was updated:
  1. Myst III Exile
... and set to:
  Myst II Riven

▷  update 3-5 great game
◁  2 records out of 4 stored were updated:
  3. The Witness
  4. TES III Morrowind
... and set to:
  great game

▷  u all a game
◁  All records updated to:
  a game
```

Not sure why would anyone update multiple or all records to one value, but it's possible anyway.

### Delete (one, many or all)

To delete a string from the array, I need to use command 'delete' or 'd' with 1-based indices or 'all' to delete all:

```
▷  delete 1-2
◁  2 records out of 4 stored were deleted:
  2. a game
  1. a game
... so there remain 2 records now.

▷  d all
◁  All 2 records were deleted:
  1. a game
  2. a game
... so there are no records now.
```

Careful with deleting records, there is no confirmation.

## The implementation details

<details>
  <summary>The main part of implementation, although abridged and not functional without completion, is this:</summary><br>

  ```js
  const { createInterface } = require('readline')
  const records = []
  const { stdin, stdout, exit } = process

  const cli = createInterface(stdin, stdout)

  welcome()

  function welcome() {
    output(`Record(s) stored: ${records.length}`)
    cli.on('line', handleInput)
  }

  function handleInput(str) {
    if (/^e(xit)?$/.test(str)) exit()
    else if (/^c(reate)? +\S/.test(str)) handleCreate(str)
    else if (/^r(ead)? +(\d+(-\d+)?|all)$/.test(str)) handleRead(str)
    else if (/^u(pdate)? +(\d+(-\d+)?|all) +\S/.test(str)) handleUpdate(str)
    else if (/^d(elete)? +(\d+(-\d+)?*|all)$/.test(str)) handleDelete(str)
    else helpOnIncorrectInput()
  }

  function handleCreate(str) {
    const record = str.replace(/^c(reate)? +| +$/g, '')
    records.push(record)

    output(`1 record created and added`)
  }

  function handleRead(str) {
    const count = records.length

    if (!count) return output('No records to read, 0, none!')

    let indices = str.replace(/^r(ead)? +/, '')
    
    indices = extractIndices(indices).sort((a, b) => a - b)

    output(indices.map(i => `  ${i + 1}. ${records[i]}`).join('\n'))
  }

  function handleUpdate(str) {
    let [, indices, record] = str.match(/^u(?:pdate)? +(\d+(?:-\d+)?|all) +(.*)/)

    indices = extractIndices(indices).sort((a, b) => a - b)

    const oldRecords = indices.map(i => {
      const oldRecord = records[i]
      records[i] = record
      return oldRecord
    })

    output(`${indices.length} records were updated${`:\n${indices.map((i, j) => `${i + 1}. ${oldRecords[j]}`).join('\n')}\n... and set to:\n  ${record}`}`)
  }

  function handleDelete(str) {
    let indices = str.replace(/^d(elete)? +/, '')

    indices = extractIndices(indices).sort((a, b) => b - a)

    const deletedRecords = indices.map(i => records.splice(i, 1)[0])

    output(`${indices.length} records were deleted:\n${indices.map((i, j) => `  ${i + 1}. ${deletedRecords[j]}`).join('\n')}`)
  }

  function extractIndices(indices) {
    return [...new Set(indices.split(/, ?/).flatMap(chunk => {
      if (chunk.match(/-/)) {
        let [start, end] = chunk.split('-')
        return Array.from({ length: end - start + 1 }, (_, i) => +start + i - 1)
      } else {
        return chunk - 1
      }
    }))].filter(i => i < records.length)
  }
  ```

</details><br>


## Testing

You can test it manually by opening the CLI and performing CRUD operations as described above. By typing in the commands and pressing Enter.

## Persistency of data

This implementation is in memory, so it's not persistent between runs.

## What's next?

- add some CRUD functions
- add CRUD methods
- add persistency
- improve UX
- scale up
- add ids
- add validation
- make client-server
- add API
- add database
- store to files
  
... the possibilities are endless
