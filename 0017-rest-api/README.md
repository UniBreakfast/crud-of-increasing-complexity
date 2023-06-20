<table>
  <tr>
    <td><a href="../0000-simplest-for-me/README.md">0000 simplest</a> <b>↴</b></td>
    <td>&nbsp; &nbsp; &nbsp;</td>
    <td></td>
  </tr>
  <tr>
    <td>&nbsp; &nbsp; <a href="../0003-simplest-nodejs-repl/README.md">0003 NodeJS REPL</a> <b>↴</b></td>
    <td>&nbsp; &nbsp; &nbsp;</td>
    <td><b>↱</b> <a href="../0018-ssr-page-ui/README.md">0018 with SSR page</a> +1</td>
  </tr>
</table>

# [0017 The simplest CRUD implementation as a REST API](https://github.com/UniBreakfast/crud-of-increasing-complexity/blob/master/0017-rest-api/README.md)

## What is this?

This is the simplest CRUD implementation for NodeJS as a REST API. It is based on the [simplest NodeJS implementation](../0003-simplest-nodejs-repl/README.md) which was accessible only for a manual input through a REPL. This one is accessible only via API over HTTP(S) requests. I'm most used to think in JavaScript and array methods, so I'm going to use them. It's in server memory without any persistent storage between runs for the sake of simplicity. Here, I will list the operations, describe how they are supposed to be performed, and provide their implementations.

## What is CRUD?

CRUD is an acronym for Create, Read, Update and Delete. It's a set of operations that are usually performed on data. It's a common set of operations for databases, but it can be used for any kind of data. In this case I will use it for a simple array of strings. The minimum set of operations I have in mind for this particular simplest implementation includes:

- Create (one): add a new string to the array
- Read (all): get all strings from the array
- Update (one): change a string in the array
- Delete (one): remove a string from the array

I will not implement any other operations, like read individual items or delete all, because I want to keep this implementation as simple as it is acceptable for me.

## How to perform CRUD operations?

To run this implementation you should have NodeJS installed. Run `node crud-rest-api` in your terminal in the implementation folder.
There's no UI in this simplest implementation, so we're using anything able to send HTTP-requests: browser with console, Postman, CURL, code-editor extensions, etc.

### Create (one)

To create a new string in the array, we need to send a `POST` request. I would open `http://localhost:10017` and then from the console I execute:

```js
fetch('/', { method: 'POST', body: 'record 1 text' })
```

Or in Postman I would send a `POST` request to `http://localhost:10017` with the body of `record 2 text`.

Or in CURL I would execute:

```sh
curl -X POST -d 'record 3 text' http://localhost:10017
```

### Read (all)

To read all strings from the array, we need to send a `GET` request. I would simply open `http://localhost:10017` and the browser would get a response with the array of strings and show it instead of the page.

Or in console I would execute:

```js
fetch('/').then(response => response.json()).then(console.log)
```

Or in Postman I would send a `GET` request to `http://localhost:10017` and get the response with the array of strings.

Or in CURL I would execute:

```sh
curl http://localhost:10017
```

### Update (one)

To update a string in the array, I would need to send a `PUT` request. I would open `http://localhost:10017` and then from the console I execute:

```js
fetch('/', { method: 'PUT', body: JSON.stringify(['record 1 text', 'record 1 text updated']) })
```

Or in Postman I would send a `PUT` request to `http://localhost:10017` with the body of `["record 2 text", "record 2 text updated"]`.

Or in CURL I would execute:

```sh
curl -X PUT -d '["record 3 text", "record 3 text updated"]' http://localhost:10017
```

### Delete (one)

To delete a string from the array, I would need to send a `DELETE` request. I would open `http://localhost:10017` and then from the console I execute:

```js
fetch('/', { method: 'DELETE', body: 'record 1 text updated' })
```

Or in Postman I would send a `DELETE` request to `http://localhost:10017` with the body of `record 2 text updated`.

Or in CURL I would execute:

```sh
curl -X DELETE -d 'record 3 text updated' http://localhost:10017
```

## The implementation details

<details>
  <summary>The main parts of implementation are:</summary><br>

  ```js
  const records = []

  require('http').createServer(async (req, resp) => {
    const {method} = req
    
    if (method == 'POST') {
      records.push(await getBody(req))
    }
    if (method == 'GET') {
      return resp.end(JSON.stringify(records, null, 2))
    }
    if (method == 'PUT') {
      const [oldRecord, newRecord] = JSON.parse(await getBody(req))
      const i = records.indexOf(oldRecord)
      if (i !== -1) records[i] = newRecord
    }
    if (method == 'DELETE') {
      const i = records.indexOf(await getBody(req))
      if (i !== -1) records.splice(i, 1)
    }
  }).listen(10017)

  async function getBody(req) {
    let body = ''
    for await (const chunk of req) body += chunk
    return body
  }
  ```

  Full source code is the file [crud-rest-api.js](./crud-rest-api.js).

</details><br>

## Testing

<details>
  <summary>
  To run this implementation you should have NodeJS installed. Run <code>node crud-rest-api</code> in your terminal to start REST API server. Then you can use any tool to send HTTP-requests to it.
  </summary><br>

  I would open `http://localhost:10017` and then from the console I execute:

  ```js
  fetch('/', { method: 'POST', body: 'record 1 text' }).then(() => {
    return fetch('/', { method: 'POST', body: 'record 2 text'})
  }).then(() => {
    return fetch('/', { method: 'POST', body: 'record 3 text'})
  }).then(() => {
    return fetch('/', { method: 'PUT', body: JSON.stringify(['record 1 text', 'record 1 text updated']) })
  }).then(() => {
    return fetch('/', { method: 'DELETE', body: 'record 2 text' })
  }).then(() => {
    return fetch('/', { method: 'GET' })
  }).then(response => response.json()).then(console.log)
  // (2) ["record 1 text updated", "record 3 text"]
  ```
  
  Or in terminal I would execute:

  ```sh
  curl -X POST -d 'record 1 text' http://localhost:10017
  curl -X POST -d 'record 2 text' http://localhost:10017
  curl -X POST -d 'record 3 text' http://localhost:10017
  curl -X PUT -d '["record 1 text", "record 1 text updated"]' http://localhost:10017
  curl -X DELETE -d 'record 2 text' http://localhost:10017
  curl http://localhost:10017
  # ["record 1 text updated","record 3 text"]
  ```

And then you can compare the actual output with the expected output in the comments.
</details><br>

## What's next?

- [add SSR frontend page](../0018-ssr-page-ui/README.md)
- add CSR frontend page
- add some CRUD functions
- add CRUD methods
- add persistency
- scale up
- add ids
- add validation
- add database
- store to files
  
... the possibilities are endless
