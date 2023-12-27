# ece-webtech-501

## Introduction
Ce projet regroupe les travaux réalisés pour le cours ece-webtech-501. Il a été principalement contribué par Jaishan BURTON ELMO, Mathys BAGNAH, et Marc-Antoine GRABEY. Le projet contient deux parties principales : une application Next.js dans le dossier `application` et un serveur Express dans le dossier `lab`.

### Structure du projet

- **Application**
  
  L'application est basée sur Next.js. Vous pouvez trouver la configuration principale dans `next.config.js`. Le dossier contient également des composants, des pages, des configurations pour Tailwind CSS, et d'autres ressources nécessaires.

### Prérequis

- **Node.js**
  
  Vous devez avoir `Node.js: ^16.0.0` d'installé.
  
- **Docker**
  
  Vous devez avoir `Docker: ^24.0.6` d'installé.

- **Supabase**
  
  Vous devez avoir accès a supabase.


### Comment utiliser le projet

- **Installation**
  - Assurez-vous d'avoir Node.js et npm installés sur votre machine.
  - Clonez le dépôt ou téléchargez le code source.
  - Dans le répertoire principal du projet, exécutez la commande suivante pour installer toutes les dépendances nécessaires.
    ```
    npm install
    ```

- **Exécution**

    Pour lancer l'application Next.js :
    
    - Ouvrez un terminal et naviguez jusqu'au dossier `app`.
    - Exécutez la commande suivante pour installer toutes les dépendances nécessaires, si ce n'est pas déjà fait.
    ```
    npm install
    ```
    - Lancez l'application avec la commande :
    ```
    npm run dev
    ```
    - L'application sera accessible via `http://localhost:3000` dans votre navigateur web.
 
## Liens vers notre Projet
-  Lien Vercel : https://ece-webtech-501.vercel.app/
-  Lien projet Supabase : [Cliquer ici]()

## Auteurs
- Jaishan BURTON ELMO, SI Gr 05
- Mathys BAGNAH, SI Gr 05
- Marc-Antoine GRABEY, SI Gr 05

## Evaluation

### Management du projet

- Naming Convention
  - Note : 2
  - Commentaire : Nous avons suivi la convention de nommage des fichiers.
  - Retour : Cette tâche facile nous a permis de découvrir les conventions du développement web.

- Project structure
  - Note : 2
  - Commentaire : Nous avons suivi la structure d'application web.
  - Retour : Cette tâche facile nous a permis de savoir comment structurer un projet de développement web.

- Git usage
  - Note : 2
  - Commentaire : Nous avons suivi les conventions des commits. Nous avons principalement utilisé "fix: " pour les petits correctifs et "feat: " pour les nouvelles fonctionnalités.
  - Retour : Cette tâche facile nous a permis d'apprendre les conventions des commits.

- Code quality
  - Note : 4
  - Commentaire : Nous avons durant ce projet pris soin de correctement indenter, d'espacer et de rédiger des commentaires dans le but d'améliorer la compréhensibilité de notre projet.
  - Retour : Nous avions déjà pour habitude d'indenter et commenter nos codes et projets cette tâche était ainsi facilitée.

- Design, UX, and content
  - Note : 4
  - Commentaire : Nous avons rendu notre application facile d'utilisation permettant une bonne expérience utilisateur via un designe reponsive et une large utilisation de la bibliothèque Tailwind.
  - Retour : Cette tâche complexe nous a premis d'en apprendre beaucoup sur l'UX et le designe d'interface.

### Fonctionnalité de l'application

- Home page
  - Note : 2
  - Commentaire : Nous avons créé une page d'accueil acceuillante avec des "call to action".

- Navigation
  - Note : 2
  - Commentaire : Nous avons créé une barre de navigation permettant de rejoindre toutes les pages.

- Login and profile page
  - Note : 4
  - Commentaire : Nous avons créé une page d'authentification et de connexion avec un moyen de se connecter avec Github. Nous pouvons ainsi voir les posts que nous avions écrits précédemment.
 
- Post creation and display
  - Note : 6
  - Commentaire : Nous avons créé un form permettant de choisir un jeu et de rédiger un post sur un jeu, de le partager et de le stocker dans la base de données. Les post sont public et sont rédigeable uniquement par des utilisateurs authentifiés.

- Comment creation and display
  - Note : 4
  - Commentaire : Nous avons créé un bouton de commenter les posts de jeux vidéo depuis la page du post. Nous conservons le commentaire et le mail de l'utilisateur dans la base de données.

- Post modification and removal
  - Note : 4
  - Commentaire :  Nous avons créé un bouton dans la page "Mes posts" permettant d'éditer ou supprimer un post.

- Search
  - Note : 6
  - Commentaire : Nous avons créé une barre de recherche permettant de rechercher des posts. La recherche est effectuée en "server-side".

- Use an external API
  - Note : 2
  - Commentaire : Nous avons utilisé l'API de google pour des vidéos Youtube visible sur la page des trailers.

 - Resource access control
  - Note : 6
  - Commentaire : Nous avons configuré notre connexion avec supabase via RLS pour évité les accès inatendus et les tentatives d'intrusion. Ainsi seuls les utilisateurs authentifiés peuvent créer des posts et ne peuvent modifier que leurs prosts.

- Light/dark mode
  - Note : 2
  - Commentaire : Nous avons implémenté un dark mode permettant de passer l'header d'un mode clair à un mode sombre persistant d'une page à l'autre.
## Divers

### Retour du cours
Nous avons beaucoup apprécier ce cours. Il nous a permis de découvrir le développement d'applications web et d'en connaitre les bases et les outils. 

### Réutilisation du projet
 Nous autorisons notre professeur l'utilisation de ce projet comme exemple pour les étudiants des prochaine années
