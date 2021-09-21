---
sidebar_position: 13
---
# EVM - Truffle (CH)


### 概览：
   为帮助更多开发者在Findora上进行部署, 本教程将全程指导您进行truffle box设置, 并且在独立Findora节点使用Truffle来部署合约。
   
#### 先决条件
   本教程操作需安装Node.js，您可通过[Node.js](https://nodejs.org/)下载或自行运行以下代码完成安装。
   您可以通过请求每个安装包的版本来验证是否安装正确：
```
   node -v
```
```
   npm -v
```
#### 安装truffle:
   接下来，我们可以安装Truffle。执行以下指令即可进行安装：
```
   npm install -g truffle
```

#### 使用Truffle创建工程
   如果您已经全面安装了Truffle，执行一下操作步骤来进行Truffle 项目的新建和运行：<br/>
   
1.新建项目文件夹，并进入项目目录
```
mkdir findora-truffle && cd findora-truffle
```
2.新建truffle项目（为防止项目覆盖 truffle 强制使用空文件夹）
```
truffle init
```
会生成如下目录和文件:

![truffle-init](/img/evm/truffle-init.jpg)

3.新建package.json文件，用于使用依赖(根据开发需要自行选择添加)，参考如下:
```
{
  "name": "truffle-box",
  "version": "1.0.0",
  "description": "",
  "main": "truffle-config.js",
  "license": "MIT",
  "scripts": {
    "compile": "truffle compile --compile-all"
  },
  "dependencies": {
    "@openzeppelin/contracts": "3.2.0"
  },
  "devDependencies": {
    "@truffle/artifactor": "^4.0.84",
    "@truffle/contract": "^4.2.25",
    "@truffle/hdwallet-provider": "^1.1.0",
    "truffle": "5.1.49"
  }
}

```
可执行下面命令安装依赖
```
npm install
```
     
4.在truffle-config.js 中networks 下 配置Findora devnet:
```
findora: {
      provider:()=> new HDWalletProvider(mnemonic, `https://dev-evm.dev.findora.org:8545`),
      network_id: 523,       // devnet's id
      skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
     }
```
设置solidity编译版本、优化、插件 等信息
```
compilers: {
    solc: {
      version: '0.6.12+commit.27d51765', // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      settings: {          // See the solidity docs for advice about optimization and evmVersion
        optimizer: {
          enabled: true,
          runs: 200
        },
        // evmVersion: "byzantium"
      }
    },
  },
   // Truffle Plugin
   plugins: ['moonbeam-truffle-plugin']
```
5.创建合约：

所有你的合约应该位于./contracts目录。默认我们提供了一个合约文件，一个库文件，均以.sol结尾.

```
contract MyContract {
  //你的逻辑代码
}
```
你可以通过使用import来声明依赖。Truffle将会按正确顺序依次编译合约，并在需要的时候自动关联库。

6. 编译合约

要编译您的合约，使用：
```
truffle compile
```
Truffle仅默认编译自上次编译后被修改过的文件，来减少不必要的编译。如果你想编译全部文件，可以使用--compile-all选项。
```
truffle compile --compile-all
```
编译的输出位于./build/contracts目录。如果目录不存在会自动创建。这些编译文件对于Truffle框架能否正常工作至关重要。你不应该在正常的编译或发布以外手动修改这些文件。文件有你需要的合约 abi 信息。如图所示：

![truffle-compile](/img/evm/truffle-compile.jpg)

7.部署

部署脚本文件

```
module.exports = function(deployer) {
  // deployment steps
  deployer.deploy(MyContract);
};
```
需要注意的是文件名以数字开头，一个描述性的后缀结尾。数字前缀是必须的，migrate 命令会按照 migrate目录下的数字开头的文件按生序依次执行。后缀仅是为了提高可读性，以方便理解。 如图所示：

![truffle-script](/img/evm/truffle-script.jpg)


执行部署，使用下述命令：
```
truffle migrate --network findora
```
这个命令会执行所有的位于migrations目录内的移植脚本。如果你之前的移植是成功执行的。truffle migrate仅会执行新创建的移植。如果没有新的移植脚本，这个命令不同执行任何操作。可以使用选项--reset来从头执行移植脚本。


![truffle-deploy](/img/evm/truffle-deploy.jpg)

恭喜, 您已完成truffle基本操作指引!
