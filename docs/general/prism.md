---
sidebar_position: 3
---

# Multi-chain Architecture and Prism

The Findora blockchain is composed of two different blockchain architectures combined into a single model “multi-chain” model. These two architectures include a UTXO-based blockchain model (aka native chain) and an accounts-based blockchain model (aka smart chain). 

Prism is the name of the feature that enables users to bridge (aka transfer) assets from the UTXO-based side to the accounts-based side (and vice-versa) of the Findora blockchain.


import useBaseUrl from '@docusaurus/useBaseUrl';

## What is a UTXO Blockchain Model?

UTXO stands for unspent transaction output. A UTXO model functions much like cash does in two respects:

- all data necessary for the transaction are contained in the transaction itself
- UTXO amounts cannot be changed

For example, if you owed a store $22 but only had a $20 dollar bill and a $5 dollar bill, you’d need to give both bills to the store to pay for the transaction. Then, you’d then receive $3 back from the store as the spare change. In this example, the $20 bill and the $5 bill act like UTXO amounts.

In a UTXO model, that $3 would become a new UTXO amount – i.e. unspent transaction output. Just as you can’t make bills smaller, you can’t make UTXOs smaller. New coins can come from mining or from the “leftovers” (i.e. spare change) from a transaction.

In over-simplified bitcoin-centric terms, you might have a 3 BTC UTXO and a 5 BTC UTXO. In that case, if you wanted to buy something that cost 7 BTC, you’d have to give both the 5 BTC UTXO and the 3 BTC UTXO. In return, you would get a new UTXO of 1 BTC back.

UTXO model blockchains, like Bitcoin and ZCash, work similarly. All transaction data is contained within the transaction including who is sending and receiving, and how much is spent. A UTXO model is considered stateless because the system does not remember, record, or store preceding events. You can’t spend the same BTC twice because you can’t break a UTXO unit into smaller portions without submitting a transaction that gets mined. Once a particular state change (Spending of UTXO ) is added to the blockchain, it negates any other transactions using the same UTXO ( The base check for UTXO being unspent would fail )



## What is an Account-Based Blockchain Model?

An account model, however, operates like a debit card. Account-based blockchains like Ethereum keep an account for every user, and when you conduct a transaction on Ethereum, your account in the global state is adjusted. This is known as statefulness, or state, because the network remembers, records, and stores preceding events.  So if you had 30 ETH and you spent 23.5 on an NFT, your account in the global state would be updated to show you only had 6.5 ETH remaining. 

Account state data functions like a bank account when you use your debit card. Essentially, the merchant processor checks the bank to make sure the funds are available. If the funds are available, then the receiving account is credited with the funds sent, and the sender account is debited the same amount. 

Account models rely on global state to store the data necessary for a transaction, which allows for more complicated transactions and business logic via smart contracts. However, these transactions tend to be slower and harder to scale because all transactions have to happen in the correct order and the amount of state data that must be consulted is always growing. 


# Findora Structure

Findora is a leading privacy-focused blockchain that combines an innovative hybrid of UTXO and Ethereum Virtual Machine (EVM) blockchain technologies to enable programmable privacy. Below we will discuss the key concepts and technical details behind both the UTXO and account-based blockchain architectures and how they are combined to power the Findora blockchain architecture.


## Two is Better than One

Findora’s architecture features two built-in blockchains, one running on the UTXO model (aka native chain) and one using the account model (aka smart chain). Both chains are validated and secured at the native chain level using Tendermint consensus to achieve high throughput. Assets can be frictionlessly bridged between the native chain and the smart contract chain via Prism, a feature that is accessible via the Findora desktop wallet and Findora CLI.


## Findora Native Chain (UTXO model)

The Findora native chain layer functions exactly as a UTXO model blockchain would. This is the protocol layer with no accounts or wallets. Instead, tokens are stored as a list of UTXOs. Each UTXO has a quantity attribute and criteria for spending it. Transactions are created by consuming existing UTXOs and producing new UTXOs in their place.



## Why Use the UTXO Model for the Native Chain? 

Below are the key benefits of the UTXO model:
- Zero-Knowledge Proofs - The UTXO model allows Findora native chain to support zero-knowledge proofs (ZKPs). ZKPs make it possible to publicly generate and verify cryptographic proofs that do not reveal transaction details.

- Privacy - Using the UTXO model, combined with ZKPs, provides users with privacy features, including confidential payments that can mask different fields, like the transaction amount, or the sender / receiver address, in the transaction body.

