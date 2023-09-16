// handles.js
// Necessary imports

const url = require('url')
const qs = require('querystring')

module.exports = {
  serverHandle: function (req, res) {
    const route = url.parse(req.url)
    const path = route.pathname
    const params = qs.parse(route.query)

    // Retrieve and print the current path
    console.log(path)
    
    // Retrieve and print the queryParams
    console.log(params)

    res.writeHead(200, { 'Content-Type': 'text/html' })
    if (path === '/hello' && 'name' in params) {
      res.write('Hello ' + params['name'])
    } else {
      res.write('Hello anonymous')
    }
    

    res.end()
  }
}
