#!/usr/bin/env bash
ENV=prod
NAMESPACE=mainnet
SERV_URL=https://${ENV}-${NAMESPACE}.${ENV}.findora.org
FINDORAD_IMG=findoranetwork/findorad:v0.2.11a-release


export ROOT_DIR=/data/findora/${NAMESPACE}


###################
# Run local node #
###################
docker stop findorad || exit 1
docker rm findorad || exit 1
docker run -d \
    -v ${ROOT_DIR}/tendermint:/root/.tendermint \
    -v ${ROOT_DIR}/findorad:/tmp/findora \
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

sleep 10

curl 'http://localhost:26657/status'; echo
curl 'http://localhost:8669/version'; echo
curl 'http://localhost:8668/version'; echo
curl 'http://localhost:8667/version'; echo

echo "Local node initialized, please stake your FRA tokens after syncing is completed."