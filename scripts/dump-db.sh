#!/bin/sh
# how to use
# sudo bash scripts/dump-db.sh docker

if [ $# -eq 0 ]; then
  # local dump
  mariadb-dump -h 127.0.0.1 -u root -proot whatreasondb > whatreasondb-schema-data.sql
elif [ $1 = "docker" ]; then
  # docker dump
  docker exec wreason-db bash -c "mariadb-dump -h 0.0.0.0 -u root -proot whatreasondb > /docker-entrypoint-initdb.d/whatreasondb-schema-data.sql"
fi
