# Delegated Chaum-Pedersen Protocol

The Zei library implements a protocol that is specifically used to open Pedersen commitments over Ristretto inside zk-SNARK over BLS12-381. This is a new protocol that has not been documented and studied before.


For now, we call this protocol ``\emph{delegated Chaum-Pedersen}'', though we believe that a better name exists. Since this protocol is special-purpose, we feel it helpful to describe the problem that this protocol wants to solve.


\parhead{Problem: lifting a Pedersen commitment to a Rescue commitment} In Findora, we support two types of privacy payments: confidential payments and anonymous payments.

    * \textbf{Confidential payment:} The private tokens are represented by two Pedersen commitments over the Ristretto group, one for the amount, another one for the asset type. We represent the commitment for the amount as $P = xG + \gamma H$ where $x$ is the amount and $\gamma$ is the randomizer, and we represent the commitment for the asset type as $Q = yG + \delta H$ where $y$ is the asset type and $\delta$ is the randomizer. This confidential payment is therefore able to hide the amount and the asset type, but is unable to hide the sender. The zero-knowledge proof protocol used for confidential payment is Bulletproofs.
    
     
    * \textbf{Anonymous payment:} The private tokens are represented by a Rescue commitment, which commits the amount, the asset type, and the owner's public key, as well as a randomizer. This Rescue commitment corresponds to, and is invalidated by, a Rescue nullifier, which commits the amount, the asset type, the owner's public key, as well as the owner's private key. This is able to hide the sender and the receiver, the amount, and the asset type, and we sometimes refer to it as ``triple masking''. The Rescue commitment is defined over BLS12-381 curve, and the zero-knowledge proof protocol used for anonymous payment is a five-wire high-degree TurboPlonk.



The problem that we face in production is that, we want to enable the user to transform a confidential token into an anonymous token, and during this transform, \emph{we want to keep the amount and asset type hidden.} The challenge is that the Pedersen commitments are defined over the Ristretto group, but the Rescue commitments are defined over the BLS12-381 scalar field. Verifying such a Pedersen commitment in zk-SNARK over BLS12-381 requires field simulation. That is, we need to perform the computation for point multiplication over a different field, through the use of field simulation that we describe before. 


\parhead{Problem: field simulations are costly} Naively, the field simulation would require about $6\times 10^3$ simulated multiplication steps. Since field simulation is expensive, it would take a significant amount of time for the user, and would not be feasible in production. 


In our implementation, we try to reduce the number of field simulations. The approach is that, instead of doing \emph{point simulation} inside the zk-SNARK, we push the point operations out of zk-SNARK, in which case simulation is not needed, and we permit only a few field simulations inside the zk-SNARK, for the purposes of connecting with the point operations done externally.


This protocol, delegated Chaum-Pedersen, describes the part that is being pushed out from zk-SNARK from the naive construction. It is an extension of the classical Chaum-pedersen protocol, with the additional change that the witness, $a, b, c, d$ below, is committed in the protocol under a randomizer $r$, using the Rescue hash function. 


