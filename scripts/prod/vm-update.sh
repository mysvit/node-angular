#!/bin/sh

downloadRelease() {
  DAY=$(date -d "$D" '+%d')
  MONTH=$(date -d "$D" '+%m')
  YEAR=$(date -d "$D" '+%y')
  rm -fr /www/*.tgz*
  wget https://github.com/mysvit/server-cli/releases/download/v$YEAR.$MONTH.$DAY/www.tgz /www
}

extractRelease() {
  rm -fr /www/client
  rm -fr /www/api
  cd /www
  tar -xvf www.tgz

  find /www/ -exec chown www: {} \;
  chmod -R u=rwx,g=rx,o=rx /www
}

downloadRelease
extractRelease
