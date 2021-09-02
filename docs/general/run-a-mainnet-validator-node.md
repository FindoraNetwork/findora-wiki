---
sidebar_position: 3
---

# Validator Node Setup (on Mainnet)

Table of Contents:
- Hardware Requirements
- Automated Setup
- Manual Setup
    - Download Validator Binaries
    - Configure Local Node (for Mainnet)
    - Enable node to participate as a Validator Candidate (by staking FRA)
- Staking/Unstaking FRA and Claiming Rewards (as a Validator)

## Hardware Requirements
* Requirements
    * Minimum: 8GB RAM, 2 Core CPU, 100GB Hard Disk
    * Recommended: 16GB RAM, 4 Core CPU, 300GB Hard Disk


## Automated Setup Script
>
> Run the script below to automatically download binaries and configure the Mainnet validator node: [**node_init_mainnet.sh**](./node_init_mainnet.sh).
>
> example: `bash -x node_init_mainnet.sh Path-to-Your-Node-Keypair`

## Manual Setup
If you don't wish to run the automated setup script above, you can manually download binary files and configure your Mainnet validator following the instructions below:

### Download Validator Binaries

Download the following files:

- `tendermint`: a findora version of tendermint-core node
    - [Linux version](https://github.com/FindoraNetwork/downloads/releases/download/linux/tendermint)
    - [MacOS version](https://github.com/FindoraNetwork/downloads/releases/download/macos/tendermint)
- `abci_validtor_node`: the abci node of findora network
    - [Linux version](https://github.com/FindoraNetwork/downloads/releases/download/linux/abci_validator_node)
    - [MacOS version](https://github.com/FindoraNetwork/downloads/releases/download/macos/abci_validator_node)
- `fn`: a command line tool for Findora Network
    - [Linux version](https://github.com/FindoraNetwork/downloads/releases/download/linux/fn)
    - [MacOS version](https://github.com/FindoraNetwork/downloads/releases/download/macos/fn)

> **Tips**:
> - You can (optionally) run a Linux node via `Windows Subsystem for Linux`
> - Check that binaries have executable permissions set correctly
    >     - ex) `chmod +x tendermint abci_validator_node fn`
> - Check that binary files are placed into one of your `PATH` directories
    >     - ex) `mv tendermint abci_validator_node fn /usr/local/bin/`

### Configure your local node (for Mainnet)

#### Initialize your local node

```shell
# Clean up old data that may exist
rm -rf ~/.tendermint

# Initialize the config of your tendermint node
tendermint init

# Create ledger data directory, for example
rm -rf ${LEDGER_DIR}
mkdir -p ${LEDGER_DIR}/abci ${LEDGER_DIR}/tendermint
```

> **Tips**:
> - If you encounter a security issue error when trying to run `tendermint init`, you may need to manually approve its security priveliges in you OS first. Then re-run the `tendermint init` command again.

#### Set necessary environment variables

```shell
# example:
#     export LEDGER_DIR=${HOME}/findora_mainnet
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

If you donot have a keypair for your node, generate a new random one:

```shell
fn genkey > ${LEDGER_DIR}/tmp.gen.keypair
```

Output example (please do not use this sample directly):

```shell
cat ${LEDGER_DIR}/tmp.gen.keypair
Mnemonic: repair drink action brass term blur fat doll spoon thumb raise squirrel tornado engine tumble picnic approve elegant tube urge ghost secret seminar blame
Key: {
  "pub_key": "LSlwyUYVg1zBtCqOS6wv_49uHTYS2OwQLBn3bRjrtPU=",
  "sec_key": "b0MGhK7xaRQHuhzFkaBhQ1o4GwTumJEWt1NQ7FChNwA="
}
```

set them:

```shell
fn setup -S https://prod-mainnet.prod.findora.org

# example:
#     echo "repair drink action brass term blur fat doll spoon thumb raise squirrel tornado engine tumble picnic approve elegant tube urge ghost secret seminar blame" > ${LEDGER_DIR}/node.mnemonic
#     fn setup -O ${LEDGER_DIR}/node.mnemonic
fn setup -O <Path to the mnemonic of your node> || exit 1
# example 
#     fn setup -K ${HOME}/.tendermint/config/priv_validator_key.json
fn setup -K <path to validator key> || exit 1
```

#### Get FRA tokens

There serveral ways to get FRAs:

- propose an issue to https://github.com/FindoraNetwork/findora-wiki
- trade [FRA](https://www.gate.io/coins/buy-FRA) tokens from exchange [Gate.io](https://www.gate.io/), which is one of the global top 10 cryptocurrency exchanges with authentic trading volume
- ...

#### Custom the config of your tendermint-core node

> **Tips**:
> - you should set up a cluster instead of using a raw node in your production environment
> - cmdline tools like 'wget', 'curl', 'jq' and 'perl' should be installed in advance

```shell
# Get the genesis config from an existing node of the mainnet
curl https://prod-mainnet.prod.findora.org:26657/genesis \
    | jq -c '.result.genesis' \
    | jq > ~/.tendermint/config/genesis.json

# Adjust the block interval
perl -pi -e 's#(create_empty_blocks_interval = ).*#$1"15s"#' ~/.tendermint/config/config.toml

# Config some existing nodes to your local node, so it can connect to the mainnet
perl -pi -e \
    's#(persistent_peers = )".*"#$1"b87304454c0a0a0c5ed6c483ac5adc487f3b21f6\@prod-mainnet-us-west-2-sentry-000-public.prod.findora.org:26656"#' \
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

For staking operations, you should use the `fn` tool.

> Usage example:
>
> `fn stake --help`
>
> ```shell
> USAGE:
>     fn stake [FLAGS] [OPTIONS] --amount <Amount>
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
> Similar help information can be obtained through the `fn` tool itself:
>
> - `fn --help`
> - `fn stake --help`
> - `fn unstake --help`
> - `fn claim --help`
> - `fn transfer --help`
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
fn stake -n $((1888888 * 1000000)) -R 0.2 -M 'Node-A'
```

### Append more power to your node

```shell
# append 2 FRA units to your node,
# the power of your node will be increased by 2 if all is well
fn stake -a -n 2
```

### Query infomations

```
fn show
```

### Claim rewards

Claim all your rewards:

```shell
fn claim
```

Claim part of your rewards:

```shell
# fn claim -n <the amount of FRA units you want>
# example:
# - your want to claim 10 FRAs
# - that is 10 * 1000000 FRA units
fn claim -n $((10 * 1000000))
```

### Unstake principals

Unstake all your principals:

> **NOTE**: this operation will make your node out of Findora Network (Mainnet).

```shell
fn unstake
```

Unstake part of your principals:

```shell
# fn unstake -n <the amount of FRA units you want>
# example:
# - your want to unstake 900 FRAs
# - that is 900 * 1000000 FRA units
fn unstake -n $((900 * 1000000))
```
