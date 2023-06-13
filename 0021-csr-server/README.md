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
  <tr>
    <td>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <a href="../0017-rest-api/README.md">0017 REST API</a> <b>↴</b></td>
    <td>&nbsp; &nbsp; &nbsp;</td>
    <td></td>
  </tr>
  <tr>
    <td>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <a href="../0018-ssr-page-ui/README.md">0018 with SSR page</a> <b>↴</b></td>
    <td>&nbsp; &nbsp; &nbsp;</td>
    <td></td>
  </tr>
</table>

# [0021 A primitive one-file CRUD implementation with client side rendering](https://github.com/UniBreakfast/crud-of-increasing-complexity/blob/master/0021-csr-server/README.md)

## What is this?

This is a basic CRUD implementation for NodeJS primitive user interface in a browser, rendered on the client side. It is based on the [basic NodeJS implementation with server side rendering](../0018-ssr-page-ui/README.md) which is still running from a single file. Although it is cumbersome endeavor. I'm most used to think in JavaScript and array methods, so I'm going to use them. It's in server memory without any persistent storage between runs for the sake of simplicity. Here, I will list the operations, describe how they are supposed to be performed, and provide their implementations.

## How to perform CRUD operations?

To run this implementation you should have NodeJS installed. Run `node crud-csr-server` in your terminal in the implementation folder.

- Create (one): add a new string to the array
- Read (all): get all strings from the array
- Update (one): change a string in the array
- Delete (one): remove a string from the array

I will not implement any other operations, like read individual items or delete all, because I want to keep this implementation as simple as it is acceptable for me.

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
  <summary>The main parts of implementation are:</summary><br>

  ```js
  const records = []

  require('http').createServer(async (request, response) => {
    const {method, url} = request
    
    if (method == 'POST') {
      records.push(await getBody(request))
    }

    if (method == 'GET') {
      if (url == '/records') return response.end(JSON.stringify(records))

      return response.end(`
        <head id="head">
          <script>
            let i

            getAndShowRecords()
        
            onload = () => {
              addForm.onsubmit = async () => {
                const value = addInput.value.trim()
                await fetch('/', {method: 'POST', body: value})
                getAndShowRecords()
              }
        
              main.onclick = e => {
                const btn = e.target.closest('button')
                i = +btn.dataset.i
                if (editForm.hidden) switchForms(false)
                else main.querySelector(':disabled').disabled = false
                editInput.value = btn.textContent
                btn.disabled = true
              }
        
              editForm.onsubmit = async () => {
                const value = editInput.value.trim()
                await fetch('/', {method: 'PUT', body: JSON.stringify([i, value])})
                switchForms()
              }
        
              cancelBtn.onclick = () => switchForms(false)
        
              removeBtn.onclick = async () => {
                await fetch('/', {method: 'DELETE', body: String(i)})
                switchForms()
              }
            }
        
            onkeydown = e => {
              if (e.key === 'Escape' && addForm.hidden) switchForms(false)
            }
        
            function switchForms(refresh = true) {
              addForm.hidden = !addForm.hidden
              editForm.hidden = !editForm.hidden
              const btn = main.querySelector(':disabled')
              if (btn) btn.disabled = false
              if (refresh) getAndShowRecords()
            }

            async function getAndShowRecords() {
              const records = await (await fetch('/records')).json()
              main.innerHTML = records.map((str, i) => \`<button data-i="\${i}">\${str}</button>\`).reverse().join('')
            }
          </script>
          <style>...</style>
        </head>

        <body id="body">
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
          <main id="main">${records.map((str, i) => `<button data-i="${i}">${str}</button>`).reverse().join('')}</main>
        </body>
      `)
    }

    if (method == 'PUT') {
      const [i, newRecord] = JSON.parse(await getBody(request))
      records[i] = newRecord
    }

    if (method == 'DELETE') {
      const i = +(await getBody(request))
      records.splice(i, 1)
    }
  }).listen(10021)

  async function getBody(request) {
    let body = ''
    for await (const chunk of request) body += chunk
    return body
  }
  ```

  Full source code is the file [crud-csr-server.js](crud-csr-server.js) in this folder.

</details><br>

## Testing

To run this implementation you should have NodeJS installed. Run `node crud-csr-server` in your terminal to start the server. Then you can open `http://localhost:10021`.

  You can test it manually by performing CRUD operations as described above. By typing in the input and clicking the buttons or pressing the keys on the keyboard.

## What's next?

- add some CRUD functions
- add CRUD methods
- add persistency
- scale up
- add ids
- add validation
- add database
- store to files
  
... the possibilities are endless
