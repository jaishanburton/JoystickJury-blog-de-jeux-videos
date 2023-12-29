# ece-webtech-501
# Blog de Jeux-Vidéos - ECE Webtech Project

## Introduction
Ce projet regroupe les travaux réalisés pour le cours ece-webtech-501. Il a été principalement contribué par Jaishan BURTON ELMO, Mathys BAGNAH, et Marc-Antoine GRABEY. Le projet contient une application Next.js dans le dossier `client`.

### Structure du projet

- **Client**
  
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
  - Commentaire : Nous avons suivi la convention pour bien nommer nos fichiers.
  - Retour : Cette tâche nous a permis de découvrir les conventions du développement web.

- Project structure
  - Note : 2
  - Commentaire : Nous avons suivi la structure qui nous a été demandée dans le sujet.
  - Retour : Cette tâche nous a permis de comprendre comment structurer un projet de développement web.

- Git usage
  - Note : 2
  - Commentaire : Nous avons respecté les conventions de commit, en utilisant principalement "fix:" pour les correctifs mineurs et "feat:" pour les nouvelles fonctionnalités.
  - Retour : Cette tâche nous a permis d'apprendre les conventions des commits, essentiel pour le versionning sur GitHub.

- Code quality
  - Note : 4
  - Commentaire : Nous avons pris soin de bien indenter, espacer et commenter notre code pour améliorer sa lisibilité et sa compréhension.
  - Retour : Nous avions déjà l'habitude d'indenter et de commenter nos codes, facilitant ainsi cette tâche.

- Design, UX, and content
  - Note : 4
  - Commentaire : Nous avons rendu notre application facile d'utilisation permettant une bonne expérience utilisateur via un design reponsive et une large utilisation de la bibliothèque Tailwind.
  - Retour : Cette tâche nous a permis d'en apprendre beaucoup plus sur l'UX et le design d'interface d'une application web.

### Fonctionnalité de l'application

- Home page
  - Note : 2
  - Commentaire : Nous avons créé une page d'accueil accueillante et ergonomique à l'aide de carousel.

- Navigation
  - Note : 2
  - Commentaire : Nous avons créé une barre de navigation permettant d'accéder aux différentes pages de notre application.

- Login and profile page
  - Note : 4
  - Commentaire : Nous avons créé une page d'authentification. L'utilisateur peut ainsi s'inscrire et se connecter avec son email, ou bien directement avec son compte Github. L'utilisateur peut modifier ses informations personnelles (email, nom, langue...)
 
- Post creation and display
  - Note : 6
  - Commentaire : Nous avons mis en place un formulaire qui nous permet de choisir le nom de son jeu, sa catégorie, ainsi que d'écrire une description. Les posts sont triés par date de création. On peut ainsi faire un post sur un jeu, qu'on pourra par la suite modifier et/ou supprimer. Chaque post sera affiché sur sa propre page avec son contenu et ses commentaires. La liste des posts publique et accessible à tous. Les utilisateurs connectés sont les seuls à pouvoir créer un post. 

- Comment creation and display
  - Note : 4
  - Commentaire : L'utilisateur a la possibilité de poster un commentaire sous chaque publication. On peut voir le contenu, la date et l'heure du commentaire ainsi que le nom et la photo de profil de l'utilisateur qui commente.

- Post modification and removal
  - Note : 4
  - Commentaire :  Nous avons créé un bouton dans la page "Mes posts" permettant d'éditer ou supprimer un post (catégorie, nom du jeu et description).

- Search
  - Note : 6
  - Commentaire : Nous avons créé une barre de recherche sur la page liste des posts permettant de rechercher des posts. La recherche est effectuée en "server-side".

- Use an external API
  - Note : 2
  - Commentaire : Nous avons utilisé l'API de Google, nous permettant d'avoir accès aux vidéos YouTube. Ainsi dans la page Trailers, nous avons mis des bandes-annonces pour chacun de nos jeux.

- Resource access control
  - Note : 6
  - Commentaire : Nous avons configuré notre connexion de manière sécurisée avec Supabase pour éviter les accès inattendus et les tentatives d'intrusion (RLS). Ainsi seuls les utilisateurs authentifiés peuvent créer des posts et ne peuvent modifier/supprimer que leurs posts.

- Account Settings
  - Note : 4
  - Commentaire : Nous avons implémenté un tableau de bord permettant à l'utilisateur de modifier ses informations personnelles (email, nom, langue, photo de profil via Gravatar).

- WYSIWYG integration
  - Note : 1
  - Commentaire : Nous avions implémenté l'intégration WYSIWYG directement dans la page Post, mais nous l'avons retiré car l'importation de 'React-Quill' empêchait le déploiement sur Vercel (preuve dans nos derniers commits sur GitHub).

- Gravatar integration
  - Note : 2
  - Commentaire : Un utilisateur étant inscrit sur Gravatar aura sa photo de profil visible dans notre application. Sinon, une photo sera générée aléatoirement. 

- Light/Dark Mode
  - Note : 2
  - Commentaire : Dans la barre de navigation, un utilisateur peut choisir le mode clair ou sombre avec un bouton. 

## Bonus

- Likes on posts
  - Note : 2
  - Commentaire : Nous avons mis en place un système de likes sur chacun de nos posts. Ainsi, un utilisateur peut liker des posts. S'il n'a pas encore liké le post, le coeur sera blanc, sinon il sera rouge. 


## Divers

### Commentaires sur le cours
Nous avons beaucoup apprécié ce cours. Il nous a permis de découvrir le développement d'applications web et d'en connaitre les bases et les outils, notamment sur diverses technologies telles que React, Next.js ou encore Tailwind.
Cependant, nous trouvons que certains labs ne sont pas assez guidés notamment les derniers (Dex, Vercel...). 

### Réutilisation du projet
 Nous autorisons notre professeur l'utilisation de ce projet comme exemple pour les étudiants des prochaine années.
