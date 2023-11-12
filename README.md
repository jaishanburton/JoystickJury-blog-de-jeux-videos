# ece-webtech-501

## Introduction
Ce projet regroupe les travaux réalisés pour le cours ece-webtech-501. Il a été principalement contribué par Jaishan BURTON ELMO, Mathys BAGNAH, et Marc-Antoine GRABEY. Le projet contient deux parties principales : une application Next.js dans le dossier `app` et un serveur Express dans le dossier `lab`.

## Structure du projet

### App
L'application est basée sur Next.js. Vous pouvez trouver la configuration principale dans `next.config.js`. Le dossier contient également des composants, des pages, des configurations pour Tailwind CSS, et d'autres ressources nécessaires.

### Lab
Le serveur Express est contenu dans ce dossier. Il utilise un middleware pour parser les requêtes JSON et un routeur provenant du fichier `handles.js`. Le serveur est configuré pour écouter sur le port 8080.

## Comment utiliser le projet

### Installation
- Assurez-vous d'avoir Node.js et npm installés sur votre machine.
- Clonez le dépôt ou téléchargez le code source.
- Dans le répertoire principal du projet, exécutez la commande `npm install` pour installer toutes les dépendances nécessaires.

## Exécution

Pour lancer l'application Next.js :

- Ouvrez un terminal et naviguez jusqu'au dossier `app`.
- Exécutez la commande `npm install` pour installer toutes les dépendances nécessaires, si ce n'est pas déjà fait.
- Lancez l'application en exécutant `npm run dev`.
- L'application sera accessible via `http://localhost:3000` dans votre navigateur web.

Pour démarrer le serveur Express :

- Ouvrez un terminal et placez-vous dans le répertoire principal du projet.
- Exécutez `node lab/index.js` pour lancer le serveur.
- Le serveur Express sera disponible et à l'écoute sur le port 8080. Vous pourrez y accéder via un navigateur ou un outil comme Postman à l'adresse `http://localhost:8080`.

