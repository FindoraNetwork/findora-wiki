---
sidebar_position: 3
---

# Network

### getAbciInfo

**_- Get ABCI information_**  
This method is used to get ABCI information.

##### Parameters:

- &nbsp; `<string>` - a wallet address
- &nbsp; `<NetworkAxiosConfig>` - (optinal) network config

##### Results:

- &nbsp; `Promise<AbciInfoResult>` - An instance of `AbciInfoResult` containing the response and error.

##### Example:

```jsx
const data = "0x12345d";

// Get ABCI information
const acbiInfo = await Network.getAbciInfo(data);
```

### getAbciNoce

**_- Get ABCI Noce_**  
This method is used to get ABCI Noce.

##### Parameters:

- &nbsp; `<string>` - a wallet address
- &nbsp; `<NetworkAxiosConfig>` - (optinal) network config

##### Results:

- &nbsp; `Promise<AbciNoceResult>` - An instance of `AbciNoceResult` containing the response and error.

##### Example:

```jsx
const data = "0x12345d";

// Get ABCI Noce
const acbiNoce = await Network.getAbciNoce(data);
```

### getAssetToken

**_- Get information of given type of asset token_**  
This method is used to get information of given type of asset token

##### Parameters:

- &nbsp; `<string>` - asset code
- &nbsp; `<NetworkAxiosConfig>` - (optinal) network config

##### Results:

- &nbsp; `Promise<AssetTokenDataResult>` - An instance of `AssetTokenDataResult` containing the response and error.

##### Example:

```jsx
const data = "0x12345d";

// Get ABCI Noce
const acbiNoce = await Network.getAbciNoce(data);
```

### getBlock

**_- Get datails of given block_**  
This method is used to get details of given block.

##### Parameters:

- &nbsp; `<number>` - block Height
- &nbsp; `<NetworkAxiosConfig>` - (optinal) network config

##### Results:

- &nbsp; `Promise<BlockDetailsDataResult>` - An instance of `BlockDetailsDataResult` containing the response and error.

##### Example:

```jsx
const blockHeight = 1432;

// Get block #1432 details
const blockDetail = await Network.getBlock(blockHeight);
```

### getDelegateInfo

**_- Get the delegation information_**  
This method is used to get the delegation information.

##### Parameters:

- &nbsp; `<string>` - public key
- &nbsp; `<NetworkAxiosConfig>` - (optinal) network config

##### Results:

- &nbsp; `Promise<DelegateInfoDataResult>` - An instance of `DelegateInfoDataResult` containing the response and error.

##### Example:

```jsx
const publickey = "qsedx23rtgds";

// Get the delegation information
const blockDetail = await Network.getDelegateInfo(publickey);
```

### getHashSwap

**_- Get transaction details_**  
This method is used to get details of transaction with given hash

##### Parameters:

- &nbsp; `<string>` - transaction hash
- &nbsp; `<NetworkAxiosConfig>` - (optinal) network config

##### Results:

- &nbsp; `Promise<HashSwapDataResult>` - An instance of `HashSwapDataResult` containing the response and error.

##### Example:

```jsx
const hash = `YOUR_TX_HASH`;

// Get transaction details of given hash
const txDetail = await Network.getHashSwap(hash);
```

### getIssuedRecords

**_- Get information of issued records for given public key_**  
This method is used to get information of issued records for given public key

##### Parameters:

- &nbsp; `<string>` - public key
- &nbsp; `<NetworkAxiosConfig>` - (optinal) network config

##### Results:

- &nbsp; `Promise<IssuedRecordDataResult>` - An instance of `IssuedRecordDataResult` containing the response and error.

##### Example:

```jsx
const publickey = `publickeyexample`;

// Get issed records information
const issuedRecords = await Network.getIssuedRecords(publickey);
```

### getOwnedSids

**_- Get Sids owned by given address_**  
This method is used to get Sids owned by given address

##### Parameters:

- &nbsp; `<string>` - wallet address
- &nbsp; `<NetworkAxiosConfig>` - (optinal) network config

##### Results:

- &nbsp; `Promise<OwnedSidsDataResult>` - An instance of `OwnedSidsDataResult` containing the response and error.

##### Example:

```jsx
const address = `frabhhjsswerf`;

// Get Sids' information
const ownedSids = await Network.getOwnedSids(address);
```

### getOwnerMemo

**_- Get the owner memo by given UTXO sid_**  
This method is used to get owner memo by given UTXO sid

##### Parameters:

- &nbsp; `<number>` - UTXO sid
- &nbsp; `<NetworkAxiosConfig>` - (optinal) network config

##### Results:

- &nbsp; `Promise<OwnerMemoDataResult>` - An instance of `OwnerMemoDataResult` containing the response and error.

##### Example:

```jsx
const utxoSid = 143;

// Get owner memo
const ownerMemo = await Network.getOwnerMemo(utxoSid);
```

### getStateCommitment

**_- Returns state commitment_**  
An important property of a Findora ledger is the ability to authenticate transactions. Users can authenticate transactions against a small tag called the state commitment. The state commitment is a commitment to the current state of the ledger. The state commitment response is a tuple containing the state commitment and the state commitment version.

