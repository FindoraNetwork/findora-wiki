---
sidebar_position: 1
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Personal Devnet

This guides shows how to run a Ganache-like personal local Findora blockchain in local environment for development and testing.

## General Prerequisites

### Install Golang
https://go.dev/doc/install

#### Tips for Linux (Ubuntu)
```
# first command needs to be run as root, rest as your normal user
wget https://go.dev/dl/go1.18.3.linux-amd64.tar.gz
sudo su
rm -rf /usr/local/go && tar -C /usr/local -xzf go1.18.3.linux-amd64.tar.gz

# exit root now
exit

# add to path. For more permanent you should add this line to bottom of your ~/.profile
export PATH=$PATH:/usr/local/go/bin

# check go version
go version
```

### Install Rust
https://rustup.rs/


### Install System Specific Dependencies

<Tabs>
  <TabItem value="Ubuntu" label="Ubuntu" default>

```
sudo apt update && \
sudo apt upgrade -y && \
sudo apt install -y build-essential libleveldb-dev libssl-dev pkg-config clang libclang-dev librocksdb-dev
```

  </TabItem>
  <TabItem value="Mac" label="Mac">

```
#
```

  </TabItem>
</Tabs>


## Build Required Binaries

Findora blockchain can run on both MacOS or Linux. Below command will build all required binaries to start a personal Findora blockchain. 

```
git clone -b v0.3.19-release https://github.com/FindoraNetwork/platform && \
cd platform && \
make build_release
```

Please make sure to add all below 3 binaries to your $PATH.

`stt`: The tool to initialize Findora blockchain.

`abcid`: Findora core protocol.

`tendermint`: Tendermint consensus engine.

```
mv stt /usr/local/bin/
mv abcid /usr/local/bin/
mv tendermint /usr/local/bin/

```


## Install Python3 and toml-cli

Findora devnet tools are written in Python3 and uses `toml-cli` to manipulate configuration files. [Install Python3](https://www.python.org/downloads/) if you don't have one. Also install `toml-cli` using below command
```
pip3 install toml-cli
```
and then copy newly installed `toml` cli tool to `/usr/local/bin` to make it visiable
```
cp /Library/Python/3.x/site-packages/toml /usr/local/bin
```


## Run Devnet

Under the `platform` path, execute `make devnet` in the terminal.

<img src={useBaseUrl("/img/make-devnet.png")} width="100%" height="100%"/>

### What's in devnet?

Name | Description
--- | ---
node0 | The validator
node1 | The fullnode
Faucet | The key pair that holds FRA

### How to control devnet?
The local blockchain can be stopped and restarted anytime during development and tests.

To stop: `./tools/devnet/stopnodes.sh`

To restart: `./tools/devnet/startnodes.sh`

To start over: `make devnet` again.

<img src={useBaseUrl("/img/stop-start-devnet.png")} width="40%" height="40%"/>


## Devnet URLs and Ports

URL | Purpose
--- | ---
http://127.0.0.1 | For [Findora Electron Wallet](https://wallet.findora.org/) connection
http://127.0.0.1:8545 | Web3 HTTP connection
http://127.0.0.1:8546 | Web3 WebSocket connection
