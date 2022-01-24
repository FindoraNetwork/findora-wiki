# Rialto Bridge

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl("/img/evm/rialto-homepage.png")} width="80%" height="40%"/>


The Rialto bridge is Findora’s homegrown solution for moving assets between blockchains. Built on Chainsafe’s Chainbridge infrastructure, burnished and strengthened by Findora, it allows technological different chains communicate with each other, perform transactions against each other and settle balances at the end of a session. Let’s dive in.

At a high level, Rialto’s architecture involves a source chain, a destination chain, and relayers, with the first two having smart contracts that handle the heavy lifting involved with communication between the chains. The relayer in this matrix of communication handles the message sending and only that. When the request hits the destination chain, then the equivalent value of the coins are minted and they’re ready for use. There is more going on, let’s look at what this looks like at a lower level but first, connect your wallet

<img src={useBaseUrl("/img/evm/rialto-bridge-2.png")} width="80%" height="40%"/>


## Architecture and definitions

- Client - Where the Deposit and Approver requests come from
Source Chain - The beginning of a transaction
- Relayers - the message system for passing information from the south to the destination
- Destination Chain - the end chain of the transaction

## Contracts and definition

- Bridge contract - The contract interacts with the client and the relayers. It takes receives calls from the client, and based on the type of call, delegates the locking or minting of the coin in the token contract through the Handler contract
- Token contract - This contract token itsef
- Handler contract - The contract that handles executing deposit or withdrawls


## Stages for Relayer voting

- Cancelled
- Active	
- Passed
- Executed
- Cancelled

## How does this work

<img src={useBaseUrl("/img/evm/rialto-bridge-explainer.png")} width="80%" height="40%"/>


The Client makes two calls to the source chain, one to approve and the other to Deposit. The approval hits the bridge contract, and when that is passed, the next port of call is the Handler contract. This executes the deposit and then calls for the client to make the deposit into the token contract of the source chain

After the deposit hits the Token contract, a deposit event is triggered that passes the message to the Relayer, and the Relayer itself broadcasts this information to the bridge contract of the Destination chain. And then a vote happens on the proposal.

Voting on the destination chain means that Relayers get the proposal and initiate a process where everyone of them votes. With every vote from a relayer, the broadcast status moves through the different stages form active to executed. 

The executed stage is passed and finally the bridge calls the handler contract that eventually moves the data to the Token for minting