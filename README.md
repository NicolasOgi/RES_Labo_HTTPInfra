# RES_Labo_HTTPInfra

Rapport du laboratoire sur l'infrastructure HTTP. Cette documentation incrémentale détaille la construction de
l'infrastructure par étape.

Auteurs : Léonard Besseau, Nicolas Ogi

Date : 27.05.2021

___

**IMPORTANT**:
Le fichier host doit être modifié pour rediriger demo.res.ch vers localhost.

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
