#!/bin/bash

echo "-------------------------------Start----------------------------------------"

# Installing mongodb 
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 9DA31620334BD75D9DCB49F368818C72E52529D4

# Installing MongDB https://docs.mongodb.com/manual/tutorial/install-mongodb-enterprise-on-ubuntu/

echo "Installing Mongodb 4 on Ubuntu 18.04 default"

echo "deb [ arch=amd64 ] http://repo.mongodb.com/apt/ubuntu bionic/mongodb-enterprise/4.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-enterprise.list

# Ubuntu 16.04

#echo "deb [ arch=amd64,arm64,ppc64el,s390x ] http://repo.mongodb.com/apt/ubuntu xenial/mongodb-enterprise/4.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-enterprise.list

sudo apt-get update

sudo apt-get install -y mongodb-enterprise

echo "mongodb-enterprise hold" | sudo dpkg --set-selections
echo "mongodb-enterprise-server hold" | sudo dpkg --set-selections
echo "mongodb-enterprise-shell hold" | sudo dpkg --set-selections
echo "mongodb-enterprise-mongos hold" | sudo dpkg --set-selections
echo "mongodb-enterprise-tools hold" | sudo dpkg --set-selections

# Installing MongoDb 18.04
sudo apt-get install libcurl4 libgssapi-krb5-2 libkrb5-dbg libldap-2.4-2 libpcap0.8 libsasl2-2 snmp openssl

# Installing MongoDb 16.04

#sudo apt-get install libcurl3 libgssapi-krb5-2 libkrb5-dbg libldap-2.4-2 libpcap0.8 libsasl2-2 snmp openssl 

tar -zxvf mongodb-linux-*-4.0.7.tgz

export PATH=<mongodb-install-directory>/bin:$PATH

sudo service mongod start

# Installing Nodejs 

echo -e "\nInstalling Node.JS & NPM...\n"
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo apt-get install npm
sudo npm install --global npm
sudo npm install --global n
sudo n stable
sudo ln -sf /usr/local/bin/node /usr/bin/nodejs
echo -e "\nInstalling Dependency Managers...\n"
sudo npm install --global bower yarn
echo -e "\nInstalling Task Runners and Dependency Bundlers...\n"
sudo npm install --global gulp grunt webpack browserify nodemon pm2 @vue/cli
sudo ln -sf /usr/local/bin/node /usr/bin/nodejs

echo "Setup the project"

rm -rf public/MagicApp

echo "Installing frontend"

cd public && git clone git@github.com:tier5/MagicApp.git && git checkout frontend_v2 && npm install

node seeds/users.seeds.js

sudo chown a+x prod.sh

bash prod.sh

echo "---------------------------End-------------------------------"




