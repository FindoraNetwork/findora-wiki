# Cryptography Primitives

## ElGamal encryption

The ElGamal encryption in the Zei library is defined over the Ristretto curve, where the base $\mathbf{G}$ is the base point of the Ristretto group. Note that the message $\mathbf{m}$ is encoded into a group element as $\mathbf{m}\cdot \mathbf{G}$, which means that it can only be decrypted through brute-force. One who wants to remove this restriction can use reversible encoding, but it is not implemented in the Zei library.


The ElGamal encryption scheme has the following syntax:


* $\mathsf{KeyGen}(1^\lambda)\rightarrow (\mathsf{sk},\mathsf{pk})$: 

    
    * $\mathsf{sk} \leftarrow\!{\footnotesize \$} \hspace{3pt} \mathbb{F}$

    
    * $\mathsf{pk} := \mathsf{sk}\cdot \mathbf{G}$
    
    
    * output $(\mathsf{sk},\mathsf{pk})$



* $\mathsf{Enc}(\mathsf{pk}, \mathbf{m})\rightarrow \mathsf{ct}$:

    * $\mathbf{r}\leftarrow\!{\footnotesize \$} \hspace{3pt} \mathbb{F}$
    
    
    * output $\mathsf{ct} := \mathsf{EncWithRand}(\mathsf{pk},\mathbf{m},\mathbf{r})$.



* $\mathsf{EncWithRand}(\mathsf{pk},\mathbf{m}, \mathbf{r})\rightarrow \mathsf{ct}$: 

    * $\mathsf{ct}_1 := \mathbf{r}\cdot \mathbf{G}$.
    
    
    * $\mathsf{ct}_2 := \mathbf{m}\cdot \mathbf{G} + \mathbf{r}\cdot \mathsf{pk}$.
    
    
    * Output $\mathsf{ct} := (\mathsf{ct}_1,\mathsf{ct}_2)$.



* $\mathsf{Verify}(\mathsf{sk},\mathbf{m},\mathsf{ct}):= \mathbf{b}\in\{0,1\}$:

    * $(\mathsf{ct}_1, \mathsf{ct}_2) := \mathsf{ct}$
    
    
    * check $\mathsf{ct}_2 - \mathsf{sk}\cdot \mathsf{ct}_1 \stackrel{?}{=} \mathbf{m}\cdot G$



* $\mathsf{PartialDec}(\mathsf{sk}, \mathsf{ct}):= \mathbf{m}\cdot G$:

    * $(\mathsf{ct}_1, \mathsf{ct}_2) := \mathsf{ct}$
    
    * output $\mathsf{ct}_2 - \mathsf{sk}\cdot \mathsf{ct}_1$



## Hybrid encryption

The hybrid encryption in the Zei library supports the X25519 curve and the Ed25519 curve, and the symmetric encryption is done using the counter mode of the AES cipher. 


The hybrid encryption scheme has the following syntax:

* $\mathsf{HybridEnc}(\mathsf{sk},m)\rightarrow \mathsf{ct}$:

    * $\mathbf{r}\leftarrow\!{\footnotesize \$} \hspace{3pt} \mathbb{F}$
    
    * $\mathsf{ct}_1 :=  \mathbf{r}\cdot \mathbf{G}$
    
    * derive an AES symmetric key $\mathbf{k}$ from $\mathsf{sk}\cdot\mathsf{ct}_1$ using SHA256
    
    * $\mathsf{ct}_2 := \mathsf{AESEnc}(\mathbf{k}, \mathbf{m})$
    
    * output $\mathsf{ct}=(\mathsf{ct}_1,\mathsf{ct}_2)$



* $\mathsf{HybridDec}(\mathsf{sk},\mathsf{ct}):= \mathbf{m}$:

    * $(\mathsf{ct}_1,\mathsf{ct}_2):= \mathsf{ct}$
    
    
    * derive an AES symmetric key $\mathbf{k}$ from $\mathsf{sk}\cdot\mathsf{ct}_1$ using SHA256
    
    
    * output $\mathbf{m} := \mathsf{AESDec}(\mathbf{k}, \mathsf{ct}_2)$
    


