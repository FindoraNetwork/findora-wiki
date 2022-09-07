---
sidebar_position: 1
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Development Network

This guide walks through how to use [`fn dev`](https://github.com/FindoraNetwork/platform/blob/main/src/components/finutils/src/common/dev/README.md) to run and manage local blockchain instance[s] for software development and testing purposes. Alternatively, developers can also develop and test on [Anvil Testnet](../Network_Settings.mdx).

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

If already installed, please update to 1.63 or newer
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
git clone -b v0.3.29-release https://github.com/FindoraNetwork/platform && \
cd platform && \
make build_release
```

Please make sure to add all below binaries to your $PATH. By default, they will be copied to `~/.cargo/bin/` which should already be in your $PATH.

* `abcid`: Findora core protocol.

* `tendermint`: Tendermint consensus engine.

* `fn`: The core development tool for working with a Findora blockchain.


## 3. Run and manage local development cluster[s]

Please use `fn dev` to run and manage your local clusters, check [**the documentation on github**](https://github.com/FindoraNetwork/platform/blob/main/src/components/finutils/src/common/dev/README.md) for a detailed user guide.
