FROM ubuntu:jammy

ARG NODE_VERSION
RUN set -ex
RUN apt-get update
RUN apt-get install -y wget
RUN wget -qO- https://deb.nodesource.com/setup_16.x | bash -
RUN apt-get install -y nodejs

# update npm
ARG NPM_VERSION
RUN echo $NPM_VERSION
RUN npm install --location=global npm@$NPM_VERSION

# install angular cli
ARG ANGULAR_CLI_VERSION
RUN echo $ANGULAR_CLI_VERSION
RUN npm install --location=global @angular/cli@$ANGULAR_CLI_VERSION
# disable autocompletion and statistic
RUN echo '{"version": 1,"cli": {"completion": {"prompted": true},"analytics": false}}' > /root/.angular-config.json
RUN chmod u=rwx,g=rwx,o=rwx /root
RUN chmod u=rw,g=rw,o=rw /root/.angular-config.json

# install Chrome for ng test
RUN wget -qO- https://dl.google.com/linux/linux_signing_key.pub | gpg --dearmor | dd of=/usr/share/keyrings/google.gpg;
RUN sh -c 'echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/google.gpg] http://dl.google.com/linux/chrome/deb/ stable main" \
 | dd of=/etc/apt/sources.list.d/google-chrome.list'
RUN apt-get update
RUN apt-get install -y google-chrome-stable

# install tmux v3.2a \
RUN apt-get install -y tmux
RUN rm -rf /var/lib/apt/lists/*

ARG PWD
RUN mkdir -p $PWD
VOLUME $PWD
WORKDIR $PWD

# node server
#EXPOSE 3000
# node test server
#EXPOSE 3100
# angular
#EXPOSE 4200
# node debug
#EXPOSE 9229
# test debug
#EXPOSE 9119
# karma
#EXPOSE 9876
# remote debug
#EXPOSE 9222

# smoke tests
RUN ng version
RUN tmux -V
RUN google-chrome --version
CMD [ "bash" ]
