#!/bin/sh
# how to use
# run from root folder
# sudo bash scripts/0-prepare.sh docker  - build docker image and run npm install by docker
# bash scripts/0-prepare.sh local        - run npm install

if [ $# -eq 0 ]; then
  echo
  echo "Use parameter [docker] or [local]"
  echo "Example: sudo bash scripts/0-prepare.sh docker"
  exit 1
fi

npmInstall() {
  npm install
  cd client
  npm install
  cd ../lib/db
  npm install
  cd ../../..
}

dockerImageBuild() {
  # remove all old container
  docker rm -f $(docker ps -qa)
  docker image rm mariadb || true
  docker image rm devnode || true

  cd scripts/docker-images/devnode

  docker build --build-arg NPM_VERSION='latest' \
               --build-arg ANGULAR_CLI_VERSION='14.0.6' \
               --build-arg PWD=$(pwd) \
               -t devnode .

  cd ../../..
}

npmInstallDocker() {
  docker run -it --rm -v $(pwd):$(pwd) -w $(pwd)         devnode npm install
  docker run -it --rm -v $(pwd):$(pwd) -w $(pwd)/client  devnode npm install
  docker run -it --rm -v $(pwd):$(pwd) -w $(pwd)/lib/db  devnode npm install
}

if [ $1 = "local" ]; then
  npmInstall
elif [ $1 = "docker" ]; then
  dockerImageBuild
  npmInstallDocker
fi
