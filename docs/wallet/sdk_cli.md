---
sidebar_position: 2
---

# SDK CLI

This guide will enable developers to use `CLI commands` from the `Findora SDK`, which provides a quick **_shortcut_** to perform some, most frequently used, actions using one comand syntax.

### **Installing and Setting Up the `Findora SDK`**

To be able to use `Findora SDK CLI` we would need to clone its repo and install its dependencies.

For that, first, we would need to run

```bash
git clone https://github.com/FindoraNetwork/findora-sdk.git
```

Then we are going to change the directory to the cloned version of the `Findora SDK` by running:

```bash
cd findora-sdk
```

After that, we would install all its dependencies:

```bash
yarn
```

Once it is done, we can check if `CLI` is ready to use and the easiest way to do that would be to run:

```bash
yarn cli
```

Here we should see smth like:

```bash
 ~/t/t/findora-sdk $ yarn cli
yarn run v1.22.11
$ yarn cli:build && yarn cli:run "$npm_config"
$ tsc
$ nodemon dist/cli.js --ignore cache/ "$npm_config" ''
[nodemon] 2.0.15
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `node dist/cli.js "" ""`
"2021-12-14, 11:36:39 a.m." - please run as "yarn cli fund --address=fraXXX --amountToFund=1 "
"2021-12-14, 11:36:39 a.m." - please run as "yarn cli createWallet"
"2021-12-14, 11:36:39 a.m." - please run as "yarn cli restoreWallet --mnemonicString='XXX ... ... XXX'"
[nodemon] clean exit - waiting for changes before restart
```

Adn that means we are all set and ready to use the `Findora SDK CLI`.

### **CLI Commands**

**1.** **List of all Findora SDK CLI commands and its options**

To see a list of the currently implemented commands, as well as to get help of how to use those, plese run:

```bash
yarn cli
```

In the output you will see a list of all the available CLI commands and its options:

```bash
"2021-12-08, 12:07:09 p.m." - please run as "yarn cli fund --address=fraXXX --amountToFund=1 "
"2021-12-08, 12:07:09 p.m." - please run as "yarn cli createWallet"
"2021-12-08, 12:07:09 p.m." - please run as "yarn cli restoreWallet --mnemonicString='XXX ... ... XXX'"
```

As you can see, at the moment there are three available commands:

- fund
- createWallet
- runRestoreWallet

**2.** **"fund" command**

By running `yarn cli fund --address=fraXXX --amountToFund=1` you would **fund** an address `fraXXX` with the amount of `1 FRA`.

Please note, that the **source** of funding is **another account** that you have a private key for, which must have some funds in it. Like your own _faucet_.

This account would be restored from the **private key**, which needs to be provided in the `.env` file, using following format:

```env
PKEY_LOCAL_FAUCET="XAsFsKosjY8J=XXXXXXXXXX";
```

So, **prior** to running this command, you would need to create a `.env` file and put that information in there. After that, you would be able to perform a quick, one line command to send FRA to other addresses (to _fund_ them).

**2.** **"createWallet" command**

In case of a need to quickly create a new wallet, you can use `yarn cli createWallet` command to create a new wallet, as well as to get its mnemonic, address, private and public keys.

This information would be displayed as a command output, and would look smth like:

```bash
[nodemon] starting `node dist/cli.js "" "" createWallet`
"2021-12-08, 12:22:06 p.m." - 🚀 ~ new mnemonic: "output insect settle weather spray lava seven day rice swamp captain upgrade layer ocean century kitten feel crunch fly huge power divert amused fitness"
"2021-12-08, 12:22:06 p.m." - 🚀 ~ new wallet info:  [
  {
    keyStore: Uint8Array(104) [
       16,  51,  89, 254,  22,  53, 133,  79, 253, 182,  55, 161,
      213,  15, 157, 231,  66,   7, 255, 188,   8, 122,  16, 124,
      223,  86, 162, 198, 211,  51, 251,  14,   2, 140, 195, 238,
      235, 184, 250, 169, 162,  97, 217,  99,  62, 117,  61,  57,
       75, 167, 208,  16, 100, 199, 215, 147, 166,  40,  81,   6,
      180, 194, 114,  10, 180,  77, 159,  65,  60, 254, 166, 212,
       92, 246, 202, 137, 255, 243, 236, 127, 123, 228,  95,  23,
       65, 224,   6, 208, 104, 131, 156,  76, 255, 201,  90,  92,
       48, 147, 144, 222,
      ... 4 more items
    ],
    publickey: 'C_0GxCvI8OBYZRO9mNZOhh8MykvOrOLx7F7U-ug8vUM=',
    address: 'fra1p07sd3ptercwqkr9zw7e34jwsc0sejjte6kw9u0vtm2046puh4pszj0rs4',
    keypair: XfrKeyPair { ptr: 2425208 },
    privateStr: 'epG6XtjssaZdyCyRwijTQM92ptqyScZRtMz1lpRC-O8='
  }
]

```

