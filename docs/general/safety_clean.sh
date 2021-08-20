#!/usr/bin/env bash

if [-n "$ROOT_DIR"]; then
    echo 'Please set ROOT_DIR first.'
fi

sudo rm -rf $ROOT_DIR/findorad/*

sudo rm -rf $HOME/.tendermint/data/*

cat > ~/.tendermint/data/priv_validator_state.json << EOF
{
  "height": "0",
  "round": "0",
  "step": 0
}
EOF




