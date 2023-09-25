// handles.js
const express = require('express');
const router = express.Router();
const url = require('url');
const qs = require('querystring');

// Route principale
router.get('/', (req, res) => {
  res.send('Hello World');
});

// Route '/hello' avec des paramètres
router.get('/hello', (req, res) => {
  const route = url.parse(req.url);
  const path = route.pathname;
  const params = qs.parse(route.query);

  if ('name' in params) {
    res.send(`Hello ${params['name']}`);
  } else {
    res.send('Hello anonymous');
  }
});

module.exports = router;
