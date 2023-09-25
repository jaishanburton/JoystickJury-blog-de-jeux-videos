// handles.js
const express = require('express');
const router = express.Router();
const url = require('url');
const qs = require('querystring');
const db = require('./db'); // Importez la base de données depuis le fichier db.js


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

// Route pour obtenir tous les articles
router.get('/articles', (req, res) => {
  res.json(db.articles);
});


// Route pour ajouter un nouvel article
router.post('/articles', (req, res) => {
  const newArticle = req.body; // Supposons que le corps de la requête contient les détails du nouvel article
  db.articles.push(newArticle);
  res.status(201).json(newArticle); // Répond avec le nouvel article ajouté
});

// Route pour obtenir un article par ID
router.get('/articles/:articleId', (req, res) => {
  const articleId = req.params.articleId;
  const article = db.articles.find((article) => article.id === articleId);

  if (!article) {
    return res.status(404).json({ error: 'Article not found' });
  }

  res.json(article);
});


module.exports = router;
