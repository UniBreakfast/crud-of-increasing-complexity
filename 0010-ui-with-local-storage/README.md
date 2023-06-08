<table>
  <tr>
    <td><a href="../0000-simplest-for-me/README.md">0000 simplest</a> <b>↴</b></td>
    <td>&nbsp; &nbsp; &nbsp;</td>
    <td></td>
  </tr>
  <tr>
    <td>&nbsp; &nbsp; <a href="../0004-simplest-in-browser/README.md">0004 in a browser</a> <b>↴</b></td>
    <td>&nbsp; &nbsp; &nbsp;</td>
    <td></td>
  </tr>
  <tr>
    <td>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <a href="../0005-simplest-with-ui/README.md">0005 with UI</a> <b>↴</b></td>
    <td>&nbsp; &nbsp; &nbsp;</td>
    <td></td>
  </tr>
  <tr>
    <td>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<a href="../0009-split-code-by-lang/README.md">0009 in separate files</a> <b>↴</b></td>
    <td>&nbsp; &nbsp; &nbsp;</td>
    <td></td>
  </tr>
</table>

# [0010 CRUD implementation with LocalStorage (UI, separate files)](https://github.com/UniBreakfast/crud-of-increasing-complexity/blob/master/0010-ui-with-local-storage/README.md)

## What is this?

This is the simplest CRUD implementation for HTML, CSS and JS with persistent records in Local Storage. It is based on the [multi-file implementation for the browser](../0009-split-code-by-lang/README.md) but this one is saving your records to `localStorage` automatically. Styling is minimal and not the focus of this implementation.

## What is CRUD?

CRUD is an acronym for Create, Read, Update and Delete. It's a set of operations that are usually performed on data. In this case I will use it for a simple array of strings. The minimum set of operations I have in mind for this particular simplest implementation includes:

- Create (one): add a new string to the array
- Read (all): get all strings from the array
- Update (one): change a string in the array
- Delete (one): remove a string from the array

## How to perform CRUD operations here?

### Create (one)

To create a new string in the array, user has to type or insert it in the input in the header and press Enter or click the 'add' button on the right. The input will be cleared and the new string will be added to the end of the array. The new string will be displayed in the list of strings below the input in the beginning of the list.

### Read (all)

For that to happen the program will simply read all the strings from the array and display them in the main part of the page as buttons in reverse order. The newest string will be displayed first.

### Update (one)

To update a string in the array, user has to click the button with the string they want to update. Button will be disabled temporarily until the editing is finished. The string will be displayed in the input in the header. User can edit the string in the input and press Enter or click the 'save' button on the right. The input will be cleared and the string will be updated in the array. The updated string will be displayed in the list of strings below the input in the same place it was before. If the user changed their mind and doesn't want to update the string, they can press Esc or click the 'cancel' button on the right. The input will be cleared and the string will not be updated in the array.

### Delete (one)

To delete a string from the array, user has to click the button with the string they want to delete. Button will be disabled temporarily until the deletion is finished. The string will be shown in the input above for editing. There's a 'remove' button on the left. If it is pressed the string will be deleted from the array. The list of buttons will update to show that.


## The implementation details

<details>
  <summary>What was added is <code>use-ls.js</code> script:</summary><br>

  ```js
  const key = '0010_crud_implementation_records'

  try {
    records.push(...JSON.parse(localStorage[key]))
    render()
  } catch {}

  addEventListener('submit', save)

  removeBtn.addEventListener('click', save)

  function save() {
    localStorage[key] = JSON.stringify(records)
  }
  ```

  The main parts of implementation are the same as <a href="../0009-split-code-by-lang/README.md#the-implementation-details">previously</a>. Full source code is available in this implementation folder.

</details><br>

## Testing

You can test it manually by opening [the page](https://unibreakfast.github.io/crud-of-increasing-complexity/0010-ui-with-local-storage) and performing CRUD operations as described above. By typing in the input and clicking the buttons or pressing the keys on the keyboard. Then simply reload the page or close the tab and open it again. The data will be saved and restored from `localStorage`.

## What's next?

- move records data to the DOM
- make an Electron app out of it
- add some CRUD functions
- add CRUD methods
- scale up
- add ids
- add validation
- make client-server
- add API
- add database
- store to files
  
... the possibilities are endless
