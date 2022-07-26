# NodeJS - Angular - MariaDB

Server tech spec: `NodeJS v16.15.1` `Angular v14.0.2` `MariaDB v10.8.3` `Docker v20.10.16`.

Developer tech spec: `Debian v11.3`, `Chrome dev tools v100+` `DBeaver v22.1.0` `tmux v3.3`

How to install and use them see in [HANDBOOK](doc/HANDBOOK.md). All technology are free. 

#### Quick start:
```bash
git clone https://github.com/mysvit/server-cli.git
cd server-cli
```
#### Run in local config:
```bash
bash scripts/0-prepare.sh local            # npm install
bash scripts/1-start-db.sh local           # import and creation db
bash scripts/2-tmux-build.sh local         # clen build all server side and lib 
bash scripts/3-tmux-serve.sh local         # watch and serve server and client in tmux with multiple windows layout  
bash scripts/4-tmux-test.sh local          # run unit test in tmux
```
#### Run by docker:
```bash
sudo bash scripts/0-prepare.sh docker      # build docker images and run npm install 
sudo bash scripts/1-start-db.sh docker     # start db with initial import and creation database 
sudo bash scripts/2-tmux-build.sh docker   # same as local but with docker
sudo bash scripts/3-tmux-serve.sh docker   # same as local but with docker 
sudo bash scripts/4-tmux-test.sh docker    # same as local but with docker
```

If you need rebuild `Node` container run `9-docker-stop-clean.sh` script to stop all process and rerun `0-prepare.sh` script
```bash
sudo bash scripts/9-stop-clean.sh          # stop all docker container and stop node and ng processes
```
run without `sudo` if run for local 

Dump database to `db` folder
```bash
      bash scripts/dump-db.sh local               # local
sudo  bash scripts/dump-db.sh docker              # docker
```

dump-db.sh
### Address and ports
- **http://localhost:3000** - Server API port listener
- **http://localhost:4200** - Client port listener
