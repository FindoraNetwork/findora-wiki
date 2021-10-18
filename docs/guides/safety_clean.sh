#!/usr/bin/env bash
ENV=prod
NAMESPACE=testnet
SERV_URL=https://${ENV}-${NAMESPACE}.${ENV}.findora.org
FINDORAD_IMG=findoranetwork/findorad:v0.2.0-beta-4

if [ ! $ROOT_DIR ]; then
    echo 'Please set ROOT_DIR first.'
fi

TM_HOME=${ROOT_DIR}/tendermint

docker pull ${FINDORAD_IMG}  || exit 1

docker rm -f findorad || exit 1

sudo rm -rf $ROOT_DIR/findorad/*
sudo rm -rf $ROOT_DIR/findorad/._*
sudo rm -rf "${TM_HOME}"/data/*

sudo chown -R `id -u`:`id -g` "${TM_HOME}"/data

cat > "{TM_HOME}"/data/priv_validator_state.json << EOF
{
  "height": "0",
  "round": "0",
  "step": 0
}
EOF

sed -i "s#^timeout_propose = .*#timeout_propose = \"8s\"#g" "${TM_HOME}/config/config.toml"
sed -i "s#^timeout_propose_delta = .*#timeout_propose_delta = \"100ms\"#g" "${TM_HOME}/config/config.toml"
sed -i "s#^timeout_prevote = .*#timeout_prevote = \"4s\"#g" "${TM_HOME}/config/config.toml"
sed -i "s#^timeout_prevote_delta = .*#timeout_prevote_delta = \"100ms\"#g" "${TM_HOME}/config/config.toml"
sed -i "s#^timeout_precommit = .*#timeout_precommit = \"4s\"#g" "${TM_HOME}/config/config.toml"
sed -i "s#^timeout_precommit_delta = .*#timeout_precommit_delta = \"100ms\"#g" "${TM_HOME}/config/config.toml"
sed -i "s#^create_empty_blocks_interval = .*#create_empty_blocks_interval = \"15s\"#g" "${TM_HOME}/config/config.toml"
sed -i "s#^recheck = .*#recheck = \"false\"#g" "${TM_HOME}/config/config.toml"
sed -i "s#^fast_sync = .*#fast_sync = \"false\"#g" "${TM_HOME}/config/config.toml"


###################
# get snapshot    #
###################

# download latest link and get url
wget -O "${ROOT_DIR}/latest" "https://${ENV}-${NAMESPACE}-us-west-2-chain-data-backup.s3.us-west-2.amazonaws.com/latest"
CHAINDATA_URL=$(cut -d , -f 1 "${ROOT_DIR}/latest")
echo $CHAINDATA_URL
# remove old data
rm -rf "${ROOT_DIR}/findorad"
rm -rf "${TM_HOME}/data"
rm -rf "${TM_HOME}/config/addrbook.json"

wget -O "${ROOT_DIR}/snapshot" "${CHAINDATA_URL}" 
mkdir "${ROOT_DIR}/snapshot_data"
tar zxvf "${ROOT_DIR}/snapshot" -C "${ROOT_DIR}/snapshot_data"

mv "${ROOT_DIR}/snapshot_data/data/ledger" "${ROOT_DIR}/findorad"
mv "${ROOT_DIR}/snapshot_data/data/tendermint/mainnet/node0/data" "${TM_HOME}/data"
rm -rf "${ROOT_DIR}/snapshot_data"

docker run -d \
    -v $TM_HOME:/root/.tendermint \
    -v $ROOT_DIR/findorad:/tmp/findora \
    -p 8669:8669 \
    -p 8668:8668 \
    -p 8667:8667 \
    -p 26657:26657 \
    --name findorad \
    ${FINDORAD_IMG} node \
    --ledger-dir /tmp/findora \
    --tendermint-host 0.0.0.0 \
    --tendermint-node-key-config-path="/root/.tendermint/config/priv_validator_key.json" \
    --enable-query-service

