---
sidebar_position: 4
---

# Validator Setup (Testnet)
## Hardware Requirements

* Requirements
  * Minimum: 8GB RAM, 2 Core CPU, 100GB Hard Disk
  * Recommended: 16GB RAM, 4 Core CPU, 300GB Hard Disk

> **! NOTE !**
>
> If you have previously installed a Findora validator instance on your current machine, then you should first delete your all the contents from your ${ROOT_DIR} directory . If the ${ROOT_DIR} is not defined you can remove the contents in /tmp folder.

## Automated Setup

Download and run the script below which automatically downloads the binaries and configures your Testnet validator node: 

Note: Before proceeding further, the stake key with enough FRA tokens should be stored in file `${HOME}/findora_testnet/testnet_node.key`. If you don't have one, see the following sections to generate a new key file.

- [**node_init.sh**](./node_init.sh)

> **Tips**:
> * example: `bash -x node_init.sh`

## Manual Setup

If you don't wish to run the automated setup script above, you can manually download binary files and configure your Testnet validator following the instructions below:

### Download Validator Binaries and Pull Image

Download the following files and pull image:

- `findorad`: the node of findora network.
    - `docker pull public.ecr.aws/k6m5b6e2/release/findorad:latest`
- `fs`: Findora Node Setup (fs) is CLI tool with sub-commands necessary to setup a validator node and stake/unstake FRA
    - [Linux version](https://github.com/FindoraNetwork/testnet-downloads/releases/download/Linux-03/fns)
    - [MacOS version](https://github.com/FindoraNetwork/testnet-downloads/releases/download/MacOS-03/fns)

> **Tips**:
> - You can (optionally) run a Linux node via `Windows Subsystem for Linux`
> - Check that binaries have executable permissions set correctly
>     - ex) `chmod +x fs`
> - Check that binary files are placed into one of your `PATH` directories
>     - ex) `mv fs /usr/local/bin/`

### Configure Local Node (for Testnet)

#### Set Environment Path Variables

```shell
# ex)
#     export ROOT_DIR=${HOME}/findora_testnet
export ROOT_DIR=<The data path of your node>
```

#### Initialize Findora Node and Create a Node Key

Initializing Tendermint will create a node key (stored in a newly created `./tendermint/config/priv_validator_key.json` file). The node key will be used to identity your node, sign blocks and perform other tendermint consensus-related tasks.

```shell
# Clean up old data that may exist, may need super privilege if necessary
sudo rm -rf ~/.tendermint

# Initialize the configuration of your Tendermint node
# This command will create a .tendermint directory and priv_validator_key.json file needed later
docker run --rm -v $HOME/.tendermint:/root/.tendermint public.ecr.aws/k6m5b6e2/release/findorad init --test-net

sudo chown -R `id -u`:`id -g` ${HOME}/.tendermint/config

# Create ledger data directory, for example
sudo rm -rf ${ROOT_DIR}
mkdir -p ${ROOT_DIR}/findorad
```

> **Tips**:
> - If you encounter a security issue error when trying to initialize findora node , you may need to manually approve its security priveliges in you OS first. Then re-run the commands again.

#### Create Staking Key via `fs` CLI Tool

Generate a new, random pair of public and private keys for your node which will be used for FRA staking:

```shell
fs genkey > ${ROOT_DIR}/tmp.gen.keypair
```

View the contents of your `tmp.gen.keypair` file via the command below:

```cat ${ROOT_DIR}/tmp.gen.keypair```

An example of the file's content is below. Note: the `pub_key` and `sec_key` below are examples. Do not use them in your own node.

```shell
Wallet Address: fra1955hpj2xzkp4esd5928yhtp0l78ku8fkztvwcypvr8mk6x8tkn6sjsajun
Mnemonic: repair drink action brass term blur fat doll spoon thumb raise squirrel tornado engine tumble picnic approve elegant tube urge ghost secret seminar blame
Key: {
  "pub_key": "LSlwyUYVg1zBtCqOS6wv_49uHTYS2OwQLBn3bRjrtPU=",
  "sec_key": "b0MGhK7xaRQHuhzFkaBhQ1o4GwTumJEWt1NQ7FChNwA="
}
```

