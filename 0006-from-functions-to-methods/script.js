const records = []

records.readAllRecords = function () {
  return this
}

records.createOneRecord = function (str) {
  this.push(str)
}

records.deleteOneRecord = function (str) {
  const i = this.indexOf(str)

  if (i !== -1) this.splice(i, 1)
}

records.updateOneRecord = function (oldStr, newStr) {
  const i = this.indexOf(oldStr)

  if (i !== -1) this[i] = newStr
}





