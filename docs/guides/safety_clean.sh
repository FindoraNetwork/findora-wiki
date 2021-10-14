#!/usr/bin/env bash
ENV=prod
NAMESPACE=testnet
SERV_URL=https://${ENV}-${NAMESPACE}.${ENV}.findora.org

if [ ! $ROOT_DIR ]; then
    echo 'Please set ROOT_DIR first.'
fi


docker pull findoranetwork/findorad:testnet-v0.2.0Sa-without-evm-compatible  || exit 1

docker rm -f findorad || exit 1

sudo rm -rf $ROOT_DIR/findorad/*

sudo rm -rf $ROOT_DIR/findorad/._*

sudo rm -rf $HOME/.tendermint/data/*

sudo chown -R `id -u`:`id -g` ${HOME}/.tendermint/data

cat > ~/.tendermint/data/priv_validator_state.json << EOF
{
  "height": "0",
  "round": "0",
  "step": 0
}
EOF

sed -i "s#^timeout_propose = .*#timeout_propose = \"8s\"#g" "${HOME}/.tendermint/config/config.toml"
sed -i "s#^timeout_propose_delta = .*#timeout_propose_delta = \"100ms\"#g" "${HOME}/.tendermint/config/config.toml"
sed -i "s#^timeout_prevote = .*#timeout_prevote = \"4s\"#g" "${HOME}/.tendermint/config/config.toml"
sed -i "s#^timeout_prevote_delta = .*#timeout_prevote_delta = \"100ms\"#g" "${HOME}/.tendermint/config/config.toml"
sed -i "s#^timeout_precommit = .*#timeout_precommit = \"4s\"#g" "${HOME}/.tendermint/config/config.toml"
sed -i "s#^timeout_precommit_delta = .*#timeout_precommit_delta = \"100ms\"#g" "${HOME}/.tendermint/config/config.toml"
sed -i "s#^create_empty_blocks_interval = .*#create_empty_blocks_interval = \"15s\"#g" "${HOME}/.tendermint/config/config.toml"
sed -i "s#^recheck = .*#recheck = \"false\"#g" "${HOME}/.tendermint/config/config.toml"
sed -i "s#^fast_sync = .*#fast_sync = \"false\"#g" "${HOME}/.tendermint/config/config.toml"


###################
# get snapshot    #
###################

# download latest link and get url
wget -O "${ROOT_DIR}/latest" "https://${ENV}-${NAMESPACE}net-us-west-2-chain-data-backup.s3.us-west-2.amazonaws.com/latest_golevel"
CHAINDATA_URL=$(cut -d , -f 1 "${ROOT_DIR}/latest")
echo $CHAINDATA_URL
# remove old data 
rm -rf "${ROOT_DIR}/findorad"
rm -rf "${HOME}/.tendermint/data"
rm "${HOME}/.tendermint/config/addrbook.json"
wget -O "${ROOT_DIR}/snapshot" "${CHAINDATA_URL}" 
mkdir "${ROOT_DIR}/snapshot_data"
tar zxvf "${ROOT_DIR}/snapshot" -C "${ROOT_DIR}/snapshot_data"
cp -r "${ROOT_DIR}/snapshot_data/data/ledger" "${ROOT_DIR}/findorad"
cp -r "${ROOT_DIR}/snapshot_data/data/tendermint/mainnet/node0/data" "${HOME}/.tendermint/data"

docker run -d \
    -v $HOME/.tendermint:/root/.tendermint \
    -v $ROOT_DIR/findorad:/tmp/findora \
    -p 8669:8669 \
    -p 8668:8668 \
    -p 8667:8667 \
    -p 26657:26657 \
    --name findorad \
    findoranetwork/findorad:testnet-v0.2.0Sa-without-evm-compatible node \
    --ledger-dir /tmp/findora \
    --tendermint-host 0.0.0.0 \
    --tendermint-node-key-config-path="/root/.tendermint/config/priv_validator_key.json" \
    --enable-query-service

