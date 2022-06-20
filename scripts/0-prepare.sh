#!/bin/sh
# how to use
# run from root folder
# sudo bash scripts/0-prepare.sh docker  - build docker image and run npm install by docker
# bash scripts/0-prepare.sh local        - run npm install

if [ $# -eq 0 ]; then
  echo "use parameter [docker] or [local]"
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
  docker image rm maridb || true
  docker image rm mynode || true
  cd scripts/docker-images/node
  docker build -t mynode .
  docker rm -f $(docker ps -qa)
  cd ../../..
}

npmInstallDocker() {
  docker run -it --rm -v $(pwd):/server -w /server         mynode npm install
  docker run -it --rm -v $(pwd):/server -w /server/client  mynode npm install
  docker run -it --rm -v $(pwd):/server -w /server/lib/db  mynode npm install
}

if [ $1 = "local" ]; then
  npmInstall
elif [ $1 = "docker" ]; then
  dockerImageBuild
  npmInstallDocker
fi
