---
sidebar_position: 2
---

# Validator Node Setup (on Testnet)

Table of Contents:
- Hardware Requirements
- Automated Setup
- Manual Setup
  - Download Validator Binaries
  - Configure Local Node (for Testnet)
  - Enable node to participate as a Validator Candidate (by staking FRA)
- Testnet Faucet (Free FRA Tokens)
- Staking/Unstaking FRA and Claiming Rewards (as a Validator)

## Hardware Requirements
* Requirements
  * Minimum: 8GB RAM, 2 Core CPU, 100GB Hard Disk
  * Recommended: 16GB RAM, 4 Core CPU, 300GB Hard Disk


## Automated Setup Script
>
> Run the script below to automatically download binaries and configure the Testnet validator node: [**node_init.sh**](./node_init.sh).
>
> example: `bash -x node_init.sh`

## Manual Setup
If you don't wish to run the automated setup script above, you can manually download binary files and configure your Testnet validator following the instructions below:

### Download Validator Binaries

Download the following files:

- `tendermint`: a Findora version of tendermint-core node
    - [Linux version](https://github.com/FindoraNetwork/testnet-downloads/releases/download/linux/tendermint)
    - [MacOS version](https://github.com/FindoraNetwork/testnet-downloads/releases/download/macos/tendermint)
- `abci_validator_node`: the ABCI node of findora network
    - [Linux version](https://github.com/FindoraNetwork/testnet-downloads/releases/download/linux/abci_validator_node)
    - [MacOS version](https://github.com/FindoraNetwork/testnet-downloads/releases/download/macos/abci_validator_node)
- `fns`: Findora Network Staking (fns) command is a tool for staking/unstaking FRA
    - [Linux version](https://github.com/FindoraNetwork/testnet-downloads/releases/download/linux/fns)
    - [MacOS version](https://github.com/FindoraNetwork/testnet-downloads/releases/download/macos/fns)
- `stt`: Staking Test Tool (stt) is an auxiliary tool for performing staking testing
    - [Linux version](https://github.com/FindoraNetwork/testnet-downloads/releases/download/linux/stt)
    - [MacOS version](https://github.com/FindoraNetwork/testnet-downloads/releases/download/macos/stt)

> **Tips**:
> - You can (optionally) run a Linux node via `Windows Subsystem for Linux`
> - Check that binaries have executable permissions set correctly
>     - ex) `chmod +x tendermint abci_validator_node fns stt`
> - Check that binary files are placed into one of your `PATH` directories
>     - ex) `mv tendermint abci_validator_node fns stt /usr/local/bin/`

### Configure Local Node (for Testnet)

#### Initialize Local Node

```shell
# Clean up old data that may exist
rm -rf ~/.tendermint

# Initialize the configuration of your Tendermint node
# This command will create a .tendermint directory and priv_validator_key.json file needed later
tendermint init

# Create ledger data directory, for example
rm -rf ${LEDGER_DIR}
mkdir -p ${LEDGER_DIR}/abci ${LEDGER_DIR}/tendermint
```

> **Tips**:
> - If you encounter a security issue error when trying to run `tendermint init`, you may need to manually approve its security priveliges in you OS first. Then re-run the `tendermint init` command again.

#### Configure Environment Variables
```shell
# ex)
#     export LEDGER_DIR=${HOME}/findora_testnet
#     We recommend storing ledger data in ${HOME}/findora_testnet
export LEDGER_DIR=<Path to store ledger data>

# ex)
#     export TENDERMINT_NODE_KEY_CONFIG_PATH=${HOME}/.tendermint/config/priv_validator_key.json
export TENDERMINT_NODE_KEY_CONFIG_PATH=<The path where the 'priv_validator_key.json' are stored>

# Optional, only if you want to query from your local node
export ENABLE_LEDGER_SERVICE=true

# Optional, only if you want to query from your local node
export ENABLE_QUERY_SERVICE=true
```

#### Generate Public and Private Keys

Generate a new, random pair of public and private keys for your node:

```shell
fns genkey > ~/findora_testnet/tmp.gen.keypair
```

View the contents of your `tmp.gen.keypair` file via the command below:

```cat ~/findora_testnet/tmp.gen.keypair```

An example of the file's content is below (Note: the `pub_key` and `sec_key` below are examples. Do not use them in your own node):

```shell
Mnemonic: repair drink action brass term blur fat doll spoon thumb raise squirrel tornado engine tumble picnic approve elegant tube urge ghost secret seminar blame
Key: {
  "pub_key": "LSlwyUYVg1zBtCqOS6wv_49uHTYS2OwQLBn3bRjrtPU=",
  "sec_key": "b0MGhK7xaRQHuhzFkaBhQ1o4GwTumJEWt1NQ7FChNwA="
}
```

Configure your validator node to use your newly generated public and private keys:

```shell
fns setup -S https://prod-testnet.prod.findora.org

# ex)
#     echo "repair drink action brass term blur fat doll spoon thumb raise squirrel tornado engine tumble picnic approve elegant tube urge ghost secret seminar blame" > ${LEDGER_DIR}/node.mnemonic
#     fns setup -O ${LEDGER_DIR}/node.mnemonic
fns setup -O <Path to the mnemonic of your node> || exit 1

# ex)
#     fns setup -K ${HOME}/.tendermint/config/priv_validator_key.json
fns setup -K <path to validator key> || exit 1
```

#### Configure Tendermint-Core Node

> **Tips**:
> - For production environments, setup a cluster (instead of a raw node)
> - Install the following command line tools before continuing:
>   - 'wget', 'curl', 'jq' and 'perl'

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

#### Start Local Node

```shell
# Start your validator process
nohup abci_validator_node 2>&1 > ${LEDGER_DIR}/abci/validator.log &

# Start your tendermint process
# Notes:
#   If you want to access the tendermint node on another host,
#   use option --rpc.laddr=tcp://0.0.0.0:26657 when starting the process
nohup tendermint node 2>&1 > ${LEDGER_DIR}/tendermint/consensus.log &
```

#### Check Local Node Status

If the following commands return status messages without any errors, then your node has been successfully configured and started:

```shell
curl 'http://localhost:26657/status'
curl 'http://localhost:8669/version'
curl 'http://localhost:8668/version' # Only if you set the 'ENABLE_LEDGER_SERVICE'
curl 'http://localhost:8667/version' # Only if you set the 'ENABLE_QUERY_SERVICE'
```

## Request (Testnet) FRA Tokens

To request Testnet FRA tokens please use the form posted on discord .

- All FRA token requests will be approved!
  - You will need to fill in a short form asking for your wallet address (where Testnet FRA will be sent to)
  - Testnet FRA requests are processed every 12 hours

## Stake/Unstake FRA and Claiming Rewards (as a Validator)

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
