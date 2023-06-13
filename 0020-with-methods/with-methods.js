var records = Object.assign([], {
  createOneRecord(str) {
    this.push(str)
  },

  readAllRecords() {
    return [...this]
  },

  updateOneRecord(oldStr, newStr) {
    const i = this.indexOf(oldStr)

    if (i !== -1) this[i] = newStr
  },
  
  deleteOneRecord(str) {
    const i = this.indexOf(str)

    if (i !== -1) this.splice(i, 1)
  },
})
