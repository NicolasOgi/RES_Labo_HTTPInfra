# RES_Labo_HTTPInfra

Rapport du labo sur l'infrastructure HTTP.

Auteurs : Léonard Besseau, Nicolas Ogi

Date : 10.05.2021

## Étape 1 

Image utilisée comme base dans le Dockerfile : [php:8.0.6-apache](https://hub.docker.com/_/php)

Tous les fichiers contenus dans le dossier *content* sont copiés dans le conteneur lors du build, dans le dossier */var/www/html*.

Template bootstrap utilisé pour la page index : https://startbootstrap.com/theme/agency

Les fichiers de configuration d'*Apache* dans le conteneur dans le dossier */etc/apache2* ont été laissés par défaut pour l'instant.

#### Command

`docker build -t php_apache .` Build

`docker run -p 2001:80 --name php_statique -d php_apache:latest` run

`docker exec -it php_statique /bin/bash` Connect to container. 

## Étape 2

Image utilisée comme base dans le Dockerfile : [node:14.16.1](https://hub.docker.com/_/node)

Tous les fichiers contenus dans le dossier *src* sont copiés dans le conteneur lors du build, dans le dossier */opt/app/html*. La commande `node /opt/app/index.js` est lancée dès le démarrage du conteneur.

Le fichier *index.js* gère un serveur http avec express et retourne une liste d'animaux avec leur pays de résidence actuel et leur prix en json.

On peut préciser le port qu'utilise le serveur dans le dockerfile. La configuration du serveur express est celle par défaut.

## Étape 3

Image utilisées : 

- [node:14.16.1](https://hub.docker.com/_/node) Serveur dynamique
- [php:8.0.6-apache](https://hub.docker.com/_/php) : serveur statique
- [php:8.0.6-apache](https://hub.docker.com/_/php) : reverse proxy

Setup pour les serveurs est le même que précédemment.

On lance les 2 serveurs sans les binders à un port de la machine. On regarde les adresses attribués avec `docker inspect <Container-name> | grep -i ipaddress` et on les précises dans ***001-reverse-proxy.conf***. 

Nous utilisons l'image php et pas une image apache afin de pouvoir directement activer les modules avec des commandes dans le dockerfile.

La configuration est fragile car les adresses ip des serveurs sont alloués dynamiquement et peuvent donc changer ce qui implique de modifier les fichiers de configuration et de relancer le proxy.

![image-20210523141458051](images/image-20210523141458051.png)

Le seul container accessible est le reverse apache static car il est le seul avec des ports mappés vers l'extérieur.

## Étape 4

Image utilisées : 

- [node:14.16.1](https://hub.docker.com/_/node) Serveur dynamique
- [php:8.0.6-apache](https://hub.docker.com/_/php) : serveur statique
- [php:8.0.6-apache](https://hub.docker.com/_/php) : reverse proxy

Même config que avant.
Les requêtes sont bien envoyés par le navigateur (vérifié avec les devs-tools)
Le reverse proxy est essentiel à cause de la Same-Origin policy qui oblige à ce que les requêtes viennent du même serveur et le cors est désactive.

## Étape 5

Image utilisées : 

- [node:14.16.1](https://hub.docker.com/_/node) Serveur dynamique
- [php:8.0.6-apache](https://hub.docker.com/_/php) : serveur statique
- [php:8.0.6-apache](https://hub.docker.com/_/php) : reverse proxy

Les images utilisés sont les mêmes que auparavant mais nous utilisons docker-compose pour simplifier la création des conteneurs et du réseaux. Nous n'avons pas utilisé la solution proposé mais avons utilisé le fait que les réseaux dockers crée par un utilisateur permettent la résolution dynamique des noms de conteneurs [[1]](https://docs.docker.com/network/bridge/#differences-between-user-defined-bridges-and-the-default-bridge).
Nous n'avons donc pas besoin de nous occuper de récupérer les adresses ip d'un quelconque conteneurs et pouvons lancer tous les conteneurs en une seule commande.

## Bonus

Pour les bonus, nous avons choisi d'implémenter le load-balancing avec [traefik](https://traefik.io/). 

mage utilisées : 

- [node:14.16.1](https://hub.docker.com/_/node) Serveur dynamique
- [php:8.0.6-apache](https://hub.docker.com/_/php) : serveur statique
- [php:8.0.6-apache](https://hub.docker.com/_/traefik/) : reverse proxy

Le load-balancer fonctionne en round-robin et concerne il y a 2 clusters de serveurs qui sont gérés, 1 pour la partie statique et l'autre pour la partie dynamique.

Pour vérifier l'implémentation, nous avons modifié l'implémentation du serveur dynamique pour retourner un uid qui est fixé à la création du serveur. En effectuant des requêtes, on peut voir que l'uid change à chaque requete (de façon périodique selon le nombre de serveur crées).

Les clusters sont également dynamique et le nombre de serveur actif peut être modifié à la volée. 

### TODO Commande pour modifier Dynamiquement les clusters

### TODO Test avec script qui garde le nombre de fois ou un sid est recupéré

Pour cela nous avons utilisé les capacités de traefik.

### TODO sticky session

