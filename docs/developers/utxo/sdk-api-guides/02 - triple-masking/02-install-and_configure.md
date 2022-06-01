---
sidebar_position: 1
---

# SDK Installation

To perform any `Triple Masking` operation, user needs to install and configure the SDK first.

## **Installing and Configuring the `Findora SDK`**

To install the `Findora SDK`, clone its Github repo and install its dependencies.

Please, prior to the **SDK** installation, make sure that you have installed:

- git
- node (at least version v15.13.0)
- yarn

First, run the command below in your terminal to download the repo:

```bash
git clone https://github.com/FindoraNetwork/findora-sdk.git
```

Next, change the directory to the cloned version of the `Findora SDK:

```bash
cd findora-sdk
```

After that, switch to the `feat_triple_masking_feature` branch:

```bash
git checkout feat_triple_masking_feature
```

Then, install all SDK dependencies:

```bash
yarn
```

**NOTE:** For more details about configuring and integrating `Findora SDK` please refer to the [SDK integration page](../utxo/sdk_integration).
