#!/usr/bin/env bash

SERV_URL=https://prod-testnet.prod.findora.org

check_env() {
    for i in wget curl; do
        which $i >/dev/null 2>&1
        if [[ 0 -ne $? ]]; then
            echo -e "\n\033[31;01m${i}\033[00m has not been installed properly!\n"
            exit 1
        fi
    done

    if ! [ -f "$keypath" ]; then
        echo "The key file doesnot exist: $keypath"
        exit 1
    fi
}

set_binaries() {
    OS=$1

    docker pull findoranetwork/findorad:latest || exit 1
    wget -T 10 https://github.com/FindoraNetwork/testnet-downloads/releases/download/${OS}/fns || exit 1

    new_path=${ROOT_DIR}/bin

    rm -rf $new_path 2>/dev/null
    mkdir -p $new_path || exit 1
    mv fns $new_path || exit 1
    chmod +x ${new_path}/* || exit 1
}

export ROOT_DIR=${HOME}/findora_testnet
keypath=${ROOT_DIR}/testnet_node.key
FNS=${ROOT_DIR}/bin/fns

check_env

if [[ "Linux" == `uname -s` ]]; then
    set_binaries Linux-03
# elif [[ "FreeBSD" == `uname -s` ]]; then
    # set_binaries freebsd
elif [[ "Darwin" == `uname -s` ]]; then
    set_binaries MacOS-03
else
    echo "Unsupported system platform!"
    exit 1
fi

######################
# Config local node #
######################

node_mnemonic=$(cat ${keypath} | grep 'Mnemonic' | sed 's/^.*Mnemonic:[^ ]* //')
xfr_pubkey="$(cat ${keypath} | grep 'pub_key' | sed 's/[",]//g' | sed 's/ *pub_key: *//')"

echo $node_mnemonic > ${ROOT_DIR}/node.mnemonic || exit 1

$FNS setup -S ${SERV_URL} || exit 1
$FNS setup -K ${HOME}/.tendermint/config/priv_validator_key.json || exit 1
$FNS setup -O ${ROOT_DIR}/node.mnemonic || exit 1

# clean old data and config files
sudo rm -rf ${ROOT_DIR}/findorad || exit 1
mkdir -p ${ROOT_DIR}/findorad || exit 1

docker run --rm -v ${HOME}/.tendermint:/root/.tendermint findoranetwork/findorad init --test-net || exit 1

sudo chown -R `id -u`:`id -g` ${HOME}/.tendermint/config

###################
# Run local node #
###################

docker rm -f findorad || exit 1
docker run -d \
    -v $HOME/.tendermint:/root/.tendermint \
    -v $ROOT_DIR/findorad:/tmp/findora \
    -p 8669:8669 \
    -p 8668:8668 \
    -p 8667:8667 \
    -p 26657:26657 \
    --name findorad \
    findoranetwork/findorad node \
    --ledger-dir /tmp/findora \
    --tendermint-host 0.0.0.0 \
    --tendermint-node-key-config-path="/root/.tendermint/config/priv_validator_key.json" \
    --enable-query-service

sleep 10

curl 'http://localhost:26657/status'; echo
curl 'http://localhost:8669/version'; echo
curl 'http://localhost:8668/version'; echo
curl 'http://localhost:8667/version'; echo

echo "Local node initialized, please stake your FRA tokens after syncing is completed."
