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
</table>

# [0018 The basic CRUD implementation with server side rendering](https://github.com/UniBreakfast/crud-of-increasing-complexity/blob/master/0018-ssr-page-ui/README.md)

## What is this?

This is a basic CRUD implementation for NodeJS primitive user interface in a browser, rendered on the server side. It is based on the [simplest NodeJS implementation with REST API](../0017-rest-api/README.md) which was accessible only via API over HTTP(S) requests. I'm most used to think in JavaScript and array methods, so I'm going to use them. It's in server memory without any persistent storage between runs for the sake of simplicity. Here, I will list the operations, describe how they are supposed to be performed, and provide their implementations.

## How to perform CRUD operations?

To run this implementation you should have NodeJS installed. Run `node crud-ssr-server` in your terminal in the implementation folder.

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
    const {method} = request
    
    if (method == 'POST') {
      records.push(await getBody(request))
      return response.end()
    }

    if (method == 'GET') {
      return response.end(`
        <head id="head">
          <script>
            let i
        
            onload = () => {
              addForm.onsubmit = async () => {
                const value = addInput.value.trim()
                if (!value) return
                await fetch('/', {method: 'POST', body: value})
                location.reload()
              }
        
              main.onclick = e => {
                const btn = e.target.closest('button')
                if (!btn) {
                  if (addForm.hidden) switchForms()
                  return
                }
                i = +btn.dataset.i
                if (editForm.hidden) switchForms()
                else main.querySelector(':disabled').disabled = false
                editInput.value = btn.textContent
                btn.disabled = true
              }
        
              editForm.onsubmit = async () => {
                const value = editInput.value.trim()
                if (!value) return
                await fetch('/', {method: 'PUT', body: JSON.stringify([i, value])})
                location.reload()
              }
        
              cancelBtn.onclick = switchForms
        
              removeBtn.onclick = async () => {
                await fetch('/', {method: 'DELETE', body: String(i)})
                location.reload()
              }
            }
        
            onkeydown = e => {
              if (e.key === 'Escape' && addForm.hidden) switchForms()
            }
        
            function switchForms() {
              addForm.hidden = !addForm.hidden
              editForm.hidden = !editForm.hidden
              const btn = main.querySelector(':disabled')
              if (btn) btn.disabled = false
              document.querySelector('form:not([hidden]) input').focus()
            }
          </script>
          <style>...</style>
          <title>CRUD with UI</title>
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
          <footer>
            <a href="https://github.com/UniBreakfast/crud-of-increasing-complexity/blob/master/0018-ssr-page-ui/README.md">project
              details on GitHub</a>
          </footer>
        </body>
        
        </html>
      `)
    }

    if (method == 'PUT') {
      const [i, newRecord] = JSON.parse(await getBody(request))
      records[i] = newRecord
      return response.end()
    }

    if (method == 'DELETE') {
      const i = +(await getBody(request))
      records.splice(i, 1)
      return response.end()
    }

    response.end('unsupported method')
  }).listen(10018, () => console.log('http://localhost:10018'))

  async function getBody(request) {
    let body = ''
    for await (const chunk of request) body += chunk
    return body
  }
  ```

  Full source code is the file [crud-ssr-server.js](crud-ssr-server.js) in this folder.

</details><br>

## Testing

To run this implementation you should have NodeJS installed. Run `node crud-ssr-server` in your terminal to start the server. Then you can open `http://localhost:10018`.

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
