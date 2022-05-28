---
sidebar_position: 3
---

# Multi-chain Architecture and Prism

import useBaseUrl from '@docusaurus/useBaseUrl';

The Findora blockchain is composed of two different blockchain architectures combined into a single model “multi-chain” model. These two architectures include a UTXO-based blockchain model (aka native chain) and an accounts-based blockchain model (aka smart chain).

Prism is the name of the feature that enables users to bridge (aka transfer) assets from the UTXO-based side to the accounts-based side (and vice-versa) of the Findora blockchain.

## What is a UTXO Blockchain Model?

UTXO stands for unspent transaction output. A UTXO model functions much like cash does in two respects:

* all data necessary for the transaction are contained in the transaction itself
* UTXO amounts cannot be changed


For example, if you owed a store $22 but only had a $20 dollar bill and a $5 dollar bill, you’d need to give both bills to the store to pay for the transaction. Then, you’d then receive $3 back from the store as the spare change. In this example, the $20 bill and the $5 bill act like UTXO amounts.

In a UTXO model, that $3 would become a new UTXO amount – i.e. unspent transaction output. Just as you can’t make bills smaller, you can’t make UTXOs smaller. New coins can come from mining or from the “leftovers” (i.e. spare change) from a transaction.

In over-simplified bitcoin-centric terms, you might have a 3 BTC UTXO and a 5 BTC UTXO. In that case, if you wanted to buy something that cost 7 BTC, you’d have to give both the 5 BTC UTXO and the 3 BTC UTXO. In return, you would get a new UTXO of 1 BTC back.

UTXO model blockchains, like Bitcoin and ZCash, work similarly. All transaction data is contained within the transaction including who is sending and receiving, and how much is spent. A UTXO model is considered stateless because the system does not remember, record, or store preceding events. You can’t spend the same BTC twice because you can’t break a UTXO unit into smaller portions without submitting a transaction that gets mined. Once a particular state change (Spending of UTXO ) is added to the blockchain, it negates any other transactions using the same UTXO ( The base check for UTXO being unspent would fail )

### What is an Account-Based Blockchain Model?

An account model, however, operates like a debit card. Account-based blockchains like Ethereum keep an account for every user, and when you conduct a transaction on Ethereum, your account in the global state is adjusted. This is known as statefulness, or state, because the network remembers, records, and stores preceding events. So if you had 30 ETH and you spent 23.5 on an NFT, your account in the global state would be updated to show you only had 6.5 ETH remaining.

Account state data functions like a bank account when you use your debit card. Essentially, the merchant processor checks the bank to make sure the funds are available. If the funds are available, then the receiving account is credited with the funds sent, and the sender account is debited the same amount.

Account models rely on global state to store the data necessary for a transaction, which allows for more complicated transactions and business logic via smart contracts. However, these transactions tend to be slower and harder to scale because all transactions have to happen in the correct order and the amount of state data that must be consulted is always growing.


## Why Use the UTXO Model for the Native Chain?

Below are the key benefits of the UTXO model:

* Zero-Knowledge Proofs - The UTXO model allows Findora native chain to support zero-knowledge proofs (ZKPs). ZKPs make it possible to publicly generate and verify cryptographic proofs that do not reveal transaction details.

* Privacy - Using the UTXO model, combined with ZKPs, provides users with privacy features, including confidential payments that can mask different fields, like the transaction amount, or the sender / receiver address, in the transaction body.

* Scalability - The UTXO model means transactions can be easily verified in parallel. It is impossible for two transactions to affect the same UTXO. This is due to the stateless nature of UTXO transactions. Transactions do not refer to any input outside of the UTXOs consumed and the corresponding signatures.

* Decentralization - The stateless nature of a UTXO format also allows for smaller storage requirements, which makes it less expensive for full nodes to be maintained, and thus increases the decentralization and fault tolerance of the network.

## Findora Smart Chain (Account model)

In an account model, instead of having each token be uniquely referenced, tokens are represented as a balance within an account in the global state. Accounts can either be controlled by a private key or a smart contract.

Findora smart chain fully supports the Ethereum Virtual Machine (EVM). This augments the usability and programmability of Findora because the smart chain will be able to easily run code from existing smart contracts on chains like Ethereum. DEXs and Dapps can thus be deployed more quickly using existing tools and templates. With EVM compatibility, the smart chain creates a foundation that is easy to build on. With Findora native chain, developers can add more privacy using Prism.


## Why Use the Account Model for Smart Chain?

Compatibility

* Developers can easily port existing Ethereum Dapps, DEXs and cross-chain bridges using the Ethereum tool chain and pre-compiled smart contract templates.

Simplicity

* The account model is more intuitive, especially for developers writing complex smart contracts that require stateful information, or involve multiple parties.

Efficiency

* The account model is more efficient as each transaction only needs to validate that the sending account has enough balance to pay for the transaction, which also makes indexing simpler.

Flexibility

* The smart chain allows for more flexible transactions. Transactions on this layer will depend on the existing state and can interact with external inputs to achieve the desired results. This allows features like oracles and other logic to influence the resulting state of a transaction.


