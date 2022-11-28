#!/bin/sh
# how to use
# run from root folder
# sudo bash scripts/2-tmux-build.sh docker  - run docker containers for build and serve a project
# bash scripts/2-tmux-build.sh              - it run build and serve in local environment
if [ $# -eq 0 ]; then
  echo "Use parameter: [docker] or [local]"
  echo "Example: bash scripts/prod.sh docker"
  exit 1
fi

# stop execute if error
set -ex

cleanUpPrevBuild() {
  rm -fr $WORKDIR/dist
  rm -fr $WORKDIR/client/dist
  rm -fr $WORKDIR/www
}

# run build from local
runLocalBuild() {
  cd $WORKDIR/lib/environment && npm run prod
  cd $WORKDIR/lib/dto         && npm run prod
  cd $WORKDIR/lib/shared      && npm run prod
  cd $WORKDIR/lib/db          && npm run prod
  cd $WORKDIR/lib/core        && npm run prod
  cd $WORKDIR                 && npm run prod
  cd $WORKDIR/dist            && npm install --omit=dev
  cd $WORKDIR/client          && npm run prod
}

# run build from docker
runDockerBuild() {
  sudo docker run -it --rm --name build-shared -v $WORKDIR:$WORKDIR -w $WORKDIR/lib/environment  devnode npm run prod
  sudo docker run -it --rm --name build-dto    -v $WORKDIR:$WORKDIR -w $WORKDIR/lib/dto          devnode npm run prod
  sudo docker run -it --rm --name build-shared -v $WORKDIR:$WORKDIR -w $WORKDIR/lib/shared       devnode npm run prod
  sudo docker run -it --rm --name build-db     -v $WORKDIR:$WORKDIR -w $WORKDIR/lib/db           devnode npm run prod
  sudo docker run -it --rm --name build-core   -v $WORKDIR:$WORKDIR -w $WORKDIR/lib/core         devnode npm run prod
  sudo docker run -it --rm --name build-server -v $WORKDIR:$WORKDIR -w $WORKDIR                  devnode npm run prod
  sudo docker run -it --rm --name build-server -v $WORKDIR:$WORKDIR -w $WORKDIR/dist             devnode npm install --omit=dev
  sudo docker run -it --rm --name build-server -v $WORKDIR:$WORKDIR -w $WORKDIR/client           devnode npm run prod
}

makeCompressProductionFile() {
  mkdir -p $WORKDIR/www/client
  mkdir -p $WORKDIR/www/api
  mv $WORKDIR/client/dist/client/* $WORKDIR/www/client
  mv $WORKDIR/dist/* $WORKDIR/www/api
  cd $WORKDIR/www
  tar -zcvf www.tgz client api
}

createRelease() {
  DAY=$(date -d "$D" '+%d')
  MONTH=$(date -d "$D" '+%m')
  YEAR=$(date -d "$D" '+%y')
  cd $WORKDIR/www
  gh release create --generate-notes v$YEAR.$MONTH.$DAY www.tgz
}

# main part
cd ~
cd projects/server-cli
WORKDIR=$(pwd)

cleanUpPrevBuild
# if not argument run build for local configuration
if [ $1 = "local" ]; then
  runLocalBuild
elif [ $1 = "docker" ]; then
  runDockerBuild
fi

makeCompressProductionFile
createRelease
cleanUpPrevBuild
