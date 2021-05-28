# RES_Labo_HTTPInfra

Rapport du laboratoire sur l'infrastructure HTTP. Cette documentation incrémentale détaille la construction de
l'infrastructure par étape.

Auteurs : Léonard Besseau, Nicolas Ogi

Date : 27.05.2021

___

**IMPORTANT**:
Le fichier host doit être modifié pour rediriger demo.res.ch vers localhost.

## Étape 1 : Static HTTP server with apache httpd

### But

Le but de cette étape consiste à configurer et déployer un serveur HTTP statique utilisant *Apache* à l'aide d'une image
Docker récupérée sur Docker Hub.

### Images utilisées

[php:8.0.6-apache](https://hub.docker.com/_/php) : Nous utilisons l'image Docker *php* comme base dans notre Dockerfile
car elle dispose déjà d'un serveur Apache configuré pour fournir des pages PHP.

Tous les fichiers contenus dans le dossier `content` sont copiés dans le conteneur lors du build, dans le dossier `/var/www/html`.
Le template bootstrap utilisé pour la page d'accueil peut être trouvé [ici](https://startbootstrap.com/theme/agency).

Les fichiers de configuration d'*Apache* à l'intérieur du conteneur, situés dans le dossier `/etc/apache2` n'ont pas été modifiés.

### Commandes
Voici les commandes pour construire l'image à partir du Dockerfile et ensuite lancer un conteneur.

`docker build -t php_apache .` Construit une image nommée *php_apache*.

`docker run -p 2001:80 --name php_statique -d php_apache:latest` Démarre un conteneur portant le nom *php_statique*
en arrière-plan en mappant le port 2001 de l'hôte sur le port 80 du conteneur.

`docker exec -it php_statique /bin/bash` Lance un shell sur le conteneur.

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

## Étape 3 : Reverse proxy with apache (static configuration)

### But

Le but de cette étape consiste à configurer et déployer un reverse proxy devant un serveur HTTP dynamique et
un serveur HTTP statique, en utilisant *Apache* à l'aide d'une image Docker récupérée sur Docker Hub. Ceci nous permet de
respecter la Same-Origin policy.

### Images utilisées

- [node:14.16.1](https://hub.docker.com/_/node) : Serveur dynamique (Défini à l'étape 2)
- [php:8.0.6-apache](https://hub.docker.com/_/php) : Serveur statique (Défini à l'étape 1)
- [php:8.0.6-apache](https://hub.docker.com/_/php) : Reverse proxy. Nous utilisons l'image *php* car *Apache* y est
  déjà configuré et nous pouvons utiliser les commandes (`a2enmod`, `a2ensite`, etc.) pour activer les modules nécessaires à un reverse proxy,
  ce qui n'était pas possible avec l'image [httpd](https://hub.docker.com/_/httpd/) (Les commandes étaient désactivées).

Setup pour les serveurs est le même que précédemment.

On lance les 2 serveurs sans les binders à un port de la machine. On regarde les adresses attribuées
avec `docker inspect <Container-name> | grep -i ipaddress` et on les précise dans ***001-reverse-proxy.conf***.

La configuration est fragile car les adresses IP des serveurs sont allouées dynamiquement et peuvent donc changer ce qui
implique de modifier les fichiers de configuration et de relancer le reverse proxy.

![Image des ports](images/image-20210523141458051.png)

Le seul conteneur accessible est le `reverse_apache_static` car il est le seul avec des ports mappés vers l'extérieur.

### Commandes
Voici les commandes pour construire l'image à partir du Dockerfile et ensuite lancer un conteneur.

`docker build -t reverse_apache .` Construit une image nommée *reverse_apache*.

`docker run -p 80:80 --name reverse_apache_static -d reverse_apache:latest` Démarre un conteneur portant le nom *reverse_apache_static*
en arrière-plan en mappant le port 80 de l'hôte sur le port 80 du conteneur.
