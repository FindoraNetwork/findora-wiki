---
sidebar_position: 2
---

# Run a Validator Node in Findora Testnet (Anvil)

What this document covers:
- How to add your own node to the Findora Network (Anvil Testnet)
- How to become a validator candidate by staking FRA

## Preparatory work

> **Tips**:
>
> If you want to skip this stage and experience the staking operations directly, you can execute this automated script: [**node_init.sh**](./node_init.sh).
>
> example: `bash -x node_init.sh`

### Obtain the necessary binaries

You can get them by downloading or compiling by yourself, we will use the downloading method in this document.

The required binaries are:

- `tendermint`: a findora version of tendermint-core node
    - [Linux version](https://github.com/FindoraNetwork/downloads/releases/download/linux/tendermint)
    - [MacOS version](https://github.com/FindoraNetwork/downloads/releases/download/macos/tendermint)
- `abci_validtor_node`: the abci node of findora network
    - [Linux version](https://github.com/FindoraNetwork/downloads/releases/download/linux/abci_validator_node)
    - [MacOS version](https://github.com/FindoraNetwork/downloads/releases/download/macos/abci_validator_node)
- `fns`: a command line tool for staking
    - [Linux version](https://github.com/FindoraNetwork/downloads/releases/download/linux/fns)
    - [MacOS version](https://github.com/FindoraNetwork/downloads/releases/download/macos/fns)
- `stt`: an optional auxiliary tool for staking
    - [Linux version](https://github.com/FindoraNetwork/downloads/releases/download/linux/stt)
    - [MacOS version](https://github.com/FindoraNetwork/downloads/releases/download/macos/stt)

> **Tips**:
> - You can run a linux version node on `Windows Subsytem for Linux`
> - You should give proper executable permissions to these downloaded binaries
>     - Example: `chmod +x tendermint abci_validator_node fns stt`
> - You should also move these binaries to one of your `PATH` directories
>     - Example: `mv tendermint abci_validator_node fns stt /usr/local/bin/`

### Configure your local node

#### Initialize your local node configuration and data

```shell
# Clean up old data that may exist
rm -rf ~/.tendermint

# Initialize the config of your tendermint node
tendermint init

# Create ledger data directory, for example
rm -rf ~/findora_testnet
mkdir -p ~/findora_testnet/abci ~/findora_testnet/tendermint
```

#### Set necessary environment variables

```shell
# example:
#     export LEDGER_DIR=${HOME}/findora_testnet
export LEDGER_DIR=<The path where you want to store your ledger data>

# example:
#     export TENDERMINT_NODE_KEY_CONFIG_PATH=${HOME}/.tendermint/config/priv_validator_key.json
export TENDERMINT_NODE_KEY_CONFIG_PATH=<The path where the 'priv_validator_key.json' are stored>

# Optional, only if you want to query from your local node
export ENABLE_LEDGER_SERVICE=true

# Optional, only if you want to query from your local node
export ENABLE_QUERY_SERVICE=true
```

#### Generate key

Generate a new random key for your node:

```shell
fns genkey > ~/findora_testnet/tmp.gen.keypair
```

Output example (please do not use this sample directly):

```shell
cat ~/findora_testnet/tmp.gen.keypair
Mnemonic: repair drink action brass term blur fat doll spoon thumb raise squirrel tornado engine tumble picnic approve elegant tube urge ghost secret seminar blame
Key: {
  "pub_key": "LSlwyUYVg1zBtCqOS6wv_49uHTYS2OwQLBn3bRjrtPU=",
  "sec_key": "b0MGhK7xaRQHuhzFkaBhQ1o4GwTumJEWt1NQ7FChNwA="
}
```

set them:

```shell
fns setup -S https://prod-testnet.prod.findora.org

# example:
#     echo "repair drink action brass term blur fat doll spoon thumb raise squirrel tornado engine tumble picnic approve elegant tube urge ghost secret seminar blame" > ${LEDGER_DIR}/node.mnemonic
#     fns setup -O ${LEDGER_DIR}/node.mnemonic
fns setup -O <Path to the mnemonic of your node> || exit 1
# example 
#     fns setup -K ${HOME}/.tendermint/config/priv_validator_key.json
fns setup -K <path to validator key> || exit 1
```

#### Get FRA tokens

Issue and transfer enough FRAs to your address (you should buy them in the real world):

```shell
# add new FRAs to findora testnet
stt issue

# transfer some FRAs to your address
# example:
#     stt transfer -f root -t 'LSlwyUYVg1zBtCqOS6wv_49uHTYS2OwQLBn3bRjrtPU=' -n $((10000 * 10000 * 1000000))
stt transfer -f root -t <the public key of your node> -n <amount>
```

Check the result:

```shell
fns show
```

Output example:

```shell
Server URL:
https://prod-testnet.prod.findora.org

XfrPublicKey:
LSlwyUYVg1zBtCqOS6wv_49uHTYS2OwQLBn3bRjrtPU=

Your Balance:
100000000000000 FRA units
```

If the '**Your Balance**' field is correct, then you can continue.

#### Custom the config of your tendermint-core node

> **Tips**:
> - you should set up a cluster instead of using a raw node in your production environment
> - cmdline tools like 'wget', 'curl', 'jq' and 'perl' should be installed in advance

```shell
# Get the genesis config from an existing node of the testnet
curl https://prod-testnet.prod.findora.org:26657/genesis \
    | jq -c '.result.genesis' \
    | jq > ~/.tendermint/config/genesis.json

# Adjust the block interval
perl -pi -e 's#(create_empty_blocks_interval = ).*#$1"15s"#' ~/.tendermint/config/config.toml

# Config some existing nodes to your local node, so it can connect to the testnet
perl -pi -e \
    's#(persistent_peers = )".*"#$1"b87304454c0a0a0c5ed6c483ac5adc487f3b21f6\@prod-testnet-us-west-2-sentry-000-public.prod.findora.org:26656"#' \
    ~/.tendermint/config/config.toml
```

#### Run your local node

```shell
# Start your validator process
nohup abci_validator_node 2>&1 > ${LEDGER_DIR}/abci/validator.log &

# Start your tendermint process
# Notes:
#   If you want to access the tendermint node on another host,
#   use option --rpc.laddr=tcp://0.0.0.0:26657 when starting the process
nohup tendermint node 2>&1 > ${LEDGER_DIR}/tendermint/consensus.log &
```

#### Check the status of your local node

If the following commands can return useful message without error, then your node is running well:

```shell
curl 'http://localhost:26657/status'; echo
curl 'http://localhost:8669/version'; echo
curl 'http://localhost:8668/version'; echo # Only if you set the 'ENABLE_LEDGER_SERVICE'
curl 'http://localhost:8667/version'; echo # Only if you set the 'ENABLE_QUERY_SERVICE'
```

## Staking

For staking operations, you should use the `fns` tool.

> Usage example:
>
> `fns stake --help`
>
> ```shell
> USAGE:
>     fns stake [FLAGS] [OPTIONS] --amount <Amount>
>
> FLAGS:
>     -a, --append     stake more FRAs to your node
>
> OPTIONS:
>     -n, --amount <Amount>           how much `FRA unit`s you want to stake
>     -R, --commission-rate <Rate>    the commission rate for delegators, a float number from 0.0 to 1.0
>     -M, --validator-memo <Memo>     the description of your validator node, optional
> ```
>
> Similar help information can be obtained through the `fns` tool itself:
>
> - `fns --help`
> - `fns stake --help`
> - `fns unstake --help`
> - `fns claim --help`
> - `fns transfer --help`
> - ...

### Stake into findora network

> **Tips**:
> - you should wait for 100% completion of the data synchronization of your node
>     - Or you may be punished by the network because of 'validator node offline'

```shell
# The minimal amount of FRAs for a successful staking is 888888
# example:
# - your want to stake 1888888 FRAs
# - that is 1888888 * 1000000 FRA units
fns stake -n $((1888888 * 1000000)) -R 0.2 -M 'Node-A'
```

### Append more power to your node

```shell
# append 2 FRA units to your node,
# the power of your node will be increased by 2 if all is well
fns stake -a -n 2
```

### Query infomations

```
fns show
```

### Claim rewards

Claim all your rewards:

```shell
fns claim
```

Claim part of your rewards:

```shell
# fns claim -n <the amount of FRA units you want>
# example:
# - your want to claim 10 FRAs
# - that is 10 * 1000000 FRA units
fns claim -n $((10 * 1000000))
```

### Unstake principals

Unstake all your principals:

> **NOTE**: this operation will make your node out of findora network (testnet).

```shell
fns unstake
```

Unstake part of your principals:

```shell
# fns unstake -n <the amount of FRA units you want>
# example:
# - your want to unstake 900 FRAs
# - that is 900 * 1000000 FRA units
fns unstake -n $((900 * 1000000))
```
