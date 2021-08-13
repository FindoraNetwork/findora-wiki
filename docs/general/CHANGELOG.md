# Change Logs

## 2021-08-10

> - git tag: `testnet-v0.2.0-monkey-7`
> - git version: `ed4baf88e855ebf7aa39a25d1cbee8a068ac6cbf`

- upgrade stability: switch to the stable channel of rust language
- upgrade binaries: use `findorad` instead of `tendermint + abci_validator_node`
- upgrade distribution methods: from binaries to docker images
- support update the memo infomations of validator

## 2021-07-30

> - git version: `1d53d795ff220b6b47b2b5968576e8a5d43f505f`

- Support to send confidential transactions in `fns`
- Support command line options in `abci_validator_node`
    - the traditional environment VARs will still be supported
- Add a `--version` option to `abci_validator_node`/`fns`/`stt`
- Use the full 40-bytes hash as the binary version
- `fns show` will print the detail infomations of your validator in the `Your Staking` part
- `fns genkey` will not produce cmdline-unfriendly results anymore, such as a public key with a '-' prefix
- Move the default config path of `fns` from `/tmp` to `$HOME`
    - to prevent the data losting after an OS-restarting
- Prevent stakers to be punished during the very beginning joint process in `fns` tool
    - stakers will be warned if they try to do staking while their syncing has not been finished
- Support to set and update validator's information, such as `website`,`name`,`logo` etc
- Show validator's information in `validator_list` and `validator_detail` api
- Add an API to query validator's delegation history
