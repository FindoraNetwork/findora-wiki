# Technical Specifications -- Merge with Technical-specifications.md

## Transparent assets to anonymous assets (AR-to-ABAR)

A zero-knowledge proof is generated, as follows, to provide that the anonymous assets are correct.

* We assume that the verifier has already checked that $0\leq x< 2^{64}$.


* **Instance:**

    * AR amount $x$
    * AR asset code $y$
    * the commitment of ABAR $c$



* **Witness:**

    * the blinding factor in the commitment $b$
    * the public key of the recipient $k$



* **Statement:**

    * Check $c:=\mathsf{Rescue}(\mathsf{Rescue}(b, x, y, 0), k, 0, 0)$.
    


## Anonymous assets to transparent assets (ABAR-to-AR)

* We assume that the verifier has already checked that $0\leq x< 2^{64}$.

* **Instance:**

    * the nullifier $n$
    
    * the Merkle tree root $r$
    
    * AR amount $x$
    
    * AR asset code $y$
    
    * transaction body hash $h$
    
    * non-malleability tag $t$



* **Witness:** 

    * the blinding factor in the commitment $b$
    * the secret key of the owner $s$
    * Merkle tree path $m$
    * non-malleability randomizer $z$


* **Statement:**

    * Let the reconstructed public key be $k := sG$, where $G$ is the generator for the signature scheme. 
    
    
    * Let the reconstructed commitment be $c := \mathsf{Rescue}(\mathsf{Rescue}(b, x, y, 0), k, 0, 0)$.
    
    
    * Observe the Merkle tree path $m$ and deduce the unique ID $u$.
    
    
    * Check that $c$ is in the tree with root $r$, given the Merkle tree path $m$, with the unique ID $u$.
    
    
    * Check $n = \mathsf{Rescue}(\mathsf{Rescue}(u\cdot 2^{64}+x, y, 0, k), s, 0, 0)$.
    
    
    * Check $t = \mathsf{Rescue}(1, h, z, s)$.
    


## Confidential assets to anonymous assets (BAR-to-ABAR)

Note that its verification contains a zk-SNARK part and a non-zk-SNARK part. We first describe the zk-SNARK part, as follows.

* **Instance:** 

    * the commitment of ABAR $c$
    * the commitment of the secrets in BAR $d$
    * the non-zk-SNARK part responses $\beta$, $\lambda$, $\beta\cdot\lambda$, and $w = s_1+\lambda\cdot s_2$, where $s_1 = \beta x + a$ and $s_2 = \beta y + b$



* **Witness:** 

    * the secrets in BAR, $x$, $y$, $a$, and $b$
    
    * the randomizer $r$ used in commitment $d$
    
    * the blinding factor in the commitment $b'$
    
    * the public key of the recipient $k$



