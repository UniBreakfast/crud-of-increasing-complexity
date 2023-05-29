<table>
  <tr>
    <td><a href="../0000-simplest-for-me/README.md">0000 simplest</a> <b>↴</b></td>
    <td>&nbsp; &nbsp; &nbsp;</td>
    <td></td>
  </tr>
  <tr>
    <td>&nbsp; &nbsp; <a href="../0004-simplest-in-browser/README.md">0004 in a browser</a> <b>↴</b></td>
    <td>&nbsp; &nbsp; &nbsp;</td>
    <td><b>↱</b> <a href="../0006-dom-data-only/README.md">0006 with data in DOM only</a></td>
  </tr>
</table>

# [0005 The simplest CRUD implementation with UI](https://github.com/UniBreakfast/crud-of-increasing-complexity/blob/master/0005-simplest-with-ui/README.md)
# 

## What is this?

This is the simplest CRUD implementation for HTML, CSS and JS. It is based on the [simplest implementation in the browser](../0004-simplest-in-browser/README.md) and adds a UI to it removing the need to interact with the console or making any CRUD operations manually with code. It's in memory without any persistant storage between runs for the sake of simplicity. Styling is minimal and not the focus of this implementation.

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

To update a string in the array, user has to click the button with the string they want to update. Button will be disabled temporarily until the editing is finished. The string will be displayed in the input in the header. User can edit the string in the input and press Enter or click the 'save' button on the right. The input will be cleared and the string will be updated in the array. The string will be displayed in the list of strings below the input in the same place it was before. If the user changed their mind and doesn't want to update the string, they can press Esc or click the 'cancel' button on the right. The input will be cleared and the string will not be updated in the array.

### Delete (one)

To delete a string from the array, user has to click the button with the string they want to delete. Button will be disabled temporarily until the deletion is finished. The string will be shown in the input above for editing. There's a 'remove' button on the left. If it is pressed the string will be deleted from the array. The list of buttons will update to show that.


## The implementation details

<details>
  <summary>The main parts of implementation are:</summary><br>

  ### HTML

  ```html
  <header>
    <form id="addForm" action="javascript:">
      <button type="reset">clear</button>
      <input id="addInput" autocomplete="off" autofocus>
      <button>add</button>
    </form>

    <form id="editForm" action="javascript:" hidden>
      <button id="removeBtn" type="reset">remove</button>
      <input id="editInput" autocomplete="off">
      <button>save</button>
      <button id="cancelBtn" type="reset">cancel</button>
    </form>
  </header>

  <main id="main"></main>
  ```

  ### CSS

  ```css
  body {
    margin: 0;
    text-align: center;
  }

  header,
  footer {
    height: 96px;
    background-color: #0009;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  main {
    height: calc(100vh - 96px - 96px);
    overflow-y: auto;
  }
  ```

  ### JS

  ```js
  const records = []
  let i

  addForm.onsubmit = () => {
    const value = addInput.value.trim()
    if (!value) return
    records.push(value)
    addForm.reset()
    render()
  }

  main.onclick = e => {
    const btn = e.target.closest('button')
    if (!btn) {
      if (addForm.hidden) switchForms()
      return
    }
    i = records.length - 1 - [].indexOf.call(main.children, btn)
    if (editForm.hidden) switchForms()
    else main.querySelector(':disabled').disabled = false
    editInput.value = records[i]
    main.children[records.length - 1 - i].disabled = true
  }

  editForm.onsubmit = () => {
    const value = editInput.value.trim()
    if (!value) return
    records[i] = value
    switchForms()
  }

  cancelBtn.onclick = switchForms

  removeBtn.onclick = () => {
    records.splice(i, 1)
    switchForms()
  }

  onkeydown = e => {
    if (e.key === 'Escape' && addForm.hidden) switchForms()
  }

  function switchForms() {
    addForm.hidden = !addForm.hidden
    editForm.hidden = !editForm.hidden
    document.querySelector('form:not([hidden]) input').focus()
    render()
  }

  function render() {
    main.innerHTML = records.map(str => `<button>${str}</button>`).reverse().join('')
  }
  ```

  Full source code is available in a file `index.html` [here](./index.html).

</details><br>

## Testing

You can test it manually by opening [the page](https://unibreakfast.github.io/crud-of-increasing-complexity/0005-simplest-with-ui) and performing CRUD operations as described above. By typing in the input and clicking the buttons or pressing the keys on the keyboard.

## Persistency of data

This implementation is in memory, so it's not persistent between runs. If you want to persist the data, you can copy the array to any kind of persistent storage and paste it back at any point in time or on the next run. You can use `JSON.stringify` to convert the array to one string and concatenate an initialization statement to make it really easy.

```js
'var records = ' + JSON.stringify(records) // 'var records = ["record 1 text","record 3 text updated"]'
```

## What's next?

- [move records data to the DOM](../0006-dom-data-only/README.md)
- add some CRUD functions
- add CRUD methods
- add persistency
- scale up
- add ids
- add validation
- make client-server
- add API
- add database
- store to files
  
... the possibilities are endless
