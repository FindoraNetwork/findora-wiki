# Anonymous Credentials

The Zei library implements anonymous credentials, based on randomizable signatures from Pointcheval and Sanders.\footnote{See \url{https://eprint.iacr.org/2015/525}.} 
%
The anonymous credentials enable an credential issuer to issue credentials to a user. The credentials include some attributes for the user, such as the user's name, credit score, or date of birth. After obtaining the credentials, the user can use the credential to commit messages. 


The syntax and construction are as follows.


    * $\mathsf{IssuerKeyGen}(1^\lambda, \mathsf{num\_attrs})\rightarrow(\mathsf{isk}, \mathsf{ipk})$: Each credential issuer can generate a pair of keys, where the issuer secret key $\mathsf{isk}$ is used to issue attributes to a specific user, and the issuer public key $\mathsf{ipk}$ is used by the public to verify the issued attributes of a given user.
    
    
        * $\mathbf{x}, \mathbf{z}\leftarrow\!{\footnotesize \$} \hspace{3pt}\mathbb{F}$.
        
        
        * Sample group generators: $\mathbf{G_1}\leftarrow\!{\footnotesize \$} \hspace{3pt}\mathbb{G}_1$ and $\mathbf{G_2} \leftarrow\!{\footnotesize \$} \hspace{3pt}\mathbb{G}_2$.
    
        
        * Initialize two vectors $\overrightarrow{\mathbf{Y_2}}$ and $\overrightarrow{\mathbf{y}}$.
        
        
        * For $i = 0, 1, ..., \mathsf{num\_attrs} - 1$:
        \begin{itemize}
            * $\mathbf{y}[i] \leftarrow\!{\footnotesize \$} \hspace{3pt} \mathbb{F}$
            
            
            * $\mathbf{Y_2}[i] := \mathbf{y}[i]\cdot \mathbf{G_2}\in\mathbb{G}_2$
        
        
        
        * $\mathbf{X_2} := \mathbf{x}\cdot \mathbf{G_2}\in\mathbb{G}_2$.
        
        
        * $\mathbf{Z_1} := \mathbf{z}\cdot \mathbf{G_1} \in\mathbb{G}_1$.
        
        
        * $\mathbf{Z_2} := \mathbf{z}\cdot \mathbf{G_2}\in\mathbb{G}_2$.
        
        
        * Let $\mathsf{ipk} := (\mathbf{G_2},\mathbf{X_2},\mathbf{Z_1},\mathbf{Z_2},\overrightarrow{\mathbf{Y_2}})$.
        
        
        * Let $\mathsf{isk} := (\mathbf{ipk}, \mathbf{G_1}, \mathbf{x}, \overrightarrow{\mathbf{y}})$.
        
        
        * Output $(\mathsf{isk},\mathsf{ipk})$.
    
    
    
    * $\mathsf{UserKeyGen}(1^\lambda,\mathsf{ipk})\rightarrow (\mathsf{usk},\mathsf{upk})$: Each user can create a pair of keys $(\mathsf{usk},\mathsf{upk})$ under a specific issuer. The user secret key $\mathsf{usk}$ is used to claim ownership of an issued credential. The user public key $\mathsf{upk}$ is used by the public to verify such a claim.
    
    
        * Parse $\mathsf{ipk} = (\mathbf{G_2},\mathbf{X_2},\mathbf{Z_1},\mathbf{Z_2},\overrightarrow{\mathbf{Y_2}})$.
    
        
        * $\mathsf{usk} \leftarrow\!{\footnotesize \$} \hspace{3pt} \mathbb{F}$.
        
        
        * $\mathsf{upk} := \mathsf{usk}\cdot \mathbf{Z_1}$.
        
        
        * Output $(\mathsf{usk}, \mathsf{upk})$.
    
    
    
    * $\mathsf{GrantCredential}(\mathsf{isk}, \mathsf{upk}, \overrightarrow{\mathsf{attrs}})\rightarrow \sigma $: The credential issuer can use the issuer secret key $\mathsf{isk}$ to grant a number of attributes (the contents of the attributes are described in $\overrightarrow{\mathsf{attrs}}$) to a user, given this user's public key $\mathsf{upk}$.
    
    
        * Parse $\mathsf{isk} = (\mathsf{ipk}, \mathbf{G_1}, \mathbf{x}, \overrightarrow{\mathbf{y}})$.
        
        
        * $\mathsf{ipk} = (\mathbf{G_2},\mathbf{X_2},\mathbf{Z_1},\mathbf{Z_2},\overrightarrow{\mathbf{Y_2}})$.
    
        
        * Require $\lvert \overrightarrow{\mathsf{attrs}}\rvert = \lvert \overrightarrow{\mathbf{Y_2}}\rvert = n$.
        
        
        * $\mathbf{u}\leftarrow\!{\footnotesize \$} \hspace{3pt} \mathbb{F}$.
        
        
        * $\sigma_1 := \mathbf{u}\cdot \mathbf{G_1}$.
        
        
        * $\sigma_2 := \mathbf{u}\cdot \mathsf{upk} + \mathbf{u}\cdot (\mathbf{x} + \sum_{i=0}^{n-1} \mathbf{y}[i] \cdot \mathsf{attrs}[i])\cdot \mathbf{G_1}$.
        
        
        * Output the signature $\sigma := (\sigma_1, \sigma_2)$.
    
    
    
    * $\mathsf{OpenCredential}(\mathsf{usk},\mathsf{ipk}, \sigma, \overrightarrow{\mathsf{attrs}}, \overrightarrow{\mathsf{reveal\_map}})\rightarrow (\mathsf{cm}, \pi_\mathsf{open})$: Selectively reveal the attributes within the credential that is granted by the credential issuer with public key $\mathsf{ipk}$.
    
        
        * $\mathsf{rand}\leftarrow \mathsf{RandomizerGen}(1^\lambda)$.
        
        
        * Parse $\mathsf{rand} = (\mathbf{r}, \mathbf{t})$.
        
        
        * Randomize the credential signature $\sigma$ to create a commitment:
        
        
            * Parse $\sigma = (\sigma_1, \sigma_2)$.
        
            
            * $\sigma'_1 := \sigma_1 \cdot \mathbf{r}$.
            
            
            * $\sigma'_2 := (\sigma_2 + \sigma_1 \cdot \mathbf{t})\cdot \mathbf{r}$.
            
            
            * $\mathsf{cm} := (\sigma'_1, \sigma'_2)$.
        
        
        
        * $\pi_\mathsf{open} \leftarrow \mathsf{OpenComm}(\mathsf{usk}, \mathsf{ipk}, \mathsf{cm}, \mathsf{rand},  \overrightarrow{\mathsf{attrs}}, \overrightarrow{\mathsf{reveal\_map}})$.
        
        
        * Output $(\mathsf{cm}, \pi_\mathsf{open})$.
    


\medskip
The anonymous credentials scheme also provides a few functions that allow committing the credential along with some messages, as follows:

    * $\mathsf{RandomizerGen}(1^\lambda)\rightarrow \mathsf{rand}$: Sample a randomizer for the commitment scheme. This randomizer is used in the creation and opening of a credential-based commitment.
    
    
        * $\mathbf{r},\mathbf{t} \leftarrow\!{\footnotesize \$} \hspace{3pt} \mathbb{F}$.
    
        
        * Output $\mathsf{rand} := (\mathbf{r}, \mathbf{t})$.
    
    
    
    * $\mathsf{Commit}(\mathsf{usk}, \mathsf{ipk}, \sigma, \mathsf{rand},  \mathbf{m}, \overrightarrow{\mathsf{attrs}}) \rightarrow (\mathsf{cm}, \pi_\mathsf{valid})$: Commit a credential over a message $\mathbf{m}$ under the credential $\sigma$, the user secret key $\mathsf{usk}$, and randomizer $\mathsf{rand}$. The signature $\sigma$ corresponds to the attributes in $\overrightarrow{\mathsf{attrs}}$, granted by the credential issuer with public key $\mathsf{ipk}$. The output is a commitment $\mathsf{cm}$ and a validity proof $\pi_\mathsf{valid}$.
    
    
        * Parse $\mathsf{rand} = (\mathbf{r}, \mathbf{t})$.
        
        
        * Randomize the credential signature $\sigma$ to create a commitment:
        
        
            * Parse $\sigma = (\sigma_1, \sigma_2)$.
        
            
            * $\sigma'_1 := \sigma_1 \cdot \mathbf{r}$.
            
            
            * $\sigma'_2 := (\sigma_2 + \sigma_1 \cdot \mathbf{t})\cdot \mathbf{r}$.
            
            
            * $\mathsf{cm} := (\sigma'_1, \sigma'_2)$.
        
        
        
        * Initialize a new cryptographic sponge for the Fiat-Shamir transform.
        
        
        * Put $(\mathsf{ipk}, \mathsf{cm})$ into the cryptographic sponge.
        
        
        * Put $\mathbf{m}$ into the cryptographic sponge.
        
        
        * Run a proof of knowledge protocol as follows.
        
            
            * Parse $\mathsf{ipk}  = (\mathbf{G_2},\mathbf{X_2},\mathbf{Z_1},\mathbf{Z_2},\overrightarrow{\mathbf{Y_2}})$.
        
            
            * $\beta_1, \beta_2\leftarrow\!{\footnotesize \$} \hspace{3pt} \mathbb{F}$.
            
            
            * Initialize a vector $\overrightarrow{\gamma} \in \mathbb{F}^{\lvert \overrightarrow{\mathsf{attrs}} \rvert}$.
            
            
            * For $i=0, 1, ..., \lvert \overrightarrow{\mathsf{attrs}} \rvert-1$:
            
                
                * $\gamma[i] \leftarrow\!{\footnotesize \$} \hspace{3pt} \mathbb{F}$.
            
            
            
            * $\mathsf{blinding} := \beta_1\cdot\mathbf{G_2} + \beta_2\cdot \mathbf{Z_2} + \sum_{i=0}^{\lvert \overrightarrow{\mathsf{attrs}} \rvert-1}\gamma[i]\cdot \mathbf{Y_2}[i] \in\mathbb{G}_2$.
            
            
            * Put $\mathsf{blinding}$ into the cryptographic sponge and squeeze out a random challenge $\mathsf{chal}\in\mathbb{F}$.
            
            
            * $\mathsf{pok\_t} := \mathbf{t}\cdot\mathsf{chal} + \beta_1$.
            
            
            * $\mathsf{pok\_sk} := \mathsf{usk}\cdot \mathsf{chal} + \beta_2$.
            
            
            * Initialize a vector $\overrightarrow{\mathsf{pok\_attrs}}\in \mathbb{F}^{\lvert \overrightarrow{\mathsf{attrs}} \rvert}$.
            
            
            * For $i=0, 1, ..., \lvert \overrightarrow{\mathsf{attrs}} \rvert-1$:
            
                
                * $\mathsf{pok\_attrs}[i] := \mathsf{attrs}[i]\cdot \mathsf{chal} + \gamma[i]$.
            
        
        
        
        * $\pi_\mathsf{valid} := (\mathsf{blinding}, \mathsf{pok\_t}, \mathsf{pok\_sk}, \overrightarrow{\mathsf{pok\_attrs}})$.
        
        
        * Output $(\mathsf{cm}, \pi_\mathsf{valid})$.
    
    
    
    * $\mathsf{CheckComm}(\mathsf{ipk},\mathsf{cm}, \pi_\mathsf{valid}, \mathbf{m}):= b\in\{0,1\}$: Check if a commitment is valid; that is, if it commits to a credential issued by $\mathsf{ipk}$.
    
        
        * Parse $\pi_\mathsf{valid} = (\mathsf{blinding}, \mathsf{pok\_t}, \mathsf{pok\_sk}, \overrightarrow{\mathsf{pok\_attrs}})$.
        
        
        * Parse $\mathsf{ipk}  = (\mathbf{G_2},\mathbf{X_2},\mathbf{Z_1},\mathbf{Z_2},\overrightarrow{\mathbf{Y_2}})$.
    
        
        * Initialize a new cryptographic sponge for the Fiat-Shamir transform.
        
        
        * Put $(\mathsf{ipk}, \mathsf{cm})$ into the cryptographic sponge. 
        
        
        * Put $\mathbf{m}$ into the cryptographic sponge.
        
        
        * Put $\mathsf{blinding}$ into the cryptographic sponge and squeeze out a random challenge $\mathsf{chal}\in\mathbb{F}$.
        
        
        * Compute $\mathbf{P} := \mathsf{pok\_t}\cdot \mathbf{G_2} + \mathsf{chal}\cdot \mathbf{X_2} + \mathsf{pok\_sk}\cdot \mathbf{Z_2} - \mathsf{blinding} + \sum_{i=0}^{\lvert\overrightarrow{\mathsf{pok\_attrs}}\rvert-1}\mathsf{pok\_attrs}[i]\cdot \mathbf{Y_2}[i]$.
        
        
        * Parse $\mathsf{cm} = (\sigma'_1, \sigma'_2)$.
        
        
        * If $e(\sigma'_1, \mathbf{P}) = e(\mathsf{chal}\cdot \sigma'_2, \mathbf{G_2})$ output $b=1$, and $b=0$ otherwise. See below for correctness. Soundness requires a more detailed proof.
        
        
            * \underline{Correctness:} Recall that $\mathbf{X_2} = \mathbf{x}\cdot \mathbf{G_2}$, $\mathbf{Z_2} = \mathbf{z}\cdot \mathbf{Z_2}$, and $\mathbf{Y_2}[i] = \mathbf{y}[i]\cdot \mathbf{G_2}$, so:
            \begin{align}
                \mathbf{P} &= \mathsf{pok\_t}\cdot \mathbf{G_2} + \mathsf{chal}\cdot \mathbf{X_2} + \mathsf{pok\_sk}\cdot \mathbf{Z_2} - \mathsf{blinding} + \sum_{i=0}^{\lvert\overrightarrow{\mathsf{pok\_attrs}}\rvert-1}\mathsf{pok\_attrs}[i]\cdot \mathbf{Y_2}[i]\notag\\
                &= \mathsf{chal}\cdot (\mathbf{t} + \mathbf{x} + \mathsf{usk}\cdot \mathbf{z} + \mathsf{y}[i]\cdot \mathsf{attrs}[i])\cdot \mathbf{G_2}\notag
            \end{align}
            
            which means that:
            $
            \sigma_1' \cdot (\mathbf{t}+\mathbf{x}+\mathsf{usk}\cdot \mathbf{z} + \mathbf{y}[i] \cdot \mathsf{attrs}[i]) = \sigma_2'
            $
            
            Recall that $\sigma_1' = \sigma_1\cdot \mathbf{r}$ and $\sigma'_2 = (\sigma_2 + \sigma_1 \cdot \mathbf{t})\cdot \mathbf{r}$, which means that:
            $
            \sigma_1 \cdot (\mathbf{x}+\mathsf{usk}\cdot \mathbf{z} + \mathbf{y}[i] \cdot \mathsf{attrs}[i]) = \sigma_2
            $
            which matches the credential granting algorithm.
        
    
    
    
    * $\mathsf{OpenComm}(\mathsf{usk}, \mathsf{ipk}, \mathsf{cm}, \mathsf{rand},  \overrightarrow{\mathsf{attrs}}, \overrightarrow{\mathsf{reveal\_map}}) := \pi_\mathsf{open}$: Selectively reveal some attributes of the credential previously committed, where $\sigma$ is the signature of attributes signed by the credential provider, $\mathsf{rand}$ is the randomizer, $\overrightarrow{\mathsf{attrs}}$ represents the user's attributes, and $\overrightarrow{\mathsf{reveal\_map}}$ is the binary vector indicating whether or not an attribute is revealed.
    
    
        * Parse $\mathsf{rand} = (\mathbf{r}, \mathbf{t})$.
        
        
        * Initialize a new cryptographic sponge for the Fiat-Shamir transform.
        
        
        * Put $(\mathsf{ipk},\mathsf{cm})$ into the cryptographic sponge.
        
        
        * Run a proof of knowledge protocol as follows.
        
            
            * Parse $\mathsf{ipk}  = (\mathbf{G_2},\mathbf{X_2},\mathbf{Z_1},\mathbf{Z_2},\overrightarrow{\mathbf{Y_2}})$.
        
            
            * $\beta_1, \beta_2\leftarrow\!{\footnotesize \$} \hspace{3pt} \mathbb{F}$.
            
            
            * Initialize a vector $\overrightarrow{\gamma} \in \mathbb{F}^{\lvert \overrightarrow{\mathsf{attrs}} \rvert}$.
            
            
            * For $i=0, 1, ..., \lvert \overrightarrow{\mathsf{attrs}} \rvert-1$:
            
                
                * If $\mathsf{reveal\_map}[i] = 1$, this attribute is not hidden, then $\gamma[i] := 0$.
                
                
                * Else, $\mathsf{reveal\_map}[i] = 0$, this attribute is hidden, then $\gamma[i] \leftarrow\!{\footnotesize \$} \hspace{3pt} \mathbb{F}$.
            
            
            
            * $\mathsf{blinding} := \beta_1\cdot\mathbf{G_2} + \beta_2\cdot \mathbf{Z_2} + \sum_{i=0}^{\lvert \overrightarrow{\mathsf{attrs}} \rvert-1}\gamma[i]\cdot \mathbf{Y_2}[i] \in\mathbb{G}_2$.
            
            
            * Put $\mathsf{blinding}$ into the cryptographic sponge and squeeze out a random challenge $\mathsf{chal}\in\mathbb{F}$.
            
            
            * $\mathsf{pok\_t} := \mathbf{t}\cdot\mathsf{chal} + \beta_1$.
            
            
            * $\mathsf{pok\_sk} := \mathsf{usk}\cdot \mathsf{chal} + \beta_2$.
            
            
            * Initialize a vector $\overrightarrow{\mathsf{pok\_attrs}}\in \{\mathbb{F},\perp\}^{\lvert \overrightarrow{\mathsf{attrs}} \rvert}$.
            
            
            * For $i=0, 1, ..., \lvert \overrightarrow{\mathsf{attrs}} \rvert-1$:
            
                
                * If $\mathsf{reveal\_map}[i] = 1$, $\mathsf{pok\_attrs}[i] := \perp$.
                
                
                * Else, $\mathsf{reveal\_map}[i] = 0$, 
                $\mathsf{pok\_attrs}[i] := \mathsf{attrs}[i]\cdot \mathsf{chal} + \gamma[i]$.
            
        
        
        
        * Output $\pi_\mathsf{open} := (\mathsf{blinding}, \mathsf{pok\_t}, \mathsf{pok\_sk}, \overrightarrow{\mathsf{pok\_attrs}})$.
    
    
    
    * $\mathsf{VerifyOpen}(\mathsf{ipk},\mathsf{cm},\pi_\mathsf{open},\overrightarrow{\mathsf{attrs}}, \overrightarrow{\mathsf{reveal\_map}}) := b\in\{0,1\}$: Given a commitment $\mathsf{cm}$, the message $\mathbf{m}$, the revealing proof $\pi$, the claimed attributes $\overrightarrow{\mathsf{attrs}}$, and a vector indicating revealed attributes $\overrightarrow{\mathsf{reveal\_map}}$, this function checks if the claimed attributes are indeed signed by the credential issuer (with the public key $\mathsf{ipk}$) over the credential committed in $\mathsf{cm}$.
    
    
        * Initialize a new cryptographic sponge for the Fiat-Shamir transform.
        
        
        * Parse $\pi_\mathsf{open} = (\mathsf{blinding}, \mathsf{pok\_t}, \mathsf{pok\_sk}, \overrightarrow{\mathsf{pok\_attrs}})$.
        
        
        * Put $(\mathsf{ipk},\mathsf{cm})$ into the cryptographic sponge. 
        
        
        * Parse $\mathsf{ipk}  = (\mathbf{G_2},\mathbf{X_2},\mathbf{Z_1},\mathbf{Z_2},\overrightarrow{\mathbf{Y_2}})$.
        
        
        * Put $\mathsf{blinding}$ into the cryptographic sponge and squeeze out a random challenge $\mathsf{chal}\in\mathbb{F}$.
        
        
        * Initialize $\mathbf{P} := \mathsf{pok\_t}\cdot \mathbf{G_2} + \mathsf{chal}\cdot \mathbf{X_2} + \mathsf{pok\_sk}\cdot \mathbf{Z_2} - \mathsf{blinding}$.
        
        
        * For $i=0, 1, ..., \lvert\overrightarrow{\mathsf{pok\_attrs}}\rvert -1$:
        
            
            * If $\mathsf{reveal\_map}[i] = 0$, set $\mathbf{P} := \mathbf{P} + \mathsf{pok\_attrs}[i]\cdot \mathbf{Y_2}[i]$.
            
            
            * Otherwise, set $\mathbf{P} := \mathbf{P} + \mathsf{chal}\cdot \mathsf{attrs}[i] \cdot \mathbf{Y_2}[i]$.
        
        
        
        * Parse $\mathsf{cm} = (\sigma'_1, \sigma'_2)$.
        
        
        * If $e(\sigma_1', \mathbf{P}) = e(\mathsf{chal}\cdot\sigma_2',\mathbf{G_2})$ output $b=1$, and $b=0$ otherwise. See below for correctness. Soundness requires a more detailed proof.
        
            * \underline{Correctness:} Recall that $\mathbf{X_2} = \mathbf{x}\cdot \mathbf{G_2}$, $\mathbf{Z_2} = \mathbf{z}\cdot \mathbf{Z_2}$, and $\mathbf{Y_2}[i] = \mathbf{y}[i]\cdot \mathbf{G_2}$, so:
            \begin{align}
                \mathbf{P} &= \mathsf{pok\_t}\cdot \mathbf{G_2} + \mathsf{chal}\cdot \mathbf{X_2} + \mathsf{pok\_sk}\cdot \mathbf{Z_2} - \mathsf{blinding}\notag\\ 
                &+ \sum_{i=0}^{\lvert\overrightarrow{\mathsf{pok\_attrs}}\rvert-1}(1-\mathsf{reveal\_map}[i])\cdot  \mathsf{pok\_attrs}[i]\cdot \mathbf{Y_2}[i]\notag\\
                &+ \sum_{i=0}^{\lvert\overrightarrow{\mathsf{pok\_attrs}}\rvert-1}\mathsf{reveal\_map}[i]\cdot \mathsf{chal}\cdot \mathsf{attrs}[i]\cdot \mathbf{Y_2}[i]\notag\\
                &= \mathsf{chal}\cdot (\mathbf{t} + \mathbf{x} + \mathsf{usk}\cdot \mathbf{z} + \mathsf{y}[i]\cdot \mathsf{attrs}[i])\cdot \mathbf{G_2}\notag
            \end{align}
            which means that:
            $
            \sigma_1' \cdot (\mathbf{t}+\mathbf{x}+\mathsf{usk}\cdot \mathbf{z} + \mathbf{y}[i] \cdot \mathsf{attrs}[i]) = \sigma_2'
            $
            
            Recall that $\sigma_1' = \sigma_1\cdot \mathbf{r}$ and $\sigma'_2 = (\sigma_2 + \sigma_1 \cdot \mathbf{t})\cdot \mathbf{r}$, which means that:
            $
            \sigma_1 \cdot (\mathbf{x}+\mathsf{usk}\cdot \mathbf{z} + \mathbf{y}[i] \cdot \mathsf{attrs}[i]) = \sigma_2
            $
            which matches the credential granting algorithm.
        
    