* **Statement:** 

    * Check that $d$ is a commitment of $x\parallel y\parallel a\parallel b\parallel r$. 
    
    
    * Check that $c = \mathsf{Rescue}(\mathsf{Rescue}(b', x, y, 0), k, 0, 0)$.
    
    
    * Check $\beta x + \beta\lambda y + \lambda b = w - a$ in field simulation.



The non-zk-SNARK part, which interacts with the Ristretto point  that encodes the amount $P$ and the one that encodes the asset type $Q$, the randomizers $R$ and $S$, and the responses $s_1$, $s_2$, $s_3$, and $s_4$. 


The non-zk-SNARK part works as follows. 


* Initialize a cryptographic sponge with group description.


* Put $(P, Q)$ into the sponge.


* Put the commitment of ABAR $c$ into the sponge.


* Put the commitment of the secrets in BAR $d$ into the sponge.


* Put $(R, S)$ into the sponge.


* Squeeze a random challenge, which should be equal to $\beta$,  from the sponge.


* Put $(s_1, s_2, s_3, s_4)$ into the sponge.


* Squeeze a random challenge, which should be equal to $\lambda$, from the sponge.


* Check $s_1 G + s_3 H = \beta P + R$.


* Check $s_2 G + s_4 H = \beta Q + S$.


## Anonymous assets to confidential assets (ABAR-to-BAR)

Similar to the BAR-to-ABAR protocol, it consists of a zk-SNARK part and a non-zk-SNARK part. We first describe the zk-SNARK part, as follows.

* **Instance:** 

    * the nullifier of ABAR $n$
    
    * the Merkle tree root $r$
    
    * the commitment of the secrets in BAR $d$
    
    * the non-zk-SNARK part responses $\beta$, $\lambda$, $\beta\cdot\lambda$, and $w=s_1+\lambda s_2$ where $s_1 = \beta x + a$ and $s_2 = \beta y+b$
    
    * transaction body hash $h$
    
    * non-malleability tag $t$



* **Witness:** 

    * the secrets in BAR, $x$, $y$, $a$, and $b$
    
    * the randomizer $r$ used in commitment $d$
    
    * the blinding factor in the commitment $b'$
    
    * the secret key of the owner $s$
    
    * Merkle tree path $m$
    
    * non-malleability randomizer $z$



* **Statement:**

    * Let the reconstructed public key be $k := sG$ where $G$ is the generator for the signature scheme.
    
    
    * Let the reconstructed commitment be $c := \mathsf{Rescue}(\mathsf{Rescue}(b', x, y, 0), k, 0, 0)$.
    
    
    * Observe the Merkle tree path $m$ and deduce the unique ID $u$.
    
    
    * Check that $c$ is in the tree with root $r$, given the Merkle tree path $m$, with the unique ID $u$.
    
    
    * Check that $d$ is a commitment of $x\parallel y\parallel a\parallel b\parallel r$.
    
    
    * Check $\beta x + \beta \lambda y + \lambda b = w - a$ in field simulation.
    
    
    * Check $n = \mathsf{Rescue}(\mathsf{Rescue}(u\cdot 2^{64} + x, y, 0, k), s, 0, 0)$.
    
    
    * Check $t = \mathsf{Rescue}(1, h, z, s)$.


The non-zk-SNARK part, which interacts with the Ristretto point that encodes the amount $P$ and the one that encodes the asset type $Q$, the randomizers $R$ and $S$, and the responses $s_1$, $s_2$, $s_3$, and $s_4$. 


The non-zk-SNARK part works as follows.


* Initialize a cryptographic sponge with group description.


* Put $(P, Q)$ into the sponge.


* Put the nullifier $n$ into the sponge.


* Put the commitment of the secrets in BAR $d$ into the sponge.


* Put $(R, S)$ into the sponge.


* Squeeze a random challenge, which should be equal to $\beta$, from the sponge.


* Put $(s_1, s_2, s_3, s_4)$ into the sponge.


* Squeeze a random challenge, which should be equal to $\lambda$, from the sponge.


* Check $s_1 G+ s_3 H = \beta P+ R$.


* Check $s_2 G + s_4 H = \beta Q + S$.


## Anonymous transfer

We now define the statement for different combinations of the number of inputs and outputs. Consider that we have $N_\mathsf{in}$ ABAR inputs and $N_\mathsf{out}$ ABAR outputs.


* **Instance:** 

    * $N_\mathsf{in}$ nullifiers $[n_i]_{i=1}^{N_\mathsf{in}}$
    
    * the Merkle tree root $r$
    
    * $N_\mathsf{out}$ ABAR commitments $[c'_i]_{i=1}^{N_\mathsf{out}}$
    
    * the fee $f$
    
    * transaction body hash $h$
    
    * non-malleability tag $t$


* **Witness:** 

    * the blinding factors in the input commitments $[b_i]_{i=1}^{N_\mathsf{in}}$
    
    * the blinding factors in the output commitments $[b'_i]_{i=1}^{N_\mathsf{out}}$
    
    * the amounts in the input commitments $[x_i]_{i=1}^{N_\mathsf{in}}$
    
    * the asset types in the input commitments $[y_i]_{i=1}^{N_\mathsf{in}}$
    
    * the amounts in the output commitments $[x'_i]_{i=1}^{N_\mathsf{out}}$
    
    * the asset types in the output commitments $[y'_i]_{i=1}^{N_\mathsf{out}}$
        
    * the secret keys of the input commitments' owners $[s_i]_{i=1}^{N_\mathsf{in}}$
    
    * the Merkle tree paths for all the input commitments $[m_i]_1^{N_\mathsf{in}}$
    
    * the public keys of the output commitments' recipients $[k'_i]_{i=1}^{N_\mathsf{out}}$
    
    * non-malleability randomizer $z$


* **Statement:** 

    * Let the reconstructed public keys be $k_i = s_i G$ where $G$ is the generator for the signature scheme, for $i=1, 2, ..., N_\mathsf{in}$.
    
    
    * Let the reconstructed input commitments be $c_i = \mathsf{Rescue}(\mathsf{Rescue}(b_i, x_i, y_i, 0), k_i, 0, 0)$, for $i=1, 2, ..., N_\mathsf{in}$.
    
    
    * Let the reconstructed output commitments be $c'_i = \mathsf{Rescue}(\mathsf{Rescue}(b'_i, x'_i, y'_i, 0), k'_i, 0, 0)$, for $i=1, 2, ..., N_\mathsf{out}$.
    
    
    * Observe the Merkle tree path $m_i$ and deduce its corresponding unique ID $u_i$, for $i = 1, 2, ..., N_\mathsf{in}$.
    
    
    * Check that $c_i$ is in the tree with root $r$, given the Merkle tree path $m_i$, with the unique ID $u_i$, for $i=1, 2, ..., N_\mathsf{in}$.
    
    
    * Check $n_i = \mathsf{Rescue}(\mathsf{Rescue}(u_i\cdot 2^{64} + x_i, y_i, 0, k_i), s_i, 0, 0)$.
    
    
    * Check if $(x'_i, y'_i)$ is a correct mixing of $(x_i, y_i)$ after paying the fee $f$ over the asset for transaction fees.
    
    
    * Check amounts of the output commitments $x'_i$ are within $64$ bit, for $i = 1, 2, ..., N_\mathsf{out}$.
    
    
    * Construct an array $H=({N}_\mathsf{in}, h, z, s_1, s_2, ..., s_{N_\mathsf{in}})$.
    
    
    * Pad this array with $0$ so that its length $\ell = 4 + 3n$ for some nonnegative integer $n$.
    
    
    * $\mathsf{cur} := \mathsf{Rescue}(H_1, H_2, H_3, H_4)$.
    
    
    * For $j = 1, 2, ..., n$: $\mathsf{cur} := \mathsf{Rescue}(\mathsf{cur}, H_{3n + 2}, H_{3n + 3}, H_{3n + 4})$.
    
    
    * Check $t = \mathsf{cur}$.



## Asset mixing gadget

The asset mixing gadget is defined for different combinations of the number of inputs and outputs, and is hardcoded with the asset type used to pay for transaction fees.

* **Gadget input:**

    * $N_\mathsf{in}$ input pairs of amount and asset type: $[(x_i, y_i)]_{i=1}^{N_\mathsf{in}}$
    
    
    * $N_\mathsf{out}$ output pairs of amount and asset type: $[(x'_i, y'_i)]_{i=1}^{N_\mathsf{out}}$
    
    
    * The fee $f$


* **Statement:**

    * Compute the sum $\sigma_i$ for each input. For $i = 1, 2, ..., N_\mathsf{in}$:
    
        * $\sigma_i = \sum_{j=1}^{N_\mathsf{in}} (y_i \stackrel{?}{=} y_j)\cdot x_j$, where $(y_i \stackrel{?}{=} y_j) = 1$ if $y_i = y_j$ and $0$ otherwise.
    
    
    
    * Compute the sum $\sigma'_i$ for each output. For $i = 1, 2, ..., N_\mathsf{out}$:
    
        * $\sigma'_i = \sum_{j=1}^{N_\mathsf{out}} (y'_i \stackrel{?}{=} y'_j)\cdot x'_j$, where $(y'_i \stackrel{?}{=} y'_j) = 1$ if $y'_i = y'_j$ and $0$ otherwise.
    
    
    
    * Require at least one of the $y_i$ is the fee type.
    
    
    * For each accumulated input pair $(\sigma_i, y_i)$ for $i = 1, 2, ..., N_\mathsf{in}$:
    
    
        * For each accumulated output pair $(\sigma'_j, y'_j)$ for $i = 1, 2, ..., N_\mathsf{in}$:
        
        
            * If $y_i$ is not the fee type, require $(\sigma_i - \sigma'_j)\cdot (y_i \stackrel{?}{=}y'_j) = 0$. 
            
            
            * Else, if $y_i$ is the fee type, require $(\sigma_i - \sigma'_j-f)\cdot (y_i \stackrel{?}{=}y'_j) = 0$
        
        
        
        * If $y_i$ is not the fee type, then there must exist some $j$ such that $y_i = y'_j$.
        
        
        * If $y_i$ is the fee type, and if there is no $j$ such that $y_i = y'_j$, then we require $\sigma_i = f$.
    
    
    
    * Require that all the output asset types appear among the input asset types. For each output asset type $y'_j$, $j=1, 2, ..., N_\mathsf{out}$, require $\prod_{i=1}^{N_\mathsf{in}} (y_i - y'_j) = 0$.