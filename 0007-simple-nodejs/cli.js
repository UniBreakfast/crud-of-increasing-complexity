const { createInterface } = require('readline')
const records = []
const { stdin, stdout, exit } = process

const cli = createInterface(stdin, stdout)

welcome()

function welcome() {
  cli.setPrompt('▷  ')
  output(`Record(s) stored: ${records.length}`)
  cli.on('line', handleInput)
  cli.prompt('▷  ')
}

function handleInput(str) {
  str = str.trim()

  if (/^e(xit)?$/.test(str)) exit()
  else if (/^c(reate)? +\S/.test(str)) handleCreate(str)
  else if (/^r(ead)? +(\d+(-\d+)?(, ?\d+(-\d+)?)*|all)$/.test(str)) handleRead(str)
  else if (/^u(pdate)? +(\d+(-\d+)?(, ?\d+(-\d+)?)*|all) +\S/.test(str)) handleUpdate(str)
  else if (/^d(elete)? +(\d+(-\d+)?(, ?\d+(-\d+)?)*|all)$/.test(str)) handleDelete(str)
  else helpOnIncorrectInput()

  cli.prompt('▷  ')
}

function output(str) {
  console.log(`\n◁  ${str}\n\n`)
}

function handleCreate(str) {
  const record = str.replace(/^c(reate)? +| +$/g, '')
  const count = records.push(record)

  output(`1 record created and ${count < 2 ? 'stored:' : `added${count < 3 ? '' : ` to ${count - 1} existing ones`}, now there are ${count}.`}\n  ${count}. ${record}`)
}

function handleRead(str) {
  const count = records.length

  if (!count) return output('No records to read, 0, none!')

  let indices = str.replace(/^r(ead)? +/, '')
  
  if (indices === 'all') {
    output(`${count < 2 ? 'The 1 and only record is' : `All ${count} records are`}:\n${records.map((record, i) => `  ${i + 1}. ${record}`).join('\n')}`)
  } else {
    indices = extractIndices(indices).sort((a, b) => a - b)
    const readCount = indices.length

    if (readCount < 1) return output(`Unable to read that, only ${count} ${count < 2 ? 'is' : 'are'} stored!`)

    output(`${readCount < 2 ? `1 record out of ${count} stored was` : `${readCount} records out of ${count} stored were`} read${`:\n${indices.map(i => `  ${i + 1}. ${records[i]}`).join('\n')}`}`)
  }
}

function handleUpdate(str) {
  const count = records.length

  if (!count) return output('No records to update, 0, none!')

  let [, indices, record] = str.match(/^u(?:pdate)? +(\d+(?:-\d+)?(?:, ?\d+(?:-\d+)?)*|all) +(.*)/)

  if (indices === 'all') {
    records.forEach((_, i) => records[i] = record)
    output(`${count < 2 ? 'The only record' : 'All records'} updated to:\n  ${record}`)
  } else {
    indices = extractIndices(indices).sort((a, b) => a - b)

    const oldRecords = indices.map(i => {
      const oldRecord = records[i]
      records[i] = record
      return oldRecord
    })
    const updCount = indices.length

    if (updCount < 1) return output(`Unable to update that, only ${count} ${count < 2 ? 'is' : 'are'} stored!`)

    output(`${updCount < 2 ? `1 record out of ${count} stored was` : `${updCount} records out of ${count} stored were`} updated${`:\n${indices.map((i, j) => `  ${i + 1}. ${oldRecords[j]}`).join('\n')}\n... and set to:\n  ${record}`}`)
  }
}

function handleDelete(str) {
  const count = records.length

  if (!count) return output('No records to delete, 0, none!')

  let indices = str.replace(/^d(elete)? +/, '')

  if (indices === 'all') {
    output(`${count < 2 ? 'The 1 and only record was' : `All ${count} records were`} deleted:\n${records.map((record, i) => `  ${i + 1}. ${record}`).join('\n')}\n... so there are no records now.`)

    records.length = 0
  } else {
    indices = extractIndices(indices).sort((a, b) => b - a)

    const deletedRecords = indices.map(i => records.splice(i, 1)[0])
    const delCount = indices.length

    if (delCount < 1) return output(`Unable to delete that, only ${count} ${count < 2 ? 'is' : 'are'} stored!`)

    output(`${delCount < 2 ? `1 record out of ${count} stored was` : `${delCount} records out of ${count} stored were`} deleted${`:\n${indices.map((i, j) => `  ${i + 1}. ${deletedRecords[j]}`).join('\n')}\n... so there ${count - delCount < 1 ? 'are no records' : `remain ${count - delCount} record${count - delCount < 2 ? '' : 's'} now`}.`}`)
  }
}

function extractIndices(indices) {
  return [...new Set(indices.split(/, ?/).flatMap(chunk => {
    if (chunk.match(/-/)) {
      let [start, end] = chunk.split('-')

      if (start > end) [start, end] = [end, start]
      
      return Array.from({ length: end - start + 1 }, (_, i) => +start + i - 1)
    } else {
      return chunk - 1
    }
  }))].filter(i => i < records.length)
}

function helpOnIncorrectInput() {
  output(`Command is incorrect, incomplete or too long!\n\nInput 'c' or 'create' and continue with a new record text to create a record.\nInput 'r' or 'read' and continue witn one number, two numbers separated by '-', multiple numbers separated by ',' or 'all' to read all records or records by those 1-based indices.\nInput 'u' or 'update' and continue with similar number pattern and new text to update one or multiple records.\nInput 'd' or 'delete' and continue with similar number pattern to delete one or multiple records.\n\nInput 'e' or 'exit' to exit.\nInput anything else to show this help.\n\nFinish input with Enter.`)
}
