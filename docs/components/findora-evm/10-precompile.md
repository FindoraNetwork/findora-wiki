# Precompile Contracts
Address | Name | Features
--- | --- | ---
0x0000000000000000000000000000000000000001 | ECRecover | ECDSA public key recovery
0x0000000000000000000000000000000000000002 | SHA256 | SHA-2 256-bit hash function
0x0000000000000000000000000000000000000003 | RIPEMD160 | RIPEMD 160-bit hash function
0x0000000000000000000000000000000000000004 | Identity | Identity function
0x0000000000000000000000000000000000000005 | ModExp | Big integer modular exponentiation
0x0000000000000000000000000000000000000006 | BN128Add | Elliptic curve addition
0x0000000000000000000000000000000000000007 | BN128Mul | Elliptic curve scalar multiplication
0x0000000000000000000000000000000000000008 | BN128Pair | Elliptic curve pairing check
0x0000000000000000000000000000000000001000 | FRA (FRC20) | Implement native token FRA to support IERC20 interface



## FRC20-FRA precompile contract
We have an ERC20 interface compatible implemenation of FRA. We can interact with this address within ERC20 interface to control your evm FRA as if it's an FRC20 token.




