---
sidebar_position: 2
---

# Transfer

## Transfer Transaction

To send a transaction follow the steps below:

1. Go to the `Send` page, and fill out all input fields

![wallet12.png](/img/wallet/wallet12.png)

- `From` - the wallet address you will send tokens from
- `To` - the wallet address you will send tokens to
- `Asset Type` - pull-down menu showing all available asset types (i.e. tokens) you can send  
  Note: If you have created (or imported in) custom asset types into your wallet, then you will be able to select these custom assets. Else, you will only see a single option for `fra` tokens
- `Amount` - amount to send to recipient
- `Show or Hide Amounts on Ledger?` - By selecting `Hide Amounts`, the transfer becomes a confidential transfer and the amount will be masked on the transaction log of the public block explorer
- `Show or Hide Asset Type on Ledger?` - By selecting `Hide Asset Type`, the transfer becomes a confidential transfer and the asset type will be masked on the transaction log of the public block explorer

2. Click `Next` and a confirmation screen will appear
   ![wallet13.png](/img/wallet/wallet13.png)
3. Click `Submit` to complete transfer
   ![wallet14.png](/img/wallet/wallet14.png)
4. After submitting your transaction, you can view the public record of your transaction on any block explorer. Click `View Transaction` and you will be taken to Findora's own block explorer — findorascan.io.
   ![wallet15.png](/img/wallet/wallet15.png)

Note: This transaction log was for a confidential transaction with `Hide Amounts` and `Hide Asset Type`enabled. Thus, the amounts and asset type is masked with \*\*\* on the public log shown on the block explorer

## Transparent Transfer

Step 1: Sign in into your Findora wallet then click on the wallet name you want to make a transfer from.

![transfer](/img/transfers/c-transfers-1.png)

Step 2: Make sure you have enough balance for your transfer, then click on "Send".

![transfer](/img/transfers/c-transfers-2.png)

Step 3: In the next step, you should see a few input fields. - The "From" input field designates the wallet you're transferring from. - The "To" input field is where you enter the recipient's wallet address. - "Asset Type" refers to the asset that is being transferred - "Privacy Options" to choose whether to hide the asset type and amount.

![transfer](/img/transfers/c-transfers-3.png)

Step 4: In the "To" input field, copy and paste the recipient's address and please make sure that you have this correct

> Tip: If you are moving assets among different wallets saved on your Findora wallet application, you can click on the "Wallet Address" drop down on the side, and it will be automatically filled with the corresponding wallet address

Step 5: Enter the amount you want to transfer

![transfer](/img/transfers/c-transfers-4.png)

Step 6: Now we get to the more important part. To effectively do a transparent transfer, click on the "Show Amounts" to keep the amount transparent, and select "Show Asset Type" radio button to publicly show which asset you're transferring

![transfer](/img/transfers/t-transfers-1.png)

Step 7: Read the warning carefully and click on `I understand`

![transfer](/img/transfers/c-transfers-5.png)

Step 8: Review the transaction details and click on `Submit`

![transfer](/img/transfers/t-transfers-2.png)

Step 9: Click on "View Transaction" to get a detailed view of the status of the transaction

![transfer](/img/transfers/t-transfers-3.png)

That is how a transparent transfer is done. You can verify the transaction on the block explorer using the transaction hash generated.

## Confidential Transfer Guide

import useBaseUrl from '@docusaurus/useBaseUrl';

A confidential transfer is Findora’s engineered method of moving your assets between wallets with the privacy you need. Backed by industry-leading algorithms and safe from prying eyes, we are excited for what value this will provide for you. Below is a guide on how to do a confidential transfer using Findora Wallet application to hide the amount and/or asset type.

Step 1: Sign in into your Findora wallet then click on the wallet name you want to make a transfer from.

![transfer](/img/transfers/c-transfers-1.png)

Step 2: Make sure you have enough balance for your transfer, then click on "Send".

![transfer](/img/transfers/c-transfers-2.png)

Step 3: In the next step, you should see a few input fields. - The "From" input field designates the wallet you're transferring from. - The "To" input field is where you enter the recipient's wallet address. - "Asset Type" refers to the asset that is being transferred - "Privacy Options" to choose whether to hide the asset type and amount.

![transfer](/img/transfers/c-transfers-3.png)

Step 4: In the "To" input field, copy and paste the recipient's address and please make sure that you have this correct

> Tip: If you are moving assets among different wallets saved on your Findora wallet application, you can click on the "Wallet Address" drop down on the side, and it will be automatically filled with the corresponding wallet address

Step 5: Enter the amount you want to transfer

![transfer](/img/transfers/c-transfers-4.png)

Step 6: Now we get to the more important part. Select the appropriate choices for showing or hiding the amount and asset type based on your need of privacy for your transfer.

Step 7: Read the warning carefully and click on `I understand`

![transfer](/img/transfers/c-transfers-5.png)

Step 8: Review the transaction details and click on `Submit`

![transfer](/img/transfers/c-transfers-6.png)

Step 9: Click on "View Transaction" to get a detailed view of the status of the transaction

![transfer](/img/transfers/c-transfers-7.png)

Step 10: You can verify on the block explorer that the amount and asset type for this transaction are hidden as per your choice of inputs

![transfer](/img/transfers/c-transfers-8.png)

## Historical Transactions

- Choose the wallet you wish to view historical transactions for:
  ![wallet16.png](/img/wallet/wallet16.png)
- Historical transactions results will be displayed
  ![wallet17.png](/img/wallet/wallet17.png)
- If the historical transaction was masked, you will see `*****` over the masked data. You can unmask the data by clicking the icon to the right of the masked data
  ![wallet18.png](/img/wallet/wallet18.png)

![wallet19.png](/img/wallet/wallet19.png)

Masked Data Value

![wallet20.png](/img/wallet/wallet20.png)

Unmasked Data Value

- You can also view the transaction log data outside of the app by using a public block explorer. Clicking on the `Transaction Hash` link will open up your browser so you can view the same data from a public perspective. Masked data on a public block explorer (which is accessible by the general public) will stay masked.
