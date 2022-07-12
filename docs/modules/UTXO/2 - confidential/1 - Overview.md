# Overview

In public blockchain transactions, there is near-total transparency in the system. All of the important information in a transaction - such as the amount transferred, the pseudonymous identities of the sender and the receiver are public. Thus, these transactions are neither confidential nor anonymous. This can be problematic for many real-world applications.

For instance, if a company pays all its employees in Bitcoin, all the salaries will be public knowledge and in particular, all employees would know their colleagues' salaries, thus violating their privacy. Similarly, if a company like Ford pays its (mutually competing) tire suppliers in Bitcoin, the suppliers would see the exact quotation of the prices charged by their competitors. They could game the system by bidding appropriately so as to win the auction. Thus, confidentiality of amounts is essential for transactions in such settings. In the case of multi-asset blockchains, it is also desirable to maintain the confidentiality of the asset type being traded in addition to the amount.

An *asset transfer* is a transaction that transfers ownership of an asset from one address to another. A *confidential* asset transfer is an asset transfer such that:


1. The asset types involved in the transaction are hidden.
2. The amounts of each asset type transferred are hidden.

A *commitment scheme* is a fundamental cryptographic primitive which is the digital analog of a sealed envelope. *Committing* to a message **m** is akin to putting **m** in the envelope. *Opening* the commitment is like opening the envelop and revealing the content within.

For our confidential transactions, we hide the amounts using a cryptographic primitive called the *Pedersen commitment* scheme. It is a homomorphic commitment scheme - meaning the sum of two commitments to amount is a commitment to the sum of the two committed values. The *hiding* property of the commitment scheme masks the value of the amount. The *binding* property of the commitment scheme binds the value of the commitment to that particular amount, meaning that the commitment cannot be opened to any other value.

These commitments are recorded on the ledger. It is subsequently proven in zero-knowledge that:

1. The committed amounts are non-negative.

    This is necessary to prevent double-spends on the blockchain in tandem with supporting confidentiality. The sender must be unable to send an amount larger than his balance or less than zero.

2. The input amounts for each individual non-FRA assets have the same sum as the output amounts for this asset.

3.  The input amounts for the FRA asset have the same sum as the output amounts for this asset plus the transaction fees.

These proofs ensure that the total amount of the asset in circulation remains unchanged after the confidential asset transfer.



It is proven in zero-knowledge that they are commitments to non-negative integers known to the Prover. The amount should be positive because a sender should not be able to transfer negative amount since that would mean that they can transfer non-existent assets. The amount should fall within a certain range since no one should be allowed to transfer assets greater than their balance after accounting for the fees.


This comes at the cost of a longer processing time and more storage entailed by this cryptographic proof.