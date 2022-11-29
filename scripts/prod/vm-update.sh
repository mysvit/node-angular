#!/bin/sh

set -eux

getReleaseName() {
  DAY=$(date +%d)
  MONTH=$(date +%m)
  YEAR=$(date +%y)
  RELEASE=$YEAR.$MONTH.$DAY
}

mp2ReloadService() {
  sudo su -c "pm2 reload all" -s /bin/sh pm2api
  sudo su -c "pm2 list" -s /bin/sh pm2api
}

downloadRelease() {
  rm -fr /www/*.tgz*
  cd /www
  wget https://github.com/mysvit/server-cli/releases/download/v$RELEASE/www.tgz
}

extractRelease() {
  rm -fr /www/client
  rm -fr /www/api
  cd /www
  tar -xvf www.tgz
}

executeDbUpdate() {
  if [ -f /www/db-updates/$RELEASE.sql ]; then
    DBNAME=server_db
    mariadb -h 127.0.0.1 -u root -p -D $DBNAME </www/db-updates/$RELEASE.sql
  fi
}

getReleaseName
downloadRelease
extractRelease
executeDbUpdate
mp2ReloadService
