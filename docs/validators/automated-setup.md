---
sidebar_position: 2
---

# Automated Setup

import useBaseUrl from '@docusaurus/useBaseUrl';

This guides shows how to use the automated setup scripts to configure your validator node and download the binaries automatically.

### Setup the fn CLI Tool

`fn`: Findora Node Setup (fn) is a command-line (CLI) utility that allows you to set up a validator node and stake/unstake FRA.
*   [Linux version](https://wiki.findora.org/bin/linux/fn)
*   [MacOS version](https://wiki.findora.org/bin/macos/fn)

Download the appropruate file and move to your path:

```
wget https://wiki.findora.org/bin/linux/fn
chmod +x fn
mv fn /usr/local/bin/
```

### Generate Keys
Generate a new, random pair of public and private keys that will be used for FRA staking:

```
fn genkey > tmp.gen.keypair
```

To view the keys: `cat tmp.gen.keypair`

Before continuing, the staking private key (`sec_key` in your `tmp.gen.keypair` file) should be saved in a file at the following path:

```
/data/findora/{network_name}/{network_name}_node.key
```

Note: If this directory does not exist, you will need to create it.

### Download and run the automated setup script
- For Testnet: [**node_init_testnet.sh**](../validator-guides/scripts/node_init_testnet.sh)
- For Mainnet: [**node_init_mainnet.sh**](../validator-guides/scripts/node_init_mainnet.sh)

Example:
```
bash -x node_init_testnet.sh
```

:::note
All existing validator and wallet information will be removed by running these scripts. If all you want is to keep your data, [Safety Clean](/docs/validators/update-version#auto-safety-clean) should be used
:::

### Connect to the Network

To connect `fn` with the Findora Network, use this command:

- For Testnet: `fn setup -S https://prod-testnet.prod.findora.org`
- For Mainnet: `fn setup -S https://prod-mainnet.prod.findora.org`

To connect your staking key (inside `node.mnemonic`) to fn, use the below command. This allows fn to sign transactions on your behalf.
```shell
# Ex: fn setup -O ${ROOT_DIR}/node.mnemonic
fn setup -O <Path to the mnemonic of your node> || exit 1
```

To connect your Node Key to fn, use the command below.
```shell
# Ex: fn setup -K ${ROOT_DIR}/tendermint/config/priv_validator_key.json
fn setup -K <path to validator key> || exit 1
```

:::note
For the next steps, proceed to [this Staking Guide](/docs/validators/staking-guide) to learn how to fund your validator and stake FRA.
:::