# Staking on Findora

Findora is an open, permissionless blockchain featuring programmable privacy features secured by a decentralized network of validators run by organizations and economically incentivized parties located throughout the globe. Just like other Proof of Stake blockchains, at the core of understanding the mechanism for securing the system is `Staking`. With staking, holders of FRA pool together (ergo: stake) their cryptocurrency to create validator nodes. Rewards exist for adding the right information, and malicious actors (validators that engage in double signing, are unavailable et.al) will be punished. Validators are a crucial part of Findora, and we welcome you to enter this new, permissionless and privacy driven world with us.

## Consensus Mechanism

A consensus has to be formed from the active participation of 67% of the validators on the network. Nodes with staked FRA announce to the network that they seek to join a consensus, the network then checks the list for the top 100 nodes and these come together to form the next set of validators. The network randomly assigns the validators the chance to propose and vote on new `Blocks`. Blocks have to run through the `pre-vote` and `pre-commit` process where 2/3rds of validators must all agree on the information present in the block before they are committed at a `Height`.

A proposed addition of a new `Block` to the blockchain may fail if the proposing validator is offline, the network is slow, et.al. If this is the case, the network moves to another validator and gives them the chance to propose a block. To ensure that all validators get a chance at writing blocks and earning rewards, the voting power of the last block writer reduces by the cummulative number of points available for all validators.


![](https://i.imgur.com/z3okKpP.png)



## Staking

Findora considers bonding FRA as the same as staking, and it means actors are willing to accept the rules and regulations of working on the network. Because of this, nodes with bonded FRA can participate in staking and consensus voting. This also means they are subject to penalties (i.e Slashing).

Unbonding is a process of asking users to take on some risk for the process of removing their tokens from the network. In Findora, our process involves unbonding for 21 days. As is on other Proof of Stake blockchains, the unbonding period ensures that users cannot engage in malicious activities and get away like pooling together into one node and attacking the network, engaging in long range attacks, forking the Findora blockchain et.al. During this unboding period, FRA staking does not eaern rewards, but it can unfortunately suffer penalties.

### Hardware Requirements to be a Validatator

Findora asks that potential nodes have the following hardware requirements:

#### Minimum Requirements

RAM - 8GB
CPU - 2 core
Disk - 100GB

#### Recommended Requirements

RAM - 16gb
CPU - 4 core
Disk - 300GB