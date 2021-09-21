### 概览
Hardhat是一种以太坊开发环境，帮助开发者管理并实现智能合约和DApp开发重复任务的自动化, 可以在truffle项目中进行使用。
#### 先决条件
   本教程操作需安装Node.js，您可通过[Node.js](https://nodejs.org/)下载或自行运行以下代码完成安装。
   您可以通过请求每个安装包的版本来验证是否安装正确：
```
   node -v
```
```
   npm -v
```
#### 创建Hardhat项目
此处我们使用truffle项目进行（请参考truffle文档 使用Truffle创建工程模块 完成1，2，3步操作）后配置package.json文件，devDependencies 中追加依赖
```
"devDependencies": {
   "@nomiclabs/hardhat-ethers": "^2.0.2",
   "@nomiclabs/hardhat-etherscan": "^2.1.0",
   "hardhat": "^2.0.3",
   "hardhat-gas-reporter": "^1.0.1",
   "ts-node": "^9.0.0",
   "typescript": "^4.0.5"
}
```
需要重新安装依赖
```
npm install
```
这将在我们的项目目录中创建一个Hardhat config文档（hardhat.config.js），在项目根目录下创建 .secret 存储我们操作合约时需要使用到的钱包地址私钥。
```
import '@nomiclabs/hardhat-ethers';
import '@nomiclabs/hardhat-etherscan';
import 'hardhat-gas-reporter';
import * as fs from 'fs';

const mnemonic = fs.readFileSync('.secret').toString().trim();

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
    },
    findora: {
      url: "https://dev-evm.dev.findora.org:8545",
      chainId:523,
      accounts: [mnemonic]
    }
  },
  solidity: {
    version: "0.6.12",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: './build/cache',
    artifacts: './build/artifacts',
  },
  mocha: {
    timeout: 20000
  },
  gasReporter: {
    currency: 'USD',
    enabled: true,
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: '**',
  }
}
```
### 创建Hardhat脚本文件
创建script目录与contract同级，用于存放Hardhat脚本文件（示例：deploy.ts) , 然后使用ethers来编写部署脚本, 首先，通过getContractFactory()方法创建一个合约的本地实例。接着，使用实例中包含的deploy()方法发起智能合约。最后，使用deployed()等待部署完成。合约部署完毕后，就可以在MyContract实例中获取合约地址。该脚本是此教程中使用的简化版本。
```
import { network, ethers} from 'hardhat';

// scripts/deploy.ts
async function main() {
   // We get the contract to deploy
   const MyContract = await ethers.getContractFactory('MyContract');
   console.log('Deploying MyContract...');

   // Instantiating a new MyContract smart contract
   const myContract = await MyContract.deploy();

   // Waiting for the deployment to resolve
   await myContract.deployed();
   console.log('MyContract deployed to:', myContract.address);
}

main()
   .then(() => process.exit(0))
   .catch((error) => {
      console.error(error);
      process.exit(1);
   });

```
### 部署合约
使用run指令将MyContract合约部署到 Findora devnet
```
npx hardhat run scripts/deploy.js --network findora 
```
合约在几秒之后便可部署完成，然后您就可以在终端上看到打印出的地址

![hardhat-deploy](/img/evm/hardhat-deploy.jpg)

### 与合约进行交互
创建一个MyContract.sol合约的本地实例, 然后输入部署合约时获得的地址，将这一实例连接到已有实例, 连接到合约后即可进行交互。当console指令还在运行时，调用合约里面的方法，并传入正确的参数（如果方法中涉及到转账，请先授权）。
```
const myContract = await ethers.getContractAt('MyContract', '0x8D94133ddF3A6Cc451653Cd4B21Dc8b65c3383B0');
   const tx = await myContract.connect(operator).setValue(88, override);
   console.log('hash is:', tx.hash)

   const value = await myContract.getValue();
   console.log('value is:', value.toString())
```

![hardhat-value](/img/evm/hardhat-value.jpg)

恭喜， 您已完成Hardhat基本操作指引!
