---
sidebar_position: 3
--- 

# Request FRA Tokens Guide

To test the Findora suite of applications or get started with building on the Findora network, you can request to receive testnet tokens via our `Discord` bot:  `FindoraBot`.

## Request on Findora Smart Chain
Follow these steps to request FRA EVM test tokens from Discord faucet. Findora's Discord bot will handle your request.

Step 1: Go to [Findora Discord](https://discord.gg/8bdb8KHuaB)

Step 2: Go to `#faucet` channel on Findora's Discord

Step 3: FindoraBot will automatically detect commands requesting Testnet FRA EVM tokens. Specify the following command to send a request:

```
!evm 0x9c0700E390f0E9c98b894bF4Fc4d5c1Ac3e02D6B
```

![Discord](/img/evm/direct_evm_faucet.png) 

Make sure to use your own EVM-compatible Findora Smart Chain wallet address to receive the tokens, by replacing `0x9c0700E390f0E9c98b894bF4Fc4d5c1Ac3e02D6B`.
> Note: There must be a seperator (such as an empty space) between `!evm` and the address.

Alternatively, you can also send a private message to the `FindoraBot` if you do not want to reveal your 0x address on a public channel.

![Discord](/img/evm/discord_1.png)

### Check FRA EVM Balance
You will receive a message from the FindoraBot with the link to the transaction on the [Findora EVM block explorer for Anvil](https://testnet-anvil.evm.findorascan.io/). You can input your 0x address in the block explorer to check the balance and transaction history.

Alternatively, you can also check your FRA balance on the Findora Smart Chain using MetaMask. [Check this guide](/docs/components/findora-evm/metamask) on how to use MetaMask to connect to the Findora Anvil Testnet.

## Request on Findora Native Chain
Below are the steps to request Anvil testnet FRA tokens on the UTXO Chain.

Step 1: Go to [Findora Discord](https://discord.gg/8bdb8KHuaB)

Step 2: Go to `#faucet` channel on Findora's Discord

Step 3: FindoraBot will automatically detect commands requesting Testnet FRA EVM tokens. Specify the following command to send a request:

Bot Request Format:
```
!faucet <\wallet address> <\Will you run a validator? yes/no> > <\Are you a developer? yes/no>
```
Example:
```
!faucet fra19rtfg2g58x6jxxxxxxxxxxxxxxxxx example@gmail.com no no
```

> Note: You can only ask for FRA tokens once so make sure your receiving wallet address is correct.

### Check FRA UTXO Balance
You will receive a message from the FindoraBot with the link to the transaction on the [Findora Native block explorer for Anvil](https://prod-testnet.findorascan.io/). You can input your fra address in the block explorer to check the transaction history.

Alternatively, you can also check your FRA balance on the Findora Native Chain using Wallet application by connecting to Anvil testnet. Go to Settings > Manage to configure and switch to Anvil Network.