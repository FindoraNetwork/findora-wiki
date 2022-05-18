## Concepts

### Generation of Proofs

For confidential transfers, the primary parameter that should be hidden is the amount. A key difference between Findora and mono-asset chains such as Monero or Zcash is that we also hide the asset types involved in a transaction.

The raw amount is stored into a data structure called the *Asset Record*. Initially, the a Pedersen commitment to the amount is computed and recorded on the ledger. This is stored into a data structure called the *Blind Asset Record* or *BAR* for short. Using the information stored in the Blind Asset Record and via the Bulletproofs scheme, the sender constructs the transfer proof known as the *XFR Proof* for short. Using this XFR Proof data structure along with the inputs and outputs of the transaction, he constructs a basic building block of the transaction called the *XFR Body*. Finally, using this XFR Body along with the multi signatures of the participants, he constructs the main building block of the transaction called the *XFR Note*.


![](https://i.imgur.com/4TnJRir.png)


### Verification of Proofs

For the verification of confidential asset proofs, a function is used to verify the validity of the *XFR Note* data structure. As always, the XFR Notes are ultimately verified in batches using the an appropriate batching function. This function basically divides the verifcation process into 2 parts:
1. verifying the multisignatures
2. verifying the XFR Bodies.

The verification of XFR Bodies is broadly divided into 2 steps. The first part consists of verifying the asset records. This part basically checks if the amounts and asset types are correct. The second part consists of verifying the asset tracing proofs.

For verifying the asset records, there are broadly 3 steps:
1. performing the batched range proof for verifying the confidential amounts
2. performing the batched Chaum-Pedersen equality proofs for verifying the confidential asset types
3. performing the batched asset mixing proofs for checking the amount sum equality in the circuits

This last function contains the batch verify function which performs main proof verification inside the R1CS circuit.

![](https://i.imgur.com/CHcWudd.png)
