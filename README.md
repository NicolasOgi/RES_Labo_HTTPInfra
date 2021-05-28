# RES_Labo_HTTPInfra

Rapport du laboratoire sur l'infrastructure HTTP. Cette documentation incrémentale détaille la construction de
l'infrastructure par étape.

Auteurs : Léonard Besseau, Nicolas Ogi

Date : 27.05.2021

___

**IMPORTANT**:
Le fichier host doit être modifié pour rediriger demo.res.ch vers localhost.

## Étape 4 : AJAX requests with JQuery

### But

Le but de cette étape consiste à modifier le serveur statique afin qu'il récupère la liste d'animaux générée aléatoirement
par le serveur dynamique et en affiche un.

### Images utilisées

- [node:14.16.1](https://hub.docker.com/_/node) : Serveur dynamique (Défini à l'étape 2)
- [php:8.0.6-apache](https://hub.docker.com/_/php) : Serveur statique. Essentiellement la même qu'à l'étape 1 mais
  avec un script supplémentaire dans les sources.
- [php:8.0.6-apache](https://hub.docker.com/_/php) : Reverse proxy (Défini à l'étape 3)

Même config qu’avant. Les requêtes sont bien envoyées par le navigateur (vérifié avec les devs-tools)
Le reverse proxy est essentiel à cause de la Same-Origin Policy qui oblige à ce que les requêtes viennent du même
serveur.

Les requêtes vers le serveur dynamique sont gérées par un script JQuery situé dans `content/js/animals.js`.
Une nouvelle requête est effectuée toutes les 2 secondes.

### Commandes
Voici les commandes pour construire l'image à partir du Dockerfile et ensuite lancer un conteneur.

`docker build -t ajax .` Construit une image nommée *ajax*.

`docker run --name monsieur_propre -d ajax:latest` Démarre un conteneur portant le nom *monsieur_propre* en arrière-plan.