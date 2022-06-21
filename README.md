# NodeJS - Angular - MariaDB

Server tech spec: `NodeJS v16.15.1` `Angular v14.0.2` `MariaDB v10.8.3` `Docker v20.10.16` setting uo instruction in [HANDBOOK](HANDBOOK.md)

Developer tech spec: `Debian v11.3`, `Chrome dev tools v100+` `DBeaver v22.1.0` `tmux v3.3` how to use see in [HANDBOOK](HANDBOOK.md)

All server and dev technology absolutely free. 

#### Quick start:
```
git clone https://github.com/mysvit/server-cli.git
cd server-cli
```
#### Run in local environment:
```
bash scripts/0-prepare.sh local                 # npm install
bash scripts/1-start-db.sh local                # import and creation db 
bash scripts/2-tmux-build.sh local              # build and serve server and client in tmux with multiple windows layout  
bash scripts/3-tmux-test.sh local               # run unit test in tmux
```
#### Run by docker:
```
sudo bash scripts/0-prepare.sh docker                 # build docker images and run npm install 
sudo bash scripts/1-start-db.sh docker                # start db with initial import and creation database 
sudo bash scripts/2-tmux-build.sh docker              # same what for local but use docker 
sudo bash scripts/3-tmux-test.sh docker               # same what for local but use docker
```
### Address and ports
- **http://localhost:3000** - Server API port listener
- **http://localhost:4200** - Client port listener
