#!/bin/sh

set -eux

cd ~
cd projects/server-cli/client
WORKDIR=$(pwd)

PATH=${PATH}:${WORKDIR}


ng build
npm install @capacitor/android
npx cap add android

# sync web with android
npx cap sync
# open in android studio
npx cap open android
