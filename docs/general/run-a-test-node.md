---
sidebar_position: 3
---

# Run a Findora TestNet Node

Whether you're interested in contributing to Findora, building apps, or joining the validator pool, you'll want the ability to run your own full node.


# Introduction
Build a full node in your server and connect to the Findora Alpha/Mainnet network.
Alpha network is for the integration and test only.

The test network can define assets and publish unlimited assets

### System requirements

#### OS
+ [x] Linux(Ubuntu)
+ [x] Macos
+ [ ] window os


### Public Ip ports requirements
+[Optional] 8667, query server(data cache from ledger)  
+[Optional] 8668, ledger server(data direct from ledger)  
+[Optional] 8669, transaction submission service  
+[Optional] 26657, tendermint rpc service 
+26656, qtendermint p2p network service 
### Comparison of network parameters in different environments

> For the convenience of the test network, some parameters are different from the main network

|  Project   | Testnet  | Mainnet  |
|  :----:  | :----:  | :----:  |
| import block interval   | 6s | 16s |
| Unlock period | 5 * 5s | 3600 * 24 * 21s |

# Test network

 application install
+ linux
```shell
wget  https://github.com/FindoraNetwork/iii/releases/download/fnstest/tendermint.linux

wget  https://github.com/FindoraNetwork/iii/releases/download/fnstest/abci_validator_node.linux

wget  https://github.com/FindoraNetwork/iii/releases/download/fnstest/fns.linux

wget  https://github.com/FindoraNetwork/iii/releases/download/fnstest/stt.linux

### remove suffix

mv tendermint.linux tendermint
mv abci_validator_node.linux abci_validator_node
mv fns.linux fns
mv stt.linux stt
chmod a+rwx  tendermint
chmod a+rwx  abci_validator_node
chmod a+rwx  fns
chmod a+rwx  stt
```

+ macos
```shell
curl -o tendermint https://github.com/FindoraNetwork/iii/releases/download/fnstest/tendermint.macos

curl -o abci_validator_node https://github.com/FindoraNetwork/iii/releases/download/fnstest/abci_validator_node.macos

curl -o fns https://github.com/FindoraNetwork/iii/releases/download/fnstest/fns.macos

curl -o stt https://github.com/FindoraNetwork/iii/releases/download/fnstest/stt.macos

chmod a+rwx  tendermint
chmod a+rwx  abci_validator_node
chmod a+rwx  fns
chmod a+rwx  stt
```

The these applications above are:

+ tendermint application 
+ findora application 
+ fns staking terminal tool 


> ### config bin to env
#### linux
```shell
echo "export PATH=$PATH:$(pwd)" >> ~/.bashrc
source ~/.bashrc
```
#### macos
```shell
echo "export PATH=$PATH:$(pwd)" >> ~/.zshrc
source ~/.zshrc
```

> ### create config and set config 
```shell
# clear old data
 rm -rf /tmp/findora ~/.tendermint
# init tendermint
tendermint init
```
after init successfully,run 

```shell
ls  ~/.tendermint/config 
```
Three files are displayed：
```shell
config.toml  genesis.json  node_key.json  priv_validator_key.json
```
### request network params and write  node config

#### install jq
#### linux
```shell
sudo apt-get install jq
```
#### macos
```shell
sudo brew install jq
```

#### write genesis config
```shell

curl https://dev-qa01.dev.findora.org:26657/genesis | jq -c  | perl -pi -e 's/^{"jsonrpc":"2.0","id":-1,"result":{"genesis"://' | perl -pi -e 's/}}$//'  | jq > ~/.tendermint/config/genesis.json
```
#### write tendermint config and set proposal block interval 5s for test network
```shell
perl -pi -e 's#(create_empty_blocks_interval = ).*#$1"5s"#' ~/.tendermint/config/config.toml

```

#### write peer address and network

```shell
perl -pi -e 's#(persistent_peers = )".*"#$1"b87304454c0a0a0c5ed6c483ac5adc487f3b21f6\@dev-qa01-us-west-2-sentry-000-public.dev.findora.org:26656,d0c6e3e1589695ae6d650b288caf2efe9a998a50\@dev-qa01-us-west-2-sentry-001-public.dev.findora.org:26656"#' ~/.tendermint/config/config.toml
```

<h2> run node</h2>

### start validator

```shell
TD_NODE_SELF_ADDR=$(cat ~/.tendermint/config/priv_validator_key.json | grep 'address' | grep -o '[^"]\{20,\}') \
LEDGER_DIR=/tmp/findora \
ENABLE_LEDGER_SERVICE=true \
ENABLE_QUERY_SERVICE=true \
abci_validator_node >/tmp/log 2>&1 &
```

#### check server port
linux
```shell
netstat -ltpn
```
macos
```shell
netstat -AaLlnW
```
show list:

*******        0 0/0/128        *.8667   
*******        0 0/0/128        *.8668   
*******        0 0/0/128        *.8669                 
*******        0 0/0/128        *.26658

If any port is missing, the application did not start successfully, please start from the first step
#### start tendermint application
```shell
nohup tendermint node>/tmp/td.log 2>&1 &
```

<h2> stt tools(only test network)</h2>

### query all account
```shell
stt show -U
```

### query all validator
```shell
 stt show -v
```
### account u1  delegate  1000000 to validator v1
```shell
 stt delegate  -n $((1000000 * 1000000)) -u u1 -v v1

```

### undelegate  u1 undelegate
```shell
stt undelegate -u u1 -n $((1000000 * 1000000)) -v v1
```
### Each additional issuance doubles the FRA supply

```shell
stt issue
```

<h2>use fns tool</h2>

### fns is official offer staking terminal tools

 set fns tool 

#### set server url
```shell
fns setup -S http://127.0.0.1:8669

```

#### set pay and staking account mnemonic
```shell
echo '[your private mnemonic]'> $(pwd)/mnemonic
fns setup -O $(pwd)/mnemonic

```
#### acquire and set tendermint  public key
```shell
echo $(grep -A 2 'pub_key' ~/.tendermint/config/priv_validator_key.json | grep '"value":' | grep -o '[^"]\+"$' | sed 's/"//') > $(pwd)/tendermint_keys
fns setup -K $(pwd)/tendermint_keys
```


### stake operator
For example, pledge 1000000, because the basic unit is 6 digits, it must be 1000000 n is the pledge amount
R is the commission rate is the commission that someone entrusts to you, and the commission you get, -M is only for this transaction.
```shell
fns stake -n $((1000000 * 1000000)) -R 0.2 -M "my remark"
```

wait for one minutes
query stake result
```shell
fns show
```

### append staking amount

```shell
fns stake -a -n $((1000000 * 1000000))

```

### unstake
```shell
fns unstake -n $((1000000 * 1000000))
```

claim reward 

```shell
fns claim -n $((1000000 * 1000000))
```


### send transfer
```shell
fns transfer -n $((1000000 * 1000000)) -t "fra***********************"
```



### Troubleshooting
The image now located in AWS North America so the downloading speed in China will be a little bit slow and sometimes it will have intermittent handshake issues. If the script fails during image download, please run the script again.

### Update
We will be updating this repo frequently, so please run git pull before you run the code.

We will send a notification when the new version release.
