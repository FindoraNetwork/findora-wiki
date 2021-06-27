---
sidebar_position: 2
---

# Run a Findora Full Node

Whether you're interested in contributing to Findora, building apps, or joining the validator pool, you'll want the ability to run your own full node.

This guide will show you how to run one of our Findora nodes and connect to the Findora alpha or mainnet networks. Currently we are offering prebuilt docker images but we will be providing instructions for building directly source very shortly!

### Introduction
Build a full node in your server and connect to the Findora Alpha/Mainnet network.
Alpha network is for the integration and test only.

### System requirements

#### OS
Linux(Ubuntu), if you use different distribution of Linux, you can change ``` apt install```
 to another package management tools.

#### Application (will install/ by the init.sh script)
```
docker 
docker-compose
```

### Install
```
# switch to sudo user
sudo su

cd /srv
git clone https://github.com/FindoraNetwork/node-setup.git
cd node-setup
```


Run init.sh
```
. init.sh
```
Follow the instructions that follow and the script will automatically create a full node and connect to the Findora Network.

### Network
The node should open the port 8667, 8668, 8669 and 26657 to puclib with Security Group in AWS or fire work in GCP

### Troubleshooting
The image now located in AWS North America so the downloading speed in China will be a little bit slow and sometimes it will have intermittent handshake issues. If the script fails during image download, please run the script again. 

### Update
We will be updating this repo frequently, so please run git pull before you run the code.

We will send a notification when the new version release.

The version number located in docker-compose.yml
```
image: "public.ecr.aws/k6m5b6e2/demo/tendermint:latest"
```
The image tag can change to latest for the latest version or a specific version number.

The system can update with the code:
```
cd /srv/node-setup/config/{network-name}
docker-compose down
docker-compose up -d
```