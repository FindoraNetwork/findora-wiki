# Technical Specifications

Let us take a deep dive into some of the concepts involving the cryptography under the hood which enables the anonymous transfers. 

## The Statements to be proven

In the anonymous transaction, the Prover's work broadly boils down to proving the following in zero-knowledge.

1. The validity of the commitments
2. (The sum of the inputs) equals (the sum of the outputs)+(the fees)
3. Knowledge of the sender's keys
4. The correctness of the computation of the nullifier
5. The Merkle membership proof
6. Range proofs to demonstrate that all input/output values lie in the range $[0, 2^{64}]$
7. Validity of the public keys
8. Correctness of the ciphertexts

The TurboPlonk Snark instantiated with the KZG polynomial commitment scheme allows the Prover to prove all of these statements with a *single* constant-sized proof. The proof generation time for each statement and consequently, for the batched proof, is superlinear $(\mathbb{O}(n\cdot \log(n)))$ in the size of the circuit. The size of the corresponding arithmetic circuit coincides with the size of the largest of these eight circuits, which is the circuit corresponding to the Merkle membership proof.

The runtime of an anonymous transfer is dominated by the Plonk proof generation for the eight statements. The runtime of the Plonk proof generation, in turn, is dominated by the zero knowledge Merkle Membership proof. Thus, it is vital for the runtime of this ZK Merkle Membership proof to be efficient or equivalently, for the corresponding circuit to be as small as possible. This is equivalent to the circuit for the knowledge of the pre-image of the hash being small. It is for this reason that the hashing algorithm used for the ABAR Merkle tree is a Snark-friendly hashing algorithm such as Rescue, Poseidon or MiMc. While these hashing algorithms are much slower than SHA-256, the circuit size of the Merkle membership proof with SHA-256 would be millions of gates, which would make the Prover's runtime far too expensive.

### Validity of Commitments

The Prover (the sender in the transaction) needs to prove that the input and output commitments are well-formed. In other words, they need to demonstrate knowledge of the asset types and amounts that correspond to the commitments recorded on the ledger. The sender also needs to prove knowledge of the new randomness which is used to convert the Blind Asset Record (BAR) to the Anonymous Blind Asset Record (ABAR). This step adds a layer of anonymity to the original data structure.

The input commitments are commitments of the 3-tuple - input amount, input asset type and the input randomness used to form the commitment.
Similarly, the output commitments are the commitments of the 3-tuple - output amount, output asset type, and the output randomness.

For each sender $u_i$:

- ${com.i} = {Com(amount.in.i}, {asset.type}; r.in.i)$

- ${com.new.i} = {Com(amount.in.i, asset.type; r.in.new.i)}$

For each receiver $v_j$:

- ${com.out.j} = {Com(amount.out.j, asset.type; r.out.j)}$

```
let com_abar_in_var =
            commit(&mut cs, payer.blind, payer.amount, payer.asset_type);
let com_abar_out_var =
    commit(&mut cs, payee.blind, payee.amount, payee.asset_type);
cs.prepare_io_variable(com_abar_out_var);
```

### Amount Sum Equality

The sender in an anonymous transfer needs to prove in zero-knowledge that:

- in the case of a non-FRA asset, the sum of input amounts equals the the sum of output amounts
- in the case of a the FRA asset, the sum of input amounts equals the the sum of output amounts plus the transaction fees.

This is necessary to prevent double spending, i.e. ensuring that no party is able to spend more than it possesses.

### The Merkle membership proof

As described earlier, the ABAR commitments are stored using an append-only tree, which we call the *ABAR tree*. This is a $3$-ary Merkle tree built using the Rescue hashing algorithm, i.e. each non-leaf is the Rescue hash of the concatenation of its three children.

The leaves of this Merkle tree contain the Pedersen commitments to the ABARs. A Pedersen commitment is endowed with two fundamental properties. It is *binding* in the sense that the data cannot be changed without changing the commitment. It is also *hiding* in the sense that no adversary can retrieve the data from its commitment. More precisely, even if the adversary suspects that a certain datum corresponds to a certain commitment, he is incapable of determining this.

