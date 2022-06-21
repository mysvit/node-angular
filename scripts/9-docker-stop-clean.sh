#!/bin/sh
# how to use
# sudo bash scripts/9-docker-stop-clean.sh

docker stop server-db

docker stop $(docker ps -qa --filter ancestor=mynode)

docker network rm dev-net

tmux kill-session -t build
tmux kill-session -t test
