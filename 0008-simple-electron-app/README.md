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
    <td>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <a href="../0005-simplest-with-ui/README.md">0005 and with UI</a> <b>↴</b></td>
    <td>&nbsp; &nbsp; &nbsp;</td>
    <td></td>
  </tr>
</table>

# [0008 Simple CRUD implementation with Electron](https://github.com/UniBreakfast/crud-of-increasing-complexity/blob/master/0008-simple-electron-app/README.md)

## What is this?

This is a simple CRUD implementation in a form of a desktop app running on Electron. It is based on the [simplest implementation in the browser with UI](../0005-simplest-with-ui/README.md) and places it in an Electron app window able to run out of your browser. It's in memory without any persistent storage between runs for the sake of simplicity. Styling is minimal and not the focus of this implementation.

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
  <summary>The main parts of implementation are the same, they came directly from the previous implementation without any changes. And I added what was required for an Electron app - <code>main.js</code> and <code>package.json</code>. So here's what we have:</summary><br>
  
  ### JSON

  ```json
  {
    "name": "0008-simple-electron-app",
    "version": "1.0.0",
    "main": "main.js",
    "scripts": {
      "preparation": "npm install -g electron",
      "start": "electron ."
    }
  }
  ```

  ### NodeJS

  ```js
  const { app, BrowserWindow } = require('electron')

  app.whenReady().then(() => new BrowserWindow(
    { width: 800, height: 600, webPreferences: { nodeIntegration: true } }
  ).loadFile('index.html'))

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
  })

  app.on('activate', () => {
    if (!BrowserWindow.getAllWindows().length) createWindow()
  })
  ```

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

To be able to run this Electron app you need to have [NodeJS](https://nodejs.org/en/) installed, of course. You also need to have Electron installed globally. You can do that by running `npm run preparation` or simply `npm i -g electron` in a terminal. After that you may run the app with `npm start` or `electron .`. Just be sure to change the directory to the implementation directory before trying that. You can test the CRUD functionality manually by running the app and performing create, read, update and delete operations as described above. By typing in the input and clicking the buttons or pressing the keys on the keyboard.

## Persistency of data

This implementation is in memory, so it's not persistent between runs.

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
