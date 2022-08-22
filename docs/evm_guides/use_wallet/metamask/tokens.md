---
sidebar_position: 2
---

# FRC20 Token Contracts

This document lists the smart contract addresses for FRC20 tokens that were bridged over from an EVM-compatible chain (like Ethereum or BNB Smart Chain) to Findora.

The contract symbol's suffix (i.e. ".e", ".b", etc.)  represents which chain the token was bridged from. For example, `WBTC.e` is a `Wrapped BTC` token that originally existed on Ethereum as `WBTC`, was bridged over to Findora and now exists on Findora as `WBTC.e`.

You need to import these contract addresses into Metamask to view these tokens in Metamask. Select `Import tokens -> Custom Token` in your Metamask browser extension and paste in the contract address into Metamask.

![Docusaurus](/img/evm/metamask-import-token.png)


## FRC20 token contracts for Findora mainnet

| Contract Symbol | Contract Location | Contract Address                           | Source Symbol | Source Location | Source Address                             |
| --------------- | ----------------- | ------------------------------------------ | ------------- | --------------- | ------------------------------------------ |
| FRA             | Findora           | 0x0000000000000000000000000000000000001000 | ---           | ---             | ---                                        |
| FRA             | BSC               | 0x9c9fC8739b4532B1A9263047eFD11e416a6D8eE7 | FRA           | Findora         | 0x0000000000000000000000000000000000001000 |
| FRA             | Ethereum          | 0x4D8C45734d2f1103054929C13D2275e5FB0ABEce | FRA           | Findora         | 0x0000000000000000000000000000000000001000 |
| WETH.b          | Findora           | 0x008A628826E9470337e0Cd9c0C944143A83F32f3 | ETH           | BSC             | 0x2170ed0880ac9a755fd29b2688956bd959f933f8 |
| WBNB.b          | Findora           | 0xABc979788c7089B516B8F2f1b5cEaBd2E27Fd78b | WBNB          | BSC             | 0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c |
| USDT.b          | Findora           | 0x93EDFa31D7ac69999E964DAC9c25Cd6402c75DB3 | USDT          | BSC             | 0x55d398326f99059ff775485246999027b3197955 |
| USDC.b          | Findora           | 0xdA33eF1A7b48beBbF579eE86DFA735a9529C4950 | USDC          | BSC             | 0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d |
| BUSD.b          | Findora           | 0xE80EB4a234f718eDc5B76Bb442653827D20Ebb2d | BUSD          | BSC             | 0xe9e7cea3dedca5984780bafc599bd69add087d56 |
| WBTC.b          | Findora           | 0x07EfA82E00E458ca3D53f2CD5B162e520F46d911 | BTCB          | BSC             | 0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c |
| WETH.e          | Findora           | 0xaFfAac009Af35d6069E79Ef3763A39A2BA5BF65f | WETH          | Ethereum        | 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2 |
| USDT.e          | Findora           | 0x0632baa26299C9972eD4D9AfFa3FD057A72252Ff | USDT          | Ethereum        | 0xdAC17F958D2ee523a2206206994597C13D831ec7 |
| USDC.e          | Findora           | 0x2e8079E0fE49626AF8716fC38aDEa6799065D7f7 | USDC          | Ethereum        | 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48 |
| WBTC.e          | Findora           | 0x38f9dA0D8A84Ad841281080Ad4a2D9D89Eff3bFf | WBTC          | Ethereum        | 0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599 |

## FRC20 token contracts for Anvil testnet

