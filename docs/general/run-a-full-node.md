---
sidebar_position: 2
---

# Run a Findora Full Node

Whether you're interested in contributing to Findora, building apps, or joining the validator pool, you'll want the ability to run your own full node.

## Introduction

Build your full node and connect it to the Findora MainNet.

### System requirements

#### Supported Operating System

- [x] Linux
- [x] MacOS
- [ ] Window(has not been supported yet)

### Public IP ports requirements

- [**Optional**] 8667, query service(data cached from ledger)
- [**Optional**] 8668, ledger service(data direct from ledger)
- [**Optional**] 8669, transaction submission service
- [**Optional**] 26657, tendermint RPC service
- 26656, tendermint P2P network service

## mainnet network

>application install

#### linux

```shell
wget  https://github.com/FindoraNetwork/iii/releases/download/fnstest/tendermint.linux

wget  https://github.com/FindoraNetwork/iii/releases/download/fnstest/abci_validator_node.linux

wget  https://github.com/FindoraNetwork/iii/releases/download/fnstest/fns.linux

### remove suffix

mv tendermint.linux tendermint
mv abci_validator_node.linux abci_validator_node
mv fns.linux fns

chmod a+rwx  tendermint
chmod a+rwx  abci_validator_node
chmod a+rwx  fns
```

#### macos
```shell
curl -o tendermint https://github.com/FindoraNetwork/iii/releases/download/fnstest/tendermint.macos

curl -o abci_validator_node https://github.com/FindoraNetwork/iii/releases/download/fnstest/abci_validator_node.macos

curl -o fns https://github.com/FindoraNetwork/iii/releases/download/fnstest/fns.macos

chmod a+rwx  tendermint
chmod a+rwx  abci_validator_node
chmod a+rwx  fns
```


The three applications above are:
```
tendermint application
findora application
fns staking terminal tool
```


> ### config bin to env
#### linux
```shell
echo "export PATH=$PATH:$(pwd)" >> ~/.bashrc
source ~/.bashrc
```
#### macos
```shell
echo "export PATH=$PATH:$(pwd)" >> ~/.zshrc
source ~/.zshrc
```

> ### create config and set config
```shell
# clear old data
 rm -rf /tmp/findora ~/.tendermint
# init tendermint
tendermint init
```
after init successfully, run

```shell
ls  ~/.tendermint/config
```
Three files are displayed：
```shell
config.toml   genesis.json   node_key.json  priv_validator_key.json
```
### request network params and write  node config

#### install jq
#### linux
```shell
sudo apt-get install jq
```
#### macos
```shell
sudo brew install jq
```

#### write genesis config
```shell

curl https://prod-mainnet.prod.findora.org:26657/genesis | jq -c  | perl -pi -e 's/^{"jsonrpc":"2.0","id":-1,"result":{"genesis"://' | perl -pi -e 's/}}$//'  | jq > ~/.tendermint/config/genesis.json
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

*******        0 0/0/128        *.8667
*******        0 0/0/128        *.8668
*******        0 0/0/128        *.8669
*******        0 0/0/128        *.26658

Run init.sh
```
# use fns tool

### fns is official offer staking terminal tools

### set fns tool

#### set server url
```shell
fns setup -S http://127.0.0.1:8669

```

#### set pay and staking account mnemonic
```shell
echo '[your private mnemonic]'> $(pwd)/mnemonic
fns setup -O $(pwd)/mnemonic

```
#### acquire and set tendermint  public key
```shell
echo $(grep -A 2 'pub_key' ~/.tendermint/config/priv_validator_key.json | grep '"value":' | grep -o '[^"]\+"$' | sed 's/"//') > $(pwd)/tendermint_keys
fns setup -K $(pwd)/tendermint_keys
```


### stake operator
For example, pledge 1000000, because the basic unit is 6 digits, it must be 1000000 n is the pledge amount
R is the commission rate is the commission that someone entrusts to you, and the commission you get, -M is only for this transaction.
```shell
fns stake -n $((1000000 * 1000000)) -R 0.2 -M "my remark"
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

### claim reward
```shell
fns claim -n $((1000000 * 1000000))
```
The image tag can change to latest for the latest version or a specific version number.

The system can update with the code:
```
cd /srv/node-setup/config/{network-name}
docker-compose down
docker-compose up -d
```
