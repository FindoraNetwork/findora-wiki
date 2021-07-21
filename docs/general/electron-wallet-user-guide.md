---
sidebar_position: 2
---
# Findora Wallet User Guide

## Key Features (Quick Start)
### `Create` or `Import` Wallet 

    ![Docusaurus](/img/electron_wallet_user_guide/wallet_guide1.jpg)

### `Create Wallet`
  - Click the `Create Wallet` button and the app will display mnemonic "seed words" for you to write down and save for your own safe keeping — offline ideally. 
    - These mnemonic seed words are linked to a unique `private key` and wallet that the app will create and store for you inside the app. 
    - Store these "seed words" securely as they will never be shown again and there is no way to recover them.

        ![Docusaurus](/img/electron_wallet_user_guide/wallet_guide1.jpg)

 - Click `Next` and enter in the seed words you saved earlier to verify you have securely saved the mnemonic seed words elsewhere.

### `Import Wallet`
![Docusaurus](/img/electron_wallet_user_guide/wallet_guide1.jpg)
  - Click `Import Wallet` to import a previously created private key (and related wallet address) into the app. Below are three ways to import your private keys:
    - Option 1) `From Mnemonic`
      - To import `From Mnemonic`, type in all Mnemonic seed words related to that private key. You should have recorded these seed words securely offline.
      ![Docusaurus](/img/electron_wallet_user_guide/wallet_guide1.jpg)
    - Option 2) `From KeyStore`
      To import `From KeyStore`, upload the KeyStore (which contains a private key inside) to the app. You will need to enter the password that was supplied with the KeyStore to complete the import process.
      ![Docusaurus](/img/electron_wallet_user_guide/wallet_guide1.jpg)
    - Option 3) From Private Key
      - To import directly `From Private Key`, type in or paste in the private key value (i.e. a long string of random alphanumeric values).
      ![Docusaurus](/img/electron_wallet_user_guide/wallet_guide1.jpg)

### View wallet address and balance (`My Wallet` page)
![Docusaurus](/img/electron_wallet_user_guide/wallet_guide1.jpg)
- The `My Wallet` screen lists all available wallet addresses managed by this app. Each wallet address is connected to a unique private key stored inside the app.
- Below the wallet name is the _wallet address_, which is a long string of random text and numbers. The _wallet address_ is the account where you will receive FRA tokens (or other custom tokens). Give your _wallet address_ to users who will be sending you tokens. You can get a copy of the wallet address via the two buttons below:
![Docusaurus](/img/electron_wallet_user_guide/wallet_guide1.jpg)
  - The button on the left copies the wallet address to memory so you can paste into an email or text message to give to the sender 
  - The button the right opens a QR code which you can scan with your mobile phone camera to import the address into your phone

- To view a wallet's `Balance`, click on the wallet address and you will be taken to `Wallet Info` page. The default token type displayed is `fra`. 
![Docusaurus](/img/electron_wallet_user_guide/wallet_guide1.jpg)

- To check the balance of other tokens stored with that specific wallet account, use the pull-down menu to change the token type (if they exist)
![Docusaurus](/img/electron_wallet_user_guide/wallet_guide1.jpg)


---
## Other Features