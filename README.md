# RES_Labo_HTTPInfra

Rapport du labo sur l'infrastructure HTTP.

Auteurs : Léonard Besseau, Nicolas Ogi

Date : 10.05.2021

## Étape 1 

Image utilisée comme base dans le Dockerfile : [php:8.0.6-apache](https://hub.docker.com/_/php)

Tous les fichiers contenus dans le dossier *content* sont copiés dans le conteneur lors du build, dans le dossier */var/www/html*.

Template bootstrap utilisé pour la page index : https://startbootstrap.com/theme/agency

Les fichiers de configuration d'*Apache* dans le conteneur dans le dossier */etc/apache2* ont été laissés par défaut pour l'instant.



## Étape 2

Image utilisée comme base dans le Dockerfile : [node:14.16.1](https://hub.docker.com/_/node)

Tous les fichiers contenus dans le dossier *src* sont copiés dans le conteneur lors du build, dans le dossier */opt/app/html*. La commande `node /opt/app/index.js` est lancée dès le démarrage du conteneur.

Le fichier *index.js* gère un serveur http avec express et retourne une liste d'animaux avec leur pays de résidence actuel et leur prix en json.

On peut préciser le port qu'utilise le serveur dans le dockerfile. La configuration du serveur express est celle par défaut.

## Étape 3

Image utilisées : 

- [node:14.16.1](https://hub.docker.com/_/node) Serveur dynamique
- [php:8.0.6-apache](https://hub.docker.com/_/php) : serveur statique
-  [php:8.0.6-apache](https://hub.docker.com/_/php) : reverse proxy

Setup pour les serveurs est le même que précédemment.

On lance les 2 serveurs sans les binders à un port de la machine. On regarde les adresses attribués avec `docker inspect <Container-name> | grep -i ipaddress` et on les précises dans ***001-reverse-proxy.conf***. 

Nous utilisons l'image php et pas une image apache afin de pouvoir directement activer les modules avec des commandes dans le dockerfile.

La configuration est fragile car les adresses ip des serveurs sont alloués dynamiquement et peuvent donc changer ce qui implique de modifier les fochiers de configuration et de relancer le proxy.

