# Technical Specifications
import useBaseUrl from '@docusaurus/useBaseUrl';

## Primitives
Let us take a deep dive into some of the concepts involving the cryptography under the hood which enables the confidential transfers.
### Schnorr's protocol

Schnorr's protocol is a zero-knowledge protocol that allows a Prover to prove that he knows the discrete logarithm between two group elements. It is instantiated with groups such as elliptic curve groups where the discrete logarithm problem is believed to be hard.

Given commitments to pairs representing asset-types and amounts, this protocol can be used to prove that two commitments are to the same asset-type. With minor modifications, the protocol can also be used to prove that the commitments are to distinct asset types if necessary.


### Bulletproofs

The range proofs are derived from a zero-knowledge proof scheme called *Bulletproofs*. This is an instantiation of a special class of range proofs where the sender proves in zero-knowledge (i.e. without revealing any other information about the transaction) that the masked (or committed) amount falls within a certain range. In particular, a sender can use this scheme to prove that the amount he sent is non-negative and does not exceed his balance, which is necessary to prevent double-spending on the chain. This is a *transparent* scheme, meaning it does not require any preprocessing phase or trusted setup. The security of Bulletproofs relies on the hardness of the discrete logarithm problem in elliptic curves, which is one of the oldest and most battle-tested assumptions in cryptography.

We first describe a straightforward albeit inefficient way to create a range proof. The Prover decomposes the integer representing the amount into its binary representation. He then creates commitments to each of those bits and then sends a proof attesting to the claim that each of these commitments is to a bit and that the amount is the aggregation of these bits. But this proof size is linear in the bit length of the amount, which is quite inefficient in practice. Bulletproofs is an efficient range proof which is logarithmic in the size of the amount. The core of the bulletproof protocol hinges on a technique called the *recursive inner product argument*. 

### Pedersen commitments

The cryptographic commitments are *perfectly hiding*, which makes them distinct from encryptions. They do not contain any information that can be decrypted by someone with a key. Rather, they serve as a hidden fingerprint for the committed information, similar to how a server can send a hash of a file before sharing the file. The hash is a unique fingerprint that can be measured from the file, but the file cannot be obtained from the hash. Cryptographic commitments can only be “opened” or “unblinded” given the unique information that was committed and a secret value called the *blinding factor*. If $C$ is a commitment to a message $m$ using blinding factor $r$, then $C$ can be uniquely computed from $m$ and $r$, and the knowledge of $r$ is proof that $C$ was a commitment to $m$. In Findora’s blinded asset records, the blinding factors are shared with the new asset owner (i.e. transfer recipient) using a method similar to a Diffie-Hellman key exchange. This user derives the blinding factors from blind share and its private key corresponding to public key. The user needs these blinding factors in order to check that the decrypted contents of the record are correct (i.e. as approved by the validators) and will also need to use them to transfer ownership of the asset in a future transaction.

As before, let $\mathbb{G}$ denote the Ristretto group, i.e. the group of points on the Ristretto curve. Let $p$ be the order of this group. For independent group generators $g_1,g_2,h\in \mathbb{G}$ and a pair $(a,b)\in \mathbb{F}_p^2$ representing the asset type and amount, the commitment to this pair is given by $g_1^{a}g_2^{b}h^r$ where $r$ is a random element in $\mathbb{F}_p$.

Findora uses the *Ristretto* group, which is a quotient group built from the elliptic curve group on Curve25519. This group has order $8p$ for the prime: $$p =2^{252} +27742317777372353535851937790883648493.$$ The Ristretto quotient group is the unique quotient group of order $p$.

## Proof Generation

The `XfrProofs` structure contains a zero-knowledge proof that the blinded output records are valid with respect to the blinded input records. Since the fees are denominated in the FRA token, it is necessary to prove in zero-knowledge that:

- for every asset type other than FRA, the sum of the inputs is the same as the sum of the outputs
- the sum of the inputs corresponding to the FRA asset is the same as the sum of the outputs plus the fees for the transaction.