\parhead{Full documentation} The one we describe here is part of the protocol (which is outside zk-SNARK), so understanding its correctness and soundness is infeasible. Please refer to this document for the full protocol.\footnote{\url{https://www.overleaf.com/read/rwswqjbwxpzm}}


\parhead{Notations} As follows, we assume that the order of the Ristretto scalar field is $p$, and the order of the BLS12-381 scalar field is $q$. We let $G$ and $H$ be two generators suitable for Pedersen commitments over the Ristretto group.


    * $\mathsf{Prove}(x,\gamma, y, \delta, P, Q, z) \rightarrow (\pi, w, \beta, \lambda)$:
    
    
        * Require $P = x G+\gamma H$ and $Q = y G+\delta H$.
    
        
        * Sample $a,b,c,d,r\leftarrow\mathbb{F}_p$.
        
        
        * Let $\overrightarrow{\mathsf{x\_limbs}}, \overrightarrow{\mathsf{y\_limbs}}$,
        $\overrightarrow{\mathsf{a\_limbs}}$,
        $\overrightarrow{\mathsf{b\_limbs}}$ be the limb representations of $x, y, a, b$ when these values are represented in field simulation. This gives us $4\times 6 = 24$ limbs in total, where each limb has at most $43$ bits. 
        
        
        * Compress these limbs into $5$ elements in $\mathbb{F}_q$:
        
        
            * $\mathsf{compressed\_limbs}[0] := \mathsf{x\_limbs}[0] + \mathsf{x\_limbs}[1] \cdot 2^{43} + \mathsf{x\_limbs}[2] \cdot 2^{43\times 2} + \mathsf{x\_limbs}[3] \cdot 2^{43\times 3} + \mathsf{x\_limbs}[4] \cdot 2^{43\times 4}$
            
            
            * $\mathsf{compressed\_limbs}[1] := \mathsf{x\_limbs}[5] + \mathsf{y\_limbs}[0] \cdot 2^{43} + \mathsf{y\_limbs}[1] \cdot 2^{43\times 2} + \mathsf{y\_limbs}[2] \cdot 2^{43\times 3} + \mathsf{y\_limbs}[3] \cdot 2^{43\times 4}$
            
            
            * $\mathsf{compressed\_limbs}[2] := \mathsf{y\_limbs}[4] + \mathsf{y\_limbs}[5] \cdot 2^{43} + \mathsf{a\_limbs}[0] \cdot 2^{43\times 2} + \mathsf{a\_limbs}[1] \cdot 2^{43\times 3} + \mathsf{a\_limbs}[2] \cdot 2^{43\times 4}$
            
            
            * $\mathsf{compressed\_limbs}[3] := \mathsf{a\_limbs}[3] + \mathsf{a\_limbs}[4] \cdot 2^{43} + \mathsf{a\_limbs}[5] \cdot 2^{43\times 2} + \mathsf{b\_limbs}[0] \cdot 2^{43\times 3} + \mathsf{b\_limbs}[1] \cdot 2^{43\times 4}$
            
            
            * $\mathsf{compressed\_limbs}[4] := \mathsf{b\_limbs}[2] + \mathsf{b\_limbs}[3] \cdot 2^{43} + \mathsf{b\_limbs}[4] \cdot 2^{43\times 2} + \mathsf{b\_limbs}[5] \cdot 2^{43\times 3}$
        
        
        
        * \emph{This step differs from classical Chaum-Pedersen protocol.} Use a Rescue hash function $\mathsf{RescueHash}: (\mathbb{F}_q)^4\rightarrow \mathbb{F}_q$ to compute a commitment, using $r$ as the randomizer.
        
        
            * $\mathsf{comm} := \mathsf{RescueHash}\left(\mathsf{RescueHash}\left(\begin{array}{l}
        \mathsf{compressed\_limbs}[0],\\ \mathsf{compressed\_limbs}[1],\\
        \mathsf{compressed\_limbs}[2],\\
        \mathsf{compressed\_limbs}[3]\end{array}\right), \mathsf{compressed\_limbs}[4], r, 0\right)$
        
    
    
    * Compute $R = aG + cH$, $S=bG+ dH$.
    
    
    * Put $(G, H, P, Q, z, \mathsf{comm}, R, S)$ into the cryptographic sponge for Fiat-Shamir transform and squeeze out a random challenge $\beta\in\mathbb{F}_p$.
    
    
    * Compute the responses:
    
    
        * $s_1 = \beta x + a$
        
        * $s_2 = \beta y + b$
        
        * $s_3 = \beta\gamma + c$
        
        * $s_4 = \beta\delta + d$
    
    
    
    * Put $(s_1, s_2, s_3, s_4)$ into the cryptographic sponge for the Fiat-Shamir transform and squeeze out a random challenge $\lambda\in\mathbb{F}_p$. 
    
    
    * Let $\pi := (\mathsf{comm}, R, S, s_1, s_2, s_3, s_4)$.
    
    
    * Let $w := (x, y, a, b, r)$.
    
    
    * Output $(\pi, w, \beta, \lambda)$.
    
    
    
    
    * $\mathsf{Verify}(P, Q, z, \pi):= b\in\{0,1\}$:
    
    
        * Parse $\pi = (\mathsf{comm}, R, S, s_1, s_2, s_3, s_4)$.
    
        
        * Put $(G,H, P, Q, z, \mathsf{comm}, R, S)$ into the cryptographic sponge for the Fiat-Shamir transform and squeeze out a random challenge $\beta\in\mathbb{F}_p$.
        
        
        * Continue by putting $(s_1, s_2, s_3, s_4)$ into the cryptographic sponge and squeeze out a random challenge $\lambda\in\mathbb{F}_p$.
        
        
        * Check that $s_1 G + s_3 H = \beta P + R$.
        
        
        * Check that $s_2 G + s_4 H = \beta Q + S$.
        
        
        * Output $b=1$ if all the checks pass, and $b=0$ otherwise. 
    