- Scalability - The UTXO model means transactions can be easily verified in parallel. It is impossible for two transactions to affect the same UTXO. This is due to the stateless nature of UTXO transactions. Transactions do not refer to any input outside of the UTXOs consumed and the corresponding signatures.

- Decentralization - The stateless nature of a UTXO format also allows for smaller storage requirements, which makes it less expensive for full nodes to be maintained, and thus increases the decentralization and fault tolerance of the network.



## Findora Smart Chain (Account model)

In an account model, instead of having each token be uniquely referenced, tokens are represented as a balance within an account in the global state. Accounts can either be controlled by a private key or a smart contract.

Findora smart chain fully supports the Ethereum Virtual Machine (EVM). This augments the usability and programmability of Findora because the smart chain will be able to easily run code from existing smart contracts on chains like Ethereum. DEXs and Dapps can thus be deployed more quickly using existing tools and templates. With EVM compatibility, the smart chain creates a foundation that is easy to build on. With Findora native chain, developers can add more privacy using Prism.




## Why Use the Account Model for Smart Chain? 

Compatibility
- Developers can easily port existing Ethereum Dapps, DEXs and cross-chain bridges using the Ethereum tool chain and pre-compiled smart contract templates.

Simplicity
- The account model is more intuitive, especially for developers writing complex smart contracts that require stateful information, or involve multiple parties.

Efficiency
- The account model is more efficient as each transaction only needs to validate that the sending account has enough balance to pay for the transaction, which also makes indexing simpler.

Flexibility
- The smart chain allows for more flexible transactions. Transactions on this layer will depend on the existing state and can interact with external inputs to achieve the desired results. This allows features like oracles and other logic to influence the resulting state of a transaction.



### Findora’s Multi-chain Architecture
This multi-chain architecture provides the benefits of both the UTXO and account models. The two models complement each other allowing users to choose whether to store assets in the form of a UTXO or an account balance based on their needs. It does this by using separate storage methods for each chain while combining their hashes to maintain network integrity.



## What Does Prism Do? 


<img src={useBaseUrl("/img/prism/prism-1.png")} width="60%" height="40%"/>

In general, most blockchains follow one of two record-keeping models: the UTXO model or the account model. Blockchains such as Bitcoin and ZCash use a UTXO model. Blockchains such as Ethereum and Polkadot use an account model. There are tradeoffs with either model. A lot of internet ink has been spilled fighting over which approach is better, but why choose one, when you can have both?

Findora integrates both models inside its chain architecture to capitalize on the advantages of each. These parallel chains are united by Prism (fka internal transfer), which allows the two chains to atomically swap tokens and work together as one without having to trust a central intermediary.

### FRA Tokens on Native Chain and Smart Chain (FRC-20 FRA)

FRA is the native token of the Findora blockchain. 

On the native chain, the tokens are called “FRA-native tokens,” and are used for staking to guarantee network security, paying transaction fees, and voting on Findora Improvement Proposals. 

On the smart chain, FRA tokens are called “FRA-smart tokens,” and are used to pay transaction fees and interact with Dapps built on the Findora EVM.

*Special Note*: A key innovation of the Findora’s Smart Chain is the design of the Smart Chain token which is not only a token required to pay for gas transactions on the Smart Chain but it’s also been enhanced to follow the Smart Chain’s FRC-20 standard (i.e. Findora’s version of Ethereum’s ERC-20) by default. So unlike Ethereum, which requires the ETH tokens to be wrapped into ERC-20 form before they can work on an Ethereum DEX, Findora Smart Chain tokens will work automatically on any Findora DEX without the extra step of needing to wrap the FRA tokens first.

### Prism for FRA-native and FRA-smart 

With Prism, users can atomically and trustlessly convert their FRA-native tokens on the native chain to FRA-smart tokens on the smart chain.  

NOTE: Prism will soon support custom tokens ( i.e. any custom tokens issued on Findora native chain or Findora smart chain). Stay tuned! 

Here is a general overview of how Prism works:

#### Native Chain -> Smart Chain
- The transaction is built with a Transfer and Convert operation
- The UTXO is burnt by transferring to a burn address
- Assets are minted by adding to the owner’s balance (account specified in the transaction)
- The transaction fees for this transaction are paid using FRA-native

#### Smart Chain -> Native Chain
- Assets are burnt from the specified address by subtracting the balance
- Minting operations are queued to be processed by the chain
- The ledger mints UTXOs based on the amounts specified
- The transaction fees for this transaction are paid using FRA-smart tokens

NOTE: The exact steps can be found here: https://wiki.findora.org/docs/dapp/wallet
