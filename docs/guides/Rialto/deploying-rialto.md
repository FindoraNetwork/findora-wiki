---
sidebar_position: 2
---

# Deploy Rialto Guide 

import useBaseUrl from '@docusaurus/useBaseUrl';

Findora Anvil and BSC testnet cross-chain.  

Testnet bridge: http://dev-chainbridge-new.s3-website-us-west-2.amazonaws.com/transfer

<img src={useBaseUrl("/img/evm/chainbridge.png")} width="50%" height="30%"/>

## Frontend Config
```
window.__RUNTIME_CONFIG__ = {
  CHAINBRIDGE: {
    chains: [
      {
        chainId: 0,
        networkId: 525,
        name: "findora-anvil",
        decimals: 18,
        bridgeAddress: "0x26925046a09d9AEfe6903eae0aD090be06186Bd9",
        erc20HandlerAddress: "0xE75Fb7714B5098E20A2D224693A1c210ad0c1A42",
        rpcUrl: "https://prod-testnet.prod.findora.org:8545/",
        type: "Ethereum",
        nativeTokenSymbol: "FRA",
        tokens: [
          {
            address: "0x0000000000000000000000000000000000001000",
            name: "Findora",
            symbol: "FRA",
            imageUri: "FRAIcon",
            resourceId:
            "0x000000000000000000000000000000c76ebe4a02bbc34786d860b355f5a5ce00",
          },
        ],
      },
      {
        chainId: 1,
        networkId: 97,
        name: "bsc-testnet",
        decimals: 18,
        bridgeAddress: "0xacB8C5D7be5B23644eCe55789Eb6aA6bd6C31e64",
        erc20HandlerAddress: "0x3e1066Ea99f2934e728D85b03BD72d1BbD61D2D4",
        rpcUrl: "https://data-seed-prebsc-1-s1.binance.org:8545/",
        type: "Ethereum",
        nativeTokenSymbol: "BNB",
        tokens: [
          {
            address: "0xa1238f3dE0A159Cd79d4f3Da4bA3a9627E48112e",
            name: "FRA BEP20",
            symbol: "FRA",
            imageUri: "FRAIcon",
            resourceId:
            "0x000000000000000000000000000000c76ebe4a02bbc34786d860b355f5a5ce00",
          },
        ],
      },
    ],
  },
};
```

## Lets test our bridge!

### cb-sol-cli

We will be using the Rialto Bridge contract CLI to deploy and interact with the contracts. Grab and install the CLI by running:

```
git clone -b v1.0.0 --depth 1 https://github.com/FindoraNetwork/chainbridge-tools \
&& cd chainbridge-deploy/cb-sol-cli \
&& npm install \
&& make install
```

### Rialto Bridge Vars
```
SRC_GATEWAY=https://prod-testnet.prod.findora.org:8545/
DST_GATEWAY=https://data-seed-prebsc-1-s1.binance.org:8545/

SRC_PK="<private key on Findora>"
DST_PK="<private key on BSC>"

SRC_TOKEN="0x0000000000000000000000000000000000001000"
RESOURCE_ID="0x000000000000000000000000000000c76ebe4a02bbc34786d860b355f5a5ce00"

SRC_BRIDGE="0x26925046a09d9AEfe6903eae0aD090be06186Bd9"
SRC_HANDLER="0xE75Fb7714B5098E20A2D224693A1c210ad0c1A42"

DST_BRIDGE="0xacB8C5D7be5B23644eCe55789Eb6aA6bd6C31e64"
DST_HANDLER="0x3e1066Ea99f2934e728D85b03BD72d1BbD61D2D4"
DST_TOKEN="0xa1238f3dE0A159Cd79d4f3Da4bA3a9627E48112e"
```

### Deposit token
#### Findora => BSC
Approve the handler to spend tokens on our behalf (to transfer them to the token safe).

```
cb-sol-cli --url $SRC_GATEWAY --privateKey $SRC_PK --gasPrice 10000000000 erc20 approve \
    --amount 100 \
    --erc20Address $SRC_TOKEN \
    --recipient $SRC_HANDLER
```
Note: Most ERC20 contracts use 18 decimal places. The amount specified will be encoded with the necessary decimal places. This can be configured with --decimals on the erc20 command.

##### Execute a deposit.
```
cb-sol-cli --url $SRC_GATEWAY --privateKey $SRC_PK --gasPrice 10000000000 erc20 deposit \
    --amount 10 \
    --dest 1 \
    --bridge $SRC_BRIDGE \
    --recipient 0x5849771139978fe0B3D52303d71D222a347e7CaB \
    --resourceId $RESOURCE_ID
```
The relayer will wait 3 block confirmations before submitting a request which may take a few minutes on the test network. Keep an eye on the target=XXXX output in the Rialto bridge relayer window.
The transfer will occur when this reaches the block height of the deposit transaction.

#### BSC => Findora

Approve the handler on the destination chain to move tokens on our behalf (to burn them).
```
cb-sol-cli --url $DST_GATEWAY --privateKey $DST_PK --gasPrice 10000000000 erc20 approve \
    --amount 10 \
    --erc20Address $DST_TOKEN \
    --recipient $DST_HANDLER
```
Transfer the wrapped tokens back to the bridge. This should result in the locked tokens being freed on the source chain and returned to your account.
```
cb-sol-cli --url $DST_GATEWAY --privateKey $DST_PK --gasPrice 10000000000 erc20 deposit \
    --amount 1 \
    --dest 0 \
    --bridge $DST_BRIDGE \
    --recipient 0x91388a75f30065f6F1D679541C6aDc2c3ade08A8 \
    --resourceId $RESOURCE_ID
```
