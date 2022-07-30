# Confidential Anonymous Credentials

In this section we describe a variant of the anonymous credential scheme, in which the attributes are not revealed in the \emph{plaintext}, but in the \emph{ciphertext}. This is done via ElGamal encryption and a proof of knowledge protocol that also works with ElGamal ciphertexts.

\smallskip

    * $\mathsf{ConfidentialOpenComm}(\mathsf{usk},\mathsf{ipk},\overrightarrow{\mathsf{attrs}},\mathsf{cm}, \mathsf{rand},\overrightarrow{\mathsf{reveal\_map}},\mathsf{ek}, \mathbf{m})\rightarrow(\overrightarrow{\mathsf{ct}},\pi_{\mathsf{open}})$: Selectively open some attributes committed in $\mathsf{cm}$ to ciphertexts, where $\overrightarrow{\mathsf{attrs}}$ lists the attributes, $\mathsf{cm}$ is the commitment, $\mathsf{rand}$ is the randomizer used in the  commitment, $\overrightarrow{\mathsf{reveal\_map}}$ describes whether an attribute should be revealed or not, $\mathsf{ek}$ is the encryption key, and $\mathbf{m}$ is the message committed along with the commitment. It outputs the ciphertexts $\overrightarrow{\mathsf{ct}}$ and an opening proof $\pi_{\mathsf{open}}$.
    
    \smallskip
    
        * Ensure $n := \lvert \overrightarrow{\mathsf{attrs}}\rvert = \lvert \overrightarrow{\mathsf{reveal\_map}}\rvert$.
    
        \smallskip
        * Generate ciphertexts and their  randomizers: $\overrightarrow{\mathsf{ct}}$ and  $\overrightarrow{\mathsf{ct\_rand}}$. For $i=0, 1, ..., n - 1$:
        \smallskip
        
            * If $\mathsf{reveal\_map} = 1$, this attribute will be revealed into a ciphertext.
            \smallskip
            
                * $\mathsf{ct\_rand}[i] \leftarrow\!{\footnotesize \$} \hspace{3pt} \mathbb{F}$.
                
                \smallskip
                * $\mathsf{ct}[i] := \mathsf{ElGamal.EncWithRand}(\mathsf{ek}, \mathsf{attrs}[i], \mathsf{ct\_rand}[i])$.
            
            
            \smallskip
            * Otherwise, skip this attributes.
            \smallskip
            
                * $\mathsf{ct\_rand}[i] := \perp$.
                
                \smallskip
                * 
                $\mathsf{ct}[i] := \perp$.
            
        
        
        \smallskip
        * Initialize the cryptographic sponge used for the Fiat-Shamir transform.
        
        \smallskip
        * Put $(\mathsf{ipk},\mathsf{ek},\mathsf{cm},\overrightarrow{\mathsf{ct}})$ into the sponge.
        
        \smallskip
        * Put $\mathbf{m}$ into the sponge.
        
        \smallskip
        * $\mathbf{r}_\mathsf{t}, \mathbf{r}_\mathsf{sk}\leftarrow\!{\footnotesize \$} \hspace{3pt}\mathbb{F}$.
        
        \smallskip
        * Initialize three vectors $\overrightarrow{\mathbf{r}_\mathsf{attr}}$, $\overrightarrow{\mathbf{r}_\mathsf{rand}}$, and $\overrightarrow{\mathsf{cm\_ct}}$.
        
        \smallskip
        * For $i = 0, 1, ...,n - 1$:
        \smallskip
        
            * $\mathbf{r}_\mathsf{attr}[i] \leftarrow\!{\footnotesize \$} \hspace{3pt} \mathbb{F}$.
            
            \smallskip
            * If $\mathsf{reveal\_map}[i] = 1$,
            \smallskip
            \begin{itemize}
                * $\mathbf{r}_\mathsf{rand}[i] \leftarrow\!{\footnotesize \$} \hspace{3pt} \mathbb{F}$.
                
                \smallskip
                * $\mathsf{cm\_ct}[i] := \mathsf{ElGamal.EncWithRand}(\mathsf{ek},\mathsf{attrs}[i], \mathsf{ct\_rand}[i])$.
                
                \smallskip
                * Put $\mathsf{cm\_ct}[i]$ into the sponge.
            
            
            \smallskip
            * Otherwise, $\mathsf{cm\_ct}[i] := \perp$.
            \smallskip
            \begin{itemize}
                * $\mathbf{r}_\mathsf{rand}[i] := \perp$.
                
                \smallskip
                * $\mathsf{cm\_ct}[i] := \perp$.
            
        
        
        \smallskip
        * Parse $\mathsf{ipk}  = (\mathbf{G_2},\mathbf{X_2},\mathbf{Z_1},\mathbf{Z_2},\overrightarrow{\mathbf{Y_2}})$.
        
        \smallskip
        * $\mathsf{blinding} := \mathbf{r}_\mathsf{t}\cdot \mathbf{G_2} + \mathbf{r}_\mathsf{sk}\cdot \mathbf{Z_2} + \sum_{i=0}^{n-1}\mathbf{r}_\mathsf{rand}[i]\cdot \mathbf{Y_2}[i]$. 
        
        \smallskip
        * Put $\mathsf{blinding}$ into the sponge and squeeze out a challenge $\mathsf{chal}$ from the sponge.
        
        \smallskip
        * Parse $\mathsf{rand} = (\mathbf{r}, \mathbf{t})$.
        
        \smallskip
        * $\mathsf{pok\_t} := \mathbf{t}\cdot \mathsf{chal} + \mathbf{r}_\mathsf{t}$.
        
        \smallskip
        * $\mathsf{pok\_sk} := \mathbf{usk} \cdot \mathsf{chal} + \mathbf{r}_\mathsf{sk}$.
        
        \smallskip
        * Initialize two vectors $\overrightarrow{\mathsf{pok\_attrs}}$ and $\overrightarrow{\mathsf{pok\_rand}}$.
        
        \smallskip
        * For $i = 0, 1, ..., n-1$:
        \smallskip
        
            * $\mathsf{pok\_attrs}[i] := \mathsf{attrs}[i] \cdot \mathsf{chal} + \mathsf{r}_\mathsf{attr}[i]$.
            
            \smallskip
            * If $\mathsf{reveal\_map} = 1$,
            
                \smallskip
                * $\mathsf{pok\_rand}[i] := \mathsf{ct\_rand}[i] \cdot \mathsf{chal} + \mathsf{r}_\mathsf{rand}[i]$.
            
            
            \smallskip
            * Otherwise, 
                \smallskip
                * $\mathsf{pok\_rand}[i] := \perp$.
            
        
        
        \smallskip
        * $\pi_{\mathsf{open}} := (\mathsf{blinding}, \mathsf{pok\_t}, \mathsf{pok\_sk}, \overrightarrow{\mathsf{pok\_attrs}},\overrightarrow{\mathsf{cm\_ct}},\overrightarrow{\mathsf{pok\_rand}})$.
        
        \smallskip
        * Output $(\overrightarrow{\mathsf{ct}}, \pi_\mathsf{open})$.
    
    
    \smallskip
    * $\mathsf{ConfidentialVerifyOpen}(\mathsf{ipk}, \mathsf{ek}, \mathsf{cm}, \overrightarrow{\mathsf{ct}}, \pi_\mathsf{open}, \overrightarrow{\mathsf{reveal\_map}},\mathbf{m}) := b\in\{0,1\}$: Verify a confidential selective opening, that is, the ElGamal ciphertexts $\overrightarrow{\mathsf{ct}}$ correctly encrypt the attributes that are being committed in $\mathsf{cm}$ and specified in $\overrightarrow{\mathsf{reveal\_map}}$. 
    \smallskip
    
        * Ensure $n := \lvert \overrightarrow{\mathsf{ct}}\rvert = \lvert \overrightarrow{\mathsf{reveal\_map}}\rvert$.
        
        \smallskip
        * Initialize the cryptographic sponge for the Fiat-Shamir transform.
        
        \smallskip
        * Put $(\mathsf{ipk},\mathsf{ek},\mathsf{cm},\overrightarrow{\mathsf{ct}})$ into the sponge.
        
        \smallskip
        * Put $\mathbf{m}$ into the sponge.
        
        \smallskip 
        * Put $\overrightarrow{\mathsf{ct}}$ into the sponge, one after the other.
        
        \smallskip
        * Parse $\pi_{\mathsf{open}} = (\mathsf{blinding}, \mathsf{pok\_t}, \mathsf{pok\_sk}, \overrightarrow{\mathsf{pok\_attrs}},\overrightarrow{\mathsf{cm\_ct}},\overrightarrow{\mathsf{pok\_rand}})$.
        
        \smallskip
        * Put $\mathsf{blinding}$ into the sponge and squeeze out a challenge $\mathsf{chal}\in\mathbb{F}$ from the sponge.
        
        \smallskip
        * Verify the ciphertexts. For $i=0,1, ..., n-1$:
        
            \smallskip
            * If $\mathsf{reveal\_map}[i] = 1$, check:
            $
            \mathsf{ElGamal.EncWithRand}(\mathsf{ek},\mathsf{pok\_attrs}[i],\mathsf{pok\_rand}[i])
            = \mathsf{ct}[i]\cdot\mathsf{chal} + \mathsf{ct\_cm}[i]
            $
            
            \smallskip
            * Otherwise, skip this attribute, as it is not being revealed. 
        
        
        \smallskip
        * Parse $\mathsf{ipk}  = (\mathbf{G_2},\mathbf{X_2},\mathbf{Z_1},\mathbf{Z_2},\overrightarrow{\mathbf{Y_2}})$.
        
        * Compute $\mathbf{P} := \mathsf{pok\_t}\cdot \mathbf{G_2} + \mathsf{chal}\cdot \mathbf{X_2} + \mathsf{pok\_sk}\cdot \mathbf{Z_2} - \mathsf{blinding} + \sum_{i=0}^{\lvert\overrightarrow{\mathsf{pok\_attrs}}\rvert-1}\mathsf{pok\_attrs}[i]\cdot \mathbf{Y_2}[i]$.
        
        \smallskip
        * Put $\mathsf{blinding}$ into the cryptographic sponge and squeeze out a random challenge $\mathsf{chal}\in\mathbb{F}$.
        
        \smallskip
        * Parse $\mathsf{cm} = (\sigma'_1, \sigma'_2)$.
        
        \smallskip
        * If $e(\sigma_1', \mathbf{P}) = e(\mathsf{chal}\cdot\sigma_2',\mathbf{G_2})$ output $b=1$, and $b=0$ otherwise.
        
    

