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

# kill previous session and processes in case they still in memory
killPrevSession() {
  pkill node                 # don't need for docker
  tmux kill-session -t build # kill build session    node  don't need for docker
}

# tmux mouse support
enableMouse() {
  echo "set -g mouse on" >~/.tmux.conf
  echo "set -s copy-command 'xclip -in -selection clipboard'" >>~/.tmux.conf
  tmux source-file ~/.tmux.conf # reloading the tmux config
}

# create windows layout
createTmuxLayout() {
  tmux new-session -s build -d            # open new-session [new-session]
  tmux split-window -v -p 60 -t build:0.0 # top / bottom
  tmux split-window -h -p 76 -t build:0.0 # top (right / left)
  tmux split-window -h -p 50 -t build:0.0 # top (right / left)
  tmux split-window -h -p 68 -t build:0.2 # top (right / left)
  tmux split-window -h -p 50 -t build:0.3 # top (right / left)
  tmux split-window -h -p 76 -t build:0.5 # bottom (right / left)
  tmux split-window -h -p 50 -t build:0.6 # bottom (right / left)

  # set pane configuration
  tmux set -g pane-border-status top
  tmux set -g pane-border-format "#{pane_index} #{pane_title}"
}

runLocalBuild() {
  # set path for node_modules
  WORKDIR=$(pwd)/node_modules/.bin
  # set pane name and test commands
  tmux select-pane -t build:0.0 -T 'ENV'          && tmux send-keys -t build:0.0 "PATH=${PATH}:${WORKDIR} && cd ./lib/environment && clear" Enter && sleep 0.1
  tmux select-pane -t build:0.1 -T 'DTO'          && tmux send-keys -t build:0.1 "PATH=${PATH}:${WORKDIR} && cd ./lib/dto         && clear" Enter && sleep 0.1
  tmux select-pane -t build:0.2 -T 'Shared'       && tmux send-keys -t build:0.2 "PATH=${PATH}:${WORKDIR} && cd ./lib/shared      && clear" Enter && sleep 0.1
  tmux select-pane -t build:0.3 -T 'DB'           && tmux send-keys -t build:0.3 "PATH=${PATH}:${WORKDIR} && cd ./lib/db          && clear" Enter && sleep 0.1
  tmux select-pane -t build:0.4 -T 'Core'         && tmux send-keys -t build:0.4 "PATH=${PATH}:${WORKDIR} && cd ./lib/core        && clear" Enter && sleep 0.1
  tmux select-pane -t build:0.5 -T 'Server Build' && tmux send-keys -t build:0.5 "PATH=${PATH}:${WORKDIR} && clear"  Enter && sleep 0.1
  tmux select-pane -t build:0.6 -T 'Server Serve' && tmux send-keys -t build:0.6 "PATH=${PATH}:${WORKDIR} && clear"  Enter && sleep 0.1
  tmux select-pane -t build:0.7 -T 'Client'       && tmux send-keys -t build:0.7 "PATH=${PATH}:${WORKDIR} && cd ./client          && clear" Enter && sleep 0.1

  # run build commands
  tmux select-pane -t build:0.0 && tmux send-keys -t build:0.0 "npm run watch" Enter && sleep 0.1 #env
  tmux select-pane -t build:0.1 && tmux send-keys -t build:0.1 "npm run watch" Enter && sleep 0.1 #dto
  tmux select-pane -t build:0.2 && tmux send-keys -t build:0.2 "npm run watch" Enter && sleep 0.1 #shared
  tmux select-pane -t build:0.3 && tmux send-keys -t build:0.3 "npm run watch" Enter && sleep 0.1 #db
  tmux select-pane -t build:0.4 && tmux send-keys -t build:0.4 "npm run watch" Enter && sleep 0.1 #core
  tmux select-pane -t build:0.5 && tmux send-keys -t build:0.5 "npm run watch" Enter && sleep 1   #server build
  tmux select-pane -t build:0.6 && tmux send-keys -t build:0.6 "npm start"     Enter && sleep 0.1 #server debug
  tmux select-pane -t build:0.7 && tmux send-keys -t build:0.7 "npm start"     Enter && sleep 0.1 #angular
}

# run build from docker
runDockerBuild() {
  tmux select-pane -t build:0.0 -T 'ENV'
  tmux select-pane -t build:0.1 -T 'DTO'
  tmux select-pane -t build:0.2 -T 'Shared'
  tmux select-pane -t build:0.3 -T 'DB'
  tmux select-pane -t build:0.4 -T 'Core'
  tmux select-pane -t build:0.5 -T 'Server Build'
  tmux select-pane -t build:0.6 -T 'Server Serve'
  tmux select-pane -t build:0.7 -T 'Client'

  sleep 1

  tmux send-keys -t build:0.0 "docker run -it --rm --name build-env    -v $(pwd):$(pwd) -w $(pwd)/lib/dto    devnode npm run watch" Enter && sleep 0.1
  tmux send-keys -t build:0.1 "docker run -it --rm --name build-dto    -v $(pwd):$(pwd) -w $(pwd)/lib/dto    devnode npm run watch" Enter && sleep 4
  tmux send-keys -t build:0.2 "docker run -it --rm --name build-shared -v $(pwd):$(pwd) -w $(pwd)/lib/shared devnode npm run watch" Enter && sleep 1
  tmux send-keys -t build:0.3 "docker run -it --rm --name build-db     -v $(pwd):$(pwd) -w $(pwd)/lib/db     devnode npm run watch" Enter && sleep 1
  tmux send-keys -t build:0.4 "docker run -it --rm --name build-core   -v $(pwd):$(pwd) -w $(pwd)/lib/core   devnode npm run watch" Enter && sleep 1
  tmux send-keys -t build:0.5 "docker run -it --rm --name build-server -v $(pwd):$(pwd) -w $(pwd)            devnode npm run watch" Enter && sleep 1
  tmux send-keys -t build:0.6 "docker run -it --rm --name debug-server -v $(pwd):$(pwd) -w $(pwd)            --net dev-net -p 3000:3000 -p 9229:9229 devnode npm start" Enter && sleep 0.1
  tmux send-keys -t build:0.7 "docker run -it --rm --name debug-client -v $(pwd):$(pwd) -w $(pwd)/client     --net dev-net -p 4200:4200              devnode npm start" Enter
}

# main part

killPrevSession
enableMouse
createTmuxLayout
sleep 0.2
# if not argument run build for local configuration
if [ $1 = "local" ]; then
  runLocalBuild &
elif [ $1 = "docker" ]; then
  docker network create dev-net || true
  runDockerBuild &
fi

sleep 0.2
tmux attach -t build
