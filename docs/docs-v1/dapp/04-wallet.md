# Using Findora Wallet
The following versions of the wallet support `internal transfer` function, but only for the testnet, not the mainnet.

[Download Wallet For Mac](https://s3.us-west-2.amazonaws.com/testnet-wallet.findora.org/Findora_Wallet_Setup_0.3.0.dmg)

[Download Wallet For Windows](https://s3.us-west-2.amazonaws.com/testnet-wallet.findora.org/Findora_Wallet_Setup_0.3.0.exe)

Go to the [Wallet Guides](/docs/wallet/wallet_guides) for details.

## Connect to Testnet
<<<<<<< HEAD:docs/docs-v1/dapp/04-wallet.md
Connect to the Anvil (Findora Testnet), here is [Network Config](02-network.md#forge-testnet)
=======
Connect to the Forge (Findora Testnet), here is [Network Config](02-network.md#forge-testnet)
>>>>>>> main:docs/dapp/04-wallet.md

![wallet.png](/img/wallet/wallet32.png)

## Prism

Within the Findora Wallet, you can perform a swap between `Native FRA` assets to `EVM-Compatible FRA` assets. `EVM-compatible FRA` tokens are best suited for dApp development and transactions on the Findora EVM. The Native and EVM-Compatible FRA tokens are swapped in a 1:1 ratio using a `burn-mint` function.

### Swap from Native FRA to EVM-Compatible FRA Assets

First step is to click on the Prism section of the sidebar. In the Native Wallet section then place the address of the wallet into the EVM-compatible wallet field. The amount goes right under too.

![wallet.png](/img/wallet/wallet33.png)

Click on "Next" and a side bar should slide in. Review the values and hit "Submit" if they're correct.

![wallet.png](/img/wallet/wallet34.png)

Your transaction is submitted. You can get a look at it with the "View Tranasction" button

![wallet.png](/img/wallet/wallet35.png)

And that is all! Check ethereum address balance on Metamask.

### Swap from EVM-Compatible FRA to Native FRA Assets

The reverse is the case for moving FRA tokens from their EVM-compatible variant to the native one, and the screenshots show how it works

![wallet.png](/img/wallet/wallet36.png)

![wallet.png](/img/wallet/wallet37.png)

![wallet.png](/img/wallet/wallet38.png)

![wallet.png](/img/wallet/wallet39.png)
