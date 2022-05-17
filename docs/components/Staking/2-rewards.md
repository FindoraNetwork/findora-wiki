## Rewards

Staking your FRA to become an active member of the Findora protocol comes with responsibility and rewards. By design, Findora rewards are non-inflationary and the protocol allocates a 2% (420 million FRA) of its total circulating supply to fund incentives. This ensures that the network is grounded well enough until transaction fees gain traction. These rewards are primarily meant to jump-start the network - the network will in the long run sustain itself and reward validators via transaction fees.


The Findora network has two set of incentives - the block rewards and the block proposer rewards.

Block rewards are incentives given to validators that successfully write a block to the network but they come with certain cavaets. A pro-rata share in the amount of FRA staked is equivalent to the chance of being selected to write a new block. This means if a validator has more FRA staked that other validators, they automatically have more chances of writing the next block than other validators ergo more of a chance to earn the block reward. Also, the validator that proposes the block gets all the reward. This means that the node doesn't have to share their rewards with other validators in the network.

Block Proposer Rewards are secondary rewards paid out not only to the validator that proposes a block but every validator that participates in the process of prevoting and pre-commiting a block, and they are smaller in size.

## Rewards Calculations

The amount of FRA paid out per block for the a) **Block Reward** and b) **Block Proposer Bonus Reward** is described below.

**a) Block Reward Calculation**

The (annual) block reward calculation follows the formula below:

Y = 1 / x * [Rate Modifier Constant]


With x and y defined as:

y = Annualized Block Reward Rate

x = % Circulating Supply Staked (i.e. FRA staked / unlocked FRA)

The Rate Modifier Constant is set at `0.0536` (as of 5/1/2022) and is responsible for determining the reward rate for each value of % circulating supply staked. In the future, this rate modifier may be changed based on governance voting by FRA holders.

![](https://i.imgur.com/VHiFR0J.png)

The above formula describes the *annual* block reward payout rate. However, since the reward is paid out per block, the formula above must be de-annualized down to a per block reward rate. This is done via using the continuous compounding formula in reverse. The block reward rate is recalculated every block.

Block Reward Rate (per block) = (1 + y)^(1/1,855,059)-1

Where 1,855,059 is the number of blocks Findora generates based on a 17s average block time (60*60*24*365/17).

**b) Block Proposer Bonus Reward Calculation**

Unlike, the *block reward* described above, which will always be paid out every block, the *block proposer bonus reward* will only be paid out if certain pre-commit voting conditions among the validators are met. More information about the Tendermint-based consensus pre-voting process can be found [here](https://docs.tendermint.com/master/spec/consensus/).

The table below describes the FRA bonus reward that will paid out to the proposing validator if enough validators send pre-commit votes for the block being proposed. Thus, if less than 66.7% of eligible validators participate in pre-voting, then no bonus reward is paid out for that block.

![](https://i.imgur.com/ik5xJp3.png)