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
    <td></td>
  </tr>
  <tr>
    <td>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <a href="../0013-object-with-ui/README.md">0013 with UI</a> <b>↴</b></td>
    <td>&nbsp; &nbsp; &nbsp;</td>
    <td></td>
  </tr>
  <tr>
    <td>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <a href="../0014-object-split-by-lang/README.md">0014 separate files</a> <b>↴</b></td>
    <td>&nbsp; &nbsp; &nbsp;</td>
    <td></td>
  </tr>
</table>

# [0015 CRUD implementation with UI and IndexedDB](https://github.com/UniBreakfast/crud-of-increasing-complexity/blob/master/0015-simple-with-indexdb/README.md)

## What is this?

This is a CRUD implementation for a browser using IndexedDB. It is based on the [implementation made with a simple object](../0014-object-split-by-lang/README.md) but this one is replacing in memory object storage with a frontend database IndexedDB. Styling is minimal and not the focus of this implementation.

## How to perform CRUD operations here?

- Create (one): add a new string to the store
- Read (all): get all strings from the store 
- Update (one): change a string in the store
- Delete (one): remove a string from the store

### Create (one)

To create a new string in the store, user has to type or insert it in the input in the header and press Enter or click the 'add' button on the right. The input will be cleared, the new incremented key will be taken and the new string will be added as a new record in the store. The new string will be displayed in the list of strings below the input in the beginning of the list.

### Read (all)

For that to happen the program will simply read all the strings from the store records and display them in the main part of the page as buttons in reverse order. The newest string will be displayed first.

### Update (one)

To update a string in the store, user has to click the button with the string they want to update. Button will be disabled temporarily until the editing is finished. The string will be displayed in the input in the header. User can edit the string in the input and press Enter or click the 'save' button on the right. The input will be cleared and the string will be updated in the store. The updated string will be displayed in the list of strings below the input in the same place it was before. If the user changed their mind and doesn't want to update the string, they can press Esc or click the 'cancel' button on the right. The input will be cleared and the string will not be updated in the store.

### Delete (one)

To delete a string from the store, user has to click the button with the string they want to delete. Button will be disabled temporarily until the deletion is finished. The string will be shown in the input above for editing. There's a 'remove' button on the left. If it is pressed the record with that string will be deleted from the store. The list of buttons will update to show that.

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
  let key

  new Promise(resolve => {
    indexedDB.open(dbName).onsuccess = function () {
      let db = this.result

      const { version } = db

      const req = indexedDB.open(dbName, version + 1)

      req.onupgradeneeded = e => {
        db = e.target.result
        db.createObjectStore(stName, {autoIncrement: true})
      }
      req.onsuccess = () => resolve(db)
    }
  }).then(db => {
    render()
    
    addForm.onsubmit = () => {
      const value = addInput.value.trim()

      const t = db.transaction(stName, 'readwrite')
      
      t.objectStore(stName).add(value)
      t.oncomplete = render
    }

    editForm.onsubmit = () => {
      const value = editInput.value.trim()

      const t = db.transaction(stName, 'readwrite')
      
      t.objectStore(stName).put(value, key)
      t.oncomplete = render
      switchForms()
    }

    cancelBtn.onclick = switchForms

    removeBtn.onclick = () => {
      const t = db.transaction(stName, 'readwrite')
      
      t.objectStore(stName).delete(key)
      t.oncomplete = render
      switchForms()
    }

    main.onclick = async e => {
      const btn = e.target.closest('button')

      key = +btn.dataset.key

      if (editForm.hidden) await switchForms()
      else main.querySelector(':disabled').disabled = false

      editInput.value = btn.textContent
      main.querySelector(`[data-key="${key}"]`).disabled = true
    }

    onkeydown = e => {
      if (e.key === 'Escape' && addForm.hidden) switchForms()
    }

    async function switchForms() {
      addForm.hidden = !addForm.hidden
      editForm.hidden = !editForm.hidden
      document.querySelector('form:not([hidden]) input').focus()
      await render()
    }

    function render() {
      return new Promise(resolve => {
        const t = db.transaction(stName)
        const keysReq = t.objectStore(stName).getAllKeys()
        const valuesReq = t.objectStore(stName).getAll()
        
        t.oncomplete = () => {
          const keys = keysReq.result
          const values = valuesReq.result

          main.innerHTML = keys.map((key, i) => `<button data-key="${key}">${values[i]}</button>`).reverse().join('')

          resolve()
        }
      })
    }
  })
  ```

  Full source code is available in this implementation folder.

</details><br>

## Testing

You can test it manually by opening [the page](https://unibreakfast.github.io/crud-of-increasing-complexity/0015-simple-with-indexdb) and performing CRUD operations as described above. By typing in the input and clicking the buttons or pressing the keys on the keyboard.

## What's next?

- make an Electron app out of it
- add some CRUD functions
- add CRUD methods
- scale up
- add ids
- add validation
- make client-server
- add API
- store to files
  
... the possibilities are endless
