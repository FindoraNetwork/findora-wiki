---
sidebar_position: 2
---

# Automated Setup

import useBaseUrl from '@docusaurus/useBaseUrl';

Download and run the script below to configure your validator node and download the binaries automatically:

:::note
All validator and wallet information will be removed by the `node_init.sh` script. If all you want to do is keep your data. [safety clean](## Safety clean) should be used.
:::
### Setup the Findora Node Tool

`fn`: Findora Node Setup (fn) is a command-line (CLI) utility that allows you to set up a validator node and stake/unstake FRA.
*    [Linux version](https://wiki.findora.org/bin/linux/fn)
*   [MacOS version](https://wiki.findora.org/bin/macos/fn)


download and move to your path

```
wget https://wiki.findora.org/bin/linux/fn
chmod +x fn
mv fn /usr/local/bin/
```

### Generate Key
For your node, generate a new, random pair of public and private keys that will be used for FRA staking:

```
fn genkey > tmp.gen.keypair
```

`cat tmp.gen.keypair` Note: The staking private key should be saved in the file `/data/findora/{network_name}/{network_name}_node.key`before continuing. This will be the `sec_key` in your `tmp.gen.keypair` file. If this directory does not exist, you will need to create it.

### Download and run the automated setup script
- [**node_init_testnet.sh**](../validator-guides/scripts/node_init_testnet.sh)
- [**node_init_mainnet.sh**](../validator-guides/scripts/node_init_mainnet.sh)

```
example: `bash -x node_init_testnet.sh`
```

### Setup fn CLI tool

To set up `fn` for use on Testnet, follow these steps:
```
fn setup -S https://prod-testnet.prod.findora.org
```


To set up `fn` for use on Mainnet, follow these steps:

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

### Fund Your Validator

To register as a validator, validators must stake a minimum of 10,000 FRA. You must first send FRA to your validator's `Findora Address` (i.e. wallet address) before you can stake FRA to your validator.

### Testnet Funding - Find Your Wallet Address

You can get free Testnet FRA tokens by requesting them on Testnet. To begin, look up the wallet address for your validator node. To do so, type `fn show` and look for the address under `Findora Address`.

Below is an example of some of the data from the `fn show`. When requesting FRA testnet tokens, you'll need to provide your `Findora Address`. Note: When working with your own node, do not use the example address below.

![](https://i.imgur.com/7SzbbAh.png)
<img src={useBaseUrl("/img/validator_setup_guide/autosetup-1.png")} />



### Testnet Funding - Request Testnet FRA from Discord Bot

Make a request on the Findora Discord channel for Testnet FRA to be provided to you. Findora's Discord bot will handle your request.

Step 1: Go to [Findora Discord](https://discord.gg/NXhZr6H2qt)

Step 2: Go to `#faucet-anvil` channel on Findora's Discord

Step 3: On the `#faucet-anvil` channel, a discord bot will automatically detect commands requesting Testnet FRA faucet tokens. Specify the following command syntax to send a FRA request (be sure to use your own receiving wallet address):

```
# Bot Request Format:
#   !faucet <\wallet address> <\Will you run a validator? yes/no> > <\Are you a developer? yes/no>
!faucet fra19rtfg2g58x6jxxxxxxxxxxxxxxxxx example@gmail.com no no 
```

<img src={useBaseUrl("/img/validator_setup_guide/autosetup-2.png")} />

:::note
  All FRA token requests will be approved
  You can only ask for FRA tokens once so make sure your receiving wallet address is correct.
:::

### Mainnet Funding
Transfer FRA from an existing Findora wallet to your Findora Address (if you don't have any, you can purchase FRA from a crypto exchange that FRA listed).

#### Node Operations
Aside from node setup, the `fn` tool is used for common validator staking procedures such staking FRA into the validator, adjusting the validator's commission rate, transferring FRA balance on the validator to another wallet address, and claiming FRA rewards.

To see all list of all sub-commands under `fn` use the `--help` flag:

```
fn --help
```

To get detailed info about a specific sub-command like `stake` use the `--help` flag.


> Usage example
> `fn stake --help`
>
> 
> ```
> fn-stake
 >   Stake tokens (i.e. bond tokens) from a Findora account to a Validator
>
>USAGE:
  >fn stake [FLAGS] [OPTIONS] --amount <Amount>
>
>FLAGS:
 >   -a, --append     stake more FRAs to your node
 >       --force      ignore warning and stake FRAs to your target node
 >   -h, --help       Prints help information
  >  -V, --version    Prints version information
>
>OPTIONS:
 >   -n, --amount <Amount>                       how much `FRA unit`s you want to stake
 >   -R, --commission-rate <Rate>                the commission rate of your node, a float number from 0.0 to 1.0
 >   -S, --staker-priv-key <SecretKey>           the file which contains private key (in base64 format) of proposer
 >  -M, --validator-memo <Memo>                 the description of your node, optional
 >  -A, --validator-td-addr <TendermintAddr>    stake FRAs to a custom validator
>```
>
> Help information for each sub-commands can be obtained by typing `--help` after the specific subcommand:
    >
    >`fn unstake --help`
    >`fn claim --help`
    >`fn transfer --help`
>
    
### Stake Initial FRA and Set Commission Rate

To be a validator, you must stake a minimum of 10,000 FRA after receiving FRA to your validator's `Findora Address`. Only the top 100 validators (those who have staked the most FRA) will receive FRA payouts.
    
:::note
Before staking, wait for 100% data synchronization of your validator node. Else, you may be charged a 'validator node offline' penatly fee.
::: 
    
```
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
```
# Stake an additional 2,000 FRA to your validator
fn stake -a -n $((2000 * 1000000))
```
    
### View Node Information
    
```
To find information about your validator node, use the fn show command. Sample output is below:
```

<img src={useBaseUrl("/img/validator_setup_guide/autosetup-3.png")} />
### Claim FRA Rewards

Block awards will be given to the top 100 validators. If your validator is in the top 100, it will receive rewards, which will appear in the `rewards:` a segment of the `fn show`    
    
<img src={useBaseUrl("/img/validator_setup_guide/autosetup-4.png")} />

If your reward balance is greater than 0, use the `fn claim` subcommand to claim your earned rewards.    
    
```
# fn claim -n <the amount of FRA units you want>
# ex) 
#   If you have a reward balance of 20 FRA (i.e. "rewards: 20000000") 
#   and wish to claim 10 FRA (out of 20 FRA), issue the command below:
fn claim -n $((10 * 1000000))
```

### Unstake FRA
#### Unstake Some of Your FRA  
```
# fn unstake -n <the amount of FRA units you want>
# ex)
#   To unstake 900 FRA (ie. 900 * 1000000)
fn unstake -n $((900 * 1000000))
```

#### Close Validator and Unstake All of Your FRA
:::note
  This action will remove your node from the Findora Network and unstake all of your FRA.
:::