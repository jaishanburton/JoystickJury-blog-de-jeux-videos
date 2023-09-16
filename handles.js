const url = require('url');
const qs = require('querystring');
const pathModule = require('path');
const fs = require('fs');

module.exports = {
  serverHandle: function (req, res) {
    const route = url.parse(req.url);
    const pathName = route.pathname;
    const params = qs.parse(route.query);

    res.writeHead(200, { 'Content-Type': 'text/html' });

    if (pathName === '/') {
      res.write(`Bienvenue sur mon application. Voici comment /hello fonctionne :`);
      res.write(`<ul>`);
      res.write(`<li><a href="/hello?name=jaishan">/hello?name=jaishan repond avec une introduction sur moi.</a></li>`);
      res.write(`</ul>`);
    } else if (pathName === '/hello' && 'name' in params) {
      const name = params['name'];
      if (name.toLowerCase() === 'jaishan') {
        res.write(`Bonjour, je suis Jaishan, le createur de cette application !`);
      } else {
        res.write(`Bonjour ${name}`);
      }
    } else if (pathName === '/hello') {
      const randomNames = ["John", "Jack", "Joe"];
      const randomName = randomNames[Math.floor(Math.random() * randomNames.length)];
      res.write(`Bonjour ${randomName}`);
    } else if (pathName === '/about') {
      const filePath = pathModule.join(__dirname, 'content', 'about.json');
      
      if (fs.existsSync(filePath)) {
        const jsonData = fs.readFileSync(filePath, 'utf8');
        const aboutData = JSON.parse(jsonData);
        
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify(aboutData, null, 2));
      } else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.write(`404 Non trouve!\nLa page que vous recherchez est introuvable.`);
      }
    } else {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.write(`404 Non trouve!\nLa page que vous recherchez est introuvable.`);
    }

    res.end();
  },
};
