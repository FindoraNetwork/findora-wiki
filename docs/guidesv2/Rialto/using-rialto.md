---
sidebar_position: 1
---

# How to Use Rialto Guide


import useBaseUrl from '@docusaurus/useBaseUrl';

If you're an Ethereum developer then you're well on the path to being a Findora developer. And for your deposited on another protocol, the Rialto bridge exists to ensure that you can move them securely and safely. 

## How to use the Rialto Bridge

The Rialto Bridge is composed of a set of contracts that help to move assets across protocols and blockchain safely and securely. Before you bridge, please make sure you have enough funds to cover the transaction and associated fees. The first step is to connect Rialto Bridge to your wallet
The second step is where the bridging occurs, where you select amount of asset to bridge and the destination. Let's get into it.

### Connect Rialto Bridge to Wallet

First head to the Rialto bridge (on Anvil testnet) at [anvil.rialtobridge.io](https://anvil.rialtobridge.io/) and click on `Connect Wallet`. 

<img src={useBaseUrl("/img/evm/rialto-explainer-1.png")} width="80%" height="40%"/>

Your wallet provider will ask you for rights to connect your wallet to the bridge 


<img src={useBaseUrl("/img/evm/rialto-explainer-2.png")} width="80%" height="40%"/>

If that was successful, you should see this screen and we're good.

<img src={useBaseUrl("/img/evm/rialto-explainer-3.png")} width="80%" height="40%"/>

### Bridging across Networks

<img src={useBaseUrl("/img/evm/rialto-explainer-4.png")} width="80%" height="40%"/>

1. In the input field for `Enter amount to send`, please specify the amount of Tokens you want to send. When you do that, the balance of Tokens will show just above it.

2. Choose the destination protocol from the `Destination Network` input field

3. Put in the destination network address into the `Desination Address` input field, and if the information is correct, click on the "i want to send funds to my address" checkbox to get going

4. Final step is to click on the "Start Transfer" button to initiate.

You can view the transfer status and FRA balance on 

```
    https://testnet.bscscan.com/
```


