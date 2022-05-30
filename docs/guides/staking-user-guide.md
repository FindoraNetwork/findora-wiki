---
sidebar_position: 5
---

# Staking as a User

import useBaseUrl from '@docusaurus/useBaseUrl';

## User Guide to Staking on Findora

### Setup Findora Wallet

--------------------------

-   Go to the official [Findora Wallet website](https://wallet.findora.org/) and download the desktop wallet.

-   Detailed instructions can be found here: [My Wallet](https://app.gitbook.com/o/-MUwD0X_8WFGy_Ynx4KB/s/-MUwCujxrp_FzSUIgsZU-887967055/guides/wallet/my-wallet). If you are a new user, you can [Create Wallet](https://app.gitbook.com/o/-MUwD0X_8WFGy_Ynx4KB/s/-MUwCujxrp_FzSUIgsZU-887967055/guides/wallet/my-wallet/create-wallet), or you can [Import Wallet](https://app.gitbook.com/o/-MUwD0X_8WFGy_Ynx4KB/s/-MUwCujxrp_FzSUIgsZU-887967055/guides/wallet/my-wallet/import-wallet).

-   Please always make sure you back up the mnemonic/seed phrase of your wallet.

![](https://miro.medium.com/max/1400/0*OxuDSgatdIbj0THY)

### Get FRA tokens

--------------------

(1)Transfer FRA from an existing Findora wallet to your Findora Address: [Guide of Transparent Transfer](https://app.gitbook.com/o/-MUwD0X_8WFGy_Ynx4KB/s/-MUwCujxrp_FzSUIgsZU-887967055/guides/transfer/transparent-transfer). If you are a new user, then try steps (2)(3)(4)

![](https://files.gitbook.com/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F-MUwCujxrp_FzSUIgsZU-887967055%2Fuploads%2FvTzpmsUFZubudgpwcqTD%2Fimage.png?alt=media&token=104e23bb-0f28-44e2-8ddd-c05a74840ba0)

(2)if you don't own any FRA, you should buy from Kucoin or Gate.io first:[ Guide of How to Buy (Smart) FRA on KuCoin](https://medium.com/findorafoundation/tutorial-1-how-to-buy-smart-fra-on-kucoin-beneficial-to-findora-760190ebd483)​

(3)Transfer FRA(Smart) to EVM-compatible Wallet: [Guide of Withdraw (from KuCoin to Findora Smart Chain)](https://medium.com/findorafoundation/tutorial-2-how-to-withdraw-smart-fra-from-kucoin-to-metamask-beneficial-to-findora-66dfa7c92dee)​

-   Config Metamask for Findora Mainnet

> Network Name: Findora Mainnet
>
> RPC URL: [https://prod-mainnet.prod.findora.org:8545](https://prod-mainnet.prod.findora.org:8545/)​
>
> Chain ID: 2152
>
> Currency Symbol: FRABlock Explorer URL: [https://evm.findorascan.io](https://evm.findorascan.io/)

-   On BitKeep (mobile), choose Findora Smart Chain to hold (Smart) FRA privately (i.e. off-exchange)

![](https://files.gitbook.com/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F-MUwCujxrp_FzSUIgsZU-887967055%2Fuploads%2FnCdlnAxcpdlAgezeKjcd%2Fimage.png?alt=media&token=5f48d251-7597-4ec3-808a-6e7b41404b2f)

(4)Prism Transfer to convert smart tokens into FRA native token: [Guide of Prism Transfer](/o/-MUwD0X_8WFGy_Ynx4KB/s/-MUwCujxrp_FzSUIgsZU-887967055/guides/wallet/prism)

Go to the `Prism` page, and choose a transfer direction from EVM-compatible Wallet to Native Wallet by clicking the arrow icon.

![](https://miro.medium.com/max/700/0*lluDOL4k_37ocXei)

Congrats, you will successfully transfer FRA tokens from Kucoin to your Native Findora Wallet through steps (2)(3)(4)

### Stake

-----------

Go to the `Staking` page, and go to the "STAKE" tab to stake your FRA tokens: [Guide of Stake](/o/-MUwD0X_8WFGy_Ynx4KB/s/-MUwCujxrp_FzSUIgsZU-887967055/activity-guide/user-guide-to-staking-on-findora#cold-wallet)

-   Select a validator to delegate your FRA tokens to, you can check detailed info of a validator by clicking on the "View" button which directs you to [Findorascan.io](https://findorascan.io/nodes)

Enter the amount of the FRA tokens you wish to stake. When you click on the "Max" button, remember to reserve a minimum amount of FRA tokens to cover transaction fees

By clicking on the "STAKE" button, you agree to immediately bond your FRA tokens with the validator to earn FRA rewards.

Please carefully check the validator you choose, your delegated tokens are subject to slashing & penalties.

![](https://miro.medium.com/max/1280/0*RvPtOohMTSBHOmXE)

Stake FRA tokens

### UNSTAKE:

-   By clicking on the "UNSTAKE" button, you unbond your FRA tokens with the validator.

-   The unbonding period lasts 21 days. FRA that is in the process of being unbonded can not be traded on an exchange or sent to other users.

-   Your FRA tokens are still eligible for the block rewards and slashing risk during the unbonding period.

## FAQ

Q: Are there some useful links?

A:Go through Findora's staking model and rewards mechanism before you kickstart your conquest --- here's a list of useful links:

-   ​[Staking is Live on Findora Anvil Testnet](https://findora.org/2021/07/staking-is-live-on-findora-anvil-testnet/)​

-   ​[Findora Network Tokenomics](https://findora.org/2021/07/findora-network-tokenomics/)​

-   ​[Announcing Findora Frontier Program](https://findora.org/2021/07/announcing-findora-frontier-program/)​

-   ​[Node Setup Documentation](https://wiki.findora.org/docs/guides/auto-setup/)​

-   ​[Page ](https://findora.org/validators/)| [Wallet ](https://wallet.findora.org/)| [Explorer](https://findorascan.io/)​

Q: How are staking rewards generated?

A: To encourage FRA owners to participate in staking, the network has allocated 420m FRA (out of the 21 billion FRA maximum supply created) to pay out as block rewards. These 420m FRA will be used to reward all stakers with FRA rewards (i.e. additional FRAs) for participating in staking/consensus voting.

Q: What are validators and what role do they play in the Findora ecosystem? How are staking rewards generated and claimed?

A: Validators are the nodes that allow FRA owners to stake their FRA (and thus help secure the network's consensus voting process). The top 110 validators with the most FRA staked will participate in Findora's blockchain consensus process。

Q: What is the token economic model for Findora? What channels are available to obtain FRA tokens at this stage?

A: In summary, there are 2 FRA rewards and 2 FRA penalties:

-   Rewards include FRA rewards paid to all top 110 validators for each block and a Block Proposer Bonus (paid to the single validator that proposes a successful block)

-   Penalties include a 5% double-signing fee and an offline penalty (when your server is offline as a top 110 validator)

More details about Findora network tokenomics are here ⇒<https://findora.org/2021/07/findora-network-tokenomics/>​

You can purchase FRA on Gate.io or Kucoin.

Q: There are two key rules in Findora staking and token economy, one is dynamic block reward, and the other is the upper limit of voting rights, please introduce the design concept and principle of this set of rules.

A:

- Dynamic block rewards will adjust annual FRA rewards higher when the percentage of unlocked tokens staked is very low. When the percent staked is low, it is easier to perform a BFT-based attack, so increasing the reward rates during these conditions will motivate users to stake and bring the percent staked to a more secure level.