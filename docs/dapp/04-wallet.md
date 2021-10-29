# Using Findora Wallet
The following versions of the wallet support `internal transfer` function, but only for the testnet, not the mainnet.

[Download Wallet For Mac](https://s3-us-west-2.amazonaws.com/wallet.findora.org/download/Findora_Wallet_Setup_0.2.1.dmg)

[Download Wallet For Windows](https://s3-us-west-2.amazonaws.com/wallet.findora.org/download/Findora_Wallet_Setup_0.2.1.exe)

## Connect to Testnet
Connet to the Forge (Findora Testnet), here is [Network Config](02-network.md#forge-testnet)

![wallet.png](/img/wallet/wallet32.png)

## Internal Transfer
The Findora Wallet can convert your `Native FRA` assets into `EVM-Compatible FRA` assets through the `internal transfer` function.  
`EVM-Compatible FRA` assets is used to pay the gas fee for dapps development.`Native FRA` and `EVM-Compatible FRA` are different forms of native tokens on the Findora network.  
They are essentially the same. All belong to the native tokens of the chain, and adopt the `burn-mint` mode to convert each other.

### Native FRA swap EVM-Compatible FRA

![wallet.png](/img/wallet/wallet33.png)

![wallet.png](/img/wallet/wallet34.png)

![wallet.png](/img/wallet/wallet35.png)

Check ethereum address balance on Metamask.

### EVM-Compatible FRA swap Native FRA

![wallet.png](/img/wallet/wallet36.png)

![wallet.png](/img/wallet/wallet37.png)

![wallet.png](/img/wallet/wallet38.png)

![wallet.png](/img/wallet/wallet39.png)

## Compatibility
### Web3 JSON-RPC protocol

- [x] eth_protocolVersion
- [x] eth_chainId
- [x] eth_accounts
- [x] eth_getBalance
- [x] eth_sendTransaction
- [x] eth_call
- [x] eth_coinbase
- [x] eth_gasPrice
- [x] eth_blockNumber
- [x] eth_getStorageAt
- [x] eth_getBlockByHash
- [x] eth_getBlockByNumber
- [x] eth_getTransactionCount
- [x] eth_getBlockTransactionCountByHash
- [x] eth_getBlockTransactionCountByNumber
- [x] eth_getCode
- [x] eth_sendRawTransaction
- [x] eth_estimateGas
- [x] eth_getTransactionByHash
- [x] eth_getTransactionByBlockHashAndIndex
- [x] eth_getTransactionByBlockNumberAndIndex
- [x] eth_getTransactionReceipt
- [x] eth_getLogs
- [ ] eth_hashrate
- [ ] eth_syncing
- [ ] eth_mining
- [ ] eth_getUncleCountByBlockHash
- [ ] eth_getUncleCountByBlockNumber
- [ ] eth_getUncleByBlockHashAndIndex
- [ ] eth_getUncleByBlockNumberAndIndex
- [ ] eth_getWork
- [ ] eth_submitWork
- [ ] eth_submitHashrate

### Precompile contracts
Address | Name | Features
--- | --- | ---
0x1 | ECRecover | ECDSA public key recovery
0x2 | SHA256 | SHA-2 256-bit hash function
0x3 | RIPEMD160 | RIPEMD 160-bit hash function
0x4 | Identity | Identity function
0x5 | ModExp | Big integer modular exponentiation
0x6 | BN128Add | Elliptic curve addition
0x7 | BN128Mul | Elliptic curve scalar multiplication
0x8 | BN128Pair | Elliptic curve pairing check








