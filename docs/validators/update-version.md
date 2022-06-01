---
sidebar_position: 4
---

# Version Update
## Update Image Version

The following scripts can be used in any environment to update the image version.

- For Testnet: [**version_update_testnet.sh**](./scripts/update_version_testnet.sh)
- For Mainnet: [**version_update_mainnet.sh**](./scripts/update_version_mainnet.sh)
  
Example:
```
bash -x version_update_testnet.sh
```

## Auto Safety Clean

Use the following scripts to clean the data and restart the validator. Please note that this script WILL NOT clean your validator ID and wallet data. 

Before running the script, make sure to set Environment Path Variables. Set `$ROOT_DIR` to the same path as used in the setup.

- For Testnet: [**safety_clean_testnet.sh**](./scripts/safety_clean_testnet.sh)
- For Mainnet:[**safety_clean_mainnet.sh**](./scripts/safety_clean_mainnet.sh)

Example:
```
bash -x safety_clean_testnet.sh
```