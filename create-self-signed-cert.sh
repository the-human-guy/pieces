#!/bin/bash

openssl req -x509 -sha256 -nodes -newkey rsa:2048 -days 365 -subj "/C=US/ST=Oregon/L=Portland/O=Company Name/OU=Org/CN=localhost" -keyout /etc/letsencrypt/live/site.localhost/privkey.pem -out /etc/letsencrypt/live/site.localhost/fullchain.pem
