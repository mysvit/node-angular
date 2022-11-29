#!/bin/sh

set -eux

# add our user and group first to make sure their IDs get assigned consistently, regardless of whatever dependencies get added
installCommonLib() {
  apt-get update

  DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends \
    ca-certificates \
    gpg \
    gpgv \
    libjemalloc2 \
    pwgen \
    tzdata \
    xz-utils \
    zstd \
    dirmngr \
    gpg-agent \
    wget
}

addKeys() {
  GPG_KEYS="177F4010FE56CA3336300305F1656F24C74CD1D8"
  gpg --batch --keyserver hkps://keys.openpgp.org --recv-keys B42F6819007F00F88E364FD4036A9C25BF357DD4
  for key in $GPG_KEYS; do
    gpg --batch --keyserver keyserver.ubuntu.com --recv-keys "$key"
  done

  gpg --batch --export "$GPG_KEYS" >/etc/apt/trusted.gpg.d/mariadb.gpg
  if command -v gpgconf >/dev/null; then
    gpgconf --kill all
  fi
}

# Install Mariadb
installMariaDb() {
  groupadd -r mysql && useradd -r -g mysql mysql

  LANG=C.UTF-8
  MARIADB_VERSION=1:10.10.2+maria~ubu2204
  REPOSITORY="http://archive.mariadb.org/mariadb-10.10.2/repo/ubuntu/ jammy main"

  # add repository pinning to make sure dependencies from this MariaDB repo are preferred over Debian dependencies
  #  libmariadbclient18 : Depends: libmysqlclient18 (= 5.5.42+maria-1~wheezy) but 5.5.43-0+deb7u1 is to be installed
  echo "deb ${REPOSITORY}" >/etc/apt/sources.list.d/mariadb.list
  {
    echo 'Package: *'
    echo 'Pin: release o=MariaDB'
    echo 'Pin-Priority: 999'
  } >/etc/apt/preferences.d/mariadb

  {
    echo "mariadb-server" mysql-server/root_password password 'unused'
    echo "mariadb-server" mysql-server/root_password_again password 'unused'
  } | debconf-set-selections
  apt-get update

  # mariadb-backup is installed at the same time so that `mysql-common` is only installed once from just mariadb repos
  apt-get install -y "mariadb-server=$MARIADB_VERSION" mariadb-backup socat

  # secure mariadb
  mariadb-secure-installation

  DBNAME=server-db
  mariadb -h 127.0.0.1 -u root -p -e "CREATE DATABASE $DBNAME CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci;"
}

installNodeJS() {
  # NODEJS 16
  wget -qO- https://deb.nodesource.com/setup_16.x | bash -
  apt-get install -y nodejs

  npm install --location=global npm@latest
}

installPM2() {
  useradd -m -d /home/pm2api pm2api
  passwd pm2api
  npm install --location=global pm2@latest
  mkdir -p /var/log/pm2
  sudo su -c "pm2 start /www/api/server.js ---log '/var/log/pm2' -node-args '--experimental-specifier-resolution=node'" -s /bin/sh pm2api
  # pm2 startup
  sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u pm2api --hp /home/pm2api
  sudo su -c "pm2 save" -s /bin/sh pm2api
}

# Install Caddy 2
installCaddy() {
  echo "deb [trusted=yes] https://apt.fury.io/caddy/ /" | tee -a /etc/apt/sources.list.d/caddy-fury.list
  apt update
  apt install caddy -y

  echo "
    :80/api {
            reverse_proxy 127.0.0.1:3000
            log {
                    output file /var/log/caddy/api_access.log
                    level info
            }
    }

    :80 {

            root * /www/client
            file_server
            try_files {path} /index.html
            log {
                    output file /var/log/caddy/client_access.log
                    level info
            }
    }" | tee /tmp/Caddyfile
  caddy fmt /tmp/Caddyfile >/etc/caddy/Caddyfile
  caddy validate
}

prepareEnv() {
  mkdir -p /www/api
  # for pm2
  echo '' > /www/api/server.js
  echo '' > /www/api/environment.js
  wget https://github.com/mysvit/server-cli/releases/download/init/vm-update.sh
}

prepareEnv
createUsers
installCommonLib
addKeys
installMariaDb
installNodeJS
installPM2
installCaddy
