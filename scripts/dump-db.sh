#!/bin/sh
source $(pwd)/scripts/config.sh

# how to use
# sudo bash scripts/dump-db.sh docker or local

if [ $# -eq 0 ]; then
  echo "Use parameter: [docker] or [local]"
  echo "Example: sudo bash scripts/dump-db.sh docker"
  exit 1
fi

if [ $1 = "local" ]; then
  # local dump
  mariadb-dump -h 127.0.0.1 -u root -proot $DBNAME > $DBNAME-schema-data.sql
elif [ $1 = "docker" ]; then
  # docker dump
  docker exec server-db bash -c "mariadb-dump --verbose -h 0.0.0.0 -u root -proot $DBNAME > /docker-entrypoint-initdb.d/$DBNAME-schema-data.sql"
fi