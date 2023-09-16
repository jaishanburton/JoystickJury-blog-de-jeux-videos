//index.js

const http = require('http');
const url = require('url');
const qs = require('querystring'); // Import the querystring module
const handles = require('./handles')

// Define a string constant concatenating strings

http.createServer(handles.serverHandle).listen(8080);

