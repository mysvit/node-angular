FROM ubuntu:jammy

ENV NODE_VERSION 16.15.1

RUN set -ex \
    && apt-get update \
    && apt-get install -yq curl wget

RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash -
RUN apt-get update
RUN apt-get install -y nodejs

# update npm
ENV NPM_VERSION 8.12.2
RUN npm install --location=global npm@$NPM_VERSION

# install angular cli
ENV ANGULAR_CLI_VERSION 14.0.2
RUN npm install --location=global @angular/cli@$ANGULAR_CLI_VERSION
# disable autocompletion and statistic
RUN echo '{"version": 1,"cli": {"completion": {"prompted": true},"analytics": false}}' > /root/.angular-config.json
#RUN echo 'source <(ng completion script)' > /root/.bashrc
RUN chmod u=rwx,g=rwx,o=rwx /root
RUN chmod u=rw,g=rw,o=rw /root/.angular-config.json
RUN chmod u=rw,g=r,o=rw /root/.bashrc

# install Chrome for ng test
RUN wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb -O /tmp/google-chrome-stable_current_amd64.deb
RUN dpkg -i /tmp/google-chrome-stable_current_amd64.deb
RUN rm /tmp/google-chrome-stable_current_amd64.deb

# install tmux v3.2a \
RUN apt-get install -y tmux
RUN rm -rf /var/lib/apt/lists/*

RUN mkdir /server
VOLUME /server
WORKDIR /server

# node server
EXPOSE 3000
# node test server
EXPOSE 3100
# angular
EXPOSE 4200
# node debug
EXPOSE 9229
# test debug
EXPOSE 9119
# karma
EXPOSE 9876
# remote debug
EXPOSE 9222

# smoke tests
RUN ng version
RUN tmux -V
RUN google-chrome --version
CMD [ "bash" ]
