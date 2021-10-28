---
sidebar_position: 4
---
# Change Log

## 2021-08-10

> - git tag: `testnet-v0.2.0-monkey-7`
> - git commit: `ed4baf88e855ebf7aa39a25d1cbee8a068ac6cbf`

- Upgrade stability: switch to the stable channel of rust language
- Upgrade binaries: use `findorad` instead of `tendermint + abci_validator_node`
- Upgrade distribution methods: from binaries to docker images
- Support update the memo infomations of validator

## 2021-07-30

> - git commit: `1d53d795ff220b6b47b2b5968576e8a5d43f505f`

- Support to send confidential transactions in `fn`
- Support command line options in `abci_validator_node`
    - the traditional environment VARs will still be supported
- Add a `--version` option to `abci_validator_node`/`fn`/`stt`
- Use the full 40-bytes hash as the binary version
- `fn show` will print the detail infomations of your validator in the `Your Staking` part
- `fn genkey` will not produce cmdline-unfriendly results anymore, such as a public key with a '-' prefix
- Move the default config path of `fn` from `/tmp` to `$HOME`
    - to prevent the data losting after an OS-restarting
- Prevent stakers to be punished during the very beginning joint process in `fn` tool
    - stakers will be warned if they try to do staking while their syncing has not been finished
- Support to set and update validator's information, such as `website`,`name`,`logo` etc
- Show validator's information in `validator_list` and `validator_detail` api
- Add an API to query validator's delegation history
