var records = Object.assign([], {
  readAllRecords() {
    return this
  },

  createOneRecord(str) {
    this.push(str)
  },

  deleteOneRecord(str) {
    const i = this.indexOf(str)

    if (i !== -1) this.splice(i, 1)
  },

  updateOneRecord(oldStr, newStr) {
    const i = this.indexOf(oldStr)

    if (i !== -1) this[i] = newStr
  },
})