### What Does Prism Do?

<img src={useBaseUrl("/img/prism/prism-1.png")} width="60%" height="40%"/>


In general, most blockchains follow one of two record-keeping models: the UTXO model or the account model. Blockchains such as Bitcoin and ZCash use a UTXO model. Blockchains such as Ethereum and Polkadot use an account model. There are tradeoffs with either model. A lot of internet ink has been spilled fighting over which approach is better, but why choose one, when you can have both?

Findora integrates both models inside its chain architecture to capitalize on the advantages of each. These parallel chains are united by Prism (fka internal transfer), which allows the two chains to atomically swap tokens and work together as one without having to trust a central intermediary.

### Differences between the UTXO and Account Model

* A UTXO model stores its assets as a set of unspent transaction outputs whereas the account model stores a set of addresses with their associated balances.

* UTXO transactions specify the resulting state but in an account model the resulting state is dependent on the previous one.

* The account model simplifies UI/UX implementations in terms of displaying balances for specific addresses where it is a bit more complex to display this information from a UTXO based system. Since most users are familiar with accounts and balances, this needs to be generated by summing up the UTXO's of given addresses.

* With a UTXO based system, the smart contracting abilities are limited. This is because of the nature of the conditions set within the UTXO for spending. This can require signatures that can be difficult to produce.

* When executing transactions in an account based system, each transaction must be processed serially when dealing with the same address. The UTXO model can however process its transactions in parallel since it is impossible for two transactions to affect the same UTXO.

* There is a precaution that must be made for Account based systems to ensure previously signed transactions are not replayed on the network. This is usually in the form of an incrementing nonce that ensures uniqueness. For UTXO based systems this is not an issue since every UTXO gets consumed and can't be spent again.

## Hybrid UTXO Model

The hybrid model implemented by Findora allows users to store assets in the form of a UTXO or balance. It is able to do this by using separate storage methods while combining their hashes to maintain integrity within the network.

There are two main transactions that a user can broadcast in order to translate the asset types from one to the other:

1. Transfer UTXO assets to account balance    
2. Transfer to UTXO assets from account balance
    
Once Assets can be transferred between the different models, the system can take advantage of the capabilities provided by both Accounts and UTXO models.

In other words, some of the disadvantages experienced by one model can be overcome by making use of the other. For example:

* The accounts model can provide a contracting environment by integrating an EVM implementation.
* The UTXO model can provide a level security by preventing replay attacks.
* Confidential and anonymous functionality implemented on the Findora chain is available through the UTXO model

### FRA Tokens on Native Chain and Smart Chain (FRC-20 FRA)

FRA is the native token of the Findora blockchain.

On the native chain, the tokens are called “FRA-native tokens,” and are used for staking to guarantee network security, paying transaction fees, and voting on Findora Improvement Proposals.

On the smart chain, FRA tokens are called “FRA-smart tokens,” and are used to pay transaction fees and interact with Dapps built on the Findora EVM.

Special Note: A key innovation of the Findora’s Smart Chain is the design of the Smart Chain token which is not only a token required to pay for gas transactions on the Smart Chain but it’s also been enhanced to follow the Smart Chain’s FRC-20 standard (i.e. Findora’s version of Ethereum’s ERC-20) by default. So unlike Ethereum, which requires the ETH tokens to be wrapped into ERC-20 form before they can work on an Ethereum DEX, Findora Smart Chain tokens will work automatically on any Findora DEX without the extra step of needing to wrap the FRA tokens first.

### Prism for FRA-native and FRA-smart

With Prism, users can atomically and trustlessly convert their FRA-native tokens on the native chain to FRA-smart tokens on the smart chain.

#### FRA-native 
FRA-native addresses are based on a function of the public key generated by an ED25519 curve. It is managed by the electron wallet.

#### FRA-smart
FRA-smart addresses are compatible with any EVM integrated chains and is based on ECDSA(secp256k1). It can be managed by any EVM compatible wallet. 

NOTE: Prism will soon support custom tokens ( i.e. any custom tokens issued on Findora native chain or Findora smart chain). Stay tuned!

Here is a general overview of how Prism works:

### Native Chain -> Smart Chain
* A transaction is built with a Transfer and Convert operation and broadcast to the chain
* The Transfer operation uses an FRA-native address as the source, and an FRA-smart address as the destination
* The Convert operation is used as a Transaction identifier indicating that the FRA-native UTXO is being transferred to an FRA-smart balance  
* The UTXO is burnt by transferring the FRA assets to a burn address
* Assets are minted by adding to the balance of the destination address specified in the transfer operation
* The transaction fees for this transaction are paid using FRA-native tokens
    
### Smart Chain -> Native Chain
* Assets are burnt from the specified address by subtracting the balance
* UTXO Minting operations are queued to be processed by the chain
* The Ledger mints UTXOs based on the amounts specified in the queued requests
* The transaction fees for this transaction are paid using FRA-smart tokens

NOTE: The exact steps can be found here: https://wiki.findora.org/docs/dapp/wallet