The Prover (the sender of an ABAR) proves in zero knowledge that he possesses an ABAR and a sequence of Rescue hashes that go from this ABAR commitment to the publicly visible root hash of the ABAR tree. The Rescue hashing algorithm is designed so that the resulting circuit is substantially smaller than a similar circuit with a more standard hashing algorithm such as SHA-256 would be.

### The Nullifier Tree

Unlike the ABAR tree, the nullifier tree does not need to support efficient zero-knowledge membership proofs. Hence, the hashing algorithm does not need to be Snark-friendly. The nullifier tree is built using the SHA-256 hashing algorithm.

On the other hand, the nullifier tree does need to support efficient non-membership proofs to demonstrate non-repetition, especially for Verifiers running light nodes. For this reason, the nullifier set is stored using a binary sparse Merkle tree. This allows for more efficient non-membership proofs.

```rust
pub fn nullifier(
    key_pair: &AXfrKeyPair,
    amount: u64,
    asset_type: &AssetType,
    uid: u64,
) -> BLSScalar {
    let pub_key = key_pair.pub_key();
    let pub_key_point = pub_key.as_jubjub_point();
    let pub_key_x = pub_key_point.get_x();

    let pow_2_64 = BLSScalar::from(u64::MAX).add(&BLSScalar::from(1u32));
    let uid_shifted = BLSScalar::from(uid).mul(&pow_2_64);
    let uid_amount = uid_shifted.add(&BLSScalar::from(amount));

    let hash = RescueInstance::new();
    hash.rescue(&[
        uid_amount,
        asset_type.as_scalar(),
        pub_key_x,
        BLSScalar::from(&key_pair.get_secret_scalar()),
    ])[0]
}
```

### The Validity of the Ciphertexts

The sender proves in zero-knowledge - via a TurboPlonk proof - that he possesses the plaintext corresponding to the the ElGamal ciphertext that is stored on the ledger. The sender encrypts the ABAR plaintext using the public key sent by the receiver. The receiver decrypts the ciphertext using his private key, thus retrieving the ABAR plaintext. The receiver is now in possession of the ABAR and becomes a potential sender for that ABAR in the future.

### Knowledge of the Secret Keys

The sender proves his identity by providing an argument of knowledge for his secret keys and the nullifier stored on the ledger corresponding to the public keys.

### Range Proof

The range proof ultimately proves that the amount that is being transferred from the sender to the receiver belongs to a certain non-negative range. It boils down to showing that the amount transferred is less than or equal to the sender's balance.

## Design Choices for Elliptic Curves
### BLS12-381

The runtime of an anonymous transaction is dominated by the generation of the Plonk proof. Thus, improving the throughput for anonymous transactions largely boils down to optimizing the Plonk proof generation time. The parameters for our Plonk are chosen so as to optimize performance while still allowing for a security level of 128-bits.


PLONK hinges on elliptic curve pairings and hence, needs to be instantiated with a *pairing-friendly* elliptic curve. For $128$-bit security, the number field sieve attack necessitates a curve defined over a field of bit-size around $380$. A popular candidate for a pairing-friendly elliptic curve is the BLS12-381 curve, thus named because it is defined over a prime finite field $\mathbb{F}_{\ell}$ of bit-size $381$ and has embedding degree $12$ with respect to a $255$-bit prime $p$ that divides the number of points on the elliptic curve. The Plonk is instantiated with the *optimal ate* pairing on this curve. The FFTs on the Prover's end all occur in this field $\mathbb{F}_p$, which is known as the BLS12-381 *scalar field*.

The key parameters for a BLS curve are set using a single parameter **x** that can be selected to give the curve nice properties for implementation.

Specific design goals for BLS12-381 are:

* **x** has “low hamming weight”, meaning that it has very few bits set to 1. This is particularly important for the efficiency of the algorithm that calculates pairings (the Miller loop).

* The field modulus $\ell$ mentioned above is a prime and has 383 bits or fewer, which makes 64-bit or 32-bit arithmetic on it more efficient.
* The order $p$ of the subgroups we use is a prime and has 255 bits or fewer, which is good for the same reason as above.
* The security target is 128 bits.
* We want to have a large power-of-$2$ root of unity in the field $\mathbb{F}_p$. Equivalently, we want $p-1$ (the size of the multiplicative group of the scalar field) to be divisible by a large power of $2$. This property is key to being able to use the Fast Fourier transforms efficiently.