As you could see, you got a new mnemonic, which is:

```
output insect settle weather spray lava seven day rice swamp captain upgrade layer ocean century kitten feel crunch fly huge power divert amused fitness
```

Also, here is the address, and both keys

```js
    publickey: 'C_0GxCvI8OBYZRO9mNZOhh8MykvOrOLx7F7U-ug8vUM=',
    address: 'fra1p07sd3ptercwqkr9zw7e34jwsc0sejjte6kw9u0vtm2046puh4pszj0rs4',
    privateStr: 'epG6XtjssaZdyCyRwijTQM92ptqyScZRtMz1lpRC-O8='
```

You could store these values for later use.

**3.** **"restoreWallet" command**

In case you need to **restore** a previously created wallet, (for example to use it as a **sender**, or to check its private key), the only thing you need to do, is to run `yarn restoreWallet --mnemonicString='XX XXXX"` and provide a valid mnemonic string.

For example, if we need to restore the wallet, which was created in the previous examples, we would've run it as:

```bash
yarn restoreWallet --mnemonicString="output insect settle weather spray lava seven day rice swamp captain upgrade layer ocean century kitten feel crunch fly huge power divert amused fitness"
```

This command could produce output similar to smth like this:

```bash
[nodemon] starting `node dist/cli.js "" "" restoreWallet "--mnemonicString=output insect settle weather spray lava seven day rice swamp captain upgrade layer ocean century kitten feel crunch fly huge power divert amused fitness"`
"2021-12-08, 12:29:45 p.m." - 🚀 ~ mnemonic to be used: "output insect settle weather spray lava seven day rice swamp captain upgrade layer ocean century kitten feel crunch fly huge power divert amused fitness"
"2021-12-08, 12:29:45 p.m." - 🚀 ~ restored wallet info:  [
  {
    keyStore: Uint8Array(104) [
      207, 167, 239, 154, 208, 138, 170, 153, 134,  69,  99, 225,
       26, 112, 166,  57, 218,  63, 155,  38, 124, 243, 207, 226,
      169, 247,  70,  67, 254,  42, 232,  28,  48, 112,  78,  83,
      118,  26, 218,  25,  84,  13, 196, 172, 127,  97,  98, 100,
      216, 129,  62,  98,  99, 135,  99,  25, 113,  99,  36, 134,
      155, 184, 254, 153,   1, 115,  38, 213,  30, 202,  68, 166,
       30,  99, 121, 118, 219, 111, 250, 202, 135, 116, 151,  66,
      189,  50, 242, 140, 209, 202,  89, 252,   2, 184, 102, 205,
      110, 219, 225,  60,
      ... 4 more items
    ],
    publickey: 'C_0GxCvI8OBYZRO9mNZOhh8MykvOrOLx7F7U-ug8vUM=',
    address: 'fra1p07sd3ptercwqkr9zw7e34jwsc0sejjte6kw9u0vtm2046puh4pszj0rs4',
    keypair: XfrKeyPair { ptr: 2424840 },
    privateStr: 'epG6XtjssaZdyCyRwijTQM92ptqyScZRtMz1lpRC-O8='
  }
]


```

Here you could see that data from the restored wallet (its address, private and public keys) are identical to the values from the `createWallet` command output, because we used the same menmonic, which was auto-generated and used to create a new wallet.
