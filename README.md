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

Le fichier *index.js* va générer une chaîne ("Voici [préfixe] [animal] qui vient de [ville]") aléatoire grâce au module *Chance.js*.

**TODO**