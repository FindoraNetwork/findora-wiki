# Overview

### Overview

The Findora EVM is based on the [Frontier](https://paritytech.github.io/frontier/) Ethereum compatibility layer — part of Polkadot's substrate framework. Therefore, smart contract programming languages (i.e. Solidity), tools (i.e. Remix IDE) and token specifications (i.e. ERC-20, ERC-721, etc.) from Ethereum's EVM platform are all compatible with the Findora EVM. 

The Findora EVM guides below will walk developers through setting up Findora EVM integration tools, deploying a Findora smart contract and launching FRC-20 tokens on Findora EVM.

Developers who deploy Ethereum's ERC-20 Solidity boilerplate code on the Findora EVM will, in effect, be creating FRC-20 tokens, which are Findora's version of ERC-20 tokens.

### Setting Up Findora EVM Devnet

Currently, developing on Findora EVM requires developers to connect to the Findora EVM Devnet. 

See the [EVM - Devnet Setup
](evm-integration.md) guide for details.

### Deploying a Contract

Generally speaking, Ethereum EVM-compatible tools will work on Findora EVM. Thus, the Truffle Development Suite, Remix IDE, Metamask Wallet and other EVM tools will be used to connect to and deploy smart contracts on Findora EVM. 

See the [EVM - Truffle
](evm-integration-truffle-EN.md) and  [EVM - Remix IDE](evm-integration-remix-2-EN.md) guide for details.

### Testing and Automation

Waffle is a library for compiling and testing smart contracts and Mars is a deployment manager. Waffle and Mars can be used together to write, compile, test, and deploy Ethereum smart contracts. 

See the [EVM - Waffle & Mars](evm-integration-Waffle&Mars-EN.md) guide for details.

Hardhat is an Ethereum development environment that helps developers manage and automate repetitive tasks for smart contract and DApp development, and can be used in the truffle project. 

See the [EVM - Hardhat](evm-integration-hardhat-EN.md) guide for details.

### Other Tools and Integrations

* [Web3.js](https://web3js.readthedocs.io/) is a set of libraries that allow developers to interact with Ethereum nodes using HTTP, IPC, or WebSocket protocols with JavaScript. Findora has an Ethereum-like API which is fully compatible with Ethereum-style JSON RPC invocations. Developers can use the web3.js library to interact with a Findora EVM node using the same process as with Ethereum.

* [Ethers.js](https://docs.ethers.io/v5/) is a set of tools to interact with Ethereum nodes using Javascript. Findora has an Ethereum-like API which is fully compatible with Ethereum-style JSON RPC invocations. Developers can use the Ethers.js library to interact with a Findora EVM node using the same process as with Ethereum.

* [Web3.py](https://web3py.readthedocs.io/) is a set of libraries that allow developers to interact with Ethereum nodes using HTTP, IPC, or WebSocket protocols with Python. Findora has an Ethereum-like API which is fully compatible with Ethereum-style JSON RPC invocations. Developers can use the Web3.py library to interact with a Findora EVM node using the same process as with Ethereum.

* [The Graph](https://thegraph.com/docs/about/introduction#what-the-graph-is) is an indexing protocol that organizes information so that applications can access data very efficiently -- similar to how Google indexes the entire internet to rapidly deliver information for user searches. The graph can be used to build indexes for rapid querying of blockchain network like Ethereum -- allowing Dapps to quickly access blockchain data.


### Blockchain Bridge

For developers who wish to move tokens from other Layer 1 blockchains, the Findora EVM Devnet support the [ChainSafe ChainBridge](https://github.com/ChainSafe/ChainBridge), an open source multi-directional blockchain bridge. ChainBridge enables an Ethereum Ropsten Testnet ERC-20 token to be moved to the Findora EVM Devnet as a FRC-20 token.