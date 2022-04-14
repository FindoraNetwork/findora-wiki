---
sidebar_position: 4
---

# Abar transfer

Below you can see an example of how to perform `abar transfer` operation (a.k.a. `abar to abar`).

```ts
// An instance of the Anonymous wallet, where the `abar` would be sent from
const anonKeysSender = {
  axfrPublicKey: "-Gdf_hulMdWPeC2dG3RG-Hjo8yLTdWnPfB5csEGkbmg=",
  axfrSecretKey:
    "z4atlAssg_PcVa05__EXB5VbT23JF4mSdAuCUa2-fQn4Z2P-G6UzNY94LbcbdEb4eOhbItPZac8AHlywQaRbaA==",
  decKey: "1Js-MFSVJipTNL-y09zkSBakd15WLK-SfAUTTfsUInE=",
  encKey: "bim4EWU_PnClrNiVpKen4DZ0v-RwsVLSUtZy7PXCOCc=",
};

// An instance of the Anonymous wallet, where the `abar` would be sent to
const anonKeysReceiver = {
  axfrPublicKey: "T_0kQOWEToeg53Q8dS8eej91sJKVBEV2f7rs7Btz5CY=",
  axfrSecretKey:
    "HVdrTiyyL6dFBqq7HvPjYgACG1eIF6-pgvc-OomswAhP_SRA5YROh6DndDx1Lx56P3WwkpUERXZ_uuzsG3PkJg==",
  decKey: "GMzcWMbWz41hO5AEpXk1q1XYr8wpkq_zRscrxqg7TW0=",
  encKey: "nGfox4UJTBHCjiUMUmyUolyOGMAmR25ktfEYOZXTJ0s=",
};

const abarToAbar = async () => {
  // First we need to provide a randomizer string for the abar which we would `transfer` to another anonymous wallet
  const givenRandomizerToTransfer =
    "FRghJ4uC3E4yJ4a9pFydogXRNLt2nvRZrrKd6woDMFQs";

  // `abar to abar` fee is also paid using an abar data, so to cover the fee for the operation
  // we need to provide another randomizer (there might be more than one).
  // It would be used solely to pay the fee for the operation
  const givenRandomizersToPayFee = [
    "CdhXbHX1Fb22LH4mNcw1es8rA2RnmA9Xjmb1hmPuQAmu",
  ];

  // Just a helper varibale to keep all the randomizers which belong to a sender in one place
  // It would be updated with a new randomizer later
  const givenRandomizersListSender = [
    givenRandomizerToTransfer,
    ...givenRandomizersToPayFee,
  ];

  // Abars data, which would be used to pay the fee, is also stored in a container for convenience purposes
  const additionalOwnedAbarItems = [];

  // Transfer operation would require instances of abars, which will be created (restored)
  // using given randomizer strings
  const ownedAbarsResponseOne = await TripleMasking.getOwnedAbars(
    anonKeysSender.axfrPublicKey,
    givenRandomizerToTransfer
  );

  const [ownedAbarToUseAsSource] = ownedAbarsResponseOne;

  for (let givenRandomizerToPayFee of givenRandomizersToPayFee) {
    const ownedAbarsResponseTwo = await TripleMasking.getOwnedAbars(
      anonKeysSender.axfrPublicKey,
      givenRandomizerToPayFee
    );

    const [additionalOwnedAbarItem] = ownedAbarsResponseTwo;

    additionalOwnedAbarItems.push(additionalOwnedAbarItem);
  }

  // Amount of funds to be sent. For custom asset it has to match with the amount of the ownedAbarToUseAsSource abar
  const amount = "3";

  // Next is a key method, which returns 2 things:
  // - an instance of the anonTransferOperationBuilder, which would be used to submit the generated tx to the network
  // - an object with the information about the mapping for the new randomizers, which contains remanined funds after paying the fee, as well as the receiver randomizer inforamtion
  const { anonTransferOperationBuilder, abarToAbarData } =
    await TripleMasking.abarToAbar(
      anonKeysSender,
      anonKeysReceiver,
      amount,
      ownedAbarToUseAsSource,
      additionalOwnedAbarItems
    );

  // Then we submut the transaction to the network to finalize the operation
  // and, as a result we receive a transaction hash
  const resultHandle = await Transaction.submitAbarTransaction(
    anonTransferOperationBuilder
  );

  // Here we simply wait for 17s until next block is produced by the network
  await sleep(17000);

  // Now we are processing the randomizers mapping returned by the `abar to abar` operation
  // to update a `givenRandomizersListSender` list of randomizers with the randomizers which belong to the sender
  // and vice versa for the receiver.
  // It is very important to preserve this data and have it properly processed, otherwise both receiver and sender
  // will lose their funds
  const { randomizersMap } = abarToAbarData;

  const retrivedRandomizersListReceiver = [];

  for (const randomizersMapEntry of randomizersMap) {
    const { radomizerKey, randomizerAxfrPublicKey } = randomizersMapEntry;

    if (randomizerAxfrPublicKey === anonKeysSender.axfrPublicKey) {
      givenRandomizersListSender.push(radomizerKey);
    }

    if (randomizerAxfrPublicKey === anonKeysReceiver.axfrPublicKey) {
      retrivedRandomizersListReceiver.push(radomizerKey);
    }
  }
};
```
