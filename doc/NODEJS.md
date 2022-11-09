# NodeJS

<!-- toc -->

- [Update nodejs](#update-nodejs)
- [Update npm packages](#update-npm-packages)


<!-- tocstop -->

## Update nodejs

Check nodejs available versions
```bash
sudo apt-cache policy nodejs;
```
or after `apt update` 
```bash
sudo apt list -a nodejs
```
Update apt
```bash
sudo apt update
```
Install latest nodejs
```bash
sudo apt install nodejs
```


## Update npm packages

Install compatible version of NodeJS on local os or docker

**Update packages**
``` bash
npm update
```
globally
```bash
npm update -g
```

**To test the update, run**
``` bash
npm outdated
```
globally
```bash
npm outdated -g --depth=0
```

**To Install the latest version of `nodemon` and globally `npm`**
``` bash
npm install nodemon@lates
```
globally
```bash
sudo npm install --location=global npm@latest
```
