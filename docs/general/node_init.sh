#!/usr/bin/env bash

ENV_NAME=$1
SERV_URL=https://prod-testnet.prod.findora.org
SENTRY='b87304454c0a0a0c5ed6c483ac5adc487f3b21f6\@prod-testnet-us-west-2-sentry-000-public.prod.findora.org:26656'
if [[ "qa01" == $ENV_NAME ]]; then
    SERV_URL=https://dev-qa01.dev.findora.org
    SENTRY='b87304454c0a0a0c5ed6c483ac5adc487f3b21f6\@dev-qa01-us-west-2-sentry-000-public.dev.findora.org:26656'
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

    wget -T 10 https://github.com/FindoraNetwork/testnet-downloads/releases/download/${OS}/findorad || exit 1
    wget -T 10 https://github.com/FindoraNetwork/testnet-downloads/releases/download/${OS}/fns || exit 1
    wget -T 10 https://github.com/FindoraNetwork/testnet-downloads/releases/download/${OS}/stt || exit 1

    new_path=/tmp/findora_testnet_bin

    rm -rf $new_path 2>/dev/null
    mkdir -p $new_path || exit 1
    mv findorad fns stt $new_path || exit 1
    chmod +x ${new_path}/* || exit 1

    export PATH=${new_path}:${PATH}
}

check_env

if [[ "Linux" == `uname -s` ]]; then
    set_binaries linux
elif [[ "FreeBSD" == `uname -s` ]]; then
    set_binaries freebsd
elif [[ "Darwin" == `uname -s` ]]; then
    set_binaries macos
else
    echo "Unsupported system platform!"
    exit 1
fi

######################
# Config locale node #
######################

export ROOT_DIR=${HOME}/findora_testnet

keypath=/tmp/testnet_node.key
fns genkey > $keypath || exit 1
node_mnemonic=$(cat ${keypath} | grep 'Mnemonic' | sed 's/^.*Mnemonic:[^ ]* //')
xfr_pubkey="$(cat ${keypath} | grep 'pub_key' | sed 's/[",]//g' | sed 's/ *pub_key: *//')"

fns setup -S ${SERV_URL} || exit 1
fns setup -K ~/.tendermint/config/priv_validator_key.json || exit 1

rm -rf ${ROOT_DIR}
mkdir -p ${ROOT_DIR}
echo $node_mnemonic > ${ROOT_DIR}/node.mnemonic || exit 1
fns setup -O ${ROOT_DIR}/node.mnemonic || exit 1

stt issue || exit 1
stt transfer -f root -t ${xfr_pubkey} -n $((10000 * 10000 * 1000000)) || exit 1
sleep 30

if [[ 0 -eq `fns show 2>&1 | grep -A 1 "Node Balance" | sed 's/ FRA units *$//' | tail -1` ]]; then
    echo -e "Transfer FRAs to your address failed !"
    exit 1
fi

pkill -9 tendermint
rm -rf ~/.tendermint 2>/dev/null

findorad init || exit 1

curl ${SERV_URL}:26657/genesis \
    | jq -c '.result.genesis' \
    | jq > ~/.tendermint/config/genesis.json || exit 1

perl -pi -e 's#(create_empty_blocks_interval = ).*#$1"15s"#' ~/.tendermint/config/config.toml || exit 1

perl -pi -e "s#(persistent_peers = )\".*\"#\$1\"${SENTRY}\"#" ~/.tendermint/config/config.toml || exit 1

###################
# Run locale node #
###################

pkill -9 findorad
mkdir -p ${ROOT_DIR}/{abci,tendermint}

cd ${ROOT_DIR}/abci
nohup findorad \
    --ledger-dir="${ROOT_DIR}/abci" \
    --tendermint-node-key-config-path="${HOME}/.tendermint/config/priv_validator_key.json" \
    --config="${HOME}/.tendermint/config/config.toml"
    --enable-ledger-service \
    --enable-query-service \
    &

sleep 5

curl 'http://localhost:26657/status'; echo
curl 'http://localhost:8669/version'; echo
curl 'http://localhost:8668/version'; echo
curl 'http://localhost:8667/version'; echo

fns stake -n 888888000000 -R 0.1
