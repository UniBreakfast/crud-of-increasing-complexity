const records = []

require('http').createServer(async (request, response) => {
  const {method} = request
  
  if (method == 'POST') {
    records.push(await getBody(request))
    return response.end()
  }

  if (method == 'GET') {
    return response.end(`
      <!DOCTYPE html>
      <html lang="en">
      <head id="head">
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1">
        <link rel="icon" href="data:">
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
        <style>
          :link, :visited {
            color: unset;
          }
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
        </style>
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
