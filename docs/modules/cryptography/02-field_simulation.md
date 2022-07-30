# Field Simulation

The Zei library provides an implementation of field simulation (and its constraint systems), which is able to simulate Ristretto scalar field in the BLS12-381 scalar field. As follows, we assume that the order of the Ristretto scalar field is $p$. 


## Data structure
The field simulation scheme consists of two data structures: simulated field ($\mathsf{SimFr}$) and simulated multiplication result ($\mathsf{SimFrMul}$), described as follows.

* Simulated field ($\mathsf{SimFr}$): It consists of $6$ limbs in the BLS12-381 scalar field. The number of bits in each limb in the standard representation is $43$ bits. Associated with each simulated field element is the number of additions over the normal form. 


* Simulated multiplication result ($\mathsf{SimFrMul}$): It consists of $13$ limbs in the BLS12-381 scalar field. Associated with each simulation multiplication result element is the product of the the number of additions over the normal form.



## Operations for $\mathsf{SimFr}$:
The implementation of $\mathsf{SimFr}$ in the Zei library supports a restricted set of operations, as follows:


* $\mathsf{Sub}(\mathsf{a}, \mathsf{b}) := \mathsf{c}$:

    * This is a restricted  subtraction, where $\mathsf{b}$ must satisfy the following requirements:
    
    
        * Either, $b$ is already in the reduced format. That is, each non-top limb has at most $43$ bits, and the top limb has at most $38$ bits, and the actual number being represented is strictly smaller than the Ristretto scalar field size;
        
        
        * Or, $b$ is in an almost reduced format. That is, each non-top limb has at most $43$ bits, and the top limb has at most $38$ bits, and the actual number being represented can be larger than the Ristretto scalar field size (in other words, to represent number $x$, it can be $p + x$). 
    
    
    
    * Let the limbs of the Ristretto scalar field subtraction pad be $\mathsf{r\_limbs}$, which is a constant $\mathsf{SimFr}$ element where each limb has one more bit than the reduced format, and the actual number it represents is multiplies of $p$. In our case, it is $3p$.
    
    
    * For $i= 0, 1, ..., 5$:
    
    
        * $\mathsf{c.limb[i] := a.limbs[i] + r\_limbs[i] - b.limbs[i]}$
    
    
    
    * Set $\mathsf{res.num\_of\_additions\_over\_normal\_form}$ as follows:
    
    
        * If $\mathsf{a}$ is in the reduced format, set it to be $3$
        
        
        * If $\mathsf{a}$ is in the almost reduced format, set it to be $4$
        
        
        * If $\mathsf{a}$ has $\mathsf{num\_of\_additions\_over\_normal\_form}$ of $x$, set it to be $x + 3$
    



* $\mathsf{Mul}(\mathsf{a, b}) := \mathsf{c}$:

    * For $i= 0, 1, ...,5$ and $j = 0, 1, ..., 5$:
    
        * $\mathsf{c.limbs[i + j] \mathrel{+=} a.limbs[i] \cdot b.limbs[j]}$
    
    
    * Set $w_a$ to be as follows:
    
        * If $\mathsf{a}$ is in the reduced format, set it to be $0$
        
        
        * If $\mathsf{a}$ is in the almost reduced format, set it to be $1$
        
        
        * If $\mathsf{a}$ has $\mathsf{num\_of\_additions\_over\_normal\_form}$ of $x$, set it to be $x$
    
    
    * Set $w_b$ to be as follows:
    
        * If $\mathsf{b}$ is in the reduced format, set it to be $0$
        
        
        * If $\mathsf{b}$ is in the almost reduced format, set it to be $1$
        
        
        * If $\mathsf{b}$ has $\mathsf{num\_of\_additions\_over\_normal\_form}$ of $x$, set it to be $x$
    
    
    
    * $\mathsf{res.prod\_of\_num\_of\_additions} := (w_a + 1)\cdot (w_b + 1)$.
    



## Operations for $\mathsf{SimFrMul}$:

The implementation of $\mathsf{SimFrMul}$ is to allow computation over the multiplied results. Similarly, it supposes a restricted set of operations, as follows:



* $\mathsf{Add}(\mathsf{a, b}) := \mathsf{c}$:
    
    * For $i=0,1, ..., 11$:
    
    
        * $\mathsf{res.limb[i] := a.limbs[i] + b.limbs[i]}$
    
    
    
    * Set $\mathsf{c.prod\_of\_num\_of\_addition} := \mathsf{a.prod\_of\_num\_of\_addition} + \mathsf{b.prod\_of\_num\_of\_addition}$
    


