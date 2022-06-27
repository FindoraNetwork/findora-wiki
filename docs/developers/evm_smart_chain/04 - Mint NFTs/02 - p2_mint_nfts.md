# Mint NFT (2 of 3)

In this tutorial, we’ll teach you how to do mint an NFT in <10 minutes.

“Minting an NFT” is the act of publishing a unique instance of your FRC-721 token on the blockchain. Using our smart contract from part 1 of this NFT tutorial guide, let’s flex our Web3 skills and mint an NFT. At the end of this tutorial, you’ll be able to mint as many NFTs as your heart (and wallet) desires!

Let’s get started!

### Step 1: Install Web3

If you followed the first tutorial on creating your NFT smart contract, you already have experience using Ethers.js. [Web3](https://github.com/ChainSafe/web3.js/blob/1.x/README.md) is similar to Ethers, as it is a library used to make creating requests to the Ethereum-compatible blockchain easier. 

To install web3, run

```
npm install web3
```

and update `mint-nft.js` with the following line

```
const Web3 = require('web3')
```

### Step 2: Create mint-nft.js File

Inside your scripts directory, create a `mint-nft.js` file and add the following lines of code:

```
require("dotenv").config()
const PRIVATE_KEY = process.env.PRIVATE_KEY
```

### Step 3: Grab Contract ABI

Our contract ABI (Application Binary Interface) is the interface to interact with our smart contract. You can learn more about Contract ABIs [here](https://docs.soliditylang.org/en/latest/abi-spec.html). Hardhat automatically generates an ABI for us and saves it in the `FindoraNFT.json` file. In order to use this we’ll need to parse out the contents by adding the following lines of code to our `mint-nft.js` file:

```const contract = require("../artifacts/contracts/FindoraNFT.sol/FindoraNFT.json")```


If you want to see the ABI you can print it to your console:

`console.log(JSON.stringify(contract.abi))`


To run mint-nft.js and see your ABI printed to the console navigate to your terminal and run:

`node scripts/mint-nft.js`


### Step 4: Configure NFT Metadata

If you remember from our tutorial in Part 1, our `mintNFT` smart contract function takes in a `tokenURI` parameter that should resolve to a JSON document describing the NFT's metadata— which is really what brings the NFT to life, allowing it to have configurable properties, such as a name, description, image, and other attributes.

```
Interplanetary File System (IPFS) is a decentralized protocol and peer-to-peer network for storing and sharing data in a distributed file system.
```

We will use [Pinata](https://www.pinata.cloud), a convenient IPFS API and toolkit, to store our NFT asset and metadata to ensure our NFT is truly decentralized. If you don’t have a Pinata account, sign up for a free account [here](https://app.pinata.cloud/) and complete the steps to verify your email.

Once you’ve created an account:

* Navigate to the “Files” page and click the blue "Upload" button at the top-left of the page.

* Upload an image to Pinata — this will be the image asset for your NFT. Feel free to name the asset whatever you wish

* After you upload, you'll see the file info in the table on the "Files" page. You'll also see a CID column. You can copy the CID by clicking the copy button next to it. You can view your upload at: `https://gateway.pinata.cloud/ipfs/<CID>`. 

    ![](https://i.imgur.com/TTti0N8.png)
    
    You can find the test image we used on IPFS here -- https://gateway.pinata.cloud/ipfs/QmT5fenaMZ17nBSqBaWyv4PbDV5EZeErRQaDpso5nNBViz.

    ![](https://i.imgur.com/9gMPR1r.png)

Now, we’re going to want to upload one more document to Pinata. But before we do that, we need to create it!

In your root directory, make a new file called `nft-metadata.json` and add the following json code:

```
{
  "attributes": [
    {
      "trait_type": "Breed",
      "value": "Mutt"
    },
    {
      "trait_type": "Eye color",
      "value": "Black"
    }
  ],
  "description": "First dog NFT ever minted on Findora -- priceless.",
  "image": "ipfs://QmT5fenaMZ17nBSqBaWyv4PbDV5EZeErRQaDpso5nNBViz",
  "name": "Doggie Alpha-Omega-001"
}
```

Feel free to change the data in the json. You can remove or add to the attributes section. Most importantly, make sure image field points to the location of your IPFS image — otherwise, your NFT will include a photo of a (very cute!) dog.

Once you’re done editing the JSON file, save it and upload it to Pinata, following the same steps we did for uploading the image.
    
![](https://i.imgur.com/nIfVpPR.png)

![](https://i.imgur.com/aU1ZmWb.png)
    
![](https://i.imgur.com/XUcHi6Y.png)


### Step 5: Create Contract Instance

Now, to interact with our contract, we need to create an instance of it in our code. To do so we’ll need our contract address which we can get from the deployment or Etherscan by looking up the address you used to deploy the contract.
    
![](https://i.imgur.com/1XEnSHt.png)
<!-- ![](https://i.imgur.com/5gGabdn.png) -->

In the above example, our contract address is `0x1A6c013c9951d84273176390CeB1Ccfadb45EEce`.
<!-- `0x8f64ac5cbc4ce428c416f9358bc4606ffc611576` -->

Next, we will use the [Web3 contract method](https://web3js.readthedocs.io/en/v1.2.0/web3-eth-contract.html?highlight=constructor#web3-eth-contract) to create our contract using the ABI and address. In your `mint-nft.js` file, add the following:

```
const contractAddress = "0x1A6c013c9951d84273176390CeB1Ccfadb45EEce"
const nftContract = new web3.eth.Contract(contract.abi, contractAddress)
```

### Step 6: Update .env File

Now, in order to create and send transactions to the Findora network, we’ll use your public account address to get the account nonce (will explain below).

Add your public key to your .env file and also add the `API_URL` that points to Anvil Testnet (i.e. prod-testnet.prod.findora.org:8545").
    
    
— if you completed part 1 of the tutorial, our `.env` file should now look like this:

```
API_URL = "https://prod-testnet.prod.findora.org:8545"
PRIVATE_KEY = "your-private-account-address"
PUBLIC_KEY = "your-public-account-address"
```

### Step 7: Create Transaction

First, let’s define a function named `mintNFT(tokenData)` and create our transaction by doing the following:

1. Grab your `PRIVATE_KEY` and `PUBLIC_KEY` from the .env file.

2. Next, we’ll need to figure out the account nonce. The nonce specification is used to keep track of the number of transactions sent from your address — which we need for security purposes and to prevent replay attacks. To get the number of transactions sent from your address, we use [eth_getTransactionCount](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_gettransactioncount).

3. Finally we’ll set up our transaction with the following info:

 * `'from': PUBLIC_KEY` — The origin of our transaction is our public address

 * `'to': contractAddress` — The contract we wish to interact with and send the transaction

 * `'nonce': nonce` — The account nonce with the number of transactions sent from our address

 * `'gas': estimatedGas` — The estimated gas needed to complete the transaction

 * `'data': nftContract.methods.mintNFT(PUBLIC_KEY, md).encodeABI()` — The computation we wish to perform in this transaction — which in this case is minting a NFT.

Your `mint-nft.js` file should look like this now:
```
   require('dotenv').config();
   const Web3 = require('web3');
   
   const API_URL = process.env.API_URL;
   const PUBLIC_KEY = process.env.PUBLIC_KEY;
   const PRIVATE_KEY = process.env.PRIVATE_KEY;
   const web3 = new Web3(API_URL)

   const contract = require("../artifacts/contracts/FindoraNFT.sol/FindoraNFT.json");
   const contractAddress = "0x8f64ac5cbc4ce428c416f9358bc4606ffc611576";
   const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

   async function mintNFT(tokenURI) {
     const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest');
     const tx = {
       'from': PUBLIC_KEY,
       'to': contractAddress,
       'nonce': nonce,
       'gas': 800000,
       'data': nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI()
     };
   }
```

### Step 8: Sign Transaction

Now that we’ve created our transaction, we need to sign it in order to send it off. Here is where we’ll use our private key.

`web3.eth.sendSignedTransaction` will give us the transaction hash, which we can use to make sure our transaction was mined and didn't get dropped by the network. You'll notice in the transaction signing section, we've added some error checking so we know if our transaction successfully went through.

```
require("dotenv").config()
const Web3 = require('web3')
    
const API_URL = process.env.API_URL
const PUBLIC_KEY = process.env.PUBLIC_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY
const web3 = new Web3(API_URL)

const contract = require("../artifacts/contracts/FindoraNFT.sol/FindoraNFT.json")
const contractAddress = "0x1A6c013c9951d84273176390CeB1Ccfadb45EEce"
const nftContract = new web3.eth.Contract(contract.abi, contractAddress)

async function mintNFT(tokenURI) {
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest") 
  const tx = {
    from: PUBLIC_KEY,
    to: contractAddress,
    nonce: nonce,
    gas: 800000,
    data: nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI(),
  }

  const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY)
  signPromise
    .then((signedTx) => {
      web3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
        function (err, hash) {
          if (!err) {
            console.log(
              "The hash of your transaction is: ",
              hash,
              "\nCheck Findora Anvil Testnet block explorer to view the status of your transaction!"
            )
          } else {
            console.log(
              "Something went wrong when submitting your transaction:",
              err
            )
          }
        }
      )
    })
    .catch((err) => {
      console.log(" Promise failed:", err)
    })
}
```

### Step 9: Call mintNFT and Run Node mint-nft.js

Remember the metadata.json you uploaded to Pinata? Get its hashcode from Pinata and pass the following as parameter to the function mintNFT
`https://gateway.pinata.cloud/ipfs/<metadata-hash-code>`

Here’s how to get the hashcode. Simply copy the value under the `CID` column and use that as the `<metadata-hash-code>`.

![](https://i.imgur.com/EnNSZzS.png)
<!-- ![](https://i.imgur.com/3jRb2if.png) -->



Double check that the hashcode you copied links to your metadata.json by loading `https://gateway.pinata.cloud/ipfs/<metadata-hash-code>` into a separate window. 
    
The page should look similar to the screenshot below:
    
![](https://i.imgur.com/Rw34ek9.png)    
    
Altogether, your code should look something like this:

```
require("dotenv").config()
const Web3 = require('web3')

const API_URL = process.env.API_URL
const PUBLIC_KEY = process.env.PUBLIC_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY
const web3 = new Web3(API_URL)

const contract = require("../artifacts/contracts/FindoraNFT.sol/FindoraNFT.json")
const contractAddress = "0x1A6c013c9951d84273176390CeB1Ccfadb45EEce"
const nftContract = new web3.eth.Contract(contract.abi, contractAddress)

async function mintNFT(tokenURI) {
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest") //get latest nonce

  //the transaction
  const tx = {
    from: PUBLIC_KEY,
    to: contractAddress,
    nonce: nonce,
    gas: 500000,
    data: nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI(),
  }

  const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY)
  signPromise
    .then((signedTx) => {
      web3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
        function (err, hash) {
          if (!err) {
            console.log(
              "The hash of your transaction is: ",
              hash,
              "\nCheck Findora Anvil Testnet block explorer to view the status of your transaction!"
            )
          } else {
            console.log(
              "Something went wrong when submitting your transaction:",
              err
            )
          }
        }
      )
    })
    .catch((err) => {
      console.log("Promise failed:", err)
    })
}

mintNFT("ipfs://QmRNrn4f9hkcRT7V8zxae4Ab9qouZfmfDpsrVGgyZumGBT")
```

Now, run 
    
```
    node scripts/mint-nft.js 
```    
from your root directory to deploy your NFT. After a couple of seconds, you should see a response like this in your terminal:

```
The hash of your transaction is: 0x3cf78f49e37129f4724b931eee66e5050c169961e6c4c2ac27d0c36002ad28e6

Check Findora Anvil Testnet block explorer to view the status of your transaction!
```

Next, visit your [Anvil Testnet block explorer](https://testnet-anvil.evm.findorascan.io/) to see the status of your transaction (whether it’s pending, mined, or got dropped by the network).

![](https://i.imgur.com/sfWs92V.png)


And that’s it! You’ve now deployed AND minted with a NFT on the Findora blockchain 🤑

Using the `mint-nft.js` you can mint as many NFT's as your heart (and wallet) desires! Just be sure to pass in a new `tokenURI` describing the NFT's metadata (otherwise, you'll just end up making a bunch of identical ones with different IDs).

Presumably, you’d like to be able to show off your NFT in your wallet — so be sure to check out part 3 of this NFT tutorial guide.