## Matrix Sigma protocol
The matrix Sigma protocol in the Zei library is a proof of knowledge for the following statement: the prover $\mathbb{P}$ knows a scalar vector $\vec{x}\in\{0,1\}^n$ such that:

$\mathbf{M}\cdot \vec{\mathbf{x}}^T = \vec{\mathbf{y}}$

where $\mathbf{M}\in\mathbb{G}^{m\times n}$ is a matrix of group elements and $\vec{\mathbf{y}}\in\mathbb{G}^m$ is a vector of group elements.


The matrix Sigma protocol has the following syntax. In the actual implementation, the Fiat-Shamir transform is performed over a transcript across one or more interactive protocols. 


* $\mathsf{Prove}(\mathbf{M}, \vec{\mathbf{x}})\rightarrow \pi$:

    * append individual group elements in $\mathbf{M}$ to the transcript
    
    
    * $\vec{\mathbf{r}}\leftarrow\!{\footnotesize \$} \hspace{3pt}\mathbb{F}^n$
    
    
    * $\vec{\mathbf{c}} := \mathbf{M}\cdot \vec{\mathbf{r}}^T$
    
    
    * append $\vec{\mathbf{c}}$ to the transcript
    
    
    * squeeze a challenge $\beta$ from the Fiat-Shamir transform
    
    
    * $\vec{\mathbf{d}} := \beta \vec{\mathbf{x}} + \vec{\mathbf{r}}$
    
    
    * output $\pi = (\vec{\mathbf{c}}, \vec{\mathbf{d}})$



* $\mathsf{Verify}(\mathbf{M},\vec{\mathbf{y}}, \pi):=\mathbf{b}\in\{0,1\}$

    * $(\vec{\mathbf{c}}, \vec{\mathbf{d}}) := \pi$

    
    * append individual group elements in $\mathbf{M}$ to the transcript
    
    
    * append $\vec{\mathbf{c}}$ to the transcript
    
    
    * squeeze a challenge $\beta$ from the Fiat-Shamir transform
    
    
    * check $\mathbf{M}\cdot \vec{\mathbf{d}}\stackrel{?}{=} \beta\cdot\vec{\mathbf{y}} + \vec{\mathbf{c}}$


## Schnorr signature

The Schnorr signature in the Zei library is the classical version. The multi-signature implementation extends from the simple Schnorr signature in a naive manner: the multi-signature is a list of simple Schnorr signatures from individual signers. The Schnorr signature scheme is defined over a group $\mathbb{G}$ with a generator $\mathbf{G}$ with a scalar field $\mathbb{F}$.


The Schnorr signature has the following syntax.


* $\mathsf{KeyGen}(1^\lambda)\rightarrow(\mathsf{sk},\mathsf{pk}):$

    * $\mathsf{sk}\leftarrow\!{\footnotesize \$} \hspace{3pt}\mathbb{F}$
    
    
    * $\mathsf{pk} := \mathsf{sk}\cdot \mathbf{G}$
    
    
    * output $(\mathsf{sk},\mathsf{pk})$



* $\mathsf{Sign}(\mathsf{sk},\mathbf{m})\rightarrow \sigma:$

    * $\mathbf{r}\leftarrow\!{\footnotesize \$} \hspace{3pt} \mathbb{F}$
    
    
    * $\mathbf{R} := \mathbf{r} \cdot \mathbf{G}$
    
    
    * append the message $\mathbf{m}$, the public key $\mathsf{pk} := \mathsf{sk}\cdot \mathbf{G}$, and $\mathbf{R}$ to the transcript
    
    
    * squeeze a challenge $\mathbf{c}$ from the Fiat-Shamir transform
    
    
    * $\mathbf{s} := \mathsf{r} + \mathbf{c}\cdot \mathsf{sk}$
    
    
    * output $\sigma := (\mathbf{R}, \mathbf{s})$



