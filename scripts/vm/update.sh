#!/bin/sh

# api
useradd -m -d /home/wwwapi wwwapi
passwd wwwapi
git clone https://github.com/stmichaelmontreal/api.git /var/www/api
npm install --prefix /var/www/api --production
find /var/www/api/ -exec chown wwwapi: {} \;
chmod -R u=rwx,g=rx,o=rx /var/www/api/
