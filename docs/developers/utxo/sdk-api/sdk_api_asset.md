---
sidebar_position: 4
---

# Asset

### defineAsset

**_- Defines a custom asset_**  
An asset definition operation registers an asset with the Findora ledger. An asset is a digital resource that can be issued and transferred.  
An asset has an issuer and a unique code. The DefineAsset operation must provide an unused token code. The transaction containing the DefineAsset operation will fail if there is already another asset on the ledger with the same code.

##### Parameters:

- &nbsp; `<WalletKeypar>` - Wallet keypair
- &nbsp; `<string>` - asset name
- &nbsp; `<string>` - (optinal) asset memo
- &nbsp; `<string>` - (optinal) A set of rules (options) for the new asset.

##### Results:

- &nbsp; `Promise<TransactionBuilder>` - An instance of `TransactionBuilder` from `Ledger`

##### Example:

```jsx
const walletInfo = await Keypair.restoreFromPrivateKey(pkey, password);

// First, we create a transaction builder
const assetBuilder = await Asset.defineAsset(walletInfo, assetCode);

// Then, we submit a transaction
const handle = await Transaction.submitTransaction(assetBuilder);
```

### getAssetCode

**_- Return Asset Code_**  
This method returns Asset Code by given asset type

##### Parameters:

- &nbsp; `<number[]>` - asset type

##### Results:

- &nbsp; `Promise<string>` - asset code.

##### Example:

```jsx
const assetType = [1, 2];

// Get the decrypted Asset code
const assetCode = await Asset.getAssetCode(assetType);
```

### getAssetDetails

**_- Get Asset Details_**  
This method returns Asset details by given asset code

##### Parameters:

- &nbsp; `<string>` - asset code

##### Results:

- &nbsp; `Promise<IAsset>` - An instance of `FindoraWallet.IAsset`

##### Example:

```jsx
const assetCode = "Your_Asset_Code";

// Get asset details
const assetDetails = await getAssetDetails(assetCode);
```

### getFraAssetCode

**_- Returns the pre-defined FRA asset code_**  
FRA asset code can not be re-defined, as well as it can not be used in the `DefineAset` or `IssueAsset` operations.  
This is the main asset code, which is used when user needs to create a transaction, or calculate the fee and so on.

##### Results:

- &nbsp; `Promise<string>` - Findora Asset code

##### Example:

```jsx
// Get the FRA Asset code
const fraAssetCode = await Asset.getFraAssetCode();
```

### getFraPublicKey

**_- Return Destination's Public Key_**  
This method returns the public key of destination

##### Results:

- &nbsp; `Promise<XfrPublicKey>` - An instance of `XfrPublicKey`.

##### Example:

```jsx
// Get the public key of destination
const pubKey = await Asset.getFraPublicKey();
```

### getMinimalFee

**_- Return Minimal Fee for transaction_**  
This method returns the required minimal fee for transaction

##### Results:

- &nbsp; `Promise<BigInt>` - An instance of `BigInt`.

##### Example:

```jsx
// Get the minimal fee for transaction
const minFee = await Asset.getMinimalFee();
```

### getRandomAssetCode

**_- Returns a random asset code_**  
Using `Ledger`, it generates and returns a random custom asset code

##### Results:

- &nbsp; `Promise<string>` - Asset code.

##### Example:

```jsx
// Get a random asset code
const assetCode = await Asset.getRandomAssetCode();
```

### issueAsset

**_- Issue some amount of a custom asset_**  
Asset issuers can use the `IssueAsset` operation to mint units of an asset that they have created. Concretely, the `IssueAsset` operation creates asset records that represent ownership by a public key of a certain amount of an asset. These asset records are stored in a structure called a transaction output (TXO).

##### Parameters:

- &nbsp; `<WalletKeypar>` - wallet keypair
- &nbsp; `<string>` - asset name
- &nbsp; `<string>` - amount to be issued
- &nbsp; `<AssetBlindRules>` - asset blind rules
- &nbsp; `<number>` - (optional) asset decimals. This parameter can define how many numbers after the comma would this asset have

##### Results:

- &nbsp; `Promise<TransactionBuilder>` - An instance of `TransactionBuilder` from `Ledger`

##### Example:

```jsx
const walletInfo = await Keypair.restoreFromPrivateKey(pkey, password);

// Define the new asset parameters (rules)
const assetBlindRules = { isAmountBlind: false };

// First, we create a transaction builder
const assetBuilder = await Asset.issueAsset(
  walletInfo,
  customAssetCode,
  amountToIssue,
  assetBlindRules
);

// Then, we submit a transaction
const handle = await Transaction.submitTransaction(assetBuilder);
```
