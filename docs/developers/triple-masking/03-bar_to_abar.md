---
sidebar_position: 2
---

# Bar to Abar

Below you can see an example of how to perform `bar to abar` operation.

```ts
// An instance of the Anonymous wallet, where `bar to abar` would be sent to
const myAnonWallet = {
  axfrPublicKey: "-Gdf_hulMdWPeC2dG3RG-Hjo8yLTdWnPfB5csEGkbmg=",
  axfrSecretKey:
    "z4atlAssg_PcVa05__EXB5VbT23JF4mSdAuCUa2-fQn4Z2P-G6UzNY94LbcbdEb4eOhbItPZac8AHlywQaRbaA==",
  decKey: "1Js-MFSVJipTNL-y09zkSBakd15WLK-SfAUTTfsUInE=",
  encKey: "bim4EWU_PnClrNiVpKen4DZ0v-RwsVLSUtZy7PXCOCc=",
};

const barToAbar = async () => {
  // First, we create an instance of a Findora Wallet using given password
  // and wallet private key. This object will be our "sender" wallet
  const password = "1234qwe!weUR^";
  const pkey = "YOUR_WALLET_PRIVATE_KEY";
  const walletInfo = await Keypair.restoreFromPrivateKey(pkey, password);

  // At the moment, triple masking only support sending one specific UTXO to the `bar to abar` operation.
  // In the future there would be added support of sending any amount
  // So, `sid` in the next line is the numeric number of the UTXO which would be sent to the operation
  const sid = 30;

  // Next is a key method, which returns 3 things:
  // - an instance of the transactionBuilder, which would be used to submit the generated tx to the network
  // - an object with the information about the unique hash (a commitment)
  // - a number representing the UTXO sid, which was used for the `bar to abar` operation
  const {
    transactionBuilder,
    barToAbarData,
    sid: usedSid,
  } = await TripleMasking.barToAbar(walletInfo, sid, myAnonWallet);

  // Then we retrieve transaction data (to be broadcasted)
  const submitData = transactionBuilder.transaction();

  // Finally, we submut the transaction to the network to finalize the `bar to abar` operation
  // and, as a result we receive a transaction hash
  const result = await Network.submitTransaction(submitData);
  const { response: resultHandle } = result;

  const { axfrPublicKey: formattedAxfrPublicKey } =
    barToAbarData.anonKeysFormatted;

  // The only way to get access to the funds from the `abar` is to ensure that commitment is saved
  // after the operation is completed and transaction is broadcasted.
  // `givenCommitment` MUST be saved in order to get access to the funds later.
  const [givenCommitment] = barToAbarData.commitments;

  // Here we simply wait for 17s until next block is produced by the network
  await sleep(17000);

  // Optionally, we can check `owned` abars using a retirived commitment
  // and a unique key of the anonymous wallet
  const ownedAbarsResponse = await TripleMasking.getOwnedAbars(
    formattedAxfrPublicKey,
    givenCommitment
  );
};
```