The value $x = -0xd201000000010000$ (hexadecimal, note that it is negative) gives the largest $\ell$ and the lowest Hamming weight meeting these criteria. With this **x** value we have,


| Parameter     |     |             Equation              | Value (hexadecimal)                                                                                |
| ------------- | --- |:---------------------------------:| -------------------------------------------------------------------------------------------------- |
| Field modulus | $\ell$   | $\frac{1}{3}(x−1)^2(x^4−x^2+1)+x$ | 0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffaaab |
| Subgroup size | $p$   |          $(x^4−x^2+1)+x$          | 0x73eda753299d7d483339d80809a1d80553bda402fffe5bfeffffffff00000001                                 |

### Jubjub


The Jubjub curve is an elliptic curve defined over the scalar field $\mathbb{F}_p$, i.e. the BLS12-381 scalar field. It is well suited for Pedersen commitments, private/public keypairs and Schnorr/ECDSA signatures. The Rescue hash function - used to build the ABAR commitment tree and the leaves of the nullifier tree - is defined over the field $\mathbb{F} _p$. Thus, the arithmetic circuit for any statement relevant to the anonymous transfer feature can be realized as a polynomial with $\mathbb{F}_p$-coefficients.

A downside to the Jubjub curve is that its endomorphism algebra is an imaginary quadratic field with a large discriminant. This makes it difficult to speed up scalar multiplications by exploiting the endomorphisms. We are considering replacing Jubjub with the newly discovered curve *Bandersnatch*. This is an elliptic curve over the field $\mathbb{F} _p$ and is endowed with an endomorphism ring with a small discriminant ($-3$) and hence, supports faster scalar multiplications.

## The Common Reference String

The common reference string (CRS) of PLONK consists of a vector of points on the BLS12-381 elliptic curve and is linear in the size of the circuit. In our case, the most complex of the statements is the zero-knowledge Merkle membership proof in the ABAR commitment tree. This boils down to proving in zero knowledge that the Prover possesses a sequence of Rescue hashes that forms a Merkle path for a certain ABAR.

The CRS is universal, i.e. the same CRS can be used to prove all necessary statements. It is also updateable, i.e. a new user can update the CRS using his privately generated randomness without having to perform a multi-party computation with the participants in the existing CRS. Thus, the CRS can be updated periodically.

## Proof Generation

The batched zk-Snark (TurboPlonk) proof of the eight statements described above, along with the merkle root, is made available as a part of the data structure `AXfrProof`.

```
pub struct AXfrProof {
    pub snark_proof: SnarkProof,
    pub merkle_root: BLSScalar,
    pub merkle_root_version: usize,
}
```

`AXfrBody` consists of the `AXfrProof` along with other important components of the anonymous transaction such as the inputs, output ABARs and the owner memo.

```
pub struct AXfrBody {
    pub inputs: Vec<(Nullifier, AXfrPubKey)>,
    pub outputs: Vec<AnonBlindAssetRecord>,
    pub proof: AXfrProof,
    pub owner_memos: Vec<OwnerMemo>,
}
```

This `AXfrBody` along with the signatures make up the `AXfrNote`, which is the confirmation that the sender receives after the anonymous transfer.

```
pub struct AXfrNote {
    pub body: AXfrBody,
    pub signatures: Vec<AXfrSignature>,
}
```

## Proof Verification

The Snark proof that is generated as seen in the above step, has to be verified by the verifier for the transaction to be a success. Here is a snippet of the code that executes on the verification side which calls the verification function along with the proof, public inputs and system parameters including KZG params.

```rust
// Verification error if there is a merkle root mismatch
if *merkle_root != body.proof.merkle_root {
    return Err(eg!(ZeiError::AXfrVerificationError));
}
// List of commitments
let payees_commitments = body
    .outputs
    .iter()
    .map(|output| output.amount_type_commitment)
    .collect();
// the public inputs of the transaction
let pub_inputs = AMultiXfrPubInputs {
    payers_inputs: body.inputs.clone(),
    payees_commitments,
    merkle_root: *merkle_root,
};
// this function checks the successful verification of the Plonk proof
verify_xfr(params, &pub_inputs, &body.proof.snark_proof)
    .c(d!(ZeiError::AXfrVerificationError))
```
