# Overview

Public blockchain networks such as Bitcoin and Ethereum are transparent and offer pseudonymity rather than total anonymity. One of the most important design goals for Findora Network is that anyone can join and use the network. But an innate feature of this design is that everyone is able to scrutinize every single transaction recorded in the ledger. Transactions store information about pseudonymous identities (sender and receiver) of the participants in the transaction. They also store information about the amounts being sent. In the case of multi-asset chains, this also entails information about the assets being traded in the transactions.

In order to have stronger privacy, confidentiality and censorship-resistance features, it is eminently desirable to mask this information corresponding to a transaction in tandem while cryptographically proving the integrity of the chain. We briefly describe two instances where the lack of privacy and confidentiality would render an open blockchain unsuitable for the use case.

1. If a company pays its employees in Bitcoin, the salaries would be public knowledge. In particular, all employees would know their colleagues' salaries, which could be undesirable for both the company and the employees.

2. If a company like Ford pays its (mutually competing) tire suppliers in Bitcoin, the suppliers would see the exact quotation of the prices charged by their competitors. They could game the system by bidding appropriately so as to win the auction.

Thus, confidentiality of amounts is essential for transactions in such settings. In the case of multi-asset blockchains, it is also desirable to maintain the confidentiality of the asset type being traded in addition to the amount.

An *asset transfer* is a transaction that transfers ownership of an asset from one address to another. A *confidential* asset transfer is an asset transfer such that:

1. The amount being transferred in the transaction is hidden.
2. The asset types involved in the transaction are hidden.

Note that unlike some mono-asset networks, Findora network supports multi-asset transfers.

An *anonymous* transfer is often referred to as a *triple masking* because it hides three things:

1. The identities of the sender and the receiver
2. The amount being sent
3. The asset type

*Anonymous transfers* are *confidential transfers* where the identities of the sender and receiver are also protected or shielded. Instead of storing transaction data in plain text on the public ledger, a cryptographic commitment to this data is publicly recorded. The person performing the transaction provides cryptographic proofs attesting to the authenticity and validity of this encrypted data. This feature is made possible by zk-SNARKs (Zero-Knowledge Succinct Non-Interactive Argument of Knowledge).

For the simpler feature of hiding the amount and the asset type but not the identities of the sender/receiver, Findora uses Bulletproofs. This feature - known as *confidential asset transfers* - requires a sender to prove in zero knowledge that a certain committed amount falls within a certain range (usually $[0, 2^{64}]$). This is a transparent scheme (i.e. no trusted setup). It hinges on the hardness of the discrete logarithm problem in elliptic curves, which is one of the oldest and most battle-tested hardness assumptions in cryptography. 

While the same scheme can, in theory, also support an anonymous transfer, the verification time is linear in the size of the circuit, which is far too expensive for the complex statements that constitute an anonymous transfer. To this end, we use *TurboPlonk*, a pairing-based Snark which has a constant-sized proof and a constant verification time. While this scheme does require a trusted setup, it is far better suited for more complex statements. Furthermore, the trusted setup is universal and updateable.