> ** Tip **:
> For convenience, you can import the `sec_key` (aka private key) into any Findora wallet (Win/Mac wallet, mobile wallet, CLI wallet tool, etc.), to more conveniently check and manage your FRA balances or to view historical transaction data for this wallet address.

#### Store Mnemonic Words into ${ROOT_DIR}/node.mnemonic
For convenience in setting up your node via the `fs` tool, store your 24 mnemonic keywords (located inside `tmp.gen.keypair`) into ${ROOT_DIR}/node.mnemonic.

To accomplish this, open the `tmp.gen.keypair` file and copy all of the 24 mnemonic keywords specific to your node. Then paste these 24 mnemonic keywords into the command below.

Note: the 24 mnemonic keywords in the example command below (repair, drink, action, brass...) are examples. Do not use them.

```shell
# ex)
# echo "repair drink action brass term blur fat doll spoon thumb raise squirrel tornado engine tumble picnic approve elegant tube urge ghost secret seminar blame" > ${ROOT_DIR}/node.mnemonic
echo <24 mnemonic keywords> > ${ROOT_DIR}/node.mnemonic
```

Configure your validator node to use your newly generated public and private keys:

```shell
# Link the fs client to the Findora Testnet address
fs setup -S https://prod-testnet.prod.findora.org

# Connect your staking key (now stored inside `node.mnemonic`)
# to fs. This allows fs to sign transactions on your behalf
# ex)
#     fs setup -O ${ROOT_DIR}/node.mnemonic
fs setup -O <Path to the mnemonic of your node> || exit 1

# Connect your Node Key to fs
# ex)
#     fs setup -K ${HOME}/.tendermint/config/priv_validator_key.json
fs setup -K <path to validator key> || exit 1
```

#### Start or Upgrade Local Node

```shell
# Stop your local container if necessary
docker rm -f findorad
# Start your validator container
docker run -d \
    -v $HOME/.tendermint:/root/.tendermint \
    -v $ROOT_DIR/findorad:/tmp/findora \
    -p 8669:8669 \
    -p 8668:8668 \
    -p 8667:8667 \
    -p 26657:26657 \
    --name findorad \
    public.ecr.aws/k6m5b6e2/release/findorad node \
    --ledger-dir /tmp/findora \
    --tendermint-host 0.0.0.0 \
    --tendermint-node-key-config-path="/root/.tendermint/config/priv_validator_key.json" \
    --enable-ledger-service \
    --enable-query-service
```

#### Logging for Node

```shell
docker logs -f findorad
```

#### Check Local Node Status

If the following commands return status messages without any errors, then your node has been successfully configured and started:

```shell
curl 'http://localhost:26657/status'
curl 'http://localhost:8669/version'
curl 'http://localhost:8668/version' # Only if you set the 'ENABLE_LEDGER_SERVICE'
curl 'http://localhost:8667/version' # Only if you set the 'ENABLE_QUERY_SERVICE'
```

## Fund Your Validator

Validators must stake a minimum for 888,888 FRA to register as a validator. Before you can stake FRA to your validator, you must first transfer FRA to your the `Findora Address` (i.e. wallet address) of your validator.
### Testnet Funding
On Testnet, you can request free Testnet FRA tokens. First, locate the wallet address associated with your validator node. To do this, run `fs show` and locate the address under `Findora Address`

An example of some of the information from `fs show` is below. `Findora Address` is the wallet address you will give out when requesting FRA testnet tokens. Note: Do not use the example address below for your own node.

![Docusaurus](/img/validator_setup_guide/fns_show.png)

