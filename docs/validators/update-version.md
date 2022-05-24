---
sidebar_position: 6
---

# Version Update
## Update Image Version

> **! NOTE !**
>
> If you just want to update the image version. use this script.
> 



- For testnet: [**version_update_testnet.sh**](./scripts/update_version_testnet.sh)
- For mainnet: [**version_update_mainnet.sh**](./scripts/update_version_mainnet.sh)
  
> **Tips**:
> * You can use this script in any environment
> * example: `bash -x update_version.sh`

## Safety clean

> **! NOTE !**
>
> This script WILL NOT clean your validator id and wallet data. It just clean the data and restart the validator.

> 

#### Set Environment Path Variables

Please set `$ROOT_DIR` same as setup step.

#### Auto clean

- For testnt: [**safety_clean_testnet.sh**](./scripts/safety_clean_testnet.sh)
- For mainnet:[**safety_clean_mainnet.sh**](./scripts/safety_clean_mainnet.sh)

> **Tips**:
> * example: `bash -x safety_clean.sh`

