---
sidebar_position: 3
---

# Rialto Clients

import useBaseUrl from '@docusaurus/useBaseUrl';

## Rialto bridge frontend

Rialto Bridge (Mainnet): [rialtobridge.io](https://rialtobridge.io)

Rialto Bridge (Anvil Testnet): [anvil.rialtobridge.io](https://anvil.rialtobridge.io)

<img src={useBaseUrl("/img/evm/chainbridge.png")} width="80%" height="80%"/>

### Rialto bridge frontend config
To deploy a Rialto frontend, below json config file is a good example for Rialto (Anvil <--> BSC Testnet).

```
{
  chains: [
    {
      chainId: 0,
      networkId: 2153,
      name: "Anvil",
      decimals: 18,
      bridgeAddress: "0x84a229F67Ca03C4c1e7C3510F1904FA2C088F8D3",
      erc20HandlerAddress: "0xC44dCe1a28bEB953C730B9964e447f3A429F990b",
      rpcUrl: "https://prod-testnet.prod.findora.org:8545/",
      type: "Ethereum",
      nativeTokenSymbol: "FRA",
      tokens: [
        {
          address: "0x0000000000000000000000000000000000001000",
          name: "Findora",
          symbol: "FRA",
          imageUri: "FRAIcon",
          resourceId: "0x000000000000000000000000000000c76ebe4a02bbc34786d860b355f5000000",
        },
      ],
    },
    {
      chainId: 1,
      networkId: 97,
      name: "BSC-Testnet",
      decimals: 18,
      bridgeAddress: "0x57B76BF81771193548d4190B95c89edF256B8599",
      erc20HandlerAddress: "0xe2b65e624bBb5513fF805d225258D7A92b0f62C4",
      rpcUrl: "https://data-seed-prebsc-1-s1.binance.org:8545/",
      type: "Ethereum",
      nativeTokenSymbol: "BNB",
      tokens: [
        {
          address: "0x112aDd87C7D9cBB7568AEe4b3C1761A1e4385067",
          name: "FRA BEP20",
          symbol: "FRA",
          imageUri: "FRAIcon",
          resourceId: "0x000000000000000000000000000000c76ebe4a02bbc34786d860b355f5000000",
        },
      ],
    },
  ],
};
```

## Rialto bridge cli

### Build cb-sol-cli

We can also use the Rialto Bridge contract CLI to interact with the contracts. Grab and install the CLI by running:

```
git clone -b v1.0.3 --depth 1 https://github.com/FindoraNetwork/chainbridge-tools \
&& cd cb-sol-cli \
&& npm install \
&& make install
```

### Rialto bridge variables
In order to save typing effort, some CLI variables can be setup in the terminal.

```
export SRC_GATEWAY=https://prod-testnet.prod.findora.org:8545/
export DST_GATEWAY=https://data-seed-prebsc-1-s1.binance.org:8545/
export MY_PK="<your private key>"
export MY_ADDRESS="<your wallet address>"

export SRC_TOKEN="0x0000000000000000000000000000000000001000"
export RESOURCE_ID_FRA="0x000000000000000000000000000000c76ebe4a02bbc34786d860b355f5000000"

export SRC_BRIDGE="0x84a229F67Ca03C4c1e7C3510F1904FA2C088F8D3"
export SRC_HANDLER="0xC44dCe1a28bEB953C730B9964e447f3A429F990b"

export DST_BRIDGE="0x57B76BF81771193548d4190B95c89edF256B8599"
export DST_HANDLER="0xe2b65e624bBb5513fF805d225258D7A92b0f62C4"
export DST_TOKEN="0x112aDd87C7D9cBB7568AEe4b3C1761A1e4385067"
```


### Transfer using CLI (Anvil => BSC Testnet)

#### Approve
Approve the handler to spend tokens on our behalf (to transfer token to it self).

```
cb-sol-cli --url $SRC_GATEWAY --privateKey $MY_PK --gasPrice 10000000000 erc20 approve \
    --amount 10 \
    --erc20Address $SRC_TOKEN \
    --recipient $SRC_HANDLER
```
Note: Most ERC20 contracts use 18 decimal places. The amount specified will be encoded with the necessary decimal places. This can be configured with --decimals on the erc20 command.

#### Execute a deposit.
```
cb-sol-cli --url $SRC_GATEWAY --privateKey $MY_PK --gasPrice 10000000000 erc20 deposit \
    --amount 10 \
    --dest 1 \
    --bridge $SRC_BRIDGE \
    --recipient $MY_ADDRESS \
    --resourceId $RESOURCE_ID_FRA
```
The relayers will wait 3 block confirmations before processing the deposit request which may take a few minutes on Findora network.


### Transfer using CLI (BSC Testnet => Anvil)

#### Approve
Approve the handler on the destination chain to move tokens on our behalf (to burn them).
```
cb-sol-cli --url $DST_GATEWAY --privateKey $MY_PK --gasPrice 10000000000 erc20 approve \
    --amount 10 \
    --erc20Address $DST_TOKEN \
    --recipient $DST_HANDLER
```

#### Execute a deposit.
Transfer the FRA(BEP20) tokens back to the bridge. This should result in the locked tokens being freed on the source chain and returned to your account.
```
cb-sol-cli --url $DST_GATEWAY --privateKey $MY_PK --gasPrice 10000000000 erc20 deposit \
    --amount 10 \
    --dest 0 \
    --bridge $DST_BRIDGE \
    --recipient $MY_ADDRESS \
    --resourceId $RESOURCE_ID_FRA
```
