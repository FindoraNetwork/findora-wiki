#!/usr/bin/env bash

if [ ! $ROOT_DIR ]; then
    echo 'Please set ROOT_DIR first.'
fi

docker pull findoranetwork/findorad:latest || exit 1

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

sed -i "s#^timeout_propose = .*#timeout_propose = \"4s\"#g" "${HOME}/.tendermint/config/config.toml"
sed -i "s#^timeout_prevote = .*#timeout_prevote = \"4s\"#g" "${HOME}/.tendermint/config/config.toml"
sed -i "s#^timeout_precommit = .*#timeout_precommit = \"4s\"#g" "${HOME}/.tendermint/config/config.toml"
sed -i "s#^create_empty_blocks_interval = .*#create_empty_blocks_interval = \"15s\"#g" "${HOME}/.tendermint/config/config.toml"

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
    --enable-ledger-service \
    --enable-query-service

