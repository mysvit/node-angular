#!/bin/sh
# how to use
# run from root folder
# sudo bash scripts/0-prepare.sh docker  - build docker image and run npm install by docker
# bash scripts/0-prepare.sh              - run npm install

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
  docker image rm nodeng || true
  cd scripts/docker-images/node
  docker build -t nodeng .
  cd ../../..
}

npmInstallDocker() {
  docker run -it --rm -v $(pwd):/server -w /server         nodeng npm install
  docker run -it --rm -v $(pwd):/server -w /server/client  nodeng npm install
  docker run -it --rm -v $(pwd):/server -w /server/lib/db  nodeng npm install
}

if [ $# -eq 0 ]; then
  npmInstall
elif [ $1 = "docker" ]; then
  dockerImageBuild
  npmInstallDocker
fi
