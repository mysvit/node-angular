#!/bin/sh
# how to use
# sudo bash scripts/9-docker-stop-clean.sh

docker stop server-host
docker stop $(docker ps -qa --filter ancestor=devnode)

docker network rm dev-net

pkill node
pkill ng
tmux kill-session -t build
tmux kill-session -t test