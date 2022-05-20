---
sidebar_position: 7
---

# Helpers

### getBlockTime

**_- Get Block Time by given block height._**  
Using this function, user can get block time by given block height

##### Parameters:

- &nbsp; `<number>` - block height

##### Results:

- &nbsp; `Promise<undefined | string>` - Block time

##### Example:

```jsx
const blockHeight = 2341;
// Get block time at Block #2341
const blockTime = await helpers.getBlockTime(blockHeight);
```

### getTxListFromResponse

**_- Get Transaction List by given transaction data response._**  
Using this function, user can Get Transaction List by given transaction data response

##### Parameters:

- &nbsp; `<TxListDataResult>` - transaction data response

##### Results:

- &nbsp; `Promise<null | TxInfo[]>` - transaction list

##### Example:

```jsx
const address = "fra12dsfew";
const type = "to";
const dataResult = await Network.getTxList(address, type);
// Get tx list
const txList = await helpers.getTxListFromResponse();
```

### getTxOperationsList

**_- Get Operation List by given parsed transaction_**  
Using this function, user can Get Transaction List by given parsed transaction

##### Parameters:

- &nbsp; `<ParsedTx>` - parsed tx info

##### Results:

- &nbsp; `TxOperation[]>` - transaction operation list

##### Example:

```jsx
const address = "fra12dsfew";
const type = "to";
const dataResult = await Network.getTxList(address, type);
// Get tx list
const txList = await helpers.getTxListFromResponse();
// Get one parsed tx
parsedTx = JSON.parse(Base64.decode(txList[0].tx));
// Get operation Lsit
opList = helpers.getTxOperationsList(parsedTx);
```
