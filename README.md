# RES_Labo_HTTPInfra

Rapport du laboratoire sur l'infrastructure HTTP. Cette documentation incrémentale détaille la construction de
l'infrastructure par étape.

Auteurs : Léonard Besseau, Nicolas Ogi

Date : 27.05.2021

___

**IMPORTANT**:
Le fichier host doit être modifié pour rediriger demo.res.ch vers localhost.

## Étape 2 : Dynamic HTTP server with express.js

### But

Le but de cette étape consiste à configurer et déployer un serveur HTTP dynamique utilisant *Express* à l'aide d'une image
Docker récupérée sur Docker Hub.

### Images utilisées

[node:14.16.1](https://hub.docker.com/_/node) : Nous utilisons l'image Docker *node* comme base dans notre Dockerfile
car l'environnement *nodeJS* y est déjà installé et nous permet d'installer facilement les dépendances de notre serveur et de le lancer.

Tous les fichiers contenus dans le dossier `src` sont copiés dans le conteneur lors du build, dans le dossier `/opt/app/`.
Les dépendances sont installées à l'aide de *npm* (Commande `RUN npm install`).
Le serveur est lancé au démarrage du conteneur avec la commande `node index.js` qui va permettre à ce dernier d'écouter sur le port
défini dans le Dockerfile ou sur le port 3000 si rien n'a été défini.

Le fichier *index.js* gère un serveur HTTP avec *Express* et retourne une liste d'animaux avec leur pays d'origine
actuel et leur prix, en JSON. Le module *chance* a été utilisé afin de générer aléatoirement cette liste d'animaux.

Il est possible de préciser le port qu'utilisera le serveur dans le Dockerfile (Variable d'environnement `PORT`).
La configuration du serveur *Express* est celle par défaut.

### Commandes
Voici les commandes pour construire l'image à partir du Dockerfile et ensuite lancer un conteneur.

`docker build -t dynamic_express .` Construit une image nommée *dynamic_express*.

`docker run -p 2002:8080 --name express -d dynamic_express:latest` Démarre un conteneur portant le nom *express*
en arrière-plan en mappant le port 2002 de l'hôte sur le port 8080 du conteneur.