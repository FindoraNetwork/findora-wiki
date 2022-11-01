# Overview

In many blockchain systems there is a lack of privacy. The amount, the asset type, and the addresses of the sender and the receiver are public. This can be problematic for many real-world applications. For instance, if a company pays all its employees in Bitcoin, all the salaries will be public knowledge and in particular, all employees would know their colleagues' salaries, which is not desirable.

**Confidential transfer.** Define an asset transfer as the transfer of ownership of an asset from one address to another. A *confidential* asset transfer has two additional properties:
- The asset types involved in the transaction are hidden. 
- The amounts of each asset type transferred are hidden.

**Coin commitments.** A *commitment scheme* is a fundamental cryptographic primitive which is the digital analog of a sealed envelope. *Committing* to a message **m** is akin to putting **m** in the envelope. *Opening* the commitment is like opening the envelope and revealing the content within.

For our confidential transactions, we hide the amounts using a cryptographic primitive called the *Pedersen commitment* scheme. It is a homomorphic commitment scheme - meaning the sum of two commitments to amount is a commitment to the sum of the two committed values. The *hiding* property of the commitment scheme masks the value of the amount. The *binding* property of the commitment scheme binds the value of the commitment to that particular amount, meaning that the commitment cannot be opened to any other value.

These commitments are recorded on the ledger. It is subsequently proven in zero-knowledge that:

- The input amounts for each individual non-FRA assets have the same sum as the output amounts for this asset. 
- The input amounts for the FRA asset have the same sum as the output amounts for this asset plus the transaction fees.

These proofs ensure that the total amount of the asset in circulation remains unchanged after the confidential asset transfer.