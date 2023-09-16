// index.js
const http = require('http')
const handles = require('./handles')

http
  .createServer(handles.serverHandle)
  .listen(8080) 
