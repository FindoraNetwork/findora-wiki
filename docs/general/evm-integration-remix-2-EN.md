### Overview
Developers can also use Remix IDE to interact with Findora. Remix IDE is one of the most commonly used development environments for Ethereum smart contracts. It can provide network-based solutions to quickly compile and deploy Solidity and Vyper code on local VMs or external Web3 providers (such as MetaMask). By combining the two tools, developers can quickly start deployment on Findora。
### How to start using Remix
Now, we can start Remix to use more advanced features of Findora.

First, we open a new tab and enter https://remix.ethereum.org/ to open Remix. In the main screen, click Environments, select Solidity to configure Remix for Solidity development, and finally open the File Explorers screen, we need to create a new folder to store the Solidity smart contract. Click the "+" button under File Explorers, then enter "MyContract.sol in the pop-up window, and then paste the following smart contract to the pop-up editing window
```
pragma solidity ^0.7.5;

contract MyContract {
  //Your logic code
}
```

### Deploy contract
We will show how to use Remix to deploy smart contracts on Findora through the following basic contracts:

After the compilation is complete, we can go to the "Deploy & Run Transactions" tab. First, you need to set the environment to "Injected Web3.", you need to use the provider imported by MetaMask, and deploy the contract to the network connected to it through the provider. In this example, it is the Findora Devnet test network.

We will use a MetaMask account with an asset balance to deploy the contract. It can be recharged through our testnet faucet and then deployed on Findora Devnet. Next, enter Test Contract in the constructor and click "Deploy". MetaMask pop-up window will display transaction-related information, we need to click "confirm" to sign。

![remix-confirm](/img/evm/remix-confirm.png)

After the transaction is confirmed, the contract will appear in the "Deployed Contracts" column of Remix. From here, you can interact with the contract function.

![remix-deploy](/img/evm/remix-deploy.png)
