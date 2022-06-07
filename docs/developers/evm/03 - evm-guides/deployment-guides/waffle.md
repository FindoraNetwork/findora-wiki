---
sidebar_position: 3
---

# Using Waffle

### Overview
Waffle is a library for compiling and testing smart contracts, and Mars is a deployment manager. Waffle and Mars can be used together to write, compile, test, and deploy Ethereum smart contracts. Due to the Ethereum compatibility of Findora, smart contracts can be deployed to the Findora Devnet testnet using Waffle and Mars.

Waffle uses minimal dependencies, has an easy-to-learn and expand writing syntax, and provides fast execution time when compiling and testing smart contracts. In addition, the compatibility of Waffle and TypeScript and the use of Chai matchers make it easy to view and write tests.

Mars provides a simple, TypeScript-compatible framework for creating advanced deployment scripts and keeping them in sync with state changes. Mars focuses on "infrastructure as code", allowing developers to specify how to deploy their smart contracts, and then use these specifications to automatically handle state changes and deployment.

In this tutorial, you need to create a TypeScript project first, then use Waffle to write, compile and test the smart contract, and then use Mars to deploy it to the Findora Devnet.

### Prerequisites
   This tutorial requires Node.js to be installed. You can download it through [Node.js](https://nodejs.org/) or run the following code to complete the installation.
    You can verify the correct installation by requesting the version of each installation package：
```
   node -v
```
```
   npm -v
```
### Step 1: Use Waffle to create a TypeScript project
Here we use the truffle project (please refer to the first 3 steps in [the truffle document](/docs/developers/evm/evm-guides/deployment-guides/truffle) to create a project module using Truffle), then configure the package.json file, and add dependencies in devDependencies:
```json
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


Need to reinstall dependencies
```
npm install
```

### Step 2: TypeScript configuration file
Create a TypeScript configuration file
```
touch tsconfig.json
```
Add basic TypeScript configuration
```json
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

You should now have a basic TypeScript project with the dependencies needed to build with Waffle and Mars.

### Step 3: Compile with Waffle
1. Go back to the root directory of the project and create a `waffle.json` file to configure Waffle：
  ```
  cd .. && touch waffle.json
  ```

2. Edit `waffle.json` to specify the compiler configuration, including the contract directory, etc. In this example, we will use solcjs and the version of Solidity you used for the contract, which is `0.6.12`：
  ```json
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
3. Add a script in `package.json` to run Waffle：
  ```
  "scripts": {
    "build": "waffle"
  }
  ```
4. This is all the steps to configure Waffle, now you can use the build script to compile the MyContract contract：
  ```
  npm run build
  ```
  ![wallfe-build](/img/evm/wallfe-build.jpg)

5. Create a file (`MyContract.test.ts`) in the test directory to test your MyContract contract:

  ```js
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
    let provider: Provider = new ethers.providers.JsonRpcProvider('https://prod-testnet.prod.findora.org:8545');
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
      // Test results
    it('current value', async () => {
      expect(await contract.getValue()).to.equal(88); // This should fail
    });
  })
  ```
  ![wallfe-test](/img/evm/wallfe-test.jpg)

### Step 4: Use Mars to configure the deployment script
Now, you need to configure the deployment of the MyContract contract for the Findora Devnet.

You need to generate artifacts for Mars to enable type checking in the deployment script:

1. Update existing script to run Waffle in `package.json` to include Mars：
  ```json
  "scripts": {
    "build": "waffle && mars",
    "test": "mocha",
  }
  ```

2. Generate artifacts and create the `artifacts.ts` file required for deployment
  ```
  npm run build
  ```

If you open the build directory, you can see an `artifacts.ts` file, which contains artifact data required for deployment. You need to write a deployment script before you can proceed with the deployment. The deployment script will be used to explain which contract Mars deploys, which network to deploy to, and which account is used to trigger the deployment.

<!-- # TODO: insert /img/evm/mars-build.png  -->

### Step 5: Create deploy script

In this step, you will create a deployment script that will define how the contract should be deployed. Mars provides a deploy function to which you can pass options, such as the account private key used to deploy the contract, the network to be deployed, and so on. The deploy function is used to define the contract to be deployed. Mars has a contract function that accepts name, artifact and constructorArgs.

1. Create a src directory to contain your deployment script and create a script to deploy the MyContract contract：
  ```
  mkdir src && cd src && touch deploy.ts
  ```

2. In `deploy.ts`, use Mars' deploy function to create a script and deploy to Findora Devnet using your account’s private key：
  ```js
  import { deploy } from 'ethereum-mars';

  const privateKey = "<insert-your-private-key-here>";
  deploy({network: 'https://prod-testnet.prod.findora.org:8545', privateKey},(deployer) => {
    // Deployment logic will go here
  });
  ```

3. Set the deploy function to deploy the MyContract contract created in the above steps：
  ```js
  import { deploy, contract } from 'ethereum-mars';
  import { MyToken } from '../build/artifacts';

  const privateKey = "<insert-your-private-key-here>";
  deploy({network: 'https://prod-testnet.prod.findora.org:8545', privateKey}, () => {
    contract('myContract', MyContract);
  });
  ```

4. Add the deployment script to the scripts object in `package.json`：
  ```json
  "scripts": {
      "build": "waffle && mars",
      "test": "mocha",
      "deploy": "ts-node src/deploy.ts"
    }
  ```
So far, you should have created a deployment script in deploy.ts to deploy the MyContract contract to Findora Devnet, and added the ability to easily call the script and deploy the contract.

### Step 6: Use Mars for deploy
If you have configured the deployment, you can now actually deploy to Findora Devnet.

Now deploy the contract using the script you just created：
```
npm run deploy
```

Congratulations! You have successfully deployed the contract on Findora Devnet through Waffle and Mars!
