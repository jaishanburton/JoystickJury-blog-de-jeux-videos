// index.js
const express = require('express');
const app = express();
const handles = require('./handles');

// Middleware pour parser les requêtes JSON
app.use(express.json());

// Utilisation du routeur
app.use('/', handles);

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