Note that for some particular asset types, there might be fees, thus for that cases it proves that sum of output amounts for that asset type in the output asset records plus fees equals the sum of input amounts for the same asset type in the input records). To be more precise, if there are n $(n \geq 1)$ inputs records and m $(m \geq 1)$ output records,

- $\alpha_i$ is the amount in the $i$th input record
- $\beta_j$ is the amount in the $j$th output record
- $Input[\tau]$ the set of input indices with asset type matching $\tau$
- $Output[\tau]$ the set of output indices with asset type matching $\tau$
- $\mathcal{T}$ is the complete set of types other than FRA in output records

Then **XfrProofs** prove that

for all $\tau \in \mathcal{T} \;\; \sum_{i \in Input[\tau]} \alpha_i = \sum_{j \in Output[\tau]} \beta_j$

when asset type matches $FRA$ (i.e $\tau = FRA$). Fees must be considered. Hence the equation becomes as follows

$\sum_{i \in Input[FRA]} \alpha_i = \sum_{j \in Output[FRA]} \beta_j + Fees$

The randomness in the Pedersen commitments is communicated to the receiver in the form of text encrypted with the receiver's public key. The receiver then decrypts this text using his private key. The security of this scheme hinges on the hardness of the Discrete logarithm problem (DLP). The proof of the amount-sum equality relies on the homomorphic property of Pedersen commitments.


### Proving Commitment Equality

A confidential transaction can - and usually does - have multiple associated Pedersen commitments to (asset type, amount) pairs. To prove the so-called *amount-sum equality*, it is necessary to *verifiably* reveal which of the commitments correspond to the same asset type, without actually revealing this asset type. To show that two Pedersen commitments $C_1 = g_1^{a_1}g_2^{b_1}h^{r_1}$, $C_2 = g_1^{a_2}g_2^{b_2}h^{r_2}$ are such that $a_1 = a_2$, it suffices to show that the quotient $C_1\cdot C_2^{-1}$ is of the form $g_2^{x}h^y$ for some $x,y$ known to the Prover. Using an aggregation trick, this proof can be kept constant-sized when the Prover needs to show that the asset type committed in $C_1$ is the same as the asset type committed in $C_2,\cdots,C_n$.

### Proving the Amount-Sum Equality

Given input commitments $C_1^{\mathrm{in}},\cdots, C_m^{\mathrm{in}}$ and output commitments $C_1^{\mathrm{out}},\cdots, C_n^{\mathrm{out}}$ verifiably corresponding to the same asset type, a Prover shows that the input and output amounts sum up to the same value by proving in zero-knowledge that the element $\widetilde{C}:= (\prod_{i=1}^m C_i^{\mathrm{in}})\cdot (\prod_{j=1}^n C_j^{\mathrm{out}})^{-1}$ is of the form $g_1^{a(m-n)}h^{r}$ (or $g_1^{a(m-n)}g_2^{\mathrm{fees}}h^{r}$ in case the asset_type is FRA) where $r$ is some integer known to the Prover and $a$ is the common asset-type committed in the commitments $C_i^{\mathrm{in}}$, $C_j^{\mathrm{out}}$.

To prevent double-spends on the blockchain in tandem with maintaining confidentiality, it is necessary for the sender of a transaction to prove in zero-knowledge that the amounts committed are all non-negative. This requires a zero-knowledge range proof to convince a Verifier that the amounts are non-negative. Findora's confidential transfer is accompanied by proofs that the committed amounts lie in the range $[0, 2^{64}-1]$. These proofs are constructed using the Bulletproofs scheme.

Bulletproofs are particularly suited for range proofs on small ranges: the proof for a $64$-bit range is less than 1KB and takes only milliseconds to both create and verify. Bulletproofs have a batching mode where a range proof from $m$ points is only $64\log(m)$ bytes larger than a range proof for a single point (e.g. a batch proof for 100 points is less than 500 bytes larger). Bulletproofs also have a batch verification mode where the amortized time to verify many range proofs is approximately 0.34 ms per proof.

