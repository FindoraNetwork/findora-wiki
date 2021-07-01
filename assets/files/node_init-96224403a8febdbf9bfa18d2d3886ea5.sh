#!/usr/bin/env bash

ENV_NAME=$1
SERV_URL=https://dev-qa01.dev.findora.org
if [[ "testnet" == $ENV_NAME ]]; then
    SERV_URL=https://prod-testnet.prod.findora.org
fi

check_env() {
    for i in wget curl jq perl; do
        which $i >/dev/null 2>&1
        if [[ 0 -ne $? ]]; then
            echo -e "\n\033[31;01m${i}\033[00m has not been installed properly!\n"
            exit 1
        fi
    done
}

set_binaries() {
    OS=$1

    wget -T 10 https://github.com/FindoraNetwork/downloads/releases/download/${OS}/tendermint || exit 1
    wget -T 10 https://github.com/FindoraNetwork/downloads/releases/download/${OS}/abci_validator_node || exit 1
    wget -T 10 https://github.com/FindoraNetwork/downloads/releases/download/${OS}/fns || exit 1
    wget -T 10 https://github.com/FindoraNetwork/downloads/releases/download/${OS}/stt || exit 1

    new_path=/tmp/findora_testnet_bin

    rm -rf $new_path 2>/dev/null
    mkdir -p $new_path || exit 1
    cp tendermint abci_validator_node fns stt $new_path || exit 1
    chmod +x ${new_path}/* || exit 1

    export PATH=${new_path}:${PATH}
}

check_env

if [[ "Linux" == `uname -s` ]]; then
    set_binaries linux
else
    set_binaries macos
fi

######################
# Config locale node #
######################

export LEDGER_DIR=${HOME}/findora_testnet
export TENDERMINT_NODE_KEY_CONFIG_PATH=${HOME}/.tendermint/config/priv_validator_key.json
export ENABLE_LEDGER_SERVICE=true
export ENABLE_QUERY_SERVICE=true

fns genkey >/tmp/testnet_node.key || exit 1
output=$(cat /tmp/testnet_node.key)
node_mnemonic=$(echo ${output} | grep 'Mnemonic' | sed 's/Mnemonic: //')
xfr_pubkey=$(echo ${output} | grep 'pub_key' | sed 's/"//g' | sed 's/ \+pub_key: //')

fns setup -S ${SERV_URL} || exit 1

echo $node_mnemonic > ${LEDGER_DIR}/node.mnemonic || exit 1
fns setup -O ${LEDGER_DIR}/node.mnemonic || exit 1

stt issue || exit 1
stt transfer -f root -t ${xfr_pubkey} -n $((10000 * 10000 * 1000000)) || exit 1
sleep 10

if [[ 0 -eq `fns show | grep -A 1 | sed 's/ FRA units *$//'` ]]; then
    echo -e "Transfer FRAs to your address failed !"
    exit 1
fi

rm -rf ~/.tendermint 2>/dev/null

tendermint init || exit 1

curl ${SERV_URL}:26657/genesis \
    | jq -c \
    | perl -pe 's/^{"jsonrpc":"2.0","id":-1,"result":{"genesis"://' \
    | perl -pe 's/}}$//' \
    | jq > ~/.tendermint/config/genesis.json || exit 1

perl -pi -e 's#(create_empty_blocks_interval = ).*#$1"15s"#' ~/.tendermint/config/config.toml || exit 1

# (@Jimmy: should be updated to the co-reponding sentry nodes of testnet)
perl -pi -e \
    's#(persistent_peers = )".*"#$1"b87304454c0a0a0c5ed6c483ac5adc487f3b21f6\@dev-qa01-us-west-2-sentry-000-public.dev.findora.org:26656,d0c6e3e1589695ae6d650b288caf2efe9a998a50\@dev-qa01-us-west-2-sentry-001-public.dev.findora.org:26656"#' \
    ~/.tendermint/config/config.toml || exit 1

###################
# Run locale node #
###################

rm -rf ${LEDGER_DIR}
mkdir -p ${LEDGER_DIR}/{abci,tendermint}

cd ${LEDGER_DIR}/abci
nohup abci_validator_node &

cd ${LEDGER_DIR}/tendermint
nohup tendermint node --db_backend=cleveldb &

curl 'http://localhost:26657/status'
curl 'http://localhost:8669/version'
curl 'http://localhost:8668/version'
curl 'http://localhost:8667/version'
