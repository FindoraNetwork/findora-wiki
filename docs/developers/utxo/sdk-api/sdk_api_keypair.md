---
sidebar_position: 2
---

# Keypair

### createKeypair

**_- Creates an instance of `WalletKeypar` using password._**  
This method is used to restore a wallet keypair. The Keypair contains some essential information, such as:

- &nbsp; address
- &nbsp; public key
- &nbsp; key store

and so on, and it is used for pretty much any personalized operation that user can do using FindoraSdk

##### Parameters:

- &nbsp; `<string>` - Password to be used to generate an encrypted KeyStore

##### Results:

- &nbsp; `Promise<WalletKeypar>` - An instance of `WalletKeypar`

##### Example:

```jsx
const password = "qsjEI%123";

// Create a wallet info object using given password
const walletPair = await Keypair.createKeypair(password);
```

### getAddressByPublicKey

**_- Get wallet address by given public key_**  
Using this function user can retreive the wallet address by given public key

##### Parameters:

- &nbsp; `<string>` - Public key

##### Results:

- &nbsp; `Promise<string>` - A wallet address.

##### Example:

```jsx
const pubkey = "qsjEI%123";
// Get wallet address by public key
const walletAddress = await Keypair.getAddressByPublicKey(pubkey);
```

### getAddressPublicAndKey

**_- Create an instance of `LightWalletKeypair` using given wallet address._**  
This method is used to create a light version of the WalletKeypar using given wallet address.The LightWalletKeypair contains two essential information:

- &nbsp; address
- &nbsp; public key

It's a light version of the WalletKeypar, containing only address and publickey

##### Parameters:

- &nbsp; `<string>` - Wallet address

##### Results:

- &nbsp; `Promise<LightWalletKeypair>` - An instance of `LightWalletKeypair`.

##### Example:

```jsx
const address = "fra234xfde4";

// Create a LightWalletKeypair object using given address
const lightWalletKeypair = await Keypair.getAddressPublicAndKey(address);
```

### getMnemonic

**_- Creates an array of Mnemonic phrases._**  
This method is used to creates an array of Mnemonic phrases.

##### Parameters:

- &nbsp; `<number>` - Desired length of mnemonic phrases. It can only be 12/15/18/21/24.
- &nbsp; `<string>` - (optional) Default is `en`.

##### Results:

- &nbsp; `Promise<LightWalletKeypair>` - An instance of `LightWalletKeypair`.

##### Example:

```jsx
const desiredLength = 24;

// Create a wallet info object using given password
const mnemonic = await Keypair.getMnemonic(desiredLength);
```

### restoreFromMnemonic

**_- Creates an instance of `WalletKeypar` using Mnemonic and password._**  
This method is used to restore a wallet keypair. The Keypair contains some essential information, such as:

- &nbsp; address
- &nbsp; public key
- &nbsp; key store

and so on, and it is used for pretty much any personalized operation that user can do using FindoraSdk

##### Parameters:

- &nbsp; `<string[]>` - mnemonic words
- &nbsp; `<string>` - Password to be used to generate an encrypted KeyStore

##### Results:

- &nbsp; `Promise<WalletKeypar>` - An instance of `WalletKeypar`.

##### Example:

```jsx
const password = "qsjEI%123";
const mnemonic = ["Apple", "Orange", "Banana"];

// Create a wallet info object using given Mnemonic and password
const walletPair = await Keypair.restoreFromMnemonic(mnemonic, password);
```

### restoreFromPrivateKey

**_- Creates an instance of `WalletKeypar` using given private key and password._**  
This method is used to restore a wallet keypair. The Keypair contains some essential information, such as:

- &nbsp; address
- &nbsp; public key
- &nbsp; key store

and so on, and it is used for pretty much any personalized operation that user can do using FindoraSdk

##### Parameters:

- &nbsp; `<string>` - Private key
- &nbsp; `<string>` - Password to be used to generate an encrypted KeyStore

##### Results:

- &nbsp; `Promise<WalletKeypar>` - An instance of `WalletKeypar`.

##### Example:

```jsx
const password = "qsjEI%123";
const pkey = "XXXXXXXXXX";

// Create a wallet info object using given private key and password
const walletInfo = await Keypair.restoreFromPrivateKey(pkey, password);
```