| Contract Symbol | Contract Location | Contract Address                           | Source Symbol | Source Location | Source Address                             |
| --------------- | ----------------- | ------------------------------------------ | ------------- | --------------- | ------------------------------------------ |
| FRA             | Anvil Testnet     | 0x0000000000000000000000000000000000001000 | ---           | ---             | ---                                        |
| FRA             | BSC Testnet       | 0x112aDd87C7D9cBB7568AEe4b3C1761A1e4385067 | FRA           | BSC Testnet     | 0x0000000000000000000000000000000000001000 |
| WETH.b          | Anvil Testnet     | 0x55FffA139Ee21DC7f019Bcb37E82Da6b0cb5b33E | ETH           | BSC Testnet     | 0x2170ed0880ac9a755fd29b2688956bd959f933f8 |
| WBNB.b          | Anvil Testnet     | 0x35bb3eC08C20C549F866bef6a39E9Ab02d609609 | WBNB          | BSC Testnet     | 0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c |
| USDT.b          | Anvil Testnet     | 0x1627667F7E7d9d16487f865936e5d82b5342B720 | USDT          | BSC Testnet     | 0x55d398326f99059ff775485246999027b3197955 |
| USDC.b          | Anvil Testnet     | 0xafB9A1ddAe24cc9c2A86E58a5b45b6AF370f4d36 | USDC          | BSC Testnet     | 0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d |
| BUSD.b          | Anvil Testnet     | 0x3B981f3bB20cb3179ecF77A3974d4F144b2acD61 | BUSD          | BSC Testnet     | 0xe9e7cea3dedca5984780bafc599bd69add087d56 |
| WBTC.b          | Anvil Testnet     | 0xbbb9d97e925922EDFcBc9B7dE0E8e1092383D096 | BTCB          | BSC Testnet     | 0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c |

# FRC721 Token Contracts

## FRC721 token contracts for Findora mainnet

| Contract Symbol | Contract Location | Contract Address                           | Source Symbol | Source Location | Source Address                             |
| --------------- | ----------------- | ------------------------------------------ | ------------- | --------------- | ------------------------------------------ |
| BHERO.b         | Findora           | 0x6f0D407EDE162BD873782D4DF5e165716821BDf3 | BHERO         | BSC             | 0x30Cc0553F6Fa1fAF6d7847891b9b36eb559dC618 |
| ERANFT.b        | Findora           | 0xA5Aac0284dA9320954845E5F7604bA2bf8987A19 | ERANFT        | BSC             | 0x07D971C03553011a48E951a53F48632D37652Ba1 |
| KWNFT.b         | Findora           | 0x9A8bF6100c6B50f55926eF3149B7fDCf495a6d14 | KWNFT         | BSC             | 0x88cc39d52890Cde1108a9F05B0E5F1919d4AaB88 |
| DIGGER.b        | Findora           | 0xa396326f572e7c1C146ee2382C9456bC79faC198 | DIGGER        | BSC             | 0xf97Cde20E9208bD859ACDe7FD36Ece8657642734 |
| P12NFT.b        | Findora           | 0xE79227b42D10e24372d7b7CBb5C629D09A673549 | P12NFT        | BSC             | 0xb034d6bA0b6593Fa5107C6a55042b67746d44605 |
| NFTA.b          | Findora           | 0x25A18c6fC8a821c4A30d9fEc8582cb1A6313Af56 | NFTA          | BSC             | 0x76f9F2b04B5f3F5baD0c3C6a92e994b173F5363E |
| MKPNFT.b        | Findora           | 0x1e78Da1Ad2D6beD90618F0D1E494bf26F7cf433B | MKPNFT        | BSC             | 0x6BDcFcA87765d14f36e99943fC5d82c2292f8b5D |
| APESNEAKER.b    | Findora           | 0x307369F72eA99147549d60837D09e4E5903C5292 | APESNEAKER    | BSC             | 0x0F895e307b250d9D2a4b6D448EE0C02764902189 |
| Sneaker.b       | Findora           | 0x15765b041Af6B399fe63141914fC34859c40F8FE | Sneaker       | BSC             | 0xcC39F4105261a55457919AB0538D0Ce1E0063444 |
| SNFT.b          | Findora           | 0x2ac65a9721453BB98a7a907dbdc80292Aa5F04fE | SNFT          | BSC             | 0x69D60ad11fEB699fE5fEEeB16AC691dF090bfd50 |