### Range proofs via inner product arguments

Let $C_v = g^{v} h^r$ be a commitment to a value $v$. To show that $v$ lies in the range $[0,2^{n}-1]$, it suffices for the Prover to show that he knows a vector $\mathbf{a}_L = (a_0,\cdots,a_{n-1})$ such that:

- $\langle \mathbf{a}_L\;,\; \mathbf{2}^n \rangle  = v$, which shows that $v = \sum_{i=0}^n a_i\cdot 2^i$
- $\mathbf{a}_L \circ (\mathbf{1}^n - \mathbf{a}_L) = \mathbf{0}^n$, which shows that the entries of $\mathbf{a}_L$ lie in $\{0,1 \}^n$.

In other words, this shows that the $n$ entries of $\mathbb{a}_L$ represent the bit decomposition of $v$.

For randomly generated challenges $y, z\in \mathbb{F}_p$, it suffices to show that,

$z^2 \cdot \langle \mathbf {a}_L \hspace{3pt} ,
\hspace{3pt} \mathbf {2}^n \rangle + z \cdot \langle \mathbf {a}_L - \mathbf {1}^n - \mathbf {a}_R \hspace{3pt} ,
\hspace{3pt} \mathbf {y}^n \rangle + \langle \mathbf {a}_L \hspace{3pt} ,
\hspace{3pt} \mathbf {a}_R \circ \mathbf {y}^n \rangle = z^2 \cdot v \hspace{20pt}$

where  $\mathbf {a}_R = \mathbf{1}^n - \mathbf{a}_L$


## Proof Verification
During the verification of confidential transfer at the validators' end, the validity of the `XfrNote` is checked. This is done in batches to increase the efficiency. The following is the hierarchy of the steps:
- Verifying if the signatures associated with the transacton are valid
- Batch verifying the bodies
    - Verifying the Asset Records if the amounts and asset types are correct
        - Verifying the batched range proof for the confidential amounts
        - Verifying the batched Chaum-Pedersen equality proofs for the asset types
        - Verifying the batched asset mixing proofs for checking the amount sum equality for multiple assets
    - Verifying the Asset Tracing proofs

<p align="center"><img src={useBaseUrl("/img/proof_verification.jpg")} width="70%"/></p>

For the equality of committed asset-typed and the amount-sum equalities for the asset-types, the Verifier's task boils down to verifying Schnorr proofs of knowledge of discrete logarithms. The proofs are batched so that the communication complexity and the verification time stay constant.

To verify the range proofs, the Verifier performs a sequence of inner product checks. The Verifier uses the same hashing algorithm as the Prover to get the independent group generators in $\mathbb{G}$. This makes his runtime $\mathbf{O}(n)$.

<!---
For the verification of confidential transfer proofs, first the validity of the `XfrNote` is checked. The Notes are verified in batches to increase the efficiency. This has 2 steps:
1. Verifying if the signatures associated with the transacton are valid
2. Batch verifying the bodies

```rust
pub fn verify_xfr_note<R: CryptoRng + RngCore>(
    prng: &mut R,
    params: &mut PublicParams,
    xfr_note: &XfrNote,
    policies: &XfrNotePoliciesRef,
) -> Result<()> {
    batch_verify_xfr_notes(prng, params, &[&xfr_note], &[&policies]).c(d!())
}
```

```rust
pub fn batch_verify_xfr_notes<R: CryptoRng + RngCore>(
    prng: &mut R,
    params: &mut PublicParams,
    notes: &[&XfrNote],
    policies: &[&XfrNotePoliciesRef],
) -> Result<()> {
    // 1. verify signature
    for xfr_note in notes {
        verify_transfer_multisig(xfr_note).c(d!())?;
    }

    // 2. batch verify bodies
    let bodies = notes.iter().map(|note| &note.body).collect_vec();
    batch_verify_xfr_bodies(prng, params, &bodies, policies).c(d!())
}
```

