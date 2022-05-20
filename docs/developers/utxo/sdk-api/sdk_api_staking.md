---
sidebar_position: 5
---

# Staking

### claim

**_- Claim FRA Token Rewards_**  
This function enables users to claim rewards earned from staking FRA tokens.

##### Parameters:

- &nbsp; `<WalletKeypar>` - Wallet keypair
- &nbsp; `<string>` - the amout of rewards which users wants to claim

##### Results:

- &nbsp; `Promise<TransactionBuilder>` - TransactionBuilder which should be used in `Transaction.submitTransaction`.

##### Example:

```jsx
const walletInfo = await Keypair.restoreFromPrivateKey(pkey, password);

// First, we create a transaction builder
const assetBuilder = await Asset.defineAsset(walletInfo, assetCode);

// Then, we submit a transaction
const handle = await Transaction.submitTransaction(assetBuilder);
```

### delegate

**_- Delegates FRA tokens_**  
This function allows users to delegate FRA tokens to a validator.  
This functionality is nearly identical to Transaction.sendToAddress except it adds one additional operation (i.e. add_operation_delegate) to the transaction builder.

##### Parameters:

- &nbsp; `<WalletKeypar>` - Wallet keypair
- &nbsp; `<string>` - Target address for delegation
- &nbsp; `<string>` - delegation amout
- &nbsp; `<string>` - Asset Code
- &nbsp; `<string>` - Target validator Address
- &nbsp; `<AssetBlindRules>` - (optional) Confidential options for blind rule

##### Results:

- &nbsp; `Promise<TransactionBuilder>` - TransactionBuilder which should be used in `Transaction.submitTransaction`.

##### Example:

```jsx
const ledger = await getLedger();

// This is the address funds are sent to.
// Actual `transfer to validator` process would be handled via added `add_operation_delegate` operation

const delegationTargetPublicKey = Ledger.get_delegation_target_address();
const delegationTargetAddress = await Keypair.getAddressByPublicKey(
  delegationTargetPublicKey
);

const walletInfo = await Keypair.restoreFromPrivateKey(pkey, password);

const assetCode = await Asset.getFraAssetCode();

const assetBlindRules: Asset.AssetBlindRules = {
  isTypeBlind: false,
  isAmountBlind: false,
};

const transactionBuilder = await StakingApi.delegate(
  walletInfo,
  delegationTargetAddress,
  amount,
  assetCode,
  validatorAddress,
  assetBlindRules
);

const resultHandle = await Transaction.submitTransaction(transactionBuilder);
```

### getDelegateInfo

**_- Get the delegation information_**  
This method is used to get the delegation information

##### Parameters:

- &nbsp; `<string>` - wallet address

##### Results:

- &nbsp; `Promise<DelegateInfoResponse>` - An instance of `DelegateInfoDataResult` containing the response and error..

##### Example:

```jsx
const address = "fra123sxde";

// Get the delegation information
const delegateInfo = await StakingApi.getDelegateInfo(address);
```

### getValidatorList

**_- Get validator list_**  
This method is used to get the list of validators.

##### Results:

- &nbsp; `Promise<validatorListResponse>` - An instance of `validatorListResponse` containing the response and error..

##### Example:

```jsx
// Get validator list
const validatorList = await StakingApi.getValidatorList();
```

### unStake

**_- Unstake FRA tokens_**  
This function allows users to unstake (aka unbond) FRA tokens.

##### Parameters:

- &nbsp; `<WalletKeypar>` - Wallet keypair
- &nbsp; `<string>` - the amount users wants to unstake
- &nbsp; `<string>` - validator's address
- &nbsp; `<boolean>` - fully unstake option. Default is `false`

##### Results:

- &nbsp; `Promise<TransactionBuilder>` - TransactionBuilder which should be used in `Transaction.submitTransaction`.

##### Example:

```jsx
const walletInfo = await Keypair.restoreFromPrivateKey(pkey, password);

// Define whether or not user desires to unstake all the tokens, or only part of the staked amount
const isFullUnstake = false;

const transactionBuilder = await StakingApi.unStake(
  walletInfo,
  amount,
  validator,
  isFullUnstake
);

const resultHandle = await Transaction.submitTransaction(transactionBuilder);
```
