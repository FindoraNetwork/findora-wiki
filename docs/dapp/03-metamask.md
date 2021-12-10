# Using Metamask

import useBaseUrl from '@docusaurus/useBaseUrl';

If you have used Metamask for any sort of development work on the EVM, then setting up Findora for use is as simple as can be. All that is needed is taking the network details as shown [here](https://wiki.findora.org/docs/dapp/network/) and making use of them as Metamask requires. Let's jump right in!

First step is to install Metamask if you don't have it before. Once you have Metamask installed, please prepare to configure findora

Next up, click on the bar that would typically show your last connected network. 

<img src={useBaseUrl("/img/evm/metamask.png")} width="30%" height="30%"/>


You should get a drop-down and a button that shows "Add Network". Click on that and a new tab will open where you can place Findora's network configurations.

<img src={useBaseUrl("/img/evm/metamask-1.png")} width="70%" height="30%"/>

Now we get to configuring Findora. 

In the Network name input field, copy and place this

```jsx
Forge
```

In the New RPC URL input field, copy and place this in 

```jsx
https://prod-forge.prod.findora.org:8545
```

Just below in the Chain ID input field, copy and place this

```jsx
525
```

Beside the chain id, currency symbol is 

```jsx
FRA
```

And at the end is the block explorer URL. If you're trying to go via the route of a UTXO explorer, please copy this in

```jsx
https://forge.findorascan.io/
```

If a Dapp explorer is more to your liking, then this works

```jsx
http://blockscout.findorascan.io/
```

Click on the 'Save' button and you should have a screen like this and be ready to go!

<img src={useBaseUrl("/img/evm/metamask-2.png")} width="30%" height="30%"/>
