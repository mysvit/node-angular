#!/bin/sh

set -eux

cd ~
cd projects/server-cli/client
WORKDIR=$(pwd)

PATH=${PATH}:${WORKDIR}

npm instal @capacitor/core
npm install -D @capacitor/cli

npx cap init

npm install @capacitor/android


ng build
npx cap add android

# sync web with android
npx cap sync
# open in android studio
npx cap open android
