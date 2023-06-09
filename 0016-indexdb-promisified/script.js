const dbName = 'crud0016', stName = 'records'

let key

new Promise(resolve => indexedDB.open(dbName).onsuccess = ({ target: { result: db } }) => {
  const proto = {
    add(value) {
      return new Promise((resolve, reject) => {
        const t = db.transaction(this.stName, 'readwrite')
        const request = t.objectStore(this.stName).add(value)

        t.oncomplete = resolve
        request.onerror = reject
      })
    },

    readValues() {
      return new Promise((resolve, reject) => {
        const t = db.transaction(this.stName, 'readonly')
        const request = t.objectStore(this.stName).getAll()

        request.onsuccess = () => resolve(request.result)
        request.onerror = reject
      })
    },

    readKeys() {
      return new Promise((resolve, reject) => {
        const t = db.transaction(this.stName, 'readonly')
        const request = t.objectStore(this.stName).getAllKeys()

        request.onsuccess = () => resolve(request.result)
        request.onerror = reject
      })
    },

    readEntries() {
      return new Promise((resolve, reject) => {
        const t = db.transaction(this.stName, 'readonly')
        const store = t.objectStore(this.stName)
        const request = store.openCursor()
        const entries = []

        request.onsuccess = () => {
          const cursor = request.result

          if (cursor) {
            entries.push({ key: cursor.key, value: cursor.value })
            cursor.continue()
          } else {
            resolve(entries)
          }
        }

        request.onerror = reject
      })
    },

    update(key, value) {
      return new Promise((resolve, reject) => {
        const t = db.transaction(this.stName, 'readwrite')
        const request = t.objectStore(this.stName).put(value, key)

        t.oncomplete = resolve
        request.onerror = reject
      })
    },

    delete(key) {
      return new Promise((resolve, reject) => {
        const t = db.transaction(this.stName, 'readwrite')
        const request = t.objectStore(this.stName).delete(key)

        t.oncomplete = resolve
        request.onerror = reject
      })
    },
  }

  resolve(stName => new Promise((resolve, reject) => {
    if (db.objectStoreNames.contains(stName)) {
      return resolve(Object.create(proto, { stName: { value: stName } }))
    }

    const { version } = db

    db.close()

    const req = indexedDB.open(dbName, version + 1)

    req.onupgradeneeded = e => {
      db = e.target.result
      db.createObjectStore(stName, { autoIncrement: true });
    };
    req.onsuccess = () => resolve(Object.create(proto, { stName: { value: stName } }))
    req.onerror = reject
  }))
}).then(async getStore => {
  const recordsStore = await getStore(stName)
  
  render()

  addForm.onsubmit = async () => {
    const value = addInput.value.trim()

    if (!value) return

    await recordsStore.add(value)

    render()
    addForm.reset()
  }

  editForm.onsubmit = async () => {
    const value = editInput.value.trim()

    if (!value) return

    await recordsStore.update(key, value)

    editForm.reset()
    switchForms()
  }

  cancelBtn.onclick = switchForms

  removeBtn.onclick = async () => {
    await recordsStore.delete(key)

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

  async function render() {
    const entries = await recordsStore.readEntries()

    main.innerHTML = entries.map(({ key, value }) => `<button data-key="${key}">${value}</button>`).reverse().join('')
  }
}).catch(console.error)
