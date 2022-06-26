#!/bin/sh
# how to use
# run from root folder
# sudo bash scripts/3-tmux-test.sh docker   - it run unit tests for all project in docker containers
# bash scripts/3-tmux-test.sh               - it run build and serve in local environment
if [ $# -eq 0 ]; then
  echo "Use parameter: [docker] or [local]"
  echo "Example: sudo bash scripts/3-tmux-test.sh docker"
  exit 1
fi

# kill previous session and processes in case they still in memory
killPrevSession() {
  tmux kill-session -t test      # kill build session    node  don't need for docker
}

# tmux mouse support
enableMouse() {
  echo "set -g mouse on" > ~/.tmux.conf
  echo "set -s copy-command 'xclip -in -selection clipboard'" >> ~/.tmux.conf
  tmux source-file ~/.tmux.conf   # reloading the tmux config
}

# create windows layout
createTmuxLayout() {
  tmux new-session -s test -d            # open new-session [new-session]
  tmux split-window -v -p 55 -t test:0.0 # top / bottom
  tmux split-window -h -p 70 -t test:0.0 # top (right / left)
  tmux split-window -h -p 50 -t test:0.1 # top (right / left)
  tmux split-window -h -p 70 -t test:0.3 # bottom (right / left)
  tmux split-window -h -p 50 -t test:0.4 # bottom (right / left)

  # set pane configuration
  tmux set -g pane-border-status top
  tmux set -g pane-border-format "#{pane_index} #{pane_title}"
}

runLocalTest() {
  # set path for node_modules
  WORKDIR=$(pwd)/node_modules/.bin
  # set pane name and test commands
  tmux select-pane -t test:0.0 -T 'Shared'      && tmux send-keys -t test:0.0 "PATH=${PATH}:${WORKDIR} && cd ./lib/shared && clear" Enter && sleep 0.1
  tmux select-pane -t test:0.1 -T 'DTO'         && tmux send-keys -t test:0.1 "PATH=${PATH}:${WORKDIR} && cd ./lib/dto    && clear" Enter && sleep 0.1
  tmux select-pane -t test:0.2 -T 'DB'          && tmux send-keys -t test:0.2 "PATH=${PATH}:${WORKDIR} && cd ./lib/db     && clear" Enter && sleep 0.1
  tmux select-pane -t test:0.3 -T 'Core'        && tmux send-keys -t test:0.3 "PATH=${PATH}:${WORKDIR} && cd ./lib/core   && clear" Enter && sleep 0.1
  tmux select-pane -t test:0.4 -T 'Server Test' && tmux send-keys -t test:0.4 "PATH=${PATH}:${WORKDIR} && clear"                    Enter && sleep 0.1
  tmux select-pane -t test:0.5 -T 'Client'     && tmux send-keys -t test:0.5 "PATH=${PATH}:${WORKDIR} && cd ./client     && clear" Enter && sleep 0.1

  # run test commands
  tmux send-keys -t test:0.0 "npm run test" Enter && sleep 0.1 #shared
  tmux send-keys -t test:0.1 "npm run test" Enter && sleep 0.1 #dto
  tmux send-keys -t test:0.2 "npm run test" Enter && sleep 0.1 #db
  tmux send-keys -t test:0.3 "npm run test" Enter && sleep 0.1 #core
  tmux send-keys -t test:0.4 "npm run test" Enter && sleep 0.1 #server
  tmux send-keys -t test:0.5 "npm run test" Enter && sleep 0.2 #angular
}

# run test from docker
runDockerTest() {
  tmux select-pane -t test:0.0 -T 'Shared'  && tmux send-keys -t test:0.0 "docker run -it --rm --name test-shared -v $(pwd):/$(pwd) -w $(pwd)/lib/shared --net dev-net -p 9119:9119 devnode npm run test" Enter && sleep 5
  tmux select-pane -t test:0.1 -T 'DTO'     && tmux send-keys -t test:0.1 "docker run -it --rm --name test-dto    -v $(pwd):/$(pwd) -w $(pwd)/lib/dto    --net dev-net -p 9119:9119 devnode npm run test" Enter && sleep 5
  tmux select-pane -t test:0.2 -T 'DB'      && tmux send-keys -t test:0.2 "docker run -it --rm --name test-db     -v $(pwd):/$(pwd) -w $(pwd)/lib/db     --net dev-net -p 9119:9119 devnode npm run test" Enter && sleep 5
  tmux select-pane -t test:0.3 -T 'Core'    && tmux send-keys -t test:0.3 "docker run -it --rm --name test-core   -v $(pwd):/$(pwd) -w $(pwd)/lib/core   --net dev-net -p 9119:9119 devnode npm run test" Enter && sleep 5
  tmux select-pane -t test:0.4 -T 'Server'  && tmux send-keys -t test:0.4 "docker run -it --rm --name test-server -v $(pwd):/$(pwd) -w $(pwd)            --net dev-net -p 9119:9119 -p 3100:3100 devnode npm run test" Enter && sleep 5
  tmux select-pane -t test:0.5 -T 'Client'  && tmux send-keys -t test:0.5 "docker run -it --rm --name test-client -v $(pwd):/$(pwd) -w $(pwd)/client     --net dev-net -p 9876:9876 -p 9222:9222 devnode npm run test" Enter
}

# main part

killPrevSession
enableMouse
createTmuxLayout
sleep 0.2
# if not argument run test for local configuration
if [ $1 = "local" ]; then
  runLocalTest&
elif [ $1 = "docker" ]; then
  docker network create dev-net || true
  runDockerTest&
fi

sleep 0.2
tmux attach -t test