```rust
pub(crate) fn verify_transfer_multisig(xfr_note: &XfrNote) -> Result<()> {
    let mut bytes = vec![];
    xfr_note
        .body
        .serialize(&mut rmp_serde::Serializer::new(&mut bytes))
        .c(d!(ZeiError::SerializationError))?;
    let pubkeys = xfr_note
        .body
        .inputs
        .iter()
        .map(|input| &input.public_key)
        .collect_vec();
    xfr_note.multisig.verify(&pubkeys, &bytes)
}
```

The verification of bodies consists of
1. Verifying the Asset Records if the amounts and asset types are correct
2. Verifying the Asset Tracing proofs

```rust
pub fn batch_verify_xfr_bodies<R: CryptoRng + RngCore>( 
    prng: &mut R,
    params: &mut PublicParams,
    bodies: &[&XfrBody],
    policies: &[&XfrNotePoliciesRef],
) -> Result<()> {
    // 1. verify amounts and asset types
    batch_verify_xfr_body_asset_records(prng, params, bodies).c(d!())?;

    // 2. verify tracing proofs
    batch_verify_tracer_tracing_proof(prng, &params.pc_gens, bodies, policies).c(d!())
}
```

<p align="center"><img src={useBaseUrl("/img/proof_verification.jpg")} width="70%"/></p>

Verifying the Asset Records, consists of the following steps:
- Verifying the batched range proof for the confidential amounts
- Verifying the batched Chaum-Pedersen equality proofs for the asset types
- Verifying the batched asset mixing proofs for checking the amount sum equality for multiple assets

```rust
pub(crate) fn batch_verify_xfr_body_asset_records<R: CryptoRng + RngCore>(
    prng: &mut R,
    params: &mut PublicParams,
    bodies: &[&XfrBody],
) -> Result<()> {
    // 1. Batch verify Range Proof
    let mut transcripts = vec![Transcript::new(b"Zei Range Proof"); instances.len()];
    let proofs: Vec<&RangeProof> =
        instances.iter().map(|(_, _, pf)| &pf.range_proof).collect();
    let mut commitments = vec![];
    for (input, output, proof) in instances {
        commitments.push(
            extract_value_commitments(input.as_slice(), output.as_slice(), proof)
                .c(d!())?,
        );
    }
    let value_commitments = commitments.iter().map(|c| c.as_slice()).collect_vec();
    batch_verify_ranges(
        prng,
        &params.bp_gens,
        &params.pc_gens,
        proofs.as_slice(),
        &mut transcripts,
        &value_commitments,
        BULLET_PROOF_RANGE,
    )
    .c(d!(ZeiError::XfrVerifyConfidentialAmountError))

    // 2. Verify Chaum-Pedersen batch proofs for Asset Equality
    let mut transcript = Transcript::new(b"AssetEquality");
    let mut proof_instances = Vec::with_capacity(instances.len());
    for (inputs, outputs, proof) in instances {
        let instance_commitments: Result<Vec<RistrettoPoint>> = inputs
            .iter()
            .chain(outputs.iter())
            .map(|x| match x.asset_type {
                XfrAssetType::Confidential(com) => {
                    com.decompress().c(d!(ZeiError::ParameterError))
                }
                XfrAssetType::NonConfidential(asset_type) => {
                    Ok(pc_gens.commit(asset_type.as_scalar(), Scalar::from_u32(0)))
                }
            })
            .collect();
        proof_instances.push((instance_commitments.c(d!())?, *proof));
    }
    chaum_pedersen_batch_verify_multiple_eq(
        &mut transcript,
        prng,
        &pc_gens,
        &proof_instances,
    )
    .c(d!(ZeiError::XfrVerifyConfidentialAssetError))
}
```

```
// 3. Verify Asset mixing proofs for multiple assets
fn batch_verify_asset_mix<R: CryptoRng + RngCore>(
    prng: &mut R,
    params: &mut PublicParams,
    bars_instances: &[(&[BlindAssetRecord], &[BlindAssetRecord], &AssetMixProof)],
) -> Result<()>
```
-->