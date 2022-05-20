---
sidebar_position: 6
---

# Transaction

### getTransactionBuilder

**_- Create an instance of `TransactionBuilder`_**  
This method is used to create a transaction builder

##### Results:

- &nbsp; `Promise<TransactionBuilder>` - TransactionBuilder which should be used in `Transaction.submitTransaction`.

##### Example:

```jsx
// Create a TransactionBuilder object
const transactionBuilder = await Transaction.getTransactionBuilder();
```

### getTxList

**_- Get a list of transactions for given wallet address_**  
This method is used to get a list of transactions for given wallet address

##### Parameters:

- &nbsp; `<string>` - wallet address
- &nbsp; `<"to" | "from">` - transaction type. it can only be 'to' or 'from'
- &nbsp; `<number>` - pagination. The defaul value is 1.

##### Results:

- &nbsp; `Promise<ProcessedTxListResponseResult>` - An instance of `ProcessedTxListResponseResult` containing the total count and transactions.

##### Example:

```jsx
const address = `fra000xxsr`;
const type = "to";

// Get list of `to` transaction of given address
const txDetail = await Transaction.getTxList(address, type);
```

### sendToAddress

**_- Send some asset to an address_**  
Using this function, user can transfer some amount of given asset to another address

##### Parameters:

- &nbsp; `<WalletKeypar>` - wallet keypair
- &nbsp; `<string>` - target wallet address
- &nbsp; `<string>` - amount to be sent
- &nbsp; `<string>` - asset code
- &nbsp; `<AssetBlindRules>` - (optional) confidential options for blind rule

##### Results:

- &nbsp; `Promise<TransactionBuilder>` - A TransactionBuilder which should be used in Transaction.submitTransaction

##### Example:

```jsx
const walletInfo = await Keypair.restoreFromPrivateKey(pkey, password);
const toWalletInfo = await Keypair.restoreFromPrivateKey(toPkeyMine2, password);

const assetCode = await Asset.getFraAssetCode();

const assetBlindRules: Asset.AssetBlindRules = {
  isTypeBlind: false,
  isAmountBlind: false,
};

const transactionBuilder = await Transaction.sendToAddress(
  walletInfo,
  toWalletInfo.address,
  "2",
  assetCode,
  assetBlindRules
);

const resultHandle = await Transaction.submitTransaction(transactionBuilder);
```

### sendToMany

**_- Send some asset to multiple receivers_**  
Using this function, user can transfer perform multiple transfers of the same asset to multiple receivers using different amounts

##### Parameters:

- &nbsp; `<WalletKeypar>` - wallet keypair
- &nbsp; `<TransferReciever[]>` - the list of target wallet addresses and amount
- &nbsp; `<string>` - asset code
- &nbsp; `<AssetBlindRules>` - (optional) confidential options for blind rule

##### Results:

- &nbsp; `Promise<TransactionBuilder>` - A TransactionBuilder which should be used in Transaction.submitTransaction

##### Example:

```jsx
const walletInfo = await Keypair.restoreFromPrivateKey(pkey, password);
const toWalletInfoMine2 = await Keypair.restoreFromPrivateKey(
  toPkeyMine2,
  password
);
const toWalletInfoMine3 = await Keypair.restoreFromPrivateKey(
  toPkeyMine3,
  password
);

const assetCode = await Asset.getFraAssetCode();

const assetBlindRules: Asset.AssetBlindRules = {
  isTypeBlind: false,
  isAmountBlind: false,
};

const recieversInfo = [
  { reciverWalletInfo: toWalletInfoMine2, amount: "2" },
  { reciverWalletInfo: toWalletInfoMine3, amount: "3" },
];

const transactionBuilder = await Transaction.sendToMany(
  walletInfo,
  recieversInfo,
  assetCode,
  assetBlindRules
);

const resultHandle = await Transaction.submitTransaction(transactionBuilder);
```

### sendToPublicKey

**_- Send some asset to a wallet by public key_**  
Using this function, user can transfer some amount of given asset to another wallet by target's public key

##### Parameters:

- &nbsp; `<WalletKeypar>` - wallet keypair
- &nbsp; `<string>` - target's public key
- &nbsp; `<string>` - amount to be sent
- &nbsp; `<string>` - asset code
- &nbsp; `<AssetBlindRules>` - (optional) confidential options for blind rule

##### Results:

- &nbsp; `Promise<TransactionBuilder>` - A TransactionBuilder which should be used in Transaction.submitTransaction

##### Example:

```jsx
const walletInfo = await Keypair.restoreFromPrivateKey(pkey, password);
const toWalletPublicKey = `tgshauuy213`;

const assetCode = await Asset.getFraAssetCode();

const assetBlindRules: Asset.AssetBlindRules = {
  isTypeBlind: false,
  isAmountBlind: false,
};

const transactionBuilder = await Transaction.sendToPublicKey(
  walletInfo,
  toWalletPublicKey,
  "2",
  assetCode,
  assetBlindRules
);

const resultHandle = await Transaction.submitTransaction(transactionBuilder);
```

### submitTransaction

**_- Submits a transaction_**  
The next step after creating a transaction is submitting it to the ledger, and, as a response, we retrieve the transaction handle.

##### Parameters:

- &nbsp; `<TransactionBuilder>` - an instance of `TransactionBuilder`

##### Results:

- &nbsp; `Promise<string>` - Transaction status handle

##### Example:

```jsx
onst walletInfo = await Keypair.restoreFromPrivateKey(pkey, password);

// First, we create a transaction builder
const assetBuilder = await Asset.defineAsset(walletInfo, assetCode);

// Then, we submit a transaction
// If succcesful, the response of the submit transaction request will return a handle that can be used the query the status of the transaction.
const handle = await Transaction.submitTransaction(assetBuilder);
```
