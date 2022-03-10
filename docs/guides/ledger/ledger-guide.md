---
sidebar_position: 3
---
# Using Ledger on Findora EVM

import useBaseUrl from '@docusaurus/useBaseUrl';

The Findora Evm allows you to use a ledger device for storing and trasfering FRA . We will use a Nanoledger X , for the demo but any device should work fine .
  
## Connect your ledger to metamask

- Select `Connect hardware wallet` in your metamask settings dropdown

<img src={useBaseUrl("/img/guides/ledger-1.png")} width="50%" height="40%"/>

- Select you device type , We will use ledger for this demo

<img src={useBaseUrl("/img/guides/ledger-2.png")} width="50%" height="40%"/>

:::note 
Follow the onscreen instructions to unlock the ledger device and open the Ethereum application
:::
<img src={useBaseUrl("/img/guides/ledger-3.png")} width="50%" height="40%"/>

- Allow metamask to connect to you HD device

<img src={useBaseUrl("/img/guides/ledger-4.png")} width="50%" height="40%"/>

:::note 
In this step make sure that ,any other applications( such as Ledger Live) which might connect to your hardware wallet should be closed.
:::

- Once connected, unlock an account.

<img src={useBaseUrl("/img/guides/ledger-5.png")} width="50%" height="40%"/>

:::note 
The unit shows up as ETH becuase we are using the EThereum app , but this will not affect the actual transfersledger
:::

- Verify your new Hardware wallet account on Findorascan

<img src={useBaseUrl("/img/guides/ledger-6.png")} width="50%" height="40%"/>


## Receive funds on your Ledger address

Receiving funds to you ledger address would be the same process as any other trasfer on the findora evm

- Setup the transfer and confirm

<img src={useBaseUrl("/img/guides/ledger-7.png")} width="60%" height="40%"/>

<img src={useBaseUrl("/img/guides/ledger-8.png")} width="60%" height="40%"/>

- Check confirmed status on Metamask and Block Explorerr

<img src={useBaseUrl("/img/guides/ledger-9.png")} width="50%" height="40%"/>

<img src={useBaseUrl("/img/guides/ledger-10.png")} width="50%" height="40%"/>

## Sending funds from your Ledger Account

- Setup the transfer

<img src={useBaseUrl("/img/guides/ledger-11.png")} width="50%" height="40%"/>

- Confirm and click continue

<img src={useBaseUrl("/img/guides/ledger-12.png")} width="50%" height="40%"/>

- Note: Follow on screen instructions to plug your device and open ethereum app

<img src={useBaseUrl("/img/guides/ledger-13.png")} width="50%" height="40%"/>

- The transaction should now pop up on your device

<img src={useBaseUrl("/img/guides/ledger-14.png")} width="50%" height="40%"/>

- Verify the tx details

<img src={useBaseUrl("/img/guides/ledger-15.png")} width="60%" height="40%"/>

<img src={useBaseUrl("/img/guides/ledger-16.png")} width="60%" height="40%"/>

<img src={useBaseUrl("/img/guides/ledger-17.png")} width="60%" height="40%"/>

<img src={useBaseUrl("/img/guides/ledger-18.png")} width="60%" height="40%"/>

:::note
The amounts show up as ETH only becuase its the Ethereum app ,but the actuall transfer is in FRA
:::

- Approve the tx on the device by clicking both buttons together

<img src={useBaseUrl("/img/guides/ledger-19.png")} width="50%" height="40%"/>

- Check confirmed status on Metamask and Block Explorer

<img src={useBaseUrl("/img/guides/ledger-20.png")} width="60%" height="40%"/>

<img src={useBaseUrl("/img/guides/ledger-21.png")} width="100%" height="50%"/>