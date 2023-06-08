const dbName = 'crud0015', stName = 'records'

let key

new Promise(resolve => {
  indexedDB.open(dbName).onsuccess = function () {
    let db = this.result

    if (db.objectStoreNames.contains(stName)) return resolve(db)

    const { version } = db

    db.close()
    
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

    if (!value) return

    const t = db.transaction(stName, 'readwrite')
    
    t.objectStore(stName).add(value)
    t.oncomplete = render
    addForm.reset()
  }

  editForm.onsubmit = () => {
    const value = editInput.value.trim()

    if (!value) return

    const t = db.transaction(stName, 'readwrite')
    
    t.objectStore(stName).put(value, key)
    t.oncomplete = render
    editForm.reset()
    switchForms()
  }

  cancelBtn.onclick = switchForms

  removeBtn.onclick = () => {
    const t = db.transaction(stName, 'readwrite')
    
    t.objectStore(stName).delete(key)
    t.oncomplete = render
    editForm.reset()
    switchForms()
  }

  main.onclick = async e => {
    const btn = e.target.closest('button')

    if (!btn) {
      if (addForm.hidden) await switchForms()
      return
    }

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
