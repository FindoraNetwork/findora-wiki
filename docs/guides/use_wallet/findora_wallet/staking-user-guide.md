---
sidebar_position: 3
---

# Staking

import useBaseUrl from '@docusaurus/useBaseUrl';

## User Guide to Staking on Findora

### Setup Findora Wallet

- Go to the official [Findora Wallet website](https://wallet.findora.org/) and download the desktop wallet.

- Detailed instructions can be found here: [Findora Wallet Guide](/docs/guides/use_wallet/findora_wallet/walletbasic). If you are a new user, you can [Create Wallet](/docs/guides/use_wallet/findora_wallet/walletbasic#create-wallet), or you can [Import Wallet](/docs/guides/use_wallet/findora_wallet/walletbasic#import-wallet).

- Please always make sure you back up the mnemonic/seed phrase of your wallet.

### Get FRA tokens

1. Transfer FRA from an existing Findora wallet to your Findora Address: [Guide of Transparent Transfer](/docs/guides/use_wallet/findora_wallet/transfer#transparent-transfertrans).

![](/img/transfers/c-transfers-4.png)

2. If you don't own any FRA, you should buy from Kucoin or Gate.io first:[ Guide of How to Buy (Smart) FRA on KuCoin](/docs/guides/get_fra/buy_fra)​

3. Transfer FRA (Smart) to EVM-compatible Wallet: [Guide of Withdraw from KuCoin to Findora Smart Chain](https://medium.com/findorafoundation/tutorial-2-how-to-withdraw-smart-fra-from-kucoin-to-metamask-beneficial-to-findora-66dfa7c92dee)​

   - Config Metamask for Findora Mainnet. [Check this guide](/docs/guides/use_wallet/metamask/condiguration) on how to use MetaMask. [Visit this page](/docs/network) for the latest Mainnet Network Info.

   - To hold (Smart) FRA privately (i.e. off-exchange), you can use BitKeep (mobile) and choose Findora Smart Chain in the menu

4. Use Prism Transfer to convert smart tokens into FRA native tokens: [Guide of Prism Transfer](/docs/guides/use_wallet/findora_wallet/prism-user-guide)

![](https://miro.medium.com/max/700/0*lluDOL4k_37ocXei)

Congrats, you have successfully transferred FRA tokens from Kucoin to your Native Findora Wallet through steps (2)(3)(4)

### Stake

1. Go to the `Staking` page on Wallet, and go to the "STAKE" tab to stake your FRA tokens

2. Select a validator to delegate your FRA tokens to. You can check detailed info of a validator by clicking on the "View" button which directs you to [List of Validators](https://findorascan.io/nodes)

3. Enter the amount of the FRA tokens you wish to stake. If you click on the "Max" button, remember to reserve some amount of FRA tokens to cover transaction fees.

4. By clicking on the "STAKE" button, you agree to immediately bond your FRA tokens with the validator to earn FRA rewards. Please carefully check the validator you choose, your delegated tokens are subject to slashing & penalties.

![](https://miro.medium.com/max/1280/0*RvPtOohMTSBHOmXE)

<em>Stake FRA tokens</em>

### Unstake

- By clicking on the "UNSTAKE" button, you unbond your FRA tokens with the validator.

- The unbonding period lasts 21 days. FRA that is in the process of being unbonded can not be traded on an exchange or sent to other users.

- Your FRA tokens are still eligible for the block rewards and slashing risk during the unbonding period.

## Frequently Asked Questions (FAQ)

1. Are there some useful links to learn about Staking on Findora?

   Go through Findora's staking model and rewards mechanism before you kickstart your conquest --- here's a list of useful links:

   - ​[Staking is Live on Findora Anvil Testnet](https://findora.org/2021/07/staking-is-live-on-findora-anvil-testnet/)​

   - ​[Findora Network Tokenomics](https://findora.org/2021/07/findora-network-tokenomics/)​

   - ​[Announcing Findora Frontier Program](https://findora.org/2021/07/announcing-findora-frontier-program/)​

   - ​[Node Setup Documentation](https://wiki.findora.org/docs/guides/auto-setup/)​

   - ​[Page ](https://findora.org/validators/)| [Wallet ](https://wallet.findora.org/)| [Explorer](https://findorascan.io/)​

2. How are staking rewards generated?

   To encourage FRA owners to participate in staking, the network has allocated 420m FRA (out of the 21 billion FRA maximum supply created) to pay out as block rewards. These 420m FRA will be used to reward all stakers with FRA rewards (i.e. additional FRAs) for participating in staking/consensus voting.

3. What are validators and what role do they play in the Findora ecosystem? How are staking rewards generated and claimed?

   Validators are the nodes that allow FRA owners to stake their FRA (and thus help secure the network's consensus voting process). The top 110 validators with the most FRA staked will participate in Findora's blockchain consensus process。

4. What is the token economic model for Findora? What channels are available to obtain FRA tokens at this stage?

   [Check this article](https://findora.org/2021/07/findora-network-tokenomics/) for more details about Findora tokenomics. In summary, there are 2 FRA rewards and 2 FRA penalties:

   - Rewards include FRA rewards paid to all top 110 validators for each block and a Block Proposer Bonus (paid to the single validator that proposes a successful block)

   - Penalties include a 5% double-signing fee and an offline penalty (when the server is offline as a top 110 validator)

   You can purchase FRA from any exchange listed on [this page](https://coinmarketcap.com/currencies/findora/markets/)

5. There are two key rules in Findora staking and token economy, one is dynamic block reward, and the other is the upper limit of voting rights, please introduce the design concept and principle of this set of rules.

   Dynamic block rewards will adjust annual FRA rewards higher when the percentage of unlocked tokens staked is very low. When the percent staked is low, it is easier to perform a BFT-based attack, so increasing the reward rates during these conditions will motivate users to stake and bring the percent staked to a more secure level.
