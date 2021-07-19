---
sidebar_position: 2
---

# Validator Node Setup (on Testnet)

> **! NOTE !**
>
> You should remove your `$LEDGER_DIR` of `/tmp/.*`(if `$LEDGER_DIR` is not defined) first if you ever run a different validator instance.

## Hardware Requirements

* Requirements
  * Minimum: 8GB RAM, 2 Core CPU, 100GB Hard Disk
  * Recommended: 16GB RAM, 4 Core CPU, 300GB Hard Disk

## Automated Setup (via Script)

Download and run the script below which automatically downloads the binaries and configures your Testnet validator node: 

[**node_init.sh**](./node_init.sh)

> **Tips**:
> * example: `bash -x node_init.sh`

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
- `fns`: Findora Node Setup (fns) is CLI tool with sub-commands necessary to setup a validator node and stake/unstake FRA
    - [Linux version](https://github.com/FindoraNetwork/testnet-downloads/releases/download/linux/fns)
    - [MacOS version](https://github.com/FindoraNetwork/testnet-downloads/releases/download/macos/fns)

> **Tips**:
> - You can (optionally) run a Linux node via `Windows Subsystem for Linux`
> - Check that binaries have executable permissions set correctly
>     - ex) `chmod +x tendermint abci_validator_node fns`
> - Check that binary files are placed into one of your `PATH` directories
>     - ex) `mv tendermint abci_validator_node fns /usr/local/bin/`

### Configure Local Node (for Testnet)

#### Run `tendermint` Executable to initialize Tendermint and to Create a Node Key

Initializing Tendermint will create a node key (stored in a newly created `./tendermint/config/priv_validator_key.json` file). The node key will be used to identity your node, sign blocks and perform other tendermint consensus-related tasks.

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

#### Set Environment Variables

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

#### Create Staking Key via `fns` CLI Tool

Generate a new, random pair of public and private keys for your node which will be used for FRA staking:

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

And then, you can import the `sec_key` to your wallet, and query the balances or other informations from your wallet.

Configure your validator node to use your newly generated public and private keys:

```shell
# Link the fns client to the Findora Testnet address
fns setup -S https://prod-testnet.prod.findora.org

# Connect your staking key (which is related to the mnemonic you will store in tmp.gen.keypair) to your fns
# Afterwards, fns can use your staking key to sign transactions on your behalf
# ex)
#     echo "repair drink action brass term blur fat doll spoon thumb raise squirrel tornado engine tumble picnic approve elegant tube urge ghost secret seminar blame" > ${LEDGER_DIR}/node.mnemonic
#     fns setup -O ${LEDGER_DIR}/node.mnemonic
fns setup -O <Path to the mnemonic of your node> || exit 1

# Connect your Node Key to fns
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

## Request Testnet FRA Tokens

Before you can request Testnet FRA tokens you must locate the wallet address associated with your validator node. To do this, run `fns show` and locate the address under `Findora Address`

An example of the result of `fns show` is below. Do not use the example address below. This is the address you will give out when requesting FRA testnet tokens.

```shell
Findora Address:
fra17f8h2r690eh6s5aph5fwwygqfek8ehcatq2hzreaa6mlnuyrr86q708p76
```

You can request Testnet FRA tokens in two ways:
* 1) Fill out this form: [FRA Request Form](https://docs.google.com/forms/d/e/1FAIpQLScyRjf47U2azpUs2rX9_vvMrSiDNulYBPSAPtLUioHE-ZEwJg/viewform) OR
* 2) Make a request on the Findora Discord channel: [Findora Discord](https://discord.gg/nMH9nuPT)

> **Tips**:
> - All FRA token requests will be approved
> - Testnet FRA form requests are processed every 12 hours

## Stake/Unstake FRA and Claim Rewards (as a Validator)

Staking operations also rely on the use of the `fns`.

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
> - Before staking, wait for 100% data synchronization of your validator node
>     - Else, you may be charged a 'validator node offline' penatly fee.

```shell
# The minimum amount of FRA you must stake to run a validator is 888,888 FRA
# ex)
# - To stake 999999 FRAs with a commision rate of 2% (and validator name of Validator Pool A)
# - Note: that is 999999 * 1000000 FRA units
fns stake -n $((999999 * 1000000)) -R 0.2 -M 'Validator Pool A'
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
