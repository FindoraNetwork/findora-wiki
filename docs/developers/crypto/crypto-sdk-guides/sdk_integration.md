---
sidebar_position: 1
---

# Crypto SDK Guide


This guide will show you how `Yellow Submarine` allows users to convert an asset to a private asset and transfer it to a brand new wallet address by `Findora Triple Masking`.

It conducts two ZKP operations:
- transfer asset to `anonymous wallet` from `wallet A`. **(bar to abar)**
- transfer asset to `wallet B` from `anonymous wallet`. **(abar to bar)**

The combination of these two operations is the key to removing the trace.

## **Installing the `Findora SDK`**

To install the `Findora SDK` we only need to run one single command:

```bash
yarn add @findora-network/findora-sdk.js
```

## **1. Setup the Findora SDK**

```ts
  // Top-level await
  const findoraSdk = await import('@findora-network/findora-sdk.js');
  const findoraWasm = await findoraSdk.getWebLedger();

  const { Network: NetworkApi, Transaction: TransactionApi } = findoraSdk.Api;
```

## **2. Create two Findora Wallet**
```ts
  // create a Findora Wallet, this wallet will be the source wallet
  const keypairA = findoraWasm.new_keypair();
  const walletA = {
    keypair: keypairA,
    keyStore: findoraWasm.keypair_to_str(keypairA),
    privateKey: findoraWasm.get_priv_key_str(keypairA).replace(/\"/g, ''),
    publickey: findoraWasm.get_pub_key_str(keypairA).replace(/\"/g, ''),
    address: findoraWasm.public_key_to_bech32(findoraWasm.get_pk_from_keypair(keypairA)),
  };

  // create another Findora Wallet, this wallet will be the destination wallet
  const keypairB = findoraWasm.new_keypair();
  const walletB = {
    keypair: keypairB,
    keyStore: findoraWasm.keypair_to_str(keypairB),
    privateKey: findoraWasm.get_priv_key_str(keypairB).replace(/\"/g, ''),
    publickey: findoraWasm.get_pub_key_str(keypairB).replace(/\"/g, ''),
    address: findoraWasm.public_key_to_bech32(findoraWasm.get_pk_from_keypair(keypairB)),
  };
```

## **3. Create a Findora Anonymous Wallet**

```ts
  // create a Findora Anonymous Wallet
  const anonKeys = findoraWasm.gen_anon_keys();
  const anonWallet = {
    axfrPublicKey: anonKeys.axfr_public_key,
    axfrSecretKey: anonKeys.axfr_secret_key,
    decKey: anonKeys.dec_key,
    encKey: anonKeys.enc_key,
  };

  // release the anonymous keys instance
  anonKeys.free();
```

## **4. Bar to Abar**

```ts
  // create an instance of the transaction builder
  const transactionBuilder = await TransactionApi.getTransactionBuilder();

  // get the informance of the UTXO by specific sid
  const { response: [sid] } = await NetworkApi.getOwnedSids(walletA.address);
  const { response: utxo } = await NetworkApi.getUtxo(sid);
  const { response: ownerMemoData } = await NetworkApi.getOwnerMemo(sid);

  const ownerMemo = ownerMemoData ? findoraWasm.OwnerMemo.from_json(ownerMemoData) : null;
  const assetRecord = findoraWasm.ClientAssetRecord.from_json(utxo);

  // the destination anonymous wallet
  const axfrPublicKey = findoraWasm.axfr_pubkey_from_string(anonWallet.axfrPublicKey);
  const encKey = findoraWasm.x_pubkey_from_string(anonWallet.encKey);

  const keypair = findoraWasm.keypair_from_str(walletA.keyStore as string);

  // add_operation_bar_to_abar will return a instance of the transactionBuilder, which would be used to submit the generated tx to the network
  transactionBuilder = transactionBuilder.add_operation_bar_to_abar(
    keypair,
    axfrPublicKey,
    BigInt(sid),
    assetRecord,
    ownerMemo?.clone(),
    encKey,
  );

  // The only way to get access to the funds from the `abar` is to ensure that commitment is saved
  // after the operation is completed and transaction is broadcasted.
  // `commitments` MUST be saved in order to get access to the funds later.
  const commitments = transactionBuilder?.get_commitments();

  // Finally, broadcast this transaction to the network
  await TransactionApi.submitTransaction(transactionBuilder.transaction());
```

## **5. Abar to Bar**
```ts
  // create an instance of the transaction builder
  const transactionBuilder = await TransactionApi.getTransactionBuilder();

  // the destination wallet
  const receiverXfrPublicKey = findoraWasm.public_key_from_base64(walletB.publickey);

  // the source anonymous wallet
  const aXfrKeyPairSender = findoraWasm.axfr_keypair_from_string(anonWallet.axfrSecretKey);
  const secretDecKeySender = findoraWasm.x_secretkey_from_string(anonWallet.decKey);

  // we need to provide a commitment string which we would `transfer` to the destination wallet
  const commitment = 'YOUR_COMMITMENT';

  // `Abar to Bar` operation would require instances of abar, which will be created (restored)
  // using the commitment strings
  const { response: ownedAbarsResponse } = await NetworkApi.getOwnedAbars(commitment);
  const [atxoSid, _ownedAbar] = ownedAbarsResponse;
  // instances of abar
  const ownedAbar = findoraWasm.abar_from_json(_ownedAbar);

  // get the informance of the abar
  const { response: abarOwnerMemoData } = await NetworkApi.getAbarOwnerMemo(atxoSid);
  const { response: mtLeafInfoData } = await NetworkApi.getMTLeafInfo(atxoSid);
  const abarOwnerMemo = findoraWasm.OwnerMemo.from_json(abarOwnerMemoData);
  const mTLeafInfo = findoraWasm.MTLeafInfo.from_json(mtLeafInfoData);

  // add_operation_abar_to_bar will return a instance of the transactionBuilder, which would be used to submit the generated tx to the network
  transactionBuilder = transactionBuilder.add_operation_abar_to_bar(
    ownedAbar,
    abarOwnerMemo,
    mTLeafInfo,
    aXfrKeyPairSender,
    secretDecKeySender,
    receiverXfrPublicKey,
    false,
    false,
  );

  // Finally, broadcast this transaction to the network
  await TransactionApi.submitTransaction(transactionBuilder.transaction());
```
