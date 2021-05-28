# RES_Labo_HTTPInfra

Rapport du laboratoire sur l'infrastructure HTTP. Cette documentation incrémentale détaille la construction de
l'infrastructure par étape.

Auteurs : Léonard Besseau, Nicolas Ogi

Date : 27.05.2021

___

**IMPORTANT**:
Le fichier host doit être modifié pour rediriger demo.res.ch vers localhost.

## Étape 5

### But

Le but de cette étape consiste à modifier le reverse proxy afin que les adresses IP des serveurs soient obtenues de manière dynamique.

### Images utilisées

- [node:14.16.1](https://hub.docker.com/_/node) Serveur dynamique (Défini à l'étape 2)
- [php:8.0.6-apache](https://hub.docker.com/_/php) : serveur statique (Défini à l'étape 4)
- [php:8.0.6-apache](https://hub.docker.com/_/php) : reverse proxy. Similaire à l'étape 3

Les images utilisées sont les mêmes qu'auparavant mais nous utilisons `docker-compose` pour simplifier la création des
conteneurs et du réseau. Nous n'avons pas utilisé la solution proposée mais avons profité du fait que les réseaux
Docker créés par un utilisateur permettent la résolution dynamique des noms de
conteneurs [[1]](https://docs.docker.com/network/bridge/#differences-between-user-defined-bridges-and-the-default-bridge)
. Nous n'avons donc pas besoin de nous occuper de récupérer les adresses IP d'un quelconque conteneur et pouvons lancer
tous les conteneurs en une seule commande.

### Commandes
Toutes les images des étapes précédentes doivent être construites avec la commande `docker build` avant de lancer la commande
ci-dessous.

`docker-compose up -d` : Démarre en arrière-plan l'infrastructure contenant les serveurs statique et dynamique ainsi que le reverse proxy