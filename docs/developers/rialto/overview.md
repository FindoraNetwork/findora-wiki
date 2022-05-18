# Overview

Rialto bridge is a fork of Chainbridge open-source project built by [ChainSafe](https://chainsafe.io/) and polished to support Findora's EVM implementation. Rialto bridge is an extensible cross-chain communication protocol. It currently supports bridging between only EVM based chains.

A bridge contract on each chain forms either side of a bridge. Handler contracts allow for customizable behavior upon receiving transactions to and from the bridge. For example locking up an asset on one side and minting a new one on the other.

In its current state Rialto bridge operates under a trusted federation model. Deposit events on one chain are detected by a trusted set of off-chain relayers who await finality, submit events to the other chain and vote on submissions to reach acceptance triggering the appropriate handler.

Research is currently underway to reduce the levels of trust required and move toward a fully trust-less bridge.
