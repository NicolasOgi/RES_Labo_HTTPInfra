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