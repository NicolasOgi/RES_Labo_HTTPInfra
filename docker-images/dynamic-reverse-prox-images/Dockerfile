FROM php:8.0.6-apache

EXPOSE 80

COPY conf/ /etc/apache2/

#COPY ./my-httpd.conf /usr/local/apache2/conf/httpd.conf
RUN a2enmod proxy proxy_http
RUN a2ensite 000-* 001-*