##### Parameters:

- &nbsp; `<NetworkAxiosConfig>` - (optinal) network config

##### Results:

- &nbsp; `Promise<StateCommitmentDataResult>` - An instance of `StateCommitmentDataResult` containing the response and error.

##### Example:

```jsx
// Get state commitment
const stateCommitment = await Network.getStateCommitment();
```

### getTransactionStatus

**_- Returns transaction status_**  
Using the transaction handle, user can fetch the status of the transaction from the query server.

##### Parameters:

- &nbsp; `<string>` - transaction handle (hash)
- &nbsp; `<NetworkAxiosConfig>` - (optinal) network config

##### Results:

- &nbsp; `Promise<TransactionStatusDataResult>` - An instance of `TransactionStatusDataResult` containing the response and error.

##### Example:

```jsx
const handle = `YOUR_TX_HASH`;

// Get transaction status
const transactionStatus = await Network.getTransactionStatus(handle);
```

### getTransactionDetails

**_- Returns transaction details_**  
Using the transaction handle, user can fetch the details of the transaction from the query server.

##### Parameters:

- &nbsp; `<string>` - transaction handle (hash)
- &nbsp; `<NetworkAxiosConfig>` - (optinal) network config

##### Results:

- &nbsp; `Promise<TxDetailsDataResult>` - An instance of `TxDetailsDataResult` containing the response and error.

##### Example:

```jsx
const handle = `YOUR_TX_HASH`;

// Get transaction details
const transactionDetails = await Network.getTransactionDetails(handle);
```

### getTxList

**_- Get a list of transactions for given wallet address_**  
This method is used to get a list of transactions for given wallet address

##### Parameters:

- &nbsp; `<string>` - wallet address
- &nbsp; `<"to"|"from">` - transaction type. it can only be "to" or "from"
- &nbsp; `<number>` - pagination. Default is 1.
- &nbsp; `<NetworkAxiosConfig>` - (optinal) network config

##### Results:

- &nbsp; `Promise<TxListDataResult>` - An instance of `TxListDataResult` containing the response and error.

##### Example:

```jsx
const address = `fra000xxsr`;
const type = "to";

// Get list of `to` transaction of given address
const txDetail = await Network.getTxList(address, type);
```

### getUtxo

**_- Get UTXO ledger for given utxo sid_**  
This method is used to get UTXO ledger for given UTXO sid

##### Parameters:

- &nbsp; `<number>` - UTXO SID
- &nbsp; `<NetworkAxiosConfig>` - (optinal) network config

##### Results:

- &nbsp; `Promise<UtxoDataResult>` - An instance of `UtxoDataResult` containing the response and error.

##### Example:

```jsx
const utxoSid = 143;

// Get UTXO details
const utxoData = await Network.getUtxo(utxoSid);
```

### getValidatorList

**_- Get validator list_**  
This method is used to get the list of validators.

##### Parameters:

- &nbsp; `<NetworkAxiosConfig>` - (optinal) network config

##### Results:

- &nbsp; `Promise<ValidatorListDataResult>` - An instance of `ValidatorListDataResult` containing the response and error.

##### Example:

```jsx
// Get validator list
const acbiInfo = await Network.getValidatorList();
```

### sendRpcCall

**_- Send RPC call_**  
This method is used to send RPC call.

##### Parameters:

- &nbsp; `<string>` - RPC url
- &nbsp; `<{[key: string]: any}>` - payload
- &nbsp; `<NetworkAxiosConfig>` - (optinal) network config

##### Results:

- &nbsp; `Promise<T>` - The response object from RPC call.

##### Example:

```jsx
cont url = `https://prod-testnet.prod.findora.org:8545`;
const payload = {
  method: `eth_getBlockByHash`,
  params: ['0x1af723767d06...',true],
};

// Send the RPC call to get block details by hash
const response = await Network.sendRpcCall(url,payload);
```

### submitEvmTx

**_- Submit EVM transaction_**  
This method is used to submit a EVM transaction.

##### Parameters:

- &nbsp; `<string>` - transaction hash
- &nbsp; `<NetworkAxiosConfig>` - (optinal) network config

##### Results:

- &nbsp; `Promise<SubmitEvmTxResult>` - An instance of `SubmitEvmTxResult` containing the response and error.

##### Example:

```jsx
const tx = "Your_TX_Hash";

// Submit a EVM transaction
const result = await Network.submitEvmTx(tx);
```

### submitTransaction

**_- Submit transation_**  
This method is used to submit a transaction

##### Parameters:

- &nbsp; `<TransactionData>` - (optinal) transaction data
- &nbsp; `<NetworkAxiosConfig>` - (optinal) network config

##### Results:

- &nbsp; `Promise<SubmitTransactionDataResult>` - An instance of `SubmitTransactionDataResult` containing the response and error.

##### Example:

```jsx
const data = `Your_Transaction_Data`;

// Submit transaction
const txResult = await Network.submitTransaction(data);
```
