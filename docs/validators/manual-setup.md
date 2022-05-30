---
sidebar_position: 3
---
# Manual Setup

import useBaseUrl from '@docusaurus/useBaseUrl';


## Step 1: Pull Findora docker image

Navigate to your project folder and pull docker image. Here, we are downloading the `findorad` which is the node of the Findora Network. For security and stability reasons, make sure to download version `0.3.19-release`

```
docker pull findoranetwork/findorad:v0.3.19-release
```

<img src={useBaseUrl("/img/validator_setup_guide/manual-setup-1.png")} />


Verify you have the latest version by checking for the `latest` tag as seen in the picture below

```
docker image ls
```
<img src={useBaseUrl("/img/validator_setup_guide/manual-setup-2.png")} />

## Step 2: Setup fn CLI

1. You will need the Findora Node Setup (fn) CLI tool that contains the neccessary sub-commands to setup a validator node and stake/unstake FRA.
    
    Download according to your operating system:
    * [Linux](https://wiki.findora.org/bin/linux/fn)
    * [MacOS](https://wiki.findora.org/bin/macos/fn)
 
    You can also run a node on windows via *Windows Subsystem for Linux*

2. Move your downloaded `fn` to your path directory by either running

    ```
    mv fn /usr/local/bin/
    ```

    or by running the command below if you moved the fn file to HOME

    ```
    cp $HOME/fn /user/local/bin/
    ```

    <img src={useBaseUrl("/img/validator_setup_guide/manual-setup-3.png")} width="75%" />

3. Ensure that binaries have executable permisions set correctly 

    <img src={useBaseUrl("/img/validator_setup_guide/manual-setup-4.png")} width="75%" />


## Step 3: Configure Local Node

1. Set Environment Path Variables

    ```
    export ROOT_DIR=< The data path of your node >
    ```
   <img src={useBaseUrl("/img/validator_setup_guide/manual-setup-5.png")} width="75%" />

2. Create ledger data directory
    
    First we are going to clean up any old data you might have by removing the ROOT_DIR folder. Be sure to backup all your keys (validator, node and wallet key) before removing this directory.
    :::note
    **Proceed with caution** - Since the ROOT_DIR is the source of the connection to Mainnet, you might lose your funds if the keys are not backed up properly 
    :::

    ```
    sudo rm -rf ${ROOT_DIR}
    ```

    Now create a new ledger data directory

    ```    
    sudo mkdir -p ${ROOT_DIR}
    ```

3. Initialize Tendermint

    Initializing Tendermint will create a node key (stored in a newly created file at the path `${ROOT_DIR}/tendermint/config/priv_validator_key.json`). The node key will be used to identify your node, sign blocks and perform other tendermint consensus-related tasks.

    - For Testnet:
   ```
    docker run --rm -v ${ROOT_DIR}/tendermint:/root/.tendermint findoranetwork/findorad:latest init --testnet || exit 1
   ```
    - For Mainnet:
   ```
    docker run --rm -v ${ROOT_DIR}/tendermint:/root/.tendermint findoranetwork/findorad:latest init --mainnet || exit 1
   ```

    Set correct permission
    ```
    sudo chown -R `id -u`:`id -g` ${ROOT_DIR}/tendermint/
    ```

4. Get the link for latest Chain Data

    Set your namespace to the current working environment
    ```
        export NAMESPACE=testnet
        export NAMESPACE=mainnet
    ```
   
    Get latest chain link and export URL to variable
    ```
    wget -O "${ROOT_DIR}/latest" "https://prod-${NAMESPACE}-us-west-2-chain-data-backup.s3.us-west-2.amazonaws.com/latest"
    export CHAINDATA_URL=$(cut -d , -f 1 "${ROOT_DIR}/latest")
    ```

    Run `echo $CHAINDATA_URL` to verify the link
    <img src={useBaseUrl("/img/validator_setup_guide/manual-setup-6.png")} />

5. Download the Data

    Next, you need to download the data from the link you got in the step above. This might take a while.

    ```
    wget -O "${ROOT_DIR}/snapshot" "${CHAINDATA_URL}"
    ```

    <img src={useBaseUrl("/img/validator_setup_guide/manual-setup-7.png")} />

    Run the following commands to finish the process.

    ```
        mkdir "${ROOT_DIR}/snapshot_data"
        tar zxvf "${ROOT_DIR}/snapshot" -C "${ROOT_DIR}/snapshot_data"
        mv "${ROOT_DIR}/snapshot_data/data/ledger" "${ROOT_DIR}/findorad"
        rm -rf ${ROOT_DIR}/tendermint/data 
        mv "${ROOT_DIR}/snapshot_data/data/tendermint/mainnet/node0/data" "${ROOT_DIR}/tendermint/data"
        rm -rf ${ROOT_DIR}/snapshot_data
    ```

:::note
 If you encounter a security issue error when trying to initialize findora node, you may need to manually approve its security privileges in your OS first and then re-run the command again.
:::

## Step 4: Generate Staking Key

1. Generate Keys

    Generate a new, random pair of public and private keys that will be used for FRA staking:
    ```
    fn genkey > ${ROOT_DIR}/tmp.gen.keypair
    ```

    To view the keys: `cat ${ROOT_DIR}/tmp.gen.keypair` 

    Example:
    ```
    # Note: This is an example. Do not use them in your own node.
    Wallet Address: fra1955hpj2xzkp4esd5928yhtp0l78ku8fkztvwcypvr8mk6x8tkn6sjsajun
    Mnemonic: repair drink action brass term blur fat doll spoon thumb raise squirrel tornado engine tumble picnic approve elegant tube urge ghost secret seminar blame
    Key: {
        "pub_key": "LSlwyUYVg1zBtCqOS6wv_49uHTYS2OwQLBn3bRjrtPU=",
        "sec_key": "b0MGhK7xaRQHuhzFkaBhQ1o4GwTumJEWt1NQ7FChNwA="
    }
    ```

2. Importing private key to wallet

    For convenience, you can import the `sec_key` (aka private key) into any Findora wallet (Win/Mac wallet, mobile wallet, CLI wallet tool, etc.), to check and manage your FRA balances or to view historical transaction data for this wallet address.

    :::note
    The private key or the mnemonic should never be shared with anyone, even with people from the Findora community or development team. Our mods will never ask for this information. It would be advisable to keep a backup of your mnemonic on a separate storage, should you ever need to restore it.
    :::

3. Store your keypair for future use
    - For Testnet:
    ```
    echo ${ROOT_DIR}/tmp.gen.keypair > ${ROOT_DIR}/testnet_node.key
    ```
    - For Mainnet:
    ```
    echo ${ROOT_DIR}/tmp.gen.keypair > ${ROOT_DIR}/mainnet_node.key
    ```

4. Store Mnemonic words

    For convenience in setting up your node via the `fn` tool, store your 24 mnemonic keywords (located inside tmp.gen.keypair) into `${ROOT_DIR}/node.mnemonic`
    ```
    echo <24 mnemonic keywords> > ${ROOT_DIR}/node.mnemonic
    ```

    Example:
    ```
    # Note: This is an example. Do not use them in your own node.
    echo "repair drink action brass term blur fat doll spoon thumb raise squirrel tornado engine tumble picnic approve elegant tube urge ghost secret seminar blame" > ${ROOT_DIR}/node.mnemonic
    ```

## Step 5: Connect to the Network
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

## Step 6: Start or Upgrade Local Node
Stop your local container if necessary using this command:
```
docker rm -f findorad || exit 1
```

To start your validator container, run this command
```
docker run -d \
    -v ${ROOT_DIR}/tendermint:/root/.tendermint \
    -v ${ROOT_DIR}/findorad:/tmp/findora \
    -p 8669:8669 \
    -p 8668:8668 \
    -p 8667:8667 \
    -p 26657:26657 \
    -e EVM_CHAIN_ID=2153 \
    --name findorad \
    findoranetwork/findorad:latest node \
    --ledger-dir /tmp/findora \
    --tendermint-host 0.0.0.0 \
    --tendermint-node-key-config-path="/root/.tendermint/config/priv_validator_key.json" \
    --enable-query-service
    --enable-eth-api-service
```    
    
Logging for Node:
```
docker logs -f findorad
```

## Step 7: Check Local Node Status
If the following commands return status messages without any errors, then your node has been successfully configured and started

```
curl 'http://localhost:26657/status'
curl 'http://localhost:8669/version'
curl 'http://localhost:8668/version' # Only if you set the 'ENABLE_LEDGER_SERVICE'
curl 'http://localhost:8667/version' # Only if you set the 'ENABLE_QUERY_SERVICE'
```

:::note
For the next steps, proceed to [this Staking Guide](/docs/validators/staking-guide) to learn how to fund your validator and stake FRA.
:::