# Handbook

<!-- toc -->

- [Introduction](#introduction)
- [Setting up](#setting-up)
  - [Local environment Ubuntu](#local-environment-ubuntu)
  - [Docker environment Ubuntu](#docker-environment-ubuntu)
  - [Developer tools](#developer-tools)
- [How work with tools](#how-work-with-tools)
  - [Debug with Chrome Developer Tools](#debug-with-chrome-developer-tools)
  - [Tmux - terminal multiplexer](#tmux---terminal-multiplexer)
  - [Docker command line](#docker-command-line)
  - [MariaDB](#mariadb)
  - [Mocha](#mocha)
  - [Nodemon](#nodemon)
  - [TS-node](#ts-node)
- [Notes](#notes)
  - [Folder structure](#folder-structure)
  - [Debug concept](#debug-concept)
  - [Setting up Path Alias in TypeScript](#setting-up-path-alias-in-typescript)
  - [package.json](#package-json)
  - [tsconfig.json](#tsconfig-json)
  - [Sudo for Debian](#sudo-for-debian)
  - [Setting up Angular Test environment for Docker](#setting-up-angular-test-environment-for-docker)


<!-- tocstop -->

## Introduction

Hi stranger! I've written this document for:


## Setting up

Tech environment could be installed on **local os** or run by **docker**.

## Local environment Ubuntu
For Debian run under root `su -` or set up [sudo for Debian](#sudo-for-debian)

### Node.js v16.x [official install instruction](https://nodejs.org/en/download/package-manager)
```bash
wget -qO- https://deb.nodesource.com/setup_16.x | sudo -E bash -;
sudo apt-get install -y nodejs;
sudo npm install --location=global npm@latest;
```

### Angular v14.x [official install instruction](https://angular.io/guide/setup-local)
Install the CLI using the npm package manager under work user:
```bash
npm install --location=global @angular/cli@14.0.2
```

### MariaDB v10.x: [official install instruction](https://mariadb.com/kb/en/installing-mariadb-deb-files)
**Step 1**: Update system apt index. optionally
```bash
sudo apt -y update;
sudo apt -y install wget software-properties-common gnupg;
```
**Step 2**: Import MariaDB gpg key and add repository.
```bash
wget -qO- https://r.mariadb.com/downloads/mariadb_repo_setup | sudo bash -s -- --mariadb-server-version="mariadb-10.8" --os-type="ubuntu" --os-version="jammy"
```
**Step 3**: Install MariaDB 10.8.3 on Ubuntu 22.04 (jammy).
```bash
sudo apt install mariadb-server mariadb-client
```
**Step 4**: Secure MariaDB server.
```bash
sudo mariadb-secure-installation
# Switch to unix_socket authentication [Y/n] n
# Everything else [y]
# for root set password [root]
```

##  Docker environment Ubuntu
### Setting up docker engine - [official install instruction](https://docs.docker.com/engine/install/debian/#set-up-the-repository)

```bash
wget -qO- https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor | sudo dd of=/usr/share/keyrings/docker.gpg;
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" \
  | sudo dd of=/etc/apt/sources.list.d/docker.list;
sudo apt-get update;
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin;
```

## Developer tools
### Google Chrome - Browser and developer tool
```
wget -qO- https://dl.google.com/linux/linux_signing_key.pub | gpg --dearmor | sudo dd of=/usr/share/keyrings/google.gpg;
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/google.gpg] http://dl.google.com/linux/chrome/deb/ stable main" \
 | sudo dd of=/etc/apt/sources.list.d/google-chrome.list;
sudo apt update;
sudo apt install -y google-chrome-stable;
```

### DBeaver - database designer and admin tool
```bash
wget -qO- https://dbeaver.io/debs/dbeaver.gpg.key | gpg --dearmor | sudo dd of=/usr/share/keyrings/dbeaver.gpg;
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/dbeaver.gpg] https://dbeaver.io/debs/dbeaver-ce /" | sudo dd of=/etc/apt/sources.list.d/dbeaver.list;
sudo apt-get update;
sudo apt -y install default-jdk;
sudo apt -y install dbeaver-ce;
```

### Tmux - terminal multiplexer

**xclip** - copy and paste command line tools used for `tmux` mouse support
```bash
sudo apt-get install tmux xclip
```

## How work with tools
### DBeaver - connect to MariaDB
1. Database -> New Database Connection
2. Select MariaDB
3. Fill out next fields:
   - Server Host: localhost
   - Port: 3306 
   - Database: testdb
   - Username: root
   - Password: root
4. It will ask download driver. Select last version of driver: v3.0.5 for now

### Debug with Chrome Developer Tools
Quick guide about how to use Chrome Developer Tools for debug server, lib, client and unit tests.
To know how was set up debug environment see [Notes](#notes) sections.

How to use:

In Chrome open url `chrome://inspect` in Device section click `Open dedicated DevTools for Node` link.
In DevTools tab `Connection` click `[Add connection]` host:port listed below.
#### Debug unit tests:
In DevTools `Filesystem` tab `+ Add folder to workspace` select source folder what you want to debug. 
Run docker with `npm run test:debug` what run `mocha` with  `--inspect-brk`. 
When DevTools connect to debugger find the file where you want to put a breakpoint. 
Put it and resume script execution map file should be loaded and breakpoint will be triggered. 

- [localhost:9119]() - Unit tests for Server and Lib debug port listener

##### Debug server:
Run server with `--inspect` option and use DevTools like for test

- [localhost:9229]() - Server debug port listener

All addresses and ports:
- [localhost:3000]() - Server API port listener
- [localhost:3100]() - Server test env API port listener

##### Debug client:
For the client app base on Angular just open client in browser and call `Developer Tools` any time by pressing **F12** or **CTRL+SHIFT+I**.
Find your file for breakpoint and refresh client if it needed.
- [http://localhost:4200]() - Client port listener
- [http://localhost:9876/debug.html]() - Unit test for Client debug port listener


### Tmux - terminal multiplexer
As project has many scripts for build and run tests I used `tmux` for more convenient startup and work with project

Hot keys:
- `CTRL+B after D` - detach
- `CTRL+B after X` - kill
- `CTRL+B after W` - show windows
- `CTRL+B after Q` - show windows numbers
- `CTRL+C after CTRL+D` - close process after close panel

Commands:
- `tmux ls` - show sessions
- `tmux attach -t <session name>` - attach to session

Setup mouse selection `copy` feature
```bash
cat << EOF > ~/.tmux.conf
set -g mouse on
set -s copy-command 'xclip -in -selection clipboard'
EOF
```
****mouse selection `copy` feature does not work in docker**


### Docker command line
Build image with repository name `name:tag` from Dockerfile
```bash
docker build -t node:18 .               # node:18
docker build -t mynode .                # mynode:latest
```
*Work with network*

Communicate between containers inside network `dev-net` all containers will see each other by container name `hostname1, hostname2`
```
docker network create dev-net            # create docker network [dev-net]
docker --name hostname1 --net dev-net    # start docker with [dev-net] network and [hostname1]
docker --name hostname2 --net dev-net    # start docker with [dev-net] network and [hostname2]
```
To debug node need to use option `--inspect` with network `0.0.0.0`:`9229` it allowed you to connect from any network.
Don't forget publish `9229` port with option `-p`.
```
node --inspect=0.0.0.0:9229
docker -p 9229:9229
```
*Execute sh command from running container*
```
docker exec -it SomeContainer sh -c "node --version"                   # execute command
docker exec -it SomeContainer sh -c "[conainer path]/tmux_build.sh"    # execute file from mappped volume
sudo docker exec -w /server/lib/shared wreason npm test                 
```
run image `node` with bash
```
docker run -it --rm node bash 
```
some useful command
```
docker ps -a                           # list of containers
docker network ls                      # list of networks
docker stats node_container            # stats of container
docker stop node_container             # stop container
docker rm node_container               # remove container
docker container prune                 # remove all stoped containers

docker image ls                        # list of images

sudo docker rm -f $(sudo docker ps -qa)         # force stop and remove all containers
sudo docker rmi -f $(sudo docker images -aq)    # force remove all images
```
some useful option
```
-it                                 # open pseudo-TTY
--rm                                # automatically remove the container when it exits
--name [some name]                  # container name and host name for container's network 
--net [network name]                # what network will be used for container
-v [pc path]:[container path]       # map volume
-p [pc port]:[container port]       # publish or expose port
```

### MariaDB
Export schema and data
```
with data
mariadb-dump -h 127.0.0.1 -u backup -p<Password> <database> > schema-data.sql
no data
mariadb-dump -h 127.0.0.1 -u backup -p<Password> --no-date <database> > schema.sql
```

### Mocha
In this project we use `.mocharc.json`
[Example of mocha config files](https://github.com/mochajs/mocha/tree/master/example/config)

```
exit: true,                           // exit after test
spec: ["dist/**/*.spec.js"],          // the positional arguments! 
exclude: ["dist/lib/**/*.spec.js"]    // exclude a positional arguments!
```
Notes for some commands.

`--loader=ts-node/esm` - support ECMAScript `type=module`

Run test for all `*.spec.ts` typescript files
```
mocha --loader=ts-node/esm src/**/*.spec.ts     
```
Start test for `core-user.spec.ts` file and for specific test name `'property name'`
```
mocha --loader=ts-node/esm ./src/db/core-user.spec.ts -g 'property name'
```
For `.js` files
```
mocha src/**/*.spec.js
```
For debug mode use  `--inspect` or `--inspect-brk=0.0.0.0:9229` and set node env to test `NODE_ENV=test`
```
NODE_ENV=test mocha src/**/*.spec.js --inspect-brk=0.0.0.0:9229
```
ip:`0.0.0.0` allow to connect remotely from any network, for example from docker container


### Nodemon
In this project we use `nodemon.json` [Sample nodemon.json](https://github.com/remy/nodemon/blob/master/doc/sample-nodemon.md)
```
"exec": "node --inspect=0.0.0.0:9229 dist/server.js",   # Command for execute after chage
"ignore": ["./dist/lib"],                               # Ignore path
"watch": ["./dist"],                                    # Watch path for changes
"env": {"NODE_ENV": "dev"},                             # Set node environment
"ext": "js"                                             # extension filter
```
Notes of some parameters for command line.
```
nodemon --verbose --watch ../../dist/lib/shared --exec 'npm test' --ext 'spec.js'
```
- `--verbose` - more information
- `--watch <path>` - watching for changes path
- `--exec '<some command>'` - execute some command
- `--ext '<file extension>'` - specify file extension

#### TS-node
```
ts-node --esm src/server.ts                             ### start live ts server
node --inspect --loader=ts-node/esm src/server.ts       ### start live ts server with debug
```


## Notes

### Folder structure
```bash
.                -# temporary folders
├── dist                -# auto-generated distribution folder of compiled .js files 
├── mariadb             -# auto-generated MariaDB system database folder, shared with docker 
├── node_modules        -# auto-generated folder of npm modules
├── client              -# Angular project
├── db                  -# database dump files of data and schema
├── lib                 -# folder of libraries
│   ├─── core              -# core backend functionality
│   ├─── db                -# db framework which provide communication and data between core and MariaDB 
│   ├─── dto               -# DTO of database and server, shared between client and server app
│   └─── shared            -# shared common used functions for client and server
├── scripts              -# startup scripts for docker and tmux
│   ├─── docke-images                   -# Dockerfiles for build images 
│   ├─ 0-preapre.sh                        # build local images and prepare repository 
│   ├─ 1-start-db.sh                       # start or import MariaDB server  
│   ├─ 2-tmux-build.sh                     # build and serve project
│   ├─ 3-tmux-test.sh                      # run unit tests
│   ├─ 9-docker-stop-clean.sh              # stop all containers and remove broken
│   ├─ config.sh                           # contain database name for scripts 
│   └─ dump-db.sh                          # dump data and schema from database
├── src                  -# server sources
│   ├─── routes            # api routes and middleware
│   └─ server.ts           # server entry point
├─ .mocharc.json        # mocha - unit test
├─ nodemon.json         # nodemon - restart compilation when files changed
├─ package.json         # specifics npm handling - scripts and package dependency
├─ package-lock.json    # automatically generated and keeps node_modules tree
├─ tsconfig.json        # root typescript config file for development
└─ tsconfig.prod.json   # inherited from root for production
```

#### Debug concept:
Compiles `.ts` files by `tsc --watch` compiler to `.js` files with map.
Start `node` server with `--inspect` in `dist` folder and debug with chrome.

#### Setting up Path Alias in TypeScript
```
npm i -save-d ttypescript @zerollup/ts-transform-paths     
``` 
`ttypescript` allow run plugins in `tsconfig.json`

Add `ts-transform-paths` plugin to compilerOptions
```
"compilerOptions": {
    "plugins": [
      // Transform paths in output .js files
      { "transform": "typescript-transform-paths" },
      // Transform paths in output .d.ts files (Include this line if you output declarations files)
      { "transform": "typescript-transform-paths", "afterDeclarations": true }
    ],
    ...
```
add to `paths` in compilerOptions
```
"compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@shared/*": [
        "dist/lib/shared/*"
      ]
    },
  },
```
It will compile `.ts` files and replace alias path to relative.

#### package.json
```
"type": "module"     ### enabled ES6+
``` 

#### tsconfig.json
```
### fix error compatibility ES6+ with:  import express from 'express' 
"allowSyntheticDefaultImports": true     
``` 

### Sudo for Debian
Login as root
`su -`

Append your `myuser` to `root` group
```
sudo usermod -aG sudo myuser            # usermod -aG {Group} {Username} 
```

Append to  `/etc/sudoers` next line `{Username} ALL=(ALL:ALL) ALL`
```
echo "myuser ALL=(ALL:ALL) ALL" >> /etc/sudoers 
```

### Setting up Angular Test environment for Docker
To be able to run and debug tests in Angular project in Docker container need to:
- install Chrome in docker image

add to you `Dockerfile`
```Dockerfile
RUN wget -qO- https://dl.google.com/linux/linux_signing_key.pub | gpg --dearmor | dd of=/usr/share/keyrings/google.gpg;
RUN sh -c 'echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/google.gpg] http://dl.google.com/linux/chrome/deb/ stable main" \
 | dd of=/etc/apt/sources.list.d/google-chrome.list'
RUN apt-get update
RUN apt-get install -y google-chrome-stable
```
- setting up ChromeHeadless for `Karma`  

In `karma.conf.js` modify `browsers` field and add `customLaunchers`
```
    browsers: ['ChromeHeadlessCI'],
    customLaunchers: {
      ChromeHeadlessCI: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox']
      }
    },
```

When you start your docker container map port `-p 9876:9876` 