* $\mathsf{Sub}(\mathsf{a, b}) := \mathsf{c}$:
    
    * This is a restricted subtraction. It only allows $\mathsf{b}$ in the reduced format, almost reduced format, or with $\mathsf{num\_of\_additions\_over\_normal\_form}$ smaller or equal to $4$

    
    * Let the limbs of the Ristretto scalar field subtraction pad be  $\mathsf{r\_limbs}$
    
    
    * For $i = 0, 1, ..., 11$:
    
    
        * $\mathsf{res.limb[i] := a.limbs[i] + 4 * r\_limbs[i] - b.limbs[i]}$
    
    
    
    * Increment  $\mathsf{res.prod\_of\_num\_of\_additions}$ by $12$
    
    
    
    * $\mathsf{Zero(x)} := b\in\{0,1\}$: 
    
        * This only allows $\mathsf{x}$ with $\mathsf{prod\_of\_num\_of\_additions}$ smaller than $32$
    
        
        * Find $\mathsf{k}$ such that the actual number of $\mathsf{x}$ is $\mathsf{k}p$. Note that we can enforce that $\mathsf{k}< 32 p$
        
        
        * Let the limbs of the Ristretto scalar field subtraction pad be  $\mathsf{r\_limbs}$
        
        
        * Let the limb representations of $\mathsf{k}$ be $\mathsf{k\_limb}$ and check that:
        
        
            * The non-top limb has at most $43$ bits
            
            
            * The top limb has at most $38 + 5$ bits
        
        
        
        * Compute $\mathsf{rk\_limb}$ by multiplying the limbs of $\mathsf{r\_limb}$ and $\mathsf{k\_limb}$, according to the $\mathsf{SimFr}.\mathsf{Mul}$ algorithm. Note that $\mathsf{rk\_limb}$ has 11 limbs
        
        
        * Create six groups, as follows:
        
        
            * $\mathsf{left}[0] := \mathsf{x}[0] + 2^{43}\cdot \mathsf{x}[1]$, 
            $\mathsf{right}[0] := \mathsf{rk\_limb}[0] + 2^{43}\cdot \mathsf{rk\_limb}[1]$
            
            
            * $\mathsf{left}[1] := \mathsf{x}[2] + 2^{43}\cdot \mathsf{x}[3]$, $\mathsf{right}[1] := \mathsf{rk\_limb}[2] + 2^{43}\cdot \mathsf{rk\_limb}[3]$
            
            
            * $\mathsf{left}[2] := \mathsf{x}[4] + 2^{43}\cdot \mathsf{x}[5]$, $\mathsf{right}[2] := \mathsf{rk\_limb}[4] + 2^{43}\cdot \mathsf{rk\_limb}[5]$
            
            
            * $\mathsf{left}[3] := \mathsf{x}[6] + 2^{43}\cdot \mathsf{x}[7]$, $\mathsf{right}[3] := \mathsf{rk\_limb}[6] + 2^{43}\cdot \mathsf{rk\_limb}[7]$
            
            
            * $\mathsf{left}[4] := \mathsf{x}[8] + 2^{43}\cdot \mathsf{x}[9]$, $\mathsf{right}[4] := \mathsf{rk\_limb}[8] + 2^{43}\cdot \mathsf{rk\_limb}[9]$
            
            
            * $\mathsf{left}[5] := \mathsf{x}[10]$, $\mathsf{right}[5] := \mathsf{rk\_limb}[10]$
        
        
        
        * Initialize $\mathsf{carry\_in} := 0$ and $\mathsf{accumulated\_extra} := 0$
        
        
        * For $i = 0, 1, ..., 5$:
        
        
            * Let $n$ be the number of limbs in this group (i.e., one if $i = 5$, two otherwise)
            
            
            * $\mathsf{pad} := 2^{43(n+1) + n + 5}$
            
            
            * $\mathsf{accumulated\_extra} := \mathsf{accumulated\_extra} + \mathsf{pad}$
            
            
            * $\mathsf{new\_accumulated\_extra} := \mathsf{accumulated\_extra} / 2^{43n}$
            
            
            * $\mathsf{remainder} := \mathsf{accumulated\_extra} \% 2^{43n}$
            
            
            * $\mathsf{carry} := (\mathsf{left}[i] + \mathsf{pad} + \mathsf{carry\_in} - \mathsf{right}[i])/2^{43n}$
            
            
            * Check $\mathsf{left}[i] + \mathsf{pad} + \mathsf{carry\_in} - \mathsf{right}[i] = 2^{43n}\cdot\mathsf{carry} + \mathsf{remainder}$
            
            
            * $\mathsf{accumulated\_extra} := \mathsf{new\_accumulated\_extra}$
            
            
            * $\mathsf{carry\_in} := \mathsf{carry}$
            
            
            * If $i\neq 5$:
            
                * Check $\mathsf{carry\_in}$ has at most $5 + 43 * 2$ bits
            
            
            * Otherwise:
            
            
                * Check $\mathsf{carry\_in} = \mathsf{accumulated\_extra}$