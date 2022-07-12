# Deploy NFT Contract (1 of 3)

The Findora Smart Chain is fully EVM compatible -- meaning any Ethereum tool, existing solidity code base or existing tutorial can be used for the Findora Smart Chain as well. However, when using existing Ethereum-based tutorials, you must change the RPC endpoint URLs and block explorer address to their [Findora Network](https://wiki.findora.org/docs/network) equivalents.

To illustrate this point, we have converted the NFT tutorial located on the official Ethereum documentation site to have all network references point to Findora Network (rather than Ethereum).

The original tutorial can be found here:
* https://ethereum.org/en/developers/tutorials/how-to-write-and-deploy-an-nft


---

With NFTs bringing blockchain into the public eye, now is an excellent opportunity to understand the hype yourself by publishing your own NFT (FRC-721 Token) on the Findora blockchain!

In this tutorial (part 1 of 3), we will walk through creating and deploying an FRC-721 smart contract (Findora's version of ERC-721) on the Anvil test network using MetaMask, Solidity, Hardhat and Pinata (don’t fret if you don’t understand what any of this means yet — we will explain it!).

In part 2, we’ll go through how we can use our smart contract to mint an NFT, and in part 3 we’ll explain how to view your NFT on MetaMask.
    
### Step 1: Create a Findora Account

For this tutorial, we’ll use MetaMask, a virtual wallet in the browser used to manage your Findora account address.

You can download and create a MetaMask account for free [here](https://metamask.io/download/). Next, add the Findora Testnet (Anvil) to Metamask (Settings->Networks->Add Network). Anvil Testnet settings are [here](https://wiki.findora.org/docs/network). 

Then, select Anvil Testnet in the upper right drop-down menu on Metamask.

![](https://i.imgur.com/fmD6EYf.png)

### Step 2: Add (free) FRA From Faucet

In order to deploy our smart contract to the test network, we’ll need some testnet FRA. To request testnet FRA, please refer to the [guide](https://wiki.findora.org/docs/guides/get_fra/faucet).

### Step 3: Initialize Project

First, we’ll need to create a folder for our project. Navigate to your command line and type:

```
mkdir my-nft
cd my-nft
```

Now that we’re inside our project folder, we’ll use npm init to initialize the project. If you don’t already have npm and node.js installed, follow [these instructions](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

```
npm init
```

It doesn’t really matter how you answer the installation questions; here is how we did it for reference:

```
package name: (my-nft)

version: (1.0.0)

description: My first NFT!

entry point: (index.js)

test command:

git repository:

keywords:

author:

license: (ISC)

About to write to /Users/testuser/my-nft/package.json:


{

  "name": "my-nft",

  "version": "1.0.0",

  "description": "My first NFT!",

  "main": "index.js",

  "scripts": {

    "test": "echo \"Error: no test specified\" && exit 1"

  },

  "author": "",

  "license": "ISC"

}


Show all
```

Approve the package.json, and we’re good to go!

### Step 4: Install Hardhat

Hardhat is a development environment to compile, deploy, test, and debug your EVM-based software. It helps developers when building smart contracts and dApps locally before deploying to the live chain.

Inside our my-nft project run:

```
npm install --save-dev hardhat
```

Visit [Hardhat docs](https://hardhat.org/getting-started#overview) for additional installation and usage details.

### Step 5: Create Hardhat Project

Inside our project folder run:

```
npx hardhat
```


You should then see a welcome message and option to select what you want to do. Select `create an empty hardhat.config.js`:

```
888    888                      888 888               888

888    888                      888 888               888

888    888                      888 888               888

8888888888  8888b.  888d888 .d88888 88888b.   8888b.  888888

888    888     "88b 888P"  d88" 888 888 "88b     "88b 888

888    888 .d888888 888    888  888 888  888 .d888888 888

888    888 888  888 888    Y88b 888 888  888 888  888 Y88b.

888    888 "Y888888 888     "Y88888 888  888 "Y888888  "Y888

👷 Welcome to Hardhat v2.0.11 👷‍

? What do you want to do? …

Create a sample project

❯ Create an empty hardhat.config.js

Quit
```

This will generate a hardhat.config.js file for us which is where we’ll specify all of the set up for our project later on.


### Step 6: Add Project Folders

To keep our project organized, we’ll create two new folders. Navigate to the root directory of your project in your command line and type:

```
mkdir contracts
mkdir scripts
```

* `contracts/` is where we’ll keep our NFT smart contract code

* `scripts/` is where we’ll keep scripts to deploy and interact with our smart contract

### Step 7: Write Contract

Now that our environment is set up, on to more exciting stuff: writing our smart contract code!

Open up the my-nft project in your favorite editor (we like VSCode). Smart contracts are written in a language called Solidity which is what we will use to write our `FindoraNFT.sol` smart contract.‌

1. Navigate to the contracts folder and create a new file called FindoraNFT.sol

2. Below is our NFT smart contract code, which we based on the [OpenZeppelin ERC-721](https://docs.openzeppelin.com/contracts/3.x/erc721) library’s implementation. Copy and paste the contents below into your FindoraNFT.sol file.
    
    
```
//Contract based on [https://docs.openzeppelin.com/contracts/3.x/erc721](https://docs.openzeppelin.com/contracts/3.x/erc721)
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract FindoraNFT is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("FindoraNFT", "FNFT") {}

    function mintNFT(address recipient, string memory tokenURI)
        public onlyOwner
        returns (uint256)
    {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);

        return newItemId;
    }
}
```

3. Because we are inheriting classes from the OpenZeppelin contracts library, in your command line run 

```
npm install @openzeppelin/contracts 
```
to install the library into our folder.

So, what does this code do exactly? Let’s break it down, line-by-line.

At the top of our smart contract, we import three OpenZeppelin smart contract classes:

* @openzeppelin/contracts/token/ERC721/ERC721.sol contains the implementation of the ERC-721 standard, which our NFT smart contract will inherit. (To be a valid NFT, your smart contract must implement all the methods of the ERC-721 standard.) To learn more about the inherited ERC-721 functions, check out the interface definition [here](https://eips.ethereum.org/EIPS/eip-721).

* @openzeppelin/contracts/utils/Counters.sol provides counters that can only be incremented or decremented by one. Our smart contract uses a counter to keep track of the total number of NFTs minted and set the unique ID on our new NFT. (Each NFT minted using a smart contract must be assigned a unique ID—here our unique ID is just determined by the total number of NFTs in existence. For example, the first NFT we mint with our smart contract has an ID of "1," our second NFT has an ID of "2," etc.)

* @openzeppelin/contracts/access/Ownable.sol sets up [access control](https://docs.openzeppelin.com/contracts/3.x/access-control) on our smart contract, so only the owner of the smart contract (you) can mint NFTs. (Note, including access control is entirely a preference. If you'd like anyone to be able to mint an NFT using your smart contract, remove the word `Ownable` on line 10 and `onlyOwner` on line 17.)

After our import statements, we have our custom NFT smart contract, which is surprisingly short — it only contains a counter, a constructor, and single function! This is thanks to our inherited OpenZeppelin contracts, which implement most of the methods we need to create an NFT, such as `ownerOf` which returns the owner of the NFT, and transferFrom, which transfers ownership of the NFT from one account to another.

In our ERC-721 constructor, you’ll notice we pass 2 strings, `FindoraNFT` and `FNFT`. The first variable is the smart contract’s name, and the second is its symbol. You can name each of these variables whatever you wish!

Finally, we have our function `mintNFT(address recipient, string memory tokenURI)`` that allows us to mint an NFT! You'll notice this function takes in two variables:

* `address recipient` specifies the address that will receive your freshly minted NFT

* `string memory tokenURI` is a string that should resolve to a JSON document that describes the NFT's metadata. An NFT's metadata is really what brings it to life, allowing it to have configurable properties, such as a name, description, image, and other attributes. In part 2 of this tutorial, we will describe how to configure this metadata.

`mintNFT` calls some methods from the inherited ERC-721 library, and ultimately returns a number that represents the `ID` of the freshly minted NFT.


### Step 8: Connect Anvil Testnet to Project

Now that we’ve created a MetaMask wallet and written our smart contract, it’s time to connect them to Findora network.

Every transaction sent from your virtual wallet requires a signature using your unique private key. To provide our program with this permission, we can safely store our private key in an environment file.

First, install the `dotenv` package in your project directory:

```
npm install dotenv --save
```

Then, create a .env file in the root directory of our project, and add your MetaMask private key to it. 

Your .env should now look like this:

```
PRIVATE_KEY="your-metamask-private-key"
```
>:warning: Replace "your-metamask-private-key" with the private key stored inside Metamask (Metamask -> "..." -> Account Details -> Export Private Key).

To actually connect .env file to our code, we’ll reference the variable in our hardhat.config.js file on step 13.

>:warning: Don't commit .env! Please make sure never to share or expose your .env file with anyone, as you are compromising your secrets in doing so. If you are using version control, add your .env to a gitignore file.

### Step 9: Install Ethers.js

`Ethers.js` is a library that makes it easier to interact and make requests to Ethereum by wrapping standard JSON-RPC methods with more user friendly methods.

Hardhat makes it super easy to integrate Plugins for additional tooling and extended functionality. We’ll be taking advantage of the Ethers plugin for contract deployment (Ethers.js has some super clean contract deployment methods).

In your project directory type:

```
npm install --save-dev @nomiclabs/hardhat-ethers ethers@^5.0.0
```

We’ll also require ethers in our hardhat.config.js in the next step.

### Step 10: Update hardhat.config.js

We’ve added several dependencies and plugins so far, now we need to update hardhat.config.js so that our project knows about all of them.

Update your `hardhat.config.js` to look like this:

```
/**

* @type import('hardhat/config').HardhatUserConfig

*/

require('dotenv').config();

require("@nomiclabs/hardhat-ethers");

module.exports = {
   solidity: "0.8.1",
   defaultNetwork: "anvil",

   networks: {
      hardhat: {},
      local: {
         url: `http://127.0.0.1:8545`,
         accounts: [process.env.PRIVATE_KEY],
         gas: 1000000,
         gasPrice: 10000000000
      },
      anvil: {
         url: `https://prod-testnet.prod.findora.org:8545`,
         accounts: [process.env.PRIVATE_KEY],
         gas: 1000000,
         gasPrice: 10000000000
      }
   },
}

```

### Step 11: Compile Contract

To make sure everything is working so far, let’s compile our contract. The compile task is one of the built-in hardhat tasks.

From the command line run:

```
npx hardhat compile
```

### Step 12: Write Deployment Script

Now that our contract is written and our configuration file is good to go, it’s time to write our contract deploy script.

Navigate to the scripts/ folder and create a new file called deploy.js, adding the following contents to it:

```
async function main() {
  const FindoraNFT = await ethers.getContractFactory("FindoraNFT")
  const myNFT = await FindoraNFT.deploy()
  await myNFT.deployed()
  console.log("Contract deployed to address:", myNFT.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
```


Hardhat does an amazing job of explaining what each of these lines of code does in their [Contracts tutorial](https://hardhat.org/tutorial/testing-contracts#writing-tests), we’ve adopted their explanations here.

```
const FindoraNFT = await ethers.getContractFactory("FindoraNFT");
```


A ContractFactory in ethers.js is an abstraction used to deploy new smart contracts, so FindoraNFT here is a factory for instances of our NFT contract. When using the hardhat-ethers plugin ContractFactory and Contract instances are connected to the first signer by default.

```
const myNFT = await FindoraNFT.deploy();
```

Calling deploy() on a ContractFactory will start the deployment, and return a Promise that resolves to a Contract. This is the object that has a method for each of our smart contract functions.


### Step 13: Deploy Contract

We’re finally ready to deploy our smart contract! Navigate back to the root of your project directory, and in the command line run:

```
npx hardhat --network anvil run scripts/deploy.js
```

You should then see something like:

```
Contract deployed to address: 0x1A6c013c9951d84273176390CeB1Ccfadb45EEce
```


If we go to the [Anvil Testnet block explorer](https://testnet-anvil.evm.findorascan.io/) and search for our contract address we should be able to see that it has been deployed successfully. If you can't see it immediately, please wait a while as it can take some time. 

The transaction will look something like this:

![](https://i.imgur.com/fXz5cbd.png)


If we click into the transaction ID link, we’ll see our contract address in the To field.

![](https://i.imgur.com/1XEnSHt.png)

Yasssss! You just deployed your NFT smart contract to the Findora Smart (EVM) chain!

That’s all for part 1 of this tutorial. In part 2, we’ll actually interact with our smart contract by minting an NFT, and in part 3 we’ll show you how to view your NFT in your Findora wallet!
