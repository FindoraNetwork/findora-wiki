# Overview

## Overview

The Findora EVM is a Ethereum compatibility layer. Therefore, smart contract programming languages (i.e. Solidity), tools (i.e. Remix IDE) and token specifications (i.e. ERC-20, ERC-721, etc.) from Ethereum's EVM platform are all compatible with the Findora EVM. 

The Findora EVM guides below will walk developers through setting up Findora EVM integration tools, deploying a Findora smart contract and launching FRC-20 tokens on Findora EVM.

Developers who deploy Ethereum's ERC-20 Solidity boilerplate code on the Findora EVM will, in effect, be creating FRC-20 tokens, which are Findora's version of ERC-20 tokens.

### Setting Up Findora Testnet

Currently, developing on Findora EVM requires developers to connect to the Findora Forge Testnet. 

See the [Networks](02-network.md) guide for details.

### Writing and Deploying a Contract

IF you're an ethereum developer, you almost instantly can write and deploy contracts on the Findora EVM. All the best tools available for deploying on Ethereum work just as well here with no hitches and Findora supports most of them. 

Hardhat is an Ethereum development environment that helps developers manage and automate repetitive tasks for smart contract and DApp development. Truffle is like hardhat but on steroids. Leveraging Ganache, its local ethereum blockchain for testing contracts, Truffle allows you to develop dApps with scriptable migration and deployment, network management, an interactive console, smart contract management and even some automated contract testing.

Please look at the [Truffle](06-truffle.md), [Hardhat](07-hardhat.md), [Remix IDE](05-remix.md) guides for details.

### Testing and Automation

Waffle is a library for compiling and testing smart contracts and Mars is a deployment manager. Waffle and Mars can be used together to write, compile, test, and deploy Ethereum smart contracts. 

See the [Waffle & Mars](08-waffle-mars.md) guide for details.


### Other Tools and Integrations

* [Web3.js](https://web3js.readthedocs.io/) is a set of libraries that allow developers to interact with Ethereum nodes using HTTP, IPC, or WebSocket protocols with JavaScript. Findora has an Ethereum-like API which is fully compatible with Ethereum-style JSON RPC invocations. Developers can use the web3.js library to interact with a Findora EVM node using the same process as with Ethereum.

* [Ethers.js](https://docs.ethers.io/v5/) is a set of tools to interact with Ethereum nodes using Javascript. Findora has an Ethereum-like API which is fully compatible with Ethereum-style JSON RPC invocations. Developers can use the Ethers.js library to interact with a Findora EVM node using the same process as with Ethereum.

* [Web3.py](https://web3py.readthedocs.io/) is a set of libraries that allow developers to interact with Ethereum nodes using HTTP, IPC, or WebSocket protocols with Python. Findora has an Ethereum-like API which is fully compatible with Ethereum-style JSON RPC invocations. Developers can use the Web3.py library to interact with a Findora EVM node using the same process as with Ethereum.

* [The Graph](https://thegraph.com/docs/about/introduction#what-the-graph-is) is an indexing protocol that organizes information so that applications can access data very efficiently -- similar to how Google indexes the entire internet to rapidly deliver information for user searches. The graph can be used to build indexes for rapid querying of blockchain network like Ethereum -- allowing Dapps to quickly access blockchain data.


### Blockchain Bridge

For developers who wish to move tokens from other Layer 1 blockchains, the Findora EVM Devnet support the [ChainSafe ChainBridge](https://github.com/ChainSafe/ChainBridge), an open source multi-directional blockchain bridge. ChainBridge enables an Ethereum Ropsten Testnet ERC-20 token to be moved to the Findora EVM Devnet as a FRC-20 token.

See the [Chainbridge Integration](11-chainbridge.md) guide for details.