You can request Testnet FRA tokens in two ways:
* 1) Fill out this form: [FRA Request Form](https://findora.typeform.com/to/uTC5aWYh) OR
* 2) Make a request on the Findora Discord channel: [Findora Discord](http://discord.gg/DZpxXxRsGX)

> **Tips**:
> - All FRA token requests will be approved
> - Testnet FRA form requests are processed every 12 hours

### Mainnet Funding
Transfer FRA from an existing Findora wallet to your `Findora Address` (if you don't own any FRA, you can buy from a crypto exchange that lists FRA first). 


## Node Operations

Besides node setup, the `fs` tool is also used for general validator staking operations such as staking FRA into the validator, setting the commission rate the validator charges, and transferring FRA balance on the validator to another wallet address and claiming FRA rewards. 

To see all list of all sub-commands under `fs` use the `--help` flag:

```shell
fs --help
```

To get detailed info about a specific sub-command like `stake` use the `--help` flag.

> Usage example:
>
> `fs stake --help`
>
> ```shell
> fs-stake
>   Stake tokens (i.e. bond tokens) from a Findora account to a Validator
>
> USAGE:
>   fs stake [FLAGS] [OPTIONS] --amount <Amount>
>
> FLAGS:
>     -a, --append     stake more FRAs to your node
>         --force      ignore warning and stake FRAs to your node
>     -h, --help       Prints help information
>     -V, --version    Prints version information
>
> OPTIONS:
>     -n, --amount <Amount>                       how much `FRA unit`s you want to stake
>     -R, --commission-rate <Rate>                the commission rate of your node, a float number from 0.0 to 1.0
>     -S, --staker-priv-key <SecretKey>           the private key of proposer, in base64 format
>     -M, --validator-memo <Memo>                 the description of your node, optional
>     -A, --validator-td-addr <TendermintAddr>    stake FRAs to a custom validator
> ```
>
> Help information for each sub-commands can be obtained by typing --help after the specific subcommand:
>
> - `fs unstake --help`
> - `fs claim --help`
> - `fs transfer --help`
> - ...

### Stake Initial FRA and Set Commission Rate
After receiving FRA to your validator's `Findora Address`, you must stake a minimum of 888,888 FRA to be a validator. Only the top 100 validators (with the most FRA staked) will earn FRA rewards.


> **Tips**:
> - Before staking, wait for 100% data synchronization of your validator node
>     - Else, you may be charged a 'validator node offline' penatly fee.

```shell
# ex)
# - To stake 999,999 FRAs with a commision rate of 2% (and validator name of Validator_Pool_A)
# - Note: that is 999999 * 1000000 FRA units
# - Your Staker Memo file should like this:
cat staker_memo
{
  "name": "ExampleNode",
  "desc": "I am just a example description, please change me.",
  "website": "https://www.example.com",
  "logo": "https://www.example.com/logo"
}
fs stake -n $((999999 * 1000000)) -R 0.02 -M "$(cat staker_memo)"
```

### Stake Additional FRA

```shell
# Stake an additional 2,000 FRA to your validator
fs stake -a -n $((2000 * 1000000))
```

### View Node Information
To find information about your validator node, use the `fs show` command. Sample output is below:

![Docusaurus](/img/validator_setup_guide/fns_show_full.png)

### Claim FRA Rewards

Top 100 validators will earn block rewards. If your validator is a top 100 validator, it will earn rewards which will show up in the `rewards:` section of `fs show`. 

![Docusaurus](/img/validator_setup_guide/reward_balance.png)

If your reward balance is greater than 0, you can claim your earned rewards via the `fs claim` sub-command

```shell
# fs claim -n <the amount of FRA units you want>
# ex) 
#   If you have a reward balance of 20 FRA (i.e. "rewards: 20000000") 
#   and wish to claim 10 FRA (out of 20 FRA), issue the command below:
fs claim -n $((10 * 1000000))
```

### Unstake FRA

#### Unstake Some of Your FRA

```shell
# fs unstake -n <the amount of FRA units you want>
# ex)
#   To unstake 900 FRA (ie. 900 * 1000000)
fs unstake -n $((900 * 1000000))
```

#### Close Validator and Unstake All of Your FRA

> **NOTE**: This operation will unstake all of your FRA and remove your node from the Findora Network.

```shell
fs unstake
```