* $\mathsf{Verify}(\mathsf{pk},\mathbf{m},\sigma) := \mathbf{b}\in\{0,1\}$:

    * $(\mathbf{R}, \mathbf{s}) := \sigma$
    
    
    * append the message $\mathbf{m}$, the public key $\mathsf{pk} := \mathsf{sk}\cdot \mathbf{G}$, and $\mathbf{R}$ to the transcript
    
    
    * squeeze a challenge $\mathbf{c}$ from the Fiat-Shamir transform
    
    
    * check $\mathbf{R} + \mathbf{c}\cdot \mathsf{pk} \stackrel{?}{=} \mathbf{s}\cdot \mathbf{G}$
    


## Pedersen commitment over Ristretto

The Pedersen commitment over Ristretto scheme in the Zei library is used to represent the amount and the asset type. The scheme is defined over a group with two independent generators $\mathbf{G}$ and $\mathbf{H}$, where we do not know their discrete logs to each other. The commitment algorithm is as follows.


* $\mathsf{Commit}(\mathbf{m},\mathbf{r})\rightarrow\mathbf{comm}$:

    * output $\mathbf{m}\cdot\mathbf{G} + \mathbf{r}\cdot\mathbf{H}$
    


## Chaum-Pedersen proof of commitment equality

The Chaum-Pedersen proof of commitment equality scheme in the Zei library is to show that two Pedersen commitments $\mathbf{comm}_1$ and $\mathbf{comm}_2$, whose blinding factors are correspondingly $\mathbf{r}_1, \mathbf{r}_2$, commit to the same value $\mathbf{m}$. This proof is commonly used to show equality over commitments.


The Chaum-Pedersen proof of commitment equality scheme has the following syntax.


* $\mathsf{Prove}(\mathbf{comm}_1,\mathbf{comm}_2,\mathbf{m},\mathbf{r}_1,\mathbf{r}_2)\rightarrow \pi$:

    * let matrix $\mathbf{M}$ be:

    $
        \mathbf{M} := \left( \begin{array}{ccc}
                \mathbf{G} & \mathbf{H} & 
                1_\mathbb{G}\\ 
                \mathbf{G} &
                1_\mathbb{G} &
                \mathbf{H}
        \end{array}\right)
    $
    
    
    * let vector $\vec{\mathbf{x}}$ be:

    $
    \vec{\mathbf{x}} := \left(\begin{array}{lll}
    \mathbf{m} & \mathbf{r}_1 & \mathbf{r}_2
    \end{array}\right)
    $
    
    
    * output $\pi = \mathsf{MatrixSigma}.\mathsf{Prove}(\mathbf{M}, \vec{\mathbf{x}})$



* $\mathsf{Verify}(\mathbf{comm}_1,\mathbf{comm}_2,\pi) := \mathbf{b}\in\{0,1\}$:

    * let matrix $\mathbf{M}$ be:

    $
        \mathbf{M} := \left( \begin{array}{ccc}
                \mathbf{G} & \mathbf{H} & 
                1_\mathbb{G}\\ 
                \mathbf{G} &
                1_\mathbb{G} &
                \mathbf{H}
        \end{array}\right)
    $
    
    
    * let vector $\vec{\mathbf{y}}$ be:

    $
        \vec{\mathbf{y}} := \left(\mathbf{comm}_1, \mathbf{comm}_2\right) 
    $
    
    
    * check $\mathsf{MatrixSigma}.\mathsf{Verify}(\mathbf{M},\vec{\mathbf{y}},\pi) = 1$
    



There is an extended version of Chaum-Pedersen proof that checks the equality of multiple commitments, often used for checking the asset types. It has the following syntax. Note that there are alternative constructions, but due to compatibility reasons, we cannot easily upgrade.



* $\mathsf{BatchProve}([\mathbf{comm}_i]_1^n, \mathbf{m}, [\mathbf{r}_i]_1^n)\rightarrow \pi$:

    * append $\mathbf{G},\mathbf{H},[\mathbf{comm}_i]_1^n$ to the transcript
    
    
    * $\pi_1 \leftarrow \mathsf{Prove}(\mathbf{comm}_1,\mathbf{comm}_2,\mathbf{m},\mathbf{r}_1,\mathbf{r}_2)$
    
    
    * squeeze $\ell_3,\ell_4,...,\ell_n$ from the Fiat-Shamir transform
    
    
    * $\mathbf{comm} := \sum_{i=3}^n \ell_i\cdot(\mathbf{comm}_i - \mathbf{comm}_1)$
    
    
    * $\mathbf{r} := \sum_{i=3}^n \ell_i\cdot (\mathbf{r}_i - \mathbf{r}_1)$
    
    
    * $\pi_2 \leftarrow\mathbf{Prove}(\mathbf{comm},1_{\mathbb{G}}, 0_{\mathbb{F}}, \mathbf{r}, 0_{\mathbb{F}})$
    
    
    * output $\pi := (\pi_1, \pi_2)$



* $\mathsf{BatchVerify}([\mathbf{comm}_i]_1^n, \pi) := \mathbf{b}\in\{0,1\}$:

    * append $\mathbf{G},\mathbf{H},[\mathbf{comm}_i]_1^n$ to the transcript
    
    
    * $(\pi_1,\pi_2) := \pi$
    
    
    * squeeze $\ell_3,\ell_4,...,\ell_n$ from the Fiat-Shamir transform
    
    
    * $\mathbf{comm} := \sum_{i=3}^n \ell_i\cdot(\mathbf{comm}_i - \mathbf{comm}_1)$
    
    
    * check $\mathsf{Verify}(\mathbf{comm}_1,\mathbf{comm}_2,\pi_1)=1$
    
    
    
    * check $\mathsf{Verify}(\mathbf{comm},1_\mathbb{G},\pi_2)=1$
    


## Pedersen-ElGamal proof of equality

The Pedersen-ElGamal proof of equality scheme in the Zei library is used for a very special situation for the Pedersen commitments and associated ElGamal ciphertexts. Particularly, the commitments and the ElGamal ciphertexts share the same message as well as the same randomness. The only difference is that, in the commitment, the random scalar $\mathbf{r}$ is multiplied over an independent group generator $\mathbf{H}$, while in the ciphertext, $\mathbf{r}$ is multiplied over some public key $\mathsf{pk}$.


The Pedersen-ElGamal proof of equality has the following syntax.



* $\mathsf{Prove}(\mathbf{m},\mathbf{r},\mathsf{pk},\mathsf{ct},\mathbf{comm})\rightarrow \pi$:

    * let matrix $\mathbf{M}$ be:

    $
    \mathbf{M} := \left(\begin{array}{cc}
    0_\mathbb{G} & \mathbf{G}\\
    \mathbf{G} & \mathsf{pk}\\
    \mathbf{G} & \mathbf{H}
    \end{array}\right)
    $
    
    
    * let vector $\vec{\mathbf{x}}$ be:

    $
    \vec{\mathbf{x}} := \left(\begin{array}{cc}
    \mathbf{m} & \mathbf{r}
    \end{array}\right)
    $
    
    
    * output $\pi := \mathsf{MartixSigma}.\mathsf{Prove}(\mathbf{M},\vec{\mathbf{x}})$



* $\mathbf{Verify}(\mathsf{pk},\mathsf{ct},\mathbf{comm},\pi) := b\in\{0,1\}$:

    * let matrix $\mathbf{M}$ be:

    $
    \mathbf{M} := \left(\begin{array}{cc}
    0_\mathbb{G} & \mathbf{G}\\
    \mathbf{G} & \mathsf{pk}\\
    \mathbf{G} & \mathbf{H}
    \end{array}\right)
    $
    
    
    * let vector $\vec{\mathbf{y}}$ be:

    $
    \vec{\mathbf{y}} := \left(
    \begin{array}{cc}
        \mathsf{ct} & \mathbf{comm}
    \end{array}
    \right)
    $
    
    
    * check $\mathsf{MatrixSigma}.\mathsf{Verify}(\mathbf{M},\vec{\mathbf{y}},\pi)=1$
    


## Rescue hash function

The Rescue hash function implementation in the Zei library follows <a href="https://github.com/KULeuven-COSIC/Marvellous">this reference implementation</a>. The test against the reference implementation shows that the implementation has been correctly implemented. 
