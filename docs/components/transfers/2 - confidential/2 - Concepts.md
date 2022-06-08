# Concepts

In order to explain how the most basic confidential transfers work in Findora, let us take a closer look at the anatomy of a Findora asset transfer transaction.

An asset transfer is executed simply by posting a transfer note to the Findora ledger, denoted *XfrNote* for short.

```rust
pub struct XfrNote {
    pub body: XfrBody,
    pub multisig: XfrMultiSig,
}
```

The `XfrBody` contains a list of input asset records and output asset records. For confidentiality these asset records are blinded, using cryptographic commitments. These are implemented using Pedersen commitments over the “Ristretto” elliptic curve.
```rust
pub struct XfrBody {
    pub inputs: Vec<BlindAssetRecord>,
    pub outputs: Vec<BlindAssetRecord>,
    pub proofs: XfrProofs,
    pub asset_tracing_memos: Vec<Vec<TracerMemo>>, // each input or output can have a set of tracing memos
    pub owners_memos: Vec<Option<OwnerMemo>>, // If confidential amount or asset type, lock the amount and/or asset type to the public key in asset_record
}
```

We call the blinded record data structure a BlindAssetRecord to distinguish it from a plain AssetRecord.

```rust
pub struct AssetRecord {
    pub open_asset_record: OpenAssetRecord,
    pub tracing_policies: TracingPolicies,
    pub identity_proofs: Vec<Option<ACConfidentialRevealProof>>,
    pub asset_tracers_memos: Vec<TracerMemo>,
    pub owner_memo: Option<OwnerMemo>,
}
```

```rust
pub struct BlindAssetRecord {
    pub amount: XfrAmount,        // Amount being transferred
    pub asset_type: XfrAssetType, // Asset type being transferred
    pub public_key: XfrPublicKey, // ownership address
}
``` 

### Generation of Proofs

For confidential transfers, the primary parameter that should be hidden is the amount. A key difference between Findora and mono-asset chains such as Monero or Zcash is that we also hide the asset types involved in a transaction.

The raw amount is stored into a data structure called the *Asset Record*. Initially, a Pedersen commitment to the amount is computed and recorded on the ledger. This is stored into a data structure called the *Blind Asset Record* or *BAR* for short. Using the information stored in the Blind Asset Record and via the Bulletproofs scheme, the sender constructs the transfer proof known as the *XFR Proof* for short. Using this XFR Proof along with the inputs and outputs of the transaction, the *XFR Body* is constructed. Finally, using this XFR Body along with the multi signatures of the participants, the *XFR Note* is constructed.


![](https://i.imgur.com/4TnJRir.png)


### Verification of Proofs

For the verification of confidential asset proofs, a function is used to verify the validity of the *XFR Note* data structure. As always, the XFR Notes are ultimately verified in batches using the an appropriate batching function. This function basically divides the verifcation process into 2 parts:
1. Verifying the multisignatures
2. Verifying the XFR Bodies.

The verification of XFR Bodies is broadly divided into 2 steps. The first part consists of verifying the asset records. This part basically checks if the amounts and asset types are correct. The second part consists of verifying the asset tracing proofs.

For verifying the asset records, there are broadly 3 steps:
1. Performing the batched range proof for verifying the confidential amounts
2. Performing the batched Chaum-Pedersen equality proofs for verifying the confidential asset types
3. Performing the batched asset mixing proofs for checking the amount sum equality in the circuits

This last function contains the batch verify function which performs main proof verification inside the R1CS circuit.

![](https://i.imgur.com/CHcWudd.png)
