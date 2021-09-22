---
sidebar_position: 15
---
# Waffle & Mars (ZH)

### 概览
Waffle是编译和测试智能合约的库，Mars是部署管理器。 Waffle和Mars可以一起用于编写、编译、测试和部署以太坊智能合约。由于Findora的以太坊兼容性，因此可以使用Waffle和Mars将智能合约部署到Findora Devnet 测试网。

Waffle使用最少的依赖项，具有易于学习和扩展的编写语法，并在编译和测试智能合约时提供快速的执行时间。此外，Waffle与TypeScript的兼容和Chai matchers的使用使得检视和编写测试变得容易。

Mars提供了一个简单的、与TypeScript兼容的框架，用于创建高级部署脚本并与状态更改保持同步。 Mars专注于「基础设施即代码」，允许开发人员指定该如何部署他们的智能合约，然后使用这些规范自动处理状态更改及部署。

在本教程中，您需先创建一个TypeScript项目，然后使用Waffle编写、编译和测试智能合约，接着使用Mars将其部署到Findora Devnet测试网上。

#### 先决条件
   本教程操作需安装Node.js，您可通过[Node.js](https://nodejs.org/)下载或自行运行以下代码完成安装。
   您可以通过请求每个安装包的版本来验证是否安装正确：
```
   node -v
```
```
   npm -v
```
#### 使用Waffle创建TypeScript项目
此处我们使用truffle项目进行（请参考truffle文档 使用Truffle创建工程模块 完成1，2，3步操作）后配置package.json文件，devDependencies 中追加依赖
```
"devDependencies": {
   "@types/chai": "^4.2.21",
    "@types/mocha": "^9.0.0",
    "chai": "^4.3.4",
    "ethereum-mars": "^0.1.5",
    "ethereum-waffle": "^3.4.0",
    "ethers": "^5.4.6",
    "mocha": "^9.1.1",
    "ts-node": "^10.2.1",
    "typescript": "^4.4.3",
    "node-fetch": "^3.0.0"
}
```
[Waffle](https://github.com/EthWorks/Waffle) - for writing, compiling, and testing smart contracts

[Ethers](https://github.com/ethers-io/ethers.js/) - for interacting with Findora's Ethereum API

[OpenZeppelin Contracts](https://github.com/OpenZeppelin/openzeppelin-contracts) - the contract you'll be creating will use OpenZeppelin's ERC20 base implementation

[TypeScript](https://github.com/microsoft/TypeScript) - the project will be a TypeScript project

[TS Node](https://github.com/TypeStrong/ts-node) - for executing the deployment script you'll create later in this guide

[Chai](https://github.com/chaijs/chai) - an assertion library used alongside Waffle for writing tests

[@types/chai](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/HEAD/types/chai) - contains the type definitions for chai

[Mocha](https://github.com/mochajs/mocha) - a testing framework for writing tests alongside Waffle

[@types/mocha](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/HEAD/types/mocha) - contains the type definitions for mocha

需要重新安装依赖
```
npm install
```

### 创建一个TypeScript配置文件：
```
touch tsconfig.json
```
### 添加基本的TypeScript配置：
```
{
  "compilerOptions": {
    "strict": true,
    "target": "ES2019",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "esModuleInterop": true,
    "module": "CommonJS",
    "composite": true,
    "sourceMap": true,
    "declaration": true,
    "noEmit": true
  }
}
```

现在，您应该有一个基本的TypeScript项目，其中包含使用Waffle和Mars进行构建所需的依赖项。

### 使用Waffle编译
1.返回项目的根目录并创建一个waffle.json文件来配置Waffle：
```
cd .. && touch waffle.json
```
2.编辑waffle.json以指定编译器配置，包含合约目录等。在本示例中，我们将使用solcjs 和您用于合约的Solidity 版本，即0.6.12：
```
{
  "compilerType": "solcjs", // Specifies compiler to use
  "compilerVersion": "0.6.12", // Specifies version of the compiler
  "compilerOptions": {
    "optimizer": { // Optional optimizer settings
      "enabled": true, // Enable optimizer
      "runs": 20000 // Optimize how many times you want to run the code
    }
  },
  "sourceDirectory": "./contracts", // Path to directory containing smart contracts
  "outputDirectory": "./build", // Path to directory where Waffle saves compiler output
  "typechainEnabled": true // Enable typed artifact generation
}
```
3.在package.json中添加一个脚本来运行Waffle：
```
"scripts": {
  "build": "waffle"
}
```
这就是配置Waffle的所有步骤，现在您可以完整使用build脚本来编译MyContract合约：
```
npm run build
```
![wallfe-build](/img/evm/wallfe-build.jpg)

4.在test 目录创建一个文件（MyContract.test.ts）来测试您的MyContract合约:

```
import { use, expect } from 'chai';
import { Provider } from '@ethersproject/providers';
import { solidity } from 'ethereum-waffle';
import { ethers, Wallet } from 'ethers';
import { MyContract, MyContractFactory } from '../build/types';
import * as fs from 'fs';

const mnemonic = fs.readFileSync('.secret').toString().trim();

// Tell Chai to use Waffle's Solidity plugin
use(solidity);

describe ('MyContract', () => {
  // Use custom provider to connect to Moonbase Alpha
  let provider: Provider = new ethers.providers.JsonRpcProvider('https://dev-evm.dev.findora.org:8545');
  let wallet: Wallet;
  let walletTo: Wallet;
  let contract: MyContract;

  beforeEach(async () => {
    // Create a wallet instance using your private key & connect it to the provider
    wallet = new Wallet(mnemonic).connect(provider);

    // Create a random account to transfer tokens to & connect it to the provider
    walletTo = Wallet.createRandom().connect(provider);

    // Use your wallet to deploy the MyToken contract
    contract = await new MyContractFactory(wallet).deploy();

    let contractTransaction = await contract.setValue(88);

    // Wait until the transaction is confirmed before running tests
    await contractTransaction.wait();
  });
    // 测试结果
  it('current value', async () => {
    expect(await contract.getValue()).to.equal(88); // This should fail
  });
})
```
![wallfe-test](/img/evm/wallfe-test.jpg)

### 使用Mars 配置部署脚本
现在，您需要为Findora Devnet测试网配置MyContract合约的部署。

您需要为Mars生成工件，以便在部署脚本中启用类型检查:

1.更新现有脚本以在package.json中运行Waffle以包含Mars：
```
"scripts": {
  "build": "waffle && mars",
  "test": "mocha",
}
```

2.生成工件并创建部署所需的artifacts.ts文件
```
npm run build
```

如果您打开build目录，可以看到一个artifacts.ts文件，其中包含部署所需的工件数据。您需要编写部署脚本，才能继续进行部署。部署脚本将用于说明Mars部署哪个合约，部署到哪个网络，以及使用哪个帐户来触发部署。

TODO: insert /img/evm/mars-build.png

### 创建部署脚本

在此步骤中，您将创建部署脚本，该脚本将定义应如何部署合约。Mars提供了一个deploy功能，您可以向它传递选项，例如用于部署合约的帐户私钥、所要部署的网络等。deploy函数内部用于定义要部署的合约的地方。 Mars有一个contract函数，用来接受name、artifact和 constructorArgs.

1.创建一个src目录来包含你的部署脚本并创建脚本来部署MyContract合约：
```
mkdir src && cd src && touch deploy.ts
```
2.在deploy.ts中，使用Mars的deploy函数创建一个脚本，使用您账户的私钥部署至 Findora Devnet：
```
import { deploy } from 'ethereum-mars';

const privateKey = "<insert-your-private-key-here>";
deploy({network: 'https://dev-evm.dev.findora.org:8545', privateKey},(deployer) => {
  // Deployment logic will go here
});
```
3.设置deploy函数来部署在上述步骤中创建的MyContract合约：
```
import { deploy, contract } from 'ethereum-mars';
import { MyToken } from '../build/artifacts';

const privateKey = "<insert-your-private-key-here>";
deploy({network: 'https://dev-evm.dev.findora.org:8545', privateKey}, () => {
  contract('myContract', MyContract);
});
```
4.将部署脚本添加到package.json中的scripts对象：
```
"scripts": {
    "build": "waffle && mars",
    "test": "mocha",
    "deploy": "ts-node src/deploy.ts"
  }
```
到目前为止，您应该已经在deploy.ts中创建了一个部署脚本，用于将MyContract合约部署至Findora Devnet，并添加了轻松调用脚本和部署合约的功能。

###  使用Mars进行部署
若您已配置了部署，现在可以真正部署至Findora Devnet了。

1.使用您刚刚创建的脚本部署合约：
```
npm run deploy
```

恭喜！您已经成功通过Waffle和Mars在Findora Devnet上部署合约了！
