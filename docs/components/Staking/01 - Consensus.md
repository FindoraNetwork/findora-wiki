## Consensus

The Findora consensus algorithm chooses which validator can propose the next block with a frequency in proportion to a validator’s voting power. It also specifies which validators can participate in the voting process (and the exact details fo the voting process) to determine the next block. In short, Blocks must progress through the `pre-vote` and `pre-commit` process and a new block is created only when 2/3rds of validators post a commit vote.

A proposed addition of a new `Block` to the blockchain may fail if the proposing validator is offline, the network is slow, etc. If failure occurs, the network moves to another validator to propose a new block. For full voting algorithm details, view the Tendermint consensus algorithm white paper.

![](https://i.imgur.com/z3okKpP.png)
