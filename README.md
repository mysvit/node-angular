# NodeJS - Angular - MariaDB

Server tech spec: `NodeJS v16.15.1` `Angular v14.0.2` `MariaDB v10.8.3` `Docker v20.10.16`.

Developer tech spec: `Debian v11.3`, `Chrome dev tools v100+` `DBeaver v22.1.0` `tmux v3.3`

How to install and use them see in [HANDBOOK](HANDBOOK.md). All technology are free. 

#### Quick start:
```bash
git clone https://github.com/mysvit/server-cli.git
cd server-cli
```
#### Run in local environment:
```bash
bash scripts/0-prepare.sh local                 # npm install
bash scripts/1-start-db.sh local                # import and creation db 
bash scripts/2-tmux-build.sh local              # build and serve server and client in tmux with multiple windows layout  
bash scripts/3-tmux-test.sh local               # run unit test in tmux
```
#### Run by docker:
```bash
sudo bash scripts/0-prepare.sh docker                 # build docker images and run npm install 
sudo bash scripts/1-start-db.sh docker                # start db with initial import and creation database 
sudo bash scripts/2-tmux-build.sh docker              # same what for local but use docker 
sudo bash scripts/3-tmux-test.sh docker               # same what for local but use docker
```

If you need rebuild `Node` container run `9-docker-stop-clean.sh` script to stop all process and rerun `0-prepare.sh` script
```bash
sudo bash scripts/9-docker-stop-clean.sh               # stop all container
```
### Address and ports
- **http://localhost:3000** - Server API port listener
- **http://localhost:4200** - Client port listener
