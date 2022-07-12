---
sidebar_position: 3
---

# Ledger Hardware Wallet

import useBaseUrl from '@docusaurus/useBaseUrl';

Hardware Wallets (also known as cold storage) are physical devices that are not connected your computer or to the internet directly and hence allows you to store private keys securely while also allowing you to access funds or do transactions with convenience. The Findora Smart Chain allows you to use a ledger device for storing and transferring the assets on the chain. Follow this demo below to understand how to do this. The device used in this demo is Nanoledger X, but any hardware wallet should work fine with similar steps.

## Connect your ledger to Metamask

Step 1: Select `Connect hardware wallet` in your Metamask settings dropdown

<p align="center"><img src={useBaseUrl("/img/guides/ledger-1.png")} width="50%" height="40%"/></p>

Step 2: Select your device type. We will use ledger for this demo.

<p align="center"><img src={useBaseUrl("/img/guides/ledger-2.png")} width="50%" height="40%"/></p>

:::note
Follow the onscreen instructions to unlock the ledger device and open the Ethereum application
:::

<p align="center"><img src={useBaseUrl("/img/guides/ledger-3.png")} width="50%" height="40%"/></p>

Step 3: Allow Metamask to connect to you hardware device

<p align="center"><img src={useBaseUrl("/img/guides/ledger-4.png")} width="50%" height="40%"/></p>

:::note
Make sure that any other applications (such as Ledger Live) which might be connected to your hardware wallet are closed
:::

Step 4: Once connected, unlock your account.

<p align="center"><img src={useBaseUrl("/img/guides/ledger-5.png")} width="50%" height="40%"/></p>

:::note
The unit shows up as ETH because we are using the Ethereum app, but this will not affect the actual transfers with the ledger
:::

Step 5: Verify your new Hardware wallet account on Findorascan

<p align="center"><img src={useBaseUrl("/img/guides/ledger-6.png")} width="50%" height="40%"/></p>

## Receive funds to your Ledger Address

Receiving funds to you ledger address would be the same process as any other transfer on the Findora EVM

- Setup the transfer and confirm

<p align="center"><img src={useBaseUrl("/img/guides/ledger-7.png")} width="50%" height="40%"/></p>

<p align="center"><img src={useBaseUrl("/img/guides/ledger-8.png")} width="50%" height="40%"/></p>

- Check the confirmed status on Metamask

<p align="center"><img src={useBaseUrl("/img/guides/ledger-9.png")} width="50%" height="40%"/></p>

- Verify that the transaction is successful on Findora EVM block explorer

<p align="center"><img src={useBaseUrl("/img/guides/ledger-10.png")} width="100%" height="40%"/></p>

## Sending funds from your Ledger Account

Step 1: Setup the transfer on Metamask

<p align="center"><img src={useBaseUrl("/img/guides/ledger-11.png")} width="50%" height="40%"/></p>

Step 2: Confirm the details and click continue

<p align="center"><img src={useBaseUrl("/img/guides/ledger-12.png")} width="50%" height="40%"/></p>

Step 3: Follow on screen instructions to plug your device and open Ethereum app

<p align="center"><img src={useBaseUrl("/img/guides/ledger-13.png")} width="50%" height="40%"/></p>

Step 4: The transaction should now pop up on your device

<p align="center"><img src={useBaseUrl("/img/guides/ledger-14.png")} width="50%" height="40%"/></p>

Step 5: Verify the transaction details

<img src={useBaseUrl("/img/guides/ledger-15.png")} width="50%" height="40%"/>

<img src={useBaseUrl("/img/guides/ledger-16.png")} width="50%" height="40%"/>

<img src={useBaseUrl("/img/guides/ledger-17.png")} width="50%" height="40%"/>

<img src={useBaseUrl("/img/guides/ledger-18.png")} width="50%" height="40%"/>

:::note
Since we are using the Ethereum app, the amounts show up as ETH, but do not worry the actual transfer would be in FRA
:::

Step 6: Approve the tx on the device by clicking both buttons together

<p align="center"><img src={useBaseUrl("/img/guides/ledger-19.png")} width="50%" height="40%"/></p>

Step 7: Check confirmed status on Metamask and Block Explorer

<p align="center"><img src={useBaseUrl("/img/guides/ledger-20.png")} width="50%" height="40%"/></p>

<p align="center"><img src={useBaseUrl("/img/guides/ledger-21.png")} width="100%" height="50%"/></p>
