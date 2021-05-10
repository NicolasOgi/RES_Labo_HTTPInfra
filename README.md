# RES_Labo_HTTPInfra

Rapport du labo sur l'infrastructure HTTP.

Auteurs : Léonard Besseau, Nicolas Ogi

Date : 10.05.2021

## Étape 1 

Image utilisée comme base dans le Dockerfile : [php:8.0.6-apache](https://hub.docker.com/_/php)

Tous les fichiers contenus dans le dossier *content* sont copiés dans le conteneur lors du build, dans le dossier */var/www/html*.

Template bootstrap utilisé pour la page index : https://startbootstrap.com/theme/agency

Les fichiers de configuration d'*Apache* dans le conteneur dans le dossier */etc/apache2* ont été laissés par défaut pour l'instant.