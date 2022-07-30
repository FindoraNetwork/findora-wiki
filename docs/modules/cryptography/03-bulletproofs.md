# Bulletproofs

## Bulletproofs-based mixing protocol

To prove correct mixing of confidential assets, the Zei library makes use of Bulletproofs. The protocol here follows a modular design. We first present the shuffle gadget and RHS-merge-or-not gadget as well as some helper functions, and then we describe how to construct the mixing protocol.


* $\mathsf{Shuffle}(\overrightarrow{\mathsf{a\_amount}}, \overrightarrow{\mathsf{a\_asset\_type}},\overrightarrow{\mathsf{b\_amount}}, \overrightarrow{\mathsf{b\_asset\_type}})$:

    * This gadget enforces that $\overrightarrow{\mathsf{b\_amount}}, \overrightarrow{\mathsf{b\_asset\_type}}$ is a result of shuffling from $\overrightarrow{\mathsf{a\_amount}}, \overrightarrow{\mathsf{a\_asset\_type}}$, where the amount and the asset type are being shuffled together, and each vector has length $\ell$.
    
    
    * Obtain two random challenges $\alpha,\beta\in\mathbb{F}$ from the Bulletproofs R1CS interface. Note that Bulletproofs R1CS interface allows the program to pull random challenges in the middle.
    
    
    * Compute a random linear combination for $(\overrightarrow{\mathsf{a\_amount}}, \overrightarrow{\mathsf{a\_asset\_type}})$.
    
    
        * $\mathsf{left} := \prod_{i=1}^\ell (\mathsf{a\_amount}[i] + \alpha\cdot \mathsf{a\_asset\_type}[i] - \beta)$.
        
        
        * $\mathsf{right} := \prod_{i=1}^\ell (\mathsf{b\_amount}[i] + \alpha\cdot \mathsf{b\_asset\_type}[i] - \beta)$.
    
    
    
    * Enforce $\mathsf{left} = \mathsf{right}$.



* $\mathsf{RHSMergeOrNot}(\overrightarrow{\mathsf{a\_amount}},\overrightarrow{\mathsf{a\_asset\_type}},\overrightarrow{\mathsf{b\_amount}},\overrightarrow{\mathsf{b\_asset\_type}})$:

    
    * This gadget enforces that $(\overrightarrow{\mathsf{b\_amount}}, \overrightarrow{\mathsf{b\_asset\_type}})$ is obtained by doing \emph{optional} RHS merging over $(\overrightarrow{\mathsf{a\_amount}}, \overrightarrow{\mathsf{a\_asset\_type}})$ when the asset types of the two consecutive ones are the same. Each vector has length $\ell$.
    
    
    * Copy $\overrightarrow{\mathsf{tmp\_amount}} := \overrightarrow{\mathsf{a\_amount}}$ and $\overrightarrow{\mathsf{tmp\_asset\_type}} := \overrightarrow{\mathsf{a\_asset\_type}}$. We will be working over these two temporary vectors.
    
    
    * For $i = 0, 1, ..., \ell - 1$, 
    
        * If ${\mathsf{tmp\_asset\_type}}[i] = {\mathsf{tmp\_asset\_type}}[i + 1]$, then a merge is \emph{permitted}. Otherwise, a merge is prohibited. 
        
        
        * If a merge is permitted and $\mathsf{b\_amount}[i] = 0$, then the merge happens, we update $\overrightarrow{\mathsf{tmp\_amount}}$ and $\overrightarrow{\mathsf{tmp\_asset\_type}}$,
            
            * $\mathsf{tmp\_amount}[i + 1] := \mathsf{tmp\_amount}[i] + \mathsf{tmp\_amount}[i + 1]$
            
            * $\mathsf{tmp\_amount}[i] := 0$
            
        
                        
        * Otherwise, the merge does not happen, we do not update $\overrightarrow{\mathsf{tmp\_amount}}$ and $\overrightarrow{\mathsf{tmp\_asset\_type}}$.
    
    
    
    * Require $\overrightarrow{\mathsf{tmp\_amount}} = \overrightarrow{\mathsf{b\_amount}}$ and $\overrightarrow{\mathsf{tmp\_asset\_type}} = \overrightarrow{\mathsf{b\_asset\_type}}$.



* $\mathsf{Pad}(\overrightarrow{\mathsf{amount}},\overrightarrow{\mathsf{asset\_type}}, \ell) := (\overrightarrow{\mathsf{amount}}', \overrightarrow{\mathsf{asset\_type}}')$:

    
    * Require $\lvert\overrightarrow{\mathsf{amount}}\rvert = \lvert\overrightarrow{\mathsf{asset\_type}}\rvert \leq \ell$.
    
    
    * Append $0$ to the end of $\overrightarrow{\mathsf{amount}}$ and $\perp$ to the end of $\overrightarrow{\mathsf{asset\_type}}$, until their length reaches $\ell$. 



* $\mathsf{RangeCheck}(x)$:

    
    * For $i = 0, 1, ..., 64-1$:
    
        
        * Ask the prover for two bits, $a_i,b_i\in\{0,1\}$. An honest prover is expected to let $a_i$ be the $i$-th bit of $x$ and let $b_i := 1 - a_i$.
        
        
        * Require $a_i \cdot b_i = 0$ and $a_i = 1 - b_i$.
    
    
    
    * Require $x = \sum_{i=0}^{64-1} b_i\cdot 2^i$.



The entire Bulletproofs-based mixing protocol is as follows:
    
* $\mathsf{Mix}(\overrightarrow{\mathsf{a\_amount}}, \overrightarrow{\mathsf{a\_asset\_type}}, \overrightarrow{\mathsf{b\_amount}}, \overrightarrow{\mathsf{b\_asset\_type}})$:

    
    * Ask the prover to provide a shuffled version of $(\overrightarrow{\mathsf{a\_amount}},\overrightarrow{\mathsf{a\_asset\_type}})$ and $(\overrightarrow{\mathsf{b\_amount}},\overrightarrow{\mathsf{b\_asset\_type}})$. An honest prover is expected to sort the entries in each vector in a way that the entries for the same asset type are consecutive to each other. There is no particular requirement on the order of this sorting.
    
    
    * Let $(\overrightarrow{\mathsf{sorted\_a\_amount}},\overrightarrow{\mathsf{sorted\_a\_asset\_type}})$ and $(\overrightarrow{\mathsf{sorted\_b\_amount}},\overrightarrow{\mathsf{sorted\_b\_asset\_type}})$ be the vectors that the prover provides. 
    
    
    * Invoke the shuffle gadget:
    
        
        * $\mathsf{Shuffle}(\overrightarrow{\mathsf{a\_amount}}, \overrightarrow{\mathsf{a\_asset\_type}}, \overrightarrow{\mathsf{sorted\_a\_amount}}, \overrightarrow{\mathsf{sorted\_a\_asset\_type}})$
        
        
        * $\mathsf{Shuffle}(\overrightarrow{\mathsf{b\_amount}}, \overrightarrow{\mathsf{b\_asset\_type}}, \overrightarrow{\mathsf{sorted\_b\_amount}}, \overrightarrow{\mathsf{sorted\_b\_asset\_type}})$
    
    
    
    * Ask the prover to provide a merged version of $(\overrightarrow{\mathsf{sorted\_a\_amount}},\allowbreak \overrightarrow{\mathsf{sorted\_a\_asset\_type}})$ and $(\overrightarrow{\mathsf{sorted\_b\_amount}}, \allowbreak \overrightarrow{\mathsf{sorted\_b\_asset\_type}})$. An honest prover is expected to perform RHS merging whenever possible. 
    
    
    * Let $(\overrightarrow{\mathsf{merged\_a\_amount}},\allowbreak \overrightarrow{\mathsf{merged\_a\_asset\_type}})$ and $(\overrightarrow{\mathsf{merged\_b\_amount}},\allowbreak \overrightarrow{\mathsf{merged\_b\_asset\_type}})$ be the vectors that the prover provides.
    
    
    * Invoke the RHS merging-or-not gadget:
    
        
        * $\mathsf{RHSMergeOrNot}(\overrightarrow{\mathsf{sorted\_a\_amount}},\allowbreak \overrightarrow{\mathsf{sorted\_a\_asset\_type}},\allowbreak \overrightarrow{\mathsf{merged\_a\_amount}},\allowbreak \overrightarrow{\mathsf{merged\_a\_asset\_type}})$
        
        
        * $\mathsf{RHSMergeOrNot}(\overrightarrow{\mathsf{sorted\_b\_amount}},\allowbreak \overrightarrow{\mathsf{sorted\_b\_asset\_type}},\allowbreak \overrightarrow{\mathsf{merged\_b\_amount}},\allowbreak \overrightarrow{\mathsf{merged\_b\_asset\_type}})$
    



* Require $\lvert \overrightarrow{\mathsf{a\_amount}}\rvert = \lvert \overrightarrow{\mathsf{a\_asset\_type}}\rvert$ and $\lvert\overrightarrow{\mathsf{b\_amount}}\rvert = \lvert\overrightarrow{\mathsf{b\_asset\_type}}\rvert$.


* Let $\ell := \max(\lvert \overrightarrow{\mathsf{a\_amount}}\rvert, \lvert\overrightarrow{\mathsf{b\_amount}}\rvert)$.

    
* Compute the padded vectors by invoking the pad gadget:

    
    * $(\overrightarrow{\mathsf{padded\_a\_amount}},\allowbreak\overrightarrow{\mathsf{padded\_a\_asset\_type}}):=\mathsf{Pad}(\overrightarrow{\mathsf{merged\_a\_amount}},\allowbreak \overrightarrow{\mathsf{merged\_a\_asset\_type}}, \ell)$
    
    
    * $(\overrightarrow{\mathsf{padded\_b\_amount}},\allowbreak\overrightarrow{\mathsf{padded\_b\_asset\_type}}):=\mathsf{Pad}(\overrightarrow{\mathsf{merged\_b\_amount}},\allowbreak \overrightarrow{\mathsf{merged\_b\_asset\_type}}, \ell)$



* Invoke the shuffle gadget that the padded vectors are equivalent:

    
    * $\mathsf{Shuffle}(\overrightarrow{\mathsf{padded\_a\_amount}}, \overrightarrow{\mathsf{padded\_a\_asset\_type}}, \overrightarrow{\mathsf{padded\_b\_amount}}, \overrightarrow{\mathsf{padded\_b\_asset\_type}})$



* For $i=0, 1, ..., \lvert\overrightarrow{\mathsf{b\_amount}}\rvert - 1$:

    
    * Invoke the range-check gadget: $\mathsf{RangeCheck}(\mathsf{b\_amount}[i])$.



## Bulletproofs-based range check

To prove that *a pair of* Pedersen commitments are committing a valid amount in confidential payments, the Zei library makes use of Bulletproofs. 


This is a proof of knowledge, since a Pedersen commitment could be committing any number. What is being shown in this proof is that a prover knows a binding that can interpret a Pedersen commitment with a specific valid number that the prover knows. Assuming that the discrete log problem is hard and the CRS is secure, it is sufficient for confidential payments.


We omit a detailed description, as it simply invokes the  proving and verifying algorithms for range checks in the Bulletproofs library that the Zei library depends on. 