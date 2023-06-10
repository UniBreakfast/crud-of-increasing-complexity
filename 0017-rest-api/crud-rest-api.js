const records = []

require('http').createServer(async (request, response) => {
  const {method} = request
  
  if (method == 'POST') {
    records.push(await getBody(request))
    return response.end()
  }

  if (method == 'GET') {
    return response.end(JSON.stringify(records, null, 2))
  }

  if (method == 'PUT') {
    const [oldRecord, newRecord] = JSON.parse(await getBody(request))
    const i = records.indexOf(oldRecord)
    
    if (i !== -1) records[i] = newRecord
    
    return response.end()
  }

  if (method == 'DELETE') {
    const i = records.indexOf(await getBody(request))

    if (i !== -1) records.splice(i, 1)

    return response.end()
  }

  response.end('unsupported method')
}).listen(10017, () => console.log('http://localhost:10017'))

async function getBody(request) {
  let body = ''

  for await (const chunk of request) body += chunk

  return body
}
