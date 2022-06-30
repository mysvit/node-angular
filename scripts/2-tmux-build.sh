#!/bin/sh
# how to use
# run from root folder
# sudo bash scripts/2-tmux-build.sh docker  - run docker containers for build and serve a project
# bash scripts/2-tmux-build.sh              - it run build and serve in local environment
if [ $# -eq 0 ]; then
  echo "Use parameter: [docker] or [local]"
  echo "Example: sudo bash scripts/2-tmux-build.sh docker"
  exit 1
fi

# stop execute if error
set -ex

WORKDIR=$(pwd)

cleanUpPrevBuild() {
  rm -fr $WORKDIR/dist
}

# run build from local
runLocalBuild() {
  cd $WORKDIR/lib/environment && npm run build
  cd $WORKDIR/lib/shared      && npm run build
  cd $WORKDIR/lib/dto         && npm run build
  cd $WORKDIR/lib/db          && npm run build
  cd $WORKDIR/lib/core        && npm run build
  cd $WORKDIR                 && npm run build
}

# run build from docker
runDockerBuild() {
  docker run -it --rm --name build-shared -v $WORKDIR:$WORKDIR -w $WORKDIR/lib/environment  devnode npm run build
  docker run -it --rm --name build-shared -v $WORKDIR:$WORKDIR -w $WORKDIR/lib/shared       devnode npm run build
  docker run -it --rm --name build-dto    -v $WORKDIR:$WORKDIR -w $WORKDIR/lib/dto          devnode npm run build
  docker run -it --rm --name build-db     -v $WORKDIR:$WORKDIR -w $WORKDIR/lib/db           devnode npm run build
  docker run -it --rm --name build-core   -v $WORKDIR:$WORKDIR -w $WORKDIR/lib/core         devnode npm run build
  docker run -it --rm --name build-server -v $WORKDIR:$WORKDIR -w $WORKDIR                  devnode npm run build
}

# main part

cleanUpPrevBuild
# if not argument run build for local configuration
if [ $1 = "local" ]; then
  runLocalBuild
elif [ $1 = "docker" ]; then
  runDockerBuild
fi