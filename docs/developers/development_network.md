---
sidebar_position: 1
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Development Network

This guide walks through how to deploy a local blockchain instance for software development and testing purposes. Alternatively, developers can also develop and test on [Anvil Testnet](../Network_Settings.mdx).

## 1. Prerequisites

### i) Install Golang
https://go.dev/doc/install

#### Tips for Linux (Ubuntu)
```bash
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

### ii) Install Rust
https://rustup.rs/

If already installed, please update to 1.59 or newer
```bash
rustup update
```


### iii) Install System Specific Dependencies

<Tabs>
  <TabItem value="Ubuntu" label="Ubuntu" default>

```bash
sudo apt update && \
sudo apt upgrade -y && \
sudo apt install -y build-essential libleveldb-dev libssl-dev pkg-config clang libclang-dev librocksdb-dev
```

  </TabItem>
  <TabItem value="Mac" label="Mac">

```

brew install openssl leveldb

```

  </TabItem>
</Tabs>


## 2. Build Required Binaries

Findora blockchain can run on both MacOS or Linux. The commands below will build all required binaries to start a local Findora blockchain. 

```bash
git clone -b v0.3.19-release https://github.com/FindoraNetwork/platform && \
cd platform && \
make build_release
```

Please make sure to add all below 3 binaries to your $PATH. By default, they will be copied to `~/.cargo/bin/` which should already be in your $PATH.

* `stt`: The tool to initialize Findora blockchain.

* `abcid`: Findora core protocol.

* `tendermint`: Tendermint consensus engine.


## 3. Install Python3 and toml-cli

Findora devnet tools are written in Python3 and use `toml-cli` to manipulate configuration files. [Install Python3](https://www.python.org/downloads/) if not already installed. Also, install `toml-cli` using the command below:
```bash
pip3 install toml-cli
```
and then copy newly installed `toml` cli tool to `/usr/local/bin` to make it visiable
```bash
cp /Library/Python/3.x/site-packages/toml /usr/local/bin
```


## 4. Run Devnet

Inside your `platform` directory, execute `make devnet` in the terminal.

<img src={useBaseUrl("/img/make-devnet.png")} width="100%" height="100%"/>

### i) What's in devnet?

Name | Description
--- | ---
node0 | The validator
node1 | The fullnode
Faucet | The key pair that holds FRA

### ii) How to control devnet?
The local blockchain can be stopped and restarted anytime during development and tests.

* Stop Blockchain: `./tools/devnet/stopnodes.sh`

* Restart Blockchain: `./tools/devnet/startnodes.sh`

* Start Over: `make devnet` again.

<img src={useBaseUrl("/img/stop-start-devnet.png")} width="40%" height="40%"/>


## 5. Devnet URLs and Ports

URL | Purpose
--- | ---
http://127.0.0.1 | connects to [Findora Electron Wallet](https://wallet.findora.org/)
http://127.0.0.1:8545 | connects to Web3 HTTP
http://127.0.0.1:8546 | connects to Web3 WebSocket


## 6. Troubleshoot

* Problem 1
  * Error Message: 
    * `make build_release fails with go:linkname must refer to declared function or variable`
* Solution
  * Update your golang.org/x/sys
    ```bash
      # go to platform/tools/tendermint run following to update
      go get -u golang.org/x/sys
  ---
* Problem 2
  * `.findora` file is missing
* Solution
  * manually add `.findora` to your home directory (i.e. directory `~`)