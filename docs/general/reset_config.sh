#!/bin/bash
CONF=$1
set_key_value() {
  local key=${1}
  local value=${2}
  if [ -n $value ]; then
    local current=$(sed -n -e "s/^\($key = \)\([^ \"]*\)\(.*\)$/\2/p" $CONF)
    value="$(echo "${value}" | sed 's|[&]|\\&|g')"
    if [ -n "$current" ];then
      echo "setting $CONF : $key = $value"
      sed -i "s|^[#]*[ ]*${key}\([ ]*\)=.*|${key} = ${value}|" ${CONF} 
    else 
      echo "setting $CONF : $key = $value"
      sed -i "s|^[#]*[ ]*${key}\([ ]*\)=.*|${key} = \"${value}\"|" ${CONF}
    fi
  fi
}

set_key_value timeout_propose "4s"
set_key_value timeout_propose_delta "3000ms"
set_key_value timeout_prevote  "4s"
set_key_value timeout_prevote_delta "3000ms"
set_key_value timeout_precommit "4s"
set_key_value timeout_precommit_delta "3000ms"
set_key_value timeout_commit "15s"
set_key_value create_empty_blocks true
set_key_value create_empty_blocks_interval "0s"
