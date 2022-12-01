#!/bin/sh
# how to use
# sudo bash scripts/9-docker-stop-clean.sh

sudo docker stop server-docker-db-dev || true
sudo docker stop $(sudo docker ps -qa --filter ancestor=devnode) || true
sudo docker network rm dev-net || true

sudo pkill node || true
sudo pkill ng || true
tmux kill-session -t build || true
tmux kill-session -t test || true
