<table>
  <tr>
    <td><a href="../0000-simplest-for-me/README.md">0000 simplest</a> <b>↴</b></td>
    <td>&nbsp; &nbsp; &nbsp;</td>
    <td></td>
  </tr>
  <tr>
    <td>&nbsp; <a href="../0011-simplest-object/README.md">0011 as an object</a> <b>↴</b></td>
    <td>&nbsp; &nbsp; &nbsp;</td>
    <td></td>
  </tr>
  <tr>
    <td>&nbsp; &nbsp; &nbsp; &nbsp; <a href="../0012-object-in-browser/README.md">0012 in a browser</a> <b>↴</b></td>
    <td>&nbsp; &nbsp; &nbsp;</td>
    <td><b>↱</b> <a href="../0019-simple-with-websql/README.md">0019 with WebSQL</a></td>
  </tr>  <tr>
    <td>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <a href="../0013-object-with-ui/README.md">0013 with UI</a> <b>↴</b></td>
    <td>&nbsp; &nbsp; &nbsp;</td>
    <td><b>↱</b> <a href="../0015-simple-with-indexdb/README.md">0015 with IndexedDB</a> +1</td>
  </tr>
</table>

# [0014 Simple CRUD object implementation with UI in separate files](https://github.com/UniBreakfast/crud-of-increasing-complexity/blob/master/0014-object-split-by-lang/README.md)

## What is this?

This is a simple CRUD object implementation for HTML, CSS and JS. It is based on the [one-file implementation for the browser](../0013-object-with-ui/README.md) but this one is splitting the HTML, CSS, JS all into separate files. It's in memory without any persistent storage between runs for the sake of simplicity. Styling is minimal and not the focus of this implementation.

## What is CRUD?

CRUD is an acronym for Create, Read, Update and Delete. It's a set of operations that are usually performed on data. In this case I will use it for a simple object with string values. The minimum set of operations I have in mind for this particular simplest implementation includes:

- Create (one): add a new string property to the object
- Read (all): get all strings values from the object 
- Update (one): change a string value in the object property
- Delete (one): remove a propery with certain value from the object

## How to perform CRUD operations here?

### Create (one)

To create a new string in the object, user has to type or insert it in the input in the header and press Enter or click the 'add' button on the right. The input will be cleared, the new incremented key will be taken and the new string will be added as a new property of the object. The new string will be displayed in the list of strings below the input in the beginning of the list.

### Read (all)

For that to happen the program will simply read all the strings from the object values and display them in the main part of the page as buttons in reverse order. The newest string will be displayed first.

### Update (one)

To update a string value in the object, user has to click the button with the string they want to update. Button will be disabled temporarily until the editing is finished. The string will be displayed in the input in the header. User can edit the string in the input and press Enter or click the 'save' button on the right. The input will be cleared and the string will be updated in the object. The updated string will be displayed in the list of strings below the input in the same place it was before. If the user changed their mind and doesn't want to update the string, they can press Esc or click the 'cancel' button on the right. The input will be cleared and the string will not be updated in the object.

### Delete (one)

To delete a string from the object as a property, user has to click the button with the string they want to delete. Button will be disabled temporarily until the deletion is finished. The string will be shown in the input above for editing. There's a 'remove' button on the left. If it is pressed the property with that string will be deleted from the object. The list of buttons will update to show that.

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
  const records = {}
  let nextKey = 1
  let key

  addForm.onsubmit = () => {
    const value = addInput.value.trim()
    if (!value) return
    records[nextKey++] = value
    addForm.reset()
    render()
  }

  editForm.onsubmit = () => {
    const value = editInput.value.trim()
    if (!value) return
    records[key] = value
    switchForms()
  }

  cancelBtn.onclick = switchForms

  removeBtn.onclick = () => {
    delete records[key]
    switchForms()
  }

  main.onclick = e => {
    const btn = e.target.closest('button')
    if (!btn) {
      if (addForm.hidden) switchForms()
      return
    }
    key = btn.dataset.key
    if (editForm.hidden) switchForms()
    else main.querySelector(':disabled').disabled = false
    editInput.value = records[key]
    main.querySelector(`[data-key="${key}"]`).disabled = true
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
    main.innerHTML = Object.entries(records).map(([key, value]) => `<button data-key="${key}">${value}</button>`).reverse().join('')
  }
  ```

  Full source code is available in this implementation folder.

</details><br>

## Testing

You can test it manually by opening [the page](https://unibreakfast.github.io/crud-of-increasing-complexity/0014-object-split-by-lang) and performing CRUD operations as described above. By typing in the input and clicking the buttons or pressing the keys on the keyboard.

## Persistency of data

This implementation is in memory, so it's not persistent between runs. If you want to persist the data, you can copy the array to any kind of persistent storage and paste it back at any point in time or on the next run. You can use `JSON.stringify` to convert the array to one string and concatenate an initialization statement to make it really easy.

```js
`var records = ${JSON.stringify(records)}
var nextKey = ${nextKey}`
// "var records = {"1":"record 1 text","2":"record 3 text updated","3":"record 4 text"}\nvar nextKey = 5"
```

## What's next?

- [use WebSQL for storage](../0019-simple-with-websql/README.md)
- [use IndexedDB for storage](../0015-simple-with-indexdb/README.md)
- save/load to/from localStorage
- add other kinds of persistency
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
