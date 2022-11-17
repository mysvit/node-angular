#!/bin/bash
konsole --new-tab --noclose -e "bash ./1-start-db.sh docker" & sleep 10
konsole --new-tab --noclose -e "bash ./2-tmux-serve.sh local" & sleep 20
konsole --new-tab --noclose -e "bash ./3-tmux-test.sh local"
