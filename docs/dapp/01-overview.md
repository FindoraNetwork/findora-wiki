# Overview

## Overview

The Findora EVM is an Ethereum compatibility layer integrated with Findora's
existing UTXO ledger. It features full EVM compatibility which means it does not only support smart contract
programming languages such as Solidity, but also Web3 tools (e.g. Metamask, Truffle, Remix IDE, etc.) and token specifications (e.g. ERC-20, ERC-721, etc.). 
The two types of ledgers share the same consensus and storage layer. Additionally, a new type of atomic internal
transfer was implemented to solve the address type incompatibility issue between the EVM addresses and the
existing UTXO addresses. This allows users to own and control various assets on Findora with versatile approaches for programmable privacy.
It is a more seamless experience for the users and helps to aggregate the liquidity to Findora.  


[//]: # (TODO add a figure here.)

The Findora EVM guides below will walk developers through setting up Findora EVM integration tools,
deploying a Findora smart contract and launching FRC-20 tokens on Findora EVM.

Developers who deploy Ethereum's ERC-20 Solidity boilerplate code on the Findora EVM will, in effect, be creating FRC-20 tokens, which are Findora's version of ERC-20 tokens.

### Setting Up Findora Testnet

Currently, developing on Findora EVM requires developers to connect to the Findora Forge Testnet. 

See the [Networks](02-network.md) guide for details.

### Deploying a Contract

Generally speaking, Ethereum EVM-compatible tools will work on Findora EVM. Thus, the Truffle Development Suite, Remix IDE, Metamask Wallet and other EVM tools will be used to connect to and deploy smart contracts on Findora EVM. 

See the [Truffle](06-truffle.md) and  [Remix IDE](05-remix.md) guide for details.

### Testing and Automation

Waffle is a library for compiling and testing smart contracts and Mars is a deployment manager. Waffle and Mars can be used together to write, compile, test, and deploy Ethereum smart contracts. 

See the [Waffle & Mars](08-waffle-mars.md) guide for details.

Hardhat is an Ethereum development environment that helps developers manage and automate repetitive tasks for smart contract and DApp development, and can be used in the truffle project. 

See the [Hardhat](07-hardhat.md) guide for details.

### Other Tools and Integrations

* [Web3.js](https://web3js.readthedocs.io/) is a set of libraries that allow developers to interact with Ethereum nodes using HTTP, IPC, or WebSocket protocols with JavaScript. Findora has an Ethereum-like API which is fully compatible with Ethereum-style JSON RPC invocations. Developers can use the web3.js library to interact with a Findora EVM node using the same process as with Ethereum.

* [Ethers.js](https://docs.ethers.io/v5/) is a set of tools to interact with Ethereum nodes using Javascript. Findora has an Ethereum-like API which is fully compatible with Ethereum-style JSON RPC invocations. Developers can use the Ethers.js library to interact with a Findora EVM node using the same process as with Ethereum.

* [Web3.py](https://web3py.readthedocs.io/) is a set of libraries that allow developers to interact with Ethereum nodes using HTTP, IPC, or WebSocket protocols with Python. Findora has an Ethereum-like API which is fully compatible with Ethereum-style JSON RPC invocations. Developers can use the Web3.py library to interact with a Findora EVM node using the same process as with Ethereum.

* [The Graph](https://thegraph.com/docs/about/introduction#what-the-graph-is) is an indexing protocol that organizes information so that applications can access data very efficiently -- similar to how Google indexes the entire internet to rapidly deliver information for user searches. The graph can be used to build indexes for rapid querying of blockchain network like Ethereum -- allowing Dapps to quickly access blockchain data.


### Blockchain Bridge

For developers who wish to move tokens from other Layer 1 blockchains, the Findora EVM Devnet support the [ChainSafe ChainBridge](https://github.com/ChainSafe/ChainBridge), an open source multi-directional blockchain bridge. ChainBridge enables an Ethereum Ropsten Testnet ERC-20 token to be moved to the Findora EVM Devnet as a FRC-20 token.

See the [Chainbridge Integration](11-chainbridge.md) guide for details.
