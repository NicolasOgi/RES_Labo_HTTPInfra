FROM php:8.0.6-apache

EXPOSE 80
COPY conf/ /etc/apache2/

RUN a2enmod proxy proxy_http
RUN a2ensite 000-* 001-*
