---
sidebar_position: 2
---
# Findora Wallet Guide

import useBaseUrl from '@docusaurus/useBaseUrl';

## Installing the Mac/Windows Wallet
The Findora wallet enables you to send and receive FRA tokens and even create your own custom assets. Findora provides wallet application for most of the popular operating systems across desktop and mobile. Currently, you can download and install Findora wallet on Mac, Windows, iOS and Android.

[Download the latest version of Findora Wallet](https://wallet.findora.org/)

[Download Wallet v0.3.2 for Mac](https://s3-us-west-2.amazonaws.com/wallet.findora.org/download/Findora_Wallet_Setup_0.3.2.dmg)

[Download Wallet v0.3.2 for Windows](https://s3-us-west-2.amazonaws.com/wallet.findora.org/download/Findora_Wallet_Setup_0.3.2.exe)

[Download Wallet Android APK](https://wallet.findora.org/download/FindoraWallet.apk)

## Wallet Basics

### Create Wallet

![wallet.png](/img/wallet/wallet.png)

Click the `Create Wallet` button and the app will display mnemonic "seed words" for you to write down and save for your own safe keeping — offline ideally.  
These mnemonic seed words are linked to a unique `private key` and wallet that the app will create and store for you inside the app.  
> Note: Store these "seed words" securely as they will never be shown again and there is no way to recover them.
                
![wallet1.png](/img/wallet/wallet1.png)
                
Click `Next` and enter in the seed words you saved earlier to verify you have securely saved the mnemonic seed words elsewhere.
            
![wallet2.png](/img/wallet/wallet2.png)
            
### Import Wallet
        
![wallet3.png](/img/wallet/wallet3.png)
        
Click `Import Wallet` to import a previously created private key (and related wallet address) into the app. Below are three ways to import your private keys:
1. `From Mnemonic`  
To import `From Mnemonic`, type in all Mnemonic seed words related to that private key. You should have recorded these seed words securely offline. 
![wallet4.png](/img/wallet/wallet4.png)
                    
2. `From KeyStore`  
To import `From KeyStore`, upload the KeyStore (which contains a private key inside) to the app. You will need to enter the password that was supplied with the KeyStore to complete the import process. 
![wallet5.png](/img/wallet/wallet5.png)
                    
3. `From Private Key`  
To import directly `From Private Key`, type in or paste in the private key value (i.e. a long string of random alphanumeric values). 
![wallet6.png](/img/wallet/wallet6.png)

### View Wallet
    
![wallet7.png](/img/wallet/wallet7.png)
    
The `My Wallet` screen lists all available wallet addresses managed by this app. Each wallet address is connected to a unique private key stored inside the app.  
Below the wallet name is the *wallet address*, which is a long string of random text and numbers. The *wallet address* is the account where you will receive FRA tokens (or other custom tokens). Give your *wallet address* to users who will be sending you tokens. You can get a copy of the wallet address via the two buttons below:
        
![wallet8.png](/img/wallet/wallet8.png)
        
The button on the left copies the wallet address to memory so you can paste into an email or text message to give to the sender  
The button the right opens a QR code which you can scan with your mobile phone camera to import the address into your phone  
To view a wallet's `Balance`, click on the wallet address and you will be taken to `Wallet Info` page. The default token type displayed is `fra`.
        
![wallet9.png](/img/wallet/wallet9.png)
        
To check the balance of other tokens stored with that specific wallet account, use the pull-down menu to change the token type (if they exist)
        
![wallet10.png](/img/wallet/wallet10.png)

### Export Privatekey
- Go to `My Wallet` ⇒ `Wallet Info` page and click `Export Private Key`

![wallet28.png](/img/wallet/wallet28.png)

- Enter your password and your private key will be displayed on screen

![wallet29.png](/img/wallet/wallet29.png)

## Send

### Transfer Transaction
    
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
            
Note: This transaction log was for a confidential transaction with `Hide Amounts` and `Hide Asset Type`enabled. Thus, the amounts and asset type is masked with *** on the public log shown on the block explorer

### Historical Transactions
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

## Manage Assets

### Define New Asset
- Creating a new asset requires you to first ***define*** the asset. Then, to complete the process of creating a new asset you must ***issue*** the asset (by specifying the number of units of that asset to issue). Please note, after you define the asset the number of units for that asset remains 0 and will remain 0 until you issue the asset.
        
![wallet21.png](/img/wallet/wallet21.png)
        
Below are the two steps needed to create a new asset:
1. Goto `Manage Assets` ⇒ `Define New Asset`  
   - Fill out the input fields on the `Define New Asset` page
   
![wallet22.png](/img/wallet/wallet22.png)
                
- `Asset Creator` - select the wallet address which will create the new asset
- `Asset Nickname` - enter a nickname for the asset (it can be edited later)
- `Asset Code` - this value is generated automatically by the system. You can consider this as your custom asset's unique token "ticker".
- `Asset Memo` - enter a description for your custom asset
- `Asset Decimals` - set the number of decimal places for your custom asset (up to 16 places)
- `Set a maximum # of assets to issue` - you can cap the number of units of the custom asset to a maximum value. For example, Bitcoin is capped at 21 million units by design.
                    
    Please note, if you specify a maximum number of assets to issue, the number of tokens you issue during the issuance phase will be shown on the public block explorer.
                    
    If you do not place a cap on the maximum number of assets to issue (i.e. an unlimited number of tokens can be issued for the custom asset), then you have the option of  showing or hiding the tokens you issue during the issuance phase on the public block explorer.
                    
- `Transferability Type` - You can prevent your custom asset from being transferred to another user. This is an early feature that is designed to work with our upcoming timed lockup features.  

    For example, in the future you will be able to set a custom asset as "non-transferrable" and specify a non-transferrable time period of 90 days — essentially creating a 90 day lockup to support a vesting schedule for the asset.
                    
   - Click `Define New Asset` and then `Confirm` to complete this part of the process
                    
<p align="center"><img src={useBaseUrl("/img/wallet/wallet23.png")} width="50%" height="50%"/></p>

<p align="center"><img src={useBaseUrl("/img/wallet/wallet24.png")} width="50%" height="50%"/></p>

                    
2. Goto `Manage Assets` ⇒ `Issue Asset`
   - Fill out the input fields on the `Issue Asset` page
                
![wallet25.png](/img/wallet/wallet25.png)
                
- `Asset Creator` - select the wallet which created the custom asset
- `Asset Nickname` - select from the list of custom assets that have been previously defined
- `Issuance Amount` - enter the number of tokens to create. If the token was defined with a maximum units restriction, you will not be able to create tokens beyond the maximum limit.
- `Show or Hide Amounts on Ledger?`  - choose whether the amounts will be shown or hidden for the assets to be issued
- Click `Confirm` to complete the process
                    
<p align="center"><img src={useBaseUrl("/img/wallet/wallet26.png")} width="50%" height="50%"/></p>

<p align="center"><img src={useBaseUrl("/img/wallet/wallet27.png")} width="50%" height="50%"/></p>

### Manage Custom Assets
- If you created your own custom assets earlier, you can manage these custom assets via the `Manage Assets` ⇒ `Manage` page

![wallet30.png](/img/wallet/wallet30.png)

- Manage your custom assets via the following commands:
  - `Save` - saves *all* custom asset data in the app to a text file on your computer. This data includes the asset code, nickname, wallet address that created asset, etc.)
  - `Open another file` - imports *all* custom asset data saved in a text file on your computer
  - `+ Add` - imports a *single* custom asset by manually inputting the relevant custom asset data
  - `Remove All` - removes all custom asset data from the app

## Settings
    
![wallet31.png](/img/wallet/wallet31.png)
    
- `Network` - select the network the app will interact with. Select the `Mainnet` network for normal use. Alternatively, you can choose one of the other network options for developer testing purposes.
- `Language` - select the display language for the entire app
