<table>
  <tr>
    <td><a href="../0005-simplest-with-ui/README.md">0005 array with ui</a> <b>↴</b></td>
    <td>&nbsp; &nbsp; &nbsp;</td>
    <td></td>
  </tr>
</table>

# [0006 The simplest CRUD implementation with data in DOM only](https://github.com/UniBreakfast/crud-of-increasing-complexity/blob/master/0006-dom-data-only/README.md)
# 

## What is this?

This is the simplest CRUD implementation for HTML, CSS and JS. It is based on the [simplest implementation with UI](../0005-simplest-with-ui/README.md) and removes the records array completely. It stores them in DOM instead without any persistant storage between runs for the sake of simplicity. Styling is minimal and not the focus of this implementation.

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
  addForm.onsubmit = () => {
    const value = addInput.value.trim()
    if (!value) return
    const btn = document.createElement('button')
    main.prepend(Object.assign(btn, {innerText: value}))
    addForm.reset()
  }

  main.onclick = e => {
    const btn = e.target.closest('button')
    if (!btn) {
      if (addForm.hidden) {
        switchForms()
        main.querySelector(':disabled').disabled = false
      }
      return
    }
    if (editForm.hidden) switchForms()
    else main.querySelector(':disabled').disabled = false
    editInput.value = btn.innerText
    btn.disabled = true
  }

  editForm.onsubmit = () => {
    const value = editInput.value.trim()
    if (!value) return
    const btn = main.querySelector(':disabled')
    Object.assign(btn, {disabled:false, innerText: value})
    switchForms()
  }

  cancelBtn.onclick = () => {
    switchForms()
    main.querySelector(':disabled').disabled = false
  }

  removeBtn.onclick = () => {
    main.querySelector(':disabled').remove()
    switchForms()
  }

  onkeydown = e => {
    if (e.key !== 'Escape' || editForm.hidden) return
    switchForms()
    main.querySelector(':disabled').disabled = false
  }

  function switchForms() {
    addForm.hidden = !addForm.hidden
    editForm.hidden = !editForm.hidden
    document.querySelector('form:not([hidden]) input').focus()
  }
  ```

  Full source code is available in a file `index.html` [here](./index.html).

</details><br>

## Testing

You can test it manually by opening [the page](https://unibreakfast.github.io/crud-of-increasing-complexity/0006-dom-data-only) and performing CRUD operations as described above. By typing in the input and clicking the buttons or pressing the keys on the keyboard.

## What's next?

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
