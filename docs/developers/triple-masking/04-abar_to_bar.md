---
sidebar_position: 3
---

# Abar to Bar

Below you can see an example of how to perform `abar to bar` operation.

```ts
// An instance of the Anonymous wallet, where `abar to bar` would be sent from
const anonKeysSender = {
  axfrPublicKey: "-Gdf_hulMdWPeC2dG3RG-Hjo8yLTdWnPfB5csEGkbmg=",
  axfrSecretKey:
    "z4atlAssg_PcVa05__EXB5VbT23JF4mSdAuCUa2-fQn4Z2P-G6UzNY94LbcbdEb4eOhbItPZac8AHlywQaRbaA==",
  decKey: "1Js-MFSVJipTNL-y09zkSBakd15WLK-SfAUTTfsUInE=",
  encKey: "bim4EWU_PnClrNiVpKen4DZ0v-RwsVLSUtZy7PXCOCc=",
};

const abarToBar = async () => {
  // First, we would create an instance of a Findora Wallet using given password
  // and wallet private key. This object would be our "reciever" wallet
  const password = "1234qwe!weUR^";
  const pkey = "YOUR_WALLET_PRIVATE_KEY";
  const walletInfo = await Keypair.restoreFromPrivateKey(pkey, password);

  // Next we need to provide a commitment string which we would `transfer` to our wallet
  const givenCommitmentOne = "7TVrrpvFgH5C5jSYXxfyYZVS5ZGLVH7oWMuAMSjH8Nsg";

  // `abarToBar` operation would require instances of abars, which will be created (restored)
  // using given commitment strings
  // In the lines below we create `ownedAbarToUseAsSource` and `ownedAbarToUseAsFee` which
  // represents two abars, created from the given commitments
  const ownedAbarsResponseOne = await TripleMasking.getOwnedAbars(
    anonKeysSender.axfrPublicKey,
    givenCommitmentOne
  );

  // This abar would be sent to the user wallet
  const [ownedAbarToUseAsSource] = ownedAbarsResponseOne;

  const ownedAbarsResponseTwo = await TripleMasking.getOwnedAbars(
    anonKeysSender.axfrPublicKey,
    givenCommitmentTwo
  );

  // Next is a key method, which returns 2 things:
  // - an instance of the transactionBuilder, which would be used to submit the generated tx to the network
  // - an object with the information about the new commitment, which contains remanined funds after paying the fee
  // NOTE: since the abar which was used to pay the fee is being decoded and used, and its amount might be way
  // more then it was needed to cover the fee, in order to NOT lose the remained balance of that abar,
  // user must save the new commitment, available in abarToBarData.commitments property
  const { transactionBuilder, abarToBarData } = await TripleMasking.abarToBar(
    anonKeysSender,
    walletInfo,
    ownedAbarToUseAsSource
  );

  // Then we submut the transaction to the network to finalize the `bar to abar operation`
  // and, as a result we receive a transaction hash
  const resultHandle = await Transaction.submitTransaction(transactionBuilder);

  // Here we simply wait for 17s until next block is produced by the network
  await sleep(17000);
};
```
