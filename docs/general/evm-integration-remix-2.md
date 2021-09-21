### 概览
开发者还可使用Remix IDE来与Findora进行交互。Remix IDE是以太坊智能合约最常用的开发环境之一，可提供基于网络的解决方案以实现在本地VM或外部Web3提供者（例如MetaMask）上快速编译和部署Solidity和Vyper代码。通过将两种工具结合，开发者可以快速启动在Findora上的部署。
### 如何开始使用Remix
现在，我们可以开始启动Remix来使用更多Findora的进阶功能。

首先我们开启一个新标签页，输入https://remix.ethereum.org/ 打开Remix。在主画面中，点击Environments，选取Solidity配置Remix来进行Solidity的开发，最后打开File Explorers的画面, 我们需要创建一个新的文件夹来储存Solidity智能合约。点击File Explorers下面的 “+” 按钮，接着在弹窗内输入 “MyContract.sol, 然后，将以下智能合约黏贴至弹出的编辑视窗
```
pragma solidity ^0.7.5;

contract MyContract {
  //你的逻辑代码
}
```

### 部署合约
我们将通过以下基础合约展示如何使用Remix在Findora上部署智能合约：

编译完成后，我们可以来到“Deploy & Run Transactions”标签下。首先需要将环境设置为"Injected Web3."，需要使用MetaMask导入的提供者，通过提供者把合约部署到与其相连的网络上，在本示例中为Findora Devnet 测试网。

我们将使用一个存有资产余额的MetaMask账户来部署合约。可以通过我们的测试网水龙头充值，然后在Findora Devnet上部署。接下来，在构造函数中输入Test Contract，然后点击“部署”。MetaMask弹窗将显示交易相关信息，我们需要点击“确认”进行签名。

![remix-confirm](/img/evm/remix-confirm.png)

交易确认后，合约将出现在Remix的“Deployed Contracts”栏目中。从这里即可与合约功能进行交互。

![remix-deploy](/img/evm/remix-deploy.png)
