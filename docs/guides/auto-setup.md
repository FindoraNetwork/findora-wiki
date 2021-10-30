---
sidebar_position: 4
---

# Automated Setup
## Hardware Requirements

* Minimum Requirements:
  * Minimum: 8GB RAM, 2 Core CPU, 100GB Hard Disk
  * Recommended: 16GB RAM, 4 Core CPU, 300GB Hard Disk

* Recommended Requirements:
  * AWS T3 t3.2xlarge
  * AliCloud g6 g6.2xlarge
  * GCP n2 n2-standard-8
  
> **! NOTE !**
>
> If you have previously installed a Findora validator instance on your current machine, then you should first delete all the contents from your /data directory.
> 

## Automated Setup

Download and run the script below which automatically downloads the binaries and configures your validator node: 

> **! IMPORTANT !**
>
> The node_init.sh script will remove all the validator and wallet information you have. If you just want to keep your data. Use [safety clean](## Safety clean)
### Setup the Findora Node Tool

- `fn`: Findora Node Setup (fn) is CLI tool with sub-commands necessary to setup a validator node and stake/unstake FRA
    - [Linux version](https://wiki.findora.org/bin/linux/fn)
    - [MacOS version](https://wiki.findora.org/bin/macos/fn)

```shell
# download and move to your path
wget https://wiki.findora.org/bin/linux/fn
chmod +x fn
mv fn /usr/local/bin/
```

### Generate Key
Generate a new, random pair of public and private keys for your node which will be used for FRA staking:

```shell
fn genkey > tmp.gen.keypair
```

View the contents of your `tmp.gen.keypair` file via the command below:

```cat tmp.gen.keypair```
 Note: Before proceeding further, the staking private key should be stored in file `/data/findora/{network_name}/{network_name}_node.key`. This will be the `sec_key` in your `tmp.gen.keypair` file. You will need to create this directory if it doesn't exist.
 
 ### Download and run the automated setup script

- [**node_init_testnet.sh**](./node_init_testnet.sh)
- [**node_init_mainnet.sh**](./node_init_mainnet.sh)

> **Tips**:
> * example: `bash -x node_init.sh`



## Setup `fn` CLI tool

To configure `fn` for use on Testnet:
```
fn setup -S https://prod-testnet.prod.findora.org
```

To configure `fn` for use on Mainnet:
```
fn setup -S https://prod-mainnet.prod.findora.org
```

```
# Connect your staking key (now stored inside `node.mnemonic`)
# to fn. This allows fn to sign transactions on your behalf
# ex)
#     fn setup -O ${ROOT_DIR}/node.mnemonic
fn setup -O <Path to the mnemonic of your node> || exit 1

# Connect your Node Key to fn
# ex)
#     fn setup -K ${ROOT_DIR}/tendermint/config/priv_validator_key.json
fn setup -K <path to validator key> || exit 1
```


## Fund Your Validator

Validators must stake a minimum of 10,000 FRA to register as a validator. Before you can stake FRA to your validator, you must first transfer FRA to the `Findora Address` (i.e. wallet address) of your validator.
### Testnet Funding - Find Your Wallet Address
On Testnet, you can request free Testnet FRA tokens. First, locate the wallet address associated with your validator node. To do this, run `fn show` and locate the address under `Findora Address`

An example of some of the information from `fn show` is below. `Findora Address` is the wallet address you will give out when requesting FRA testnet tokens. Note: Do not use the example address below for your own node.

![Docusaurus](/img/validator_setup_guide/fn_show.png)

### Testnet Funding - Request Testnet FRA from Discord Bot
Make a request for Testnet FRA be sent to you on the Findora Discord channel. The request will be processed by Findora's Discord bot.

Step 1: Goto [Findora Discord](https://discord.gg/NXhZr6H2qt)

Step 2: Goto the `#faucet-anvil` channel on Findora's Discord

Step 3: A discord bot will automatically detect commands requesting Testnet FRA faucet tokens on the `#faucet-anvil` channel. Enter a FRA request using the command format below (be sure to use your own receiving wallet address):

```shell
# Bot Request Format:
#   !faucet <\wallet address> <\Will you run a validator? yes/no> > <\Are you a developer? yes/no>
!faucet fra19rtfg2g58x6jxxxxxxxxxxxxxxxxx example@gmail.com no no 
```
![Docusaurus](/img/validator_setup_guide/discord_bot.png)

> **Tips**:
> - All FRA token requests will be approved
> - You can only ask for FRA tokens once so make sure your receiving wallet address is correct.

### Mainnet Funding
Transfer FRA from an existing Findora wallet to your `Findora Address` (if you don't own any FRA, you can buy from a crypto exchange that lists FRA first). 


## Node Operations

Besides node setup, the `fn` tool is also used for general validator staking operations such as staking FRA into the validator, setting the commission rate the validator charges, and transferring FRA balance on the validator to another wallet address and claiming FRA rewards. 

To see all list of all sub-commands under `fn` use the `--help` flag:

```shell
fn --help
```

To get detailed info about a specific sub-command like `stake` use the `--help` flag.

> Usage example:
>
> `fn stake --help`
>
> ```shell
> fn-stake
>   Stake tokens (i.e. bond tokens) from a Findora account to a Validator
>
> USAGE:
>   fn stake [FLAGS] [OPTIONS] --amount <Amount>
>
> FLAGS:
>     -a, --append     stake more FRAs to your node
>         --force      ignore warning and stake FRAs to your target node
>     -h, --help       Prints help information
>     -V, --version    Prints version information
>
> OPTIONS:
>     -n, --amount <Amount>                       how much `FRA unit`s you want to stake
>     -R, --commission-rate <Rate>                the commission rate of your node, a float number from 0.0 to 1.0
>     -S, --staker-priv-key <SecretKey>           the file which contains private key (in base64 format) of proposer
>     -M, --validator-memo <Memo>                 the description of your node, optional
>     -A, --validator-td-addr <TendermintAddr>    stake FRAs to a custom validator
> ```
>
> Help information for each sub-commands can be obtained by typing --help after the specific subcommand:
>
> - `fn unstake --help`
> - `fn claim --help`
> - `fn transfer --help`
> - ...

### Stake Initial FRA and Set Commission Rate
After receiving FRA to your validator's `Findora Address`, you must stake a minimum of 10,000 FRA to be a validator. Only the top 100 validators (with the most FRA staked) will earn FRA rewards.


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
fn stake -n $((999999 * 1000000)) -R 0.02 -M "$(cat staker_memo)"
```

### Stake Additional FRA

```shell
# Stake an additional 2,000 FRA to your validator
fn stake -a -n $((2000 * 1000000))
```

### View Node Information
To find information about your validator node, use the `fn show` command. Sample output is below:

![Docusaurus](/img/validator_setup_guide/fn_show_full.png)

### Claim FRA Rewards

Top 100 validators will earn block rewards. If your validator is a top 100 validator, it will earn rewards which will show up in the `rewards:` section of `fn show`. 

![Docusaurus](/img/validator_setup_guide/reward_balance.png)

If your reward balance is greater than 0, you can claim your earned rewards via the `fn claim` sub-command

```shell
# fn claim -n <the amount of FRA units you want>
# ex) 
#   If you have a reward balance of 20 FRA (i.e. "rewards: 20000000") 
#   and wish to claim 10 FRA (out of 20 FRA), issue the command below:
fn claim -n $((10 * 1000000))
```

### Unstake FRA

#### Unstake Some of Your FRA

```shell
# fn unstake -n <the amount of FRA units you want>
# ex)
#   To unstake 900 FRA (ie. 900 * 1000000)
fn unstake -n $((900 * 1000000))
```

#### Close Validator and Unstake All of Your FRA

> **NOTE**: This operation will unstake all of your FRA and remove your node from the Findora Network.

```shell
fn unstake
```

## Safety clean

This script WILL NOT clean your validator id and wallet data. It just clean the data and restart the validator.

#### Set Environment Path Variables

Please set `$ROOT_DIR` same as setup step.

#### Auto clean

- [**safety_clean.sh**](./safety_clean.sh)

> **Tips**:
> * example: `bash -x safety_clean.sh`

