---
sidebar_position: 1
---

# Account

### create

**_- Creates an instance of WalletKeypar using password._**  
This method is used to create a WalletKeypar using password. The Keypair contains some essential information, such as:

- &nbsp; address
- &nbsp; public key
- &nbsp; key store

and so on, and it is used for pretty much any personalized operation that user can do using FindoraSdk

##### Parameters:

- &nbsp; `<string>` - Password of account

##### Results:

- &nbsp; `Promise<WalletKeypar>` - An instance of `WalletKeypar`

##### Example:

```jsx
const password = "qsjEI%123";

// Create a wallet info object using given password
const walletInfo = await Account.create(password);
```

### getBalance

**_- Get the balance of the specific asset for the given user_**

Using this function user can retrieve the balance for the specific asset code, which could be either custom asset or an FRA asset

##### Parameters:

- &nbsp; `<WalletKeypar>` - An instance of WalletKeypar
- &nbsp; `<string>` - (optional) Asset Code which could be either custom asset or an FRA asset.

##### Results:

- &nbsp; `Promise<string>` - The balance of the specific asset for the given user.

##### Example:

```jsx
const pkey = "lfyd1234!";
const password = "uuicnf!34";

// Restore Wallet
const walletInfo = await Keypair.restoreFromPrivateKey(pkey, password);

// Get balance
const balance = await Account.getBalance(walletInfo, customAssetCode);
```

### getBalanceInWei

**_- Get the balance of the specific asset for the given user in Wei format_**

Using this function user can retrieve the balance for the specific asset code, which could be either custom asset or an FRA asset

##### Parameters:

- &nbsp; `<WalletKeypar>` - An instance of WalletKeypar
- &nbsp; `<string>` - (optional) Asset Code which could be either custom asset or an FRA asset.

##### Results:

- &nbsp; `Promise<BigNumberValue>` - The balance of the specific asset for the given user in Wei format.

##### Example:

```jsx
const pkey = "lfyd1234!";
const password = "uuicnf!34";

// Restore Wallet
const walletInfo = await Keypair.restoreFromPrivateKey(pkey, password);

// Get balance in Wei format
const balance = await Account.getBalanceInWei(walletInfo, customAssetCode);
```

### getCreatedAssets

**_- Get an array of instances of ProcessedIssuedRecord using wallet address._**

This method is used to get created Assets. The ProcessedIssuedRecord contains some essential information, such as:

- &nbsp; code
- &nbsp; record
- &nbsp; id
- &nbsp; ownerMemo

and so on. It's the issued asset.

##### Parameters:

- &nbsp; `<string>` - Wallet address.

##### Results:

- &nbsp; `Promise<ProcessedIssuedRecord[]>` - an array of `ProcessedIssuedRecord` instances.

##### Example:

```jsx
const pkey = "lfyd1234!";
const password = "uuicnf!34";

// Restore Wallet
const walletInfo = await Keypair.restoreFromPrivateKey(pkey, password);

// Get balance in Wei format
const balance = await Account.getBalanceInWei(walletInfo, customAssetCode